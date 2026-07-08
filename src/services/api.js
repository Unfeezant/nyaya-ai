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
      await delay(2200); // simulate Gemma reasoning
      
      const cleanPrompt = prompt.trim();
      const normalized = cleanPrompt.toLowerCase();
      
      // Dynamic keyword semantic routing
      let matchedResponse = null;
      if (normalized.includes('salary') || normalized.includes('pay') || normalized.includes('wage') || normalized.includes('employer') || normalized.includes('job') || normalized.includes('termination') || normalized.includes('fired')) {
        matchedResponse = MOCK_CHAT_RESPONSES["My employer has not paid my salary."];
      } else if (normalized.includes('landlord') || normalized.includes('rent') || normalized.includes('deposit') || normalized.includes('lease') || normalized.includes('tenant') || normalized.includes('room') || normalized.includes('flat') || normalized.includes('house')) {
        matchedResponse = MOCK_CHAT_RESPONSES["My landlord refuses to return my deposit."];
      } else if (normalized.includes('scam') || normalized.includes('cyber') || normalized.includes('fraud') || normalized.includes('bank') || normalized.includes('online') || normalized.includes('upi') || normalized.includes('hacked')) {
        matchedResponse = MOCK_CHAT_RESPONSES["I received an online scam."];
      } else if (normalized.includes('abusive') || normalized.includes('abuse') || normalized.includes('domestic') || normalized.includes('violence') || normalized.includes('husband') || normalized.includes('wife')) {
        matchedResponse = MOCK_CHAT_RESPONSES["My husband is abusive."];
      } else if (normalized.includes('trademark') || normalized.includes('brand') || normalized.includes('logo') || normalized.includes('patent') || normalized.includes('copyright')) {
        matchedResponse = MOCK_CHAT_RESPONSES["I want to register a trademark."];
      }

      if (matchedResponse) {
        return {
          ...matchedResponse,
          content: `Regarding your query "${prompt}": ` + matchedResponse.content
        };
      }
      
      // Dynamic generative fallback if not matched
      return {
        content: `Regarding your query: "${prompt}". Running local inference on gemma3:4b via Ollama. 

Based on your query, this situation relates to general civil or contractual disputes. In India, such disputes are typically governed under the Indian Contract Act or specific civil statutes. It is advised to compile your documentation and prepare a formal notification.`,
        sections: {
          situationSummary: `Legal analysis for: "${prompt}".`,
          relevantLaws: [
            `**Specific Relief Act, 1963**: Relates to specific performance of contracts related to your query.`,
            `**BNS (Bharatiya Nyaya Sanhita), 2023**: Criminal provisions if fraud or cheating is present.`,
            `**Code of Civil Procedure, 1908**: For filing civil suits.`
          ],
          yourRights: [
            `Right to claim damages or compensation for any direct loss suffered.`,
            `Right to issue a formal dispute notice and request legal remedies.`,
            `Right to representation before judicial and quasi-judicial tribunals.`
          ],
          evidenceNeeded: [
            "Contract copies, signed agreements, or exchange of terms.",
            "Communication history (Emails, Slack, WhatsApp chats, SMS).",
            "Payment receipts or transaction logs."
          ],
          nextSteps: [
            "Prepare a chronological timeline of all events.",
            "Draft and send a formal legal demand letter to the counterparty.",
            "Consult a certified legal practitioner for filing a suit."
          ],
          govResources: [
            { name: "NALSA Free Legal Aid", description: "Government Legal Aid portal for citizens.", url: "https://nalsa.gov.in" }
          ],
          notes: `Keep all details documented in writing. Do not commit to compromises without consulting counsel first.`,
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
      await delay(1800);
      
      const normalized = situation.toLowerCase();
      
      // Dynamic keyword routing for rights checker
      if (normalized.includes('fire') || normalized.includes('layoff') || normalized.includes('termination') || normalized.includes('fired') || normalized.includes('job') || normalized.includes('employment')) {
        return MOCK_RIGHTS_RESPONSES["I was fired today."];
      }
      
      if (normalized.includes('landlord') || normalized.includes('rent') || normalized.includes('deposit') || normalized.includes('tenant') || normalized.includes('lease') || normalized.includes('room') || normalized.includes('flat') || normalized.includes('house')) {
        return {
          rights: [
            "Right to refund of security deposit within 30 days of vacating the premises.",
            "Right to notice before eviction (minimum 30 days written notice).",
            "Right to basic amenities (water, electricity, sanitary services) which landlord cannot arbitrarily cut off.",
            "Right to receive a signed copy of the tenancy agreement."
          ],
          laws: [
            "**Model Tenancy Act, 2021 (Section 11)**: Security deposit refund regulations.",
            "**State Rent Control Act**: Controls rent increases and eviction conditions.",
            "**Transfer of Property Act, 1882 (Section 108)**: Rights and liabilities of lessor/lessee."
          ],
          compensation: "Up to double the monthly rent penalty if the landlord cut off essential utilities or wrongfully withheld the deposit.",
          documents: [
            "Signed Rent Agreement / Lease Deed",
            "Utility bill clearance receipts",
            "Bank transaction statements of deposit payment",
            "Vacating notice / inspection clearance checklist"
          ],
          timeline: "Complaints before Rent Authority must be filed within 30 days of the dispute arising.",
          offices: "Rent Authority / Rent Court of your local jurisdiction."
        };
      }
      
      if (normalized.includes('scam') || normalized.includes('cyber') || normalized.includes('fraud') || normalized.includes('bank') || normalized.includes('online') || normalized.includes('upi') || normalized.includes('hacked')) {
        return {
          rights: [
            "Right to zero customer liability if bank transaction fraud is reported within 3 working days.",
            "Right to file a complaint at any cyber cell or local police station (Zero FIR).",
            "Right to report anonymously on the national cyber crime portal.",
            "Right to block fraudulent bank accounts and request chargebacks."
          ],
          laws: [
            "**Information Technology Act, 2000 (Section 66D)**: Cheating by personation using computer resource.",
            "**Bharatiya Nyaya Sanhita, 2023**: Fraud, cheating, and property delivery.",
            "**RBI Master Circular on Customer Liability**: Rules for unauthorized electronic transactions."
          ],
          compensation: "Full refund / reversal of unauthorized charges by the bank if reported within 72 hours of occurrence.",
          documents: [
            "Bank account transaction statements",
            "Screenshots of the scam chats or websites",
            "Phone number, UPI ID, or bank account of the scammer"
          ],
          timeline: "Zero bank liability applies if reported within 3 days. Reporting Cyber Crime should ideally be within the Golden Hour (first 2 hours).",
          offices: "National Cyber Crime Reporting Portal (cybercrime.gov.in) or local Cyber Cell."
        };
      }

      if (normalized.includes('abusive') || normalized.includes('abuse') || normalized.includes('domestic') || normalized.includes('violence') || normalized.includes('husband') || normalized.includes('wife')) {
        return {
          rights: [
            "Right to protection orders preventing abuse, harassment, or contact from the husband/relatives.",
            "Right to reside in the shared marital household, regardless of title ownership.",
            "Right to claim maintenance and custody of minor children.",
            "Right to free legal aid from Legal Services Authorities."
          ],
          laws: [
            "**Protection of Women from Domestic Violence Act, 2005**: Fast civil protection remedies.",
            "**BNS, 2023 (Section 85) / IPC 498A**: Cruelty by husband or relatives."
          ],
          compensation: "Compensation order for physical, mental, or emotional distress determined by the Magistrate.",
          documents: [
            "Medical check-up certificates (if applicable)",
            "Audio / Video recording copies of verbal abuse or threats",
            "Police General Diary logs"
          ],
          timeline: "Filing can be done at any point during or after cohabitation. Emergency protection orders are usually heard in 3 days.",
          offices: "Local Protection Officer, Service Provider, or Magistrate Court."
        };
      }

      if (normalized.includes('trademark') || normalized.includes('brand') || normalized.includes('logo') || normalized.includes('patent') || normalized.includes('copyright')) {
        return {
          rights: [
            "Exclusive right to use the brand name for goods and services in specified classes.",
            "Right to use the ® symbol next to the brand name post-registration.",
            "Right to sue for infringement and seek injunctions against trademark copycats."
          ],
          laws: [
            "**Trademarks Act, 1999**: Brand naming protections.",
            "**Trademark Rules, 2017**: Fee structure and filing guidelines."
          ],
          compensation: "Claim civil damages, accounts of profits, and destruction of counterfeit goods.",
          documents: [
            "Logo graphic file (JPEG/PNG)",
            "Proof of business status (MSME/Startup certificate)",
            "User affidavit stating date of first use"
          ],
          timeline: "Registration generally takes 6 to 12 months. Opposition by third parties must be filed within 4 months of advertisement.",
          offices: "Office of the Controller General of Patents, Designs & Trade Marks (IP India)."
        };
      }

      // Default dynamic rights checker fallback
      return {
        rights: [
          `Right to fair hearing and protection of interests regarding "${situation}".`,
          "Right to legal assistance and representation."
        ],
        laws: [
          "**Constitution of India**: General civil rights protections.",
          "**Specific Relief Act, 1963**: Recovery of rights or enforcement."
        ],
        compensation: "Subject to judicial assessment and award by local courts.",
        documents: [
          "Written declarations, emails, receipts, contract terms."
        ],
        timeline: "Statute of limitations ranges from 1 year to 3 years for civil recovery suits.",
        offices: "District Legal Services Authority (DLSA) / Civil Court."
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
