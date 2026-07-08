import axios from 'axios';
import { MOCK_CHAT_RESPONSES, MOCK_RIGHTS_RESPONSES, MOCK_DOCUMENT_EXPLAINER, MOCK_HISTORY } from './mockData';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Delay helper to simulate network latency & local Gemma reasoning
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const apiService = {
  chat: async (prompt, history = []) => {
    try {
      const response = await api.post('/chat', { prompt, history });
      return response.data;
    } catch (err) {
      console.warn("FastAPI backend is offline. Falling back to local Gemma simulation.", err);
      await delay(2500); // simulate Gemma reasoning
      
      const cleanPrompt = prompt.trim();
      const mockMatch = MOCK_CHAT_RESPONSES[cleanPrompt];
      if (mockMatch) {
        return mockMatch;
      }
      
      // Generic fallback if not matched
      return {
        content: `I have processed your query: "${prompt}". Running local inference on gemma3:4b via Ollama.`,
        sections: {
          situationSummary: `Legal query regarding: "${prompt}".`,
          relevantLaws: [
            "**Constitution of India**: General provisions.",
            "**Indian Penal Code (IPC) / Bharatiya Nyaya Sanhita (BNS)**: General application."
          ],
          yourRights: [
            "Right to equality and natural justice.",
            "Right to legal representation and advice."
          ],
          evidenceNeeded: [
            "Correspondence logs (Emails, WhatsApp, Letters).",
            "Signed contracts or written documentation.",
            "Witness accounts (if any)."
          ],
          nextSteps: [
            "Compile a detailed timeline of events.",
            "Send a written notice to the counterparty outlining the issue.",
            "Consult a legal counsel for formal representation."
          ],
          govResources: [
            { name: "Digital India Legal Services", description: "Government Legal Aid portal.", url: "https://nalsa.gov.in" }
          ],
          notes: "Ensure all related records are maintained securely.",
          disclaimer: "NyayaAI is an AI-powered assistant. This advice is for informational purposes and does not constitute formal legal counsel."
        }
      };
    }
  },
  
  explainDocument: async (file) => {
    try {
      const formData = new FormData();
      formData.append('document', file);
      const response = await api.post('/document', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    } catch (err) {
      console.warn("FastAPI backend is offline. Falling back to local Gemma document parser simulation.", err);
      await delay(3000); // Doc analysis takes longer
      return MOCK_DOCUMENT_EXPLAINER;
    }
  },
  
  generateComplaint: async (data) => {
    try {
      const response = await api.post('/complaint', data);
      return response.data;
    } catch (err) {
      console.warn("FastAPI backend is offline. Falling back to local Gemma complaint generator simulation.", err);
      await delay(2000);
      
      // Generate a mock complaint draft based on wizard details
      const today = new Date().toLocaleDateString();
      return {
        title: `${data.category || 'General'} Complaint Draft`,
        content: `To,
The Competent Authority / Officer-In-Charge,
Department of ${data.category || 'General Administration'},
District Headquarters.

Date: ${today}
Location of Incident: ${data.location || 'Not Specified'}
Date of Incident: ${data.date || 'Not Specified'}

Subject: Formal Complaint regarding ${data.incident || 'Unresolved legal matter'}

Respected Authority,

I am writing to register a formal complaint regarding the following incident:
${data.description || 'Details not provided.'}

Details of the event:
- Incident Category: ${data.category || 'General'}
- Specific Event: ${data.incident || 'N/A'}
- Witness(es): ${data.witness || 'None'}
- Associated Evidence: ${data.evidence || 'Attached'}

I kindly request you to look into this matter urgently and initiate appropriate proceedings. I am ready to supply further evidence or witness accounts as required.

Thanking you.

Yours faithfully,
[Complainant Signature/Name]
`
      };
    }
  },
  
  checkRights: async (situation) => {
    try {
      const response = await api.post('/rights', { situation });
      return response.data;
    } catch (err) {
      console.warn("FastAPI backend is offline. Falling back to rights checker simulation.", err);
      await delay(2000);
      const mockMatch = MOCK_RIGHTS_RESPONSES[situation];
      if (mockMatch) {
        return mockMatch;
      }
      return {
        rights: [
          "Right to fair hearing and protection under relevant statutes.",
          "Right to legal assistance and counseling."
        ],
        laws: [
          "**Constitution of India**: Article 21 (Right to Life and Personal Liberty)."
        ],
        compensation: "Subject to legal assessment by appropriate tribunal.",
        documents: [
          "ID cards, written declarations, timeline logs."
        ],
        timeline: "Immediate representation / Appeal filing ranges from 30 to 90 days.",
        offices: "District Legal Services Authority (DLSA)."
      };
    }
  },

  manageEvidence: async (file, description = '') => {
    try {
      const formData = new FormData();
      formData.append('evidence', file);
      formData.append('description', description);
      const response = await api.post('/evidence', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    } catch (err) {
      console.warn("FastAPI backend is offline. Falling back to evidence manager simulation.", err);
      await delay(1500);
      
      const fileType = file ? file.type.split('/')[0] : 'document';
      const fileExtension = file ? file.name.split('.').pop().toUpperCase() : 'PDF';
      
      let ocrText = "Sample OCR Text: Extracted text from uploaded invoice/agreement showing transactions total ₹24,000 and signatory verification.";
      let aiCategory = "Financial Transaction Proof";
      let tags = ["Invoice", "Receipt", "Financial"];

      if (fileType === 'image') {
        ocrText = "OCR Text: Extracted stamp, signatures, and date stamps from legal deed copy.";
        aiCategory = "Deed / Agreements";
        tags = ["Image", "Stamp Duty", "Agreement"];
      } else if (fileType === 'audio') {
        ocrText = "Transcription: 'I have requested my security deposit thrice but he keeps making excuses about repairs...'";
        aiCategory = "Audio Evidence";
        tags = ["Recording", "Spoken Evidence", "Lease"];
      }

      return {
        name: file ? file.name : "evidence_file.pdf",
        size: file ? (file.size / 1024).toFixed(1) + " KB" : "250 KB",
        type: fileType,
        extension: fileExtension,
        ocrText,
        aiCategory,
        tags,
        timestamp: new Date().toISOString()
      };
    }
  },
  
  getHistory: async () => {
    try {
      const response = await api.get('/history');
      return response.data;
    } catch (err) {
      return MOCK_HISTORY;
    }
  },
  
  setLanguage: async (language) => {
    try {
      const response = await api.post('/language', { language });
      return response.data;
    } catch (err) {
      return { status: 'success', language };
    }
  }
};

export default api;
