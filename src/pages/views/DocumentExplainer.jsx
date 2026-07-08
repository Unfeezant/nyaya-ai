import { useState } from 'react';
import { FileSearch, HelpCircle, ArrowRight, FileText, Send, Sparkles, AlertCircle, RefreshCw, Languages, FileDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Upload from '../../components/Upload';
import ScalesOfJustice from '../../components/ScalesOfJustice';
import { apiService } from '../../services/api';
import { useAppContext } from '../../context/AppContext';

export default function DocumentExplainer() {
  const { addEvidence } = useAppContext();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [activeTab, setActiveTab] = useState('summary');
  const [qnaList, setQnaList] = useState([]);
  const [question, setQuestion] = useState('');
  const [askLoading, setAskLoading] = useState(false);

  const handleUpload = async (uploadedFile) => {
    if (!uploadedFile) {
      setFile(null);
      setAnalysis(null);
      return;
    }
    
    setFile(uploadedFile);
    setLoading(true);
    
    try {
      const response = await apiService.explainDocument(uploadedFile);
      setAnalysis(response);
      setQnaList([]);
      addEvidence({
        id: Date.now().toString(),
        name: uploadedFile.name,
        size: (uploadedFile.size / 1024).toFixed(1) + " KB",
        type: 'document',
        extension: uploadedFile.name.split('.').pop().toUpperCase(),
        aiCategory: 'Lease Agreement Analysis',
        tags: ['Agreement', 'Contract', 'Audited'],
        timestamp: new Date().toISOString(),
        ocrText: response.summary
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAsk = async () => {
    if (!question.trim() || askLoading) return;
    
    const userQ = question;
    setQnaList(prev => [...prev, { role: 'user', text: userQ }]);
    setQuestion('');
    setAskLoading(true);
    
    // Simulate local gemma parsing the document context for the answer
    setTimeout(() => {
      let answer = `Based on the document context, Clause 12 notes that maintenance charges must be paid by the tenant directly to the association. Unfair unilateral penalties are outlined in Clause 9.3 regarding rent default.`;
      if (userQ.toLowerCase().includes('termination') || userQ.toLowerCase().includes('exit')) {
        answer = `According to Clause 7, termination requires a 2-month written notice from either side. If not vacating in time, auto-renewal Clause 14 enforces exit penalties.`;
      } else if (userQ.toLowerCase().includes('deposit') || userQ.toLowerCase().includes('refund')) {
        answer = `The security deposit is set at ₹75,000, which is refundable upon tenancy termination minus any damages or unpaid utility bills under Clause 4.`;
      }
      setQnaList(prev => [...prev, { role: 'assistant', text: answer }]);
      setAskLoading(false);
    }, 2000);
  };

  const tabs = [
    { id: 'summary', name: 'Summary' },
    { id: 'clauses', name: 'Clauses' },
    { id: 'risks', name: 'Hidden Risks' },
    { id: 'unfairness', name: 'Unfair Terms' },
    { id: 'responsibilities', name: 'Duties' },
    { id: 'financials', name: 'Financials' }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {!analysis && !loading ? (
        /* Initial Upload Screen */
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-blue-900 flex items-center justify-center border border-blue-800 shadow-xl mb-4">
              <FileSearch className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold font-display text-slate-850 dark:text-slate-100 font-display">AI Legal Document Explainer</h3>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 max-w-sm">
              Upload any rental agreement, employment contract, or sale deed. Gemma will translate legal jargon into plain language.
            </p>
          </div>
          <Card className="glass-card p-6 border border-slate-200/50 dark:border-slate-850 shadow-md">
            <Upload onUpload={handleUpload} accept=".pdf,.docx,image/*" label="Upload lease/agreement document" />
          </Card>
        </div>
      ) : loading ? (
        /* Processing Scale Indicator */
        <Card className="glass-card max-w-2xl mx-auto p-12 shadow-2xl border border-slate-200/50 dark:border-slate-850 text-center">
          <ScalesOfJustice />
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-4 max-w-md mx-auto">
            Analyzing document layout, extracting clauses, and running local OCR verification. This may take a few seconds.
          </p>
        </Card>
      ) : (
        /* Explainer Dynamic Output screen */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* Main analysis content tabs (col-span-2) */}
          <div className="lg:col-span-2 space-y-4">
            
            {/* Header info */}
            <div className="flex justify-between items-center bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 p-4 rounded-2xl shadow-sm glass-card">
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <div className="text-left">
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-105 truncate max-w-xs">{file?.name || 'contract.pdf'}</h4>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider">Document Scanned Successfully</p>
                </div>
              </div>
              <button
                onClick={() => handleUpload(null)}
                className="text-xs font-semibold text-rose-500 hover:underline px-3 py-1.5 cursor-pointer"
              >
                Scan Another
              </button>
            </div>

            {/* Tab header buttons */}
            <div className="flex border-b border-slate-200 dark:border-slate-800 overflow-x-auto gap-2 py-1">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`text-xs font-bold px-4 py-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-slate-450 dark:text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>

            {/* Tab viewport panel */}
            <Card className="glass-card border border-slate-200/50 dark:border-slate-850 p-6 min-h-[300px] shadow-sm text-left">
              {activeTab === 'summary' && (
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Executive Summary</h4>
                  <p className="text-sm text-slate-700 dark:text-slate-350 leading-relaxed font-sans">{analysis.summary}</p>
                  
                  {/* Summary Footer actions */}
                  <div className="flex gap-2 pt-6">
                    <Button variant="outline" size="sm" className="gap-1 text-xs">
                      <Languages className="w-3.5 h-3.5" /> Translate Summary
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1 text-xs">
                      <FileDown className="w-3.5 h-3.5" /> Download Report
                    </Button>
                  </div>
                </div>
              )}

              {activeTab === 'clauses' && (
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Critical Clauses</h4>
                  <div className="space-y-3">
                    {analysis.importantClauses.map((c, i) => (
                      <div key={i} className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-xl text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                        {c}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'risks' && (
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-450 uppercase tracking-wider flex items-center gap-1">
                    <AlertCircle className="w-4 h-4 text-amber-500" /> Hidden Risk Assessment
                  </h4>
                  <div className="space-y-3">
                    {analysis.hiddenRisks.map((c, i) => (
                      <div key={i} className="p-3 bg-amber-500/5 border-l-4 border-l-amber-500 rounded-r-xl text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                        {c}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'unfairness' && (
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-450 uppercase tracking-wider flex items-center gap-1">
                    <AlertCircle className="w-4 h-4 text-rose-500" /> Unilateral / Unfair Covenants
                  </h4>
                  <div className="space-y-3">
                    {analysis.unfairClauses.map((c, i) => (
                      <div key={i} className="p-3 bg-rose-500/5 border-l-4 border-l-rose-500 rounded-r-xl text-xs sm:text-sm text-slate-755 dark:text-rose-350 leading-relaxed font-sans">
                        {c}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'responsibilities' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Your Duties / Responsibilities</h4>
                    <ul className="space-y-2">
                      {analysis.responsibilities.map((r, i) => (
                        <li key={i} className="text-xs sm:text-sm text-slate-700 dark:text-slate-350 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-450 mt-2 flex-shrink-0"></span>
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Counterparty Responsibilities</h4>
                    <ul className="space-y-2">
                      {analysis.rights.map((r, i) => (
                        <li key={i} className="text-xs sm:text-sm text-slate-750 dark:text-slate-350 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></span>
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'financials' && (
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Financial Obligations</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {analysis.financialObligations.map((o, i) => (
                      <div key={i} className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-xl text-left">
                        <p className="text-xs text-slate-700 dark:text-slate-300 font-semibold font-sans">{o}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* Ask Anything Q&A Sidebar */}
          <div className="space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-left">Ask about this Document</h3>
            <Card className="glass-card border border-slate-200/50 dark:border-slate-850 p-4 shadow-sm flex flex-col h-[480px] justify-between">
              
              {/* Chats thread */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs">
                {qnaList.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 p-4 space-y-2">
                    <HelpCircle className="w-8 h-8 text-slate-300 dark:text-slate-750" />
                    <p className="font-semibold text-[11px]">Ask anything about lease renewal notice, exit penalties, or security deposits.</p>
                  </div>
                ) : (
                  qnaList.map((q, i) => (
                    <div key={i} className={`flex flex-col gap-1 text-left ${q.role === 'user' ? 'items-end' : 'items-start'}`}>
                      <div className={`px-3 py-2 rounded-xl max-w-[85%] leading-relaxed ${
                        q.role === 'user'
                          ? 'bg-slate-900 text-slate-100 dark:bg-slate-800'
                          : 'bg-slate-100 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border border-slate-200/40 dark:border-slate-850'
                      }`}>
                        {q.text}
                      </div>
                    </div>
                  ))
                )}
                {askLoading && (
                  <div className="flex justify-start items-center gap-2 text-slate-450 dark:text-slate-500">
                    <span className="w-3 h-3 rounded-full border border-blue-500 border-t-transparent animate-spin"></span>
                    <span>Gemma is searching context...</span>
                  </div>
                )}
              </div>

              {/* Box input */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex gap-2">
                <input
                  type="text"
                  placeholder="Ask standard clauses..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
                  className="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/25 text-xs text-slate-850 dark:text-slate-100 placeholder:text-slate-450"
                />
                <button
                  onClick={handleAsk}
                  disabled={!question.trim() || askLoading}
                  className="p-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-40 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
