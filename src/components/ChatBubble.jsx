import { useState } from 'react';
import { Copy, Check, Share2, FileDown, Bookmark, RotateCw, Cpu, User, Landmark, Shield, AlertTriangle, HelpCircle, FileText, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

export default function ChatBubble({ message, onRegenerate, onSave }) {
  const { role, content, sections, timestamp } = message;
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);

  const handleCopy = () => {
    const textToCopy = content || JSON.stringify(sections, null, 2);
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    setShowShareToast(true);
    setTimeout(() => setShowShareToast(false), 2000);
  };

  const handleSave = () => {
    setSaved(!saved);
    if (onSave) onSave(message);
  };

  const handleDownloadPDF = () => {
    // Simulate PDF generation and download
    const element = document.createElement("a");
    const file = new Blob([content || JSON.stringify(sections, null, 2)], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `nyaya_ai_report_${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const isUser = role === 'user';

  return (
    <div className={`flex gap-4 w-full ${isUser ? 'justify-end' : 'justify-start'} mb-6`}>
      {/* Bot Icon */}
      {!isUser && (
        <div className="w-10 h-10 rounded-xl bg-blue-900 dark:bg-blue-950 border border-blue-800 text-blue-400 flex items-center justify-center flex-shrink-0 shadow-md">
          <Cpu className="w-5 h-5 text-emerald-400" />
        </div>
      )}
      
      <div className={`max-w-[90%] md:max-w-[80%] flex flex-col gap-2 ${isUser ? 'items-end' : 'items-start'}`}>
        {isUser ? (
          /* User Message style */
          <div className="bg-slate-900 dark:bg-slate-800 text-slate-100 rounded-2xl rounded-tr-none px-5 py-3 shadow-md border border-slate-800">
            <p className="text-sm whitespace-pre-wrap font-sans">{content}</p>
          </div>
        ) : (
          /* AI Structured response style */
          <div className="w-full flex flex-col gap-4">
            {sections ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                {/* Situation Summary */}
                {sections.situationSummary && (
                  <CardSection
                    title="Situation Summary"
                    icon={<FileText className="w-4 h-4 text-blue-500" />}
                    className="md:col-span-2"
                  >
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                      {sections.situationSummary}
                    </p>
                  </CardSection>
                )}

                {/* Relevant Laws */}
                {sections.relevantLaws && (
                  <CardSection
                    title="Relevant Laws"
                    icon={<Landmark className="w-4 h-4 text-amber-500" />}
                  >
                    <ul className="space-y-2">
                      {sections.relevantLaws.map((law, index) => (
                        <li key={index} className="text-sm text-slate-600 dark:text-slate-300 flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                          <span>{law}</span>
                        </li>
                      ))}
                    </ul>
                  </CardSection>
                )}

                {/* Your Rights */}
                {sections.yourRights && (
                  <CardSection
                    title="Your Rights"
                    icon={<Shield className="w-4 h-4 text-emerald-500" />}
                  >
                    <ul className="space-y-2">
                      {sections.yourRights.map((right, index) => (
                        <li key={index} className="text-sm text-slate-600 dark:text-slate-300 flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span>{right}</span>
                        </li>
                      ))}
                    </ul>
                  </CardSection>
                )}

                {/* Evidence Needed */}
                {sections.evidenceNeeded && (
                  <CardSection
                    title="Evidence Needed"
                    icon={<FileText className="w-4 h-4 text-indigo-500" />}
                  >
                    <ul className="space-y-2">
                      {sections.evidenceNeeded.map((ev, index) => (
                        <li key={index} className="text-sm text-slate-600 dark:text-slate-300 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 flex-shrink-0"></span>
                          <span>{ev}</span>
                        </li>
                      ))}
                    </ul>
                  </CardSection>
                )}

                {/* Recommended Next Steps */}
                {sections.nextSteps && (
                  <CardSection
                    title="Recommended Next Steps"
                    icon={<HelpCircle className="w-4 h-4 text-blue-500" />}
                  >
                    <ol className="space-y-2 list-decimal list-inside text-sm text-slate-600 dark:text-slate-300">
                      {sections.nextSteps.map((step, index) => (
                        <li key={index} className="leading-relaxed">
                          <span className="ml-1">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </CardSection>
                )}

                {/* Government Resources */}
                {sections.govResources && (
                  <CardSection
                    title="Government Resources"
                    icon={<Landmark className="w-4 h-4 text-purple-500" />}
                    className="md:col-span-2"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {sections.govResources.map((res, index) => (
                        <a
                          key={index}
                          href={res.url || '#'}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center justify-between p-3 rounded-xl bg-slate-100/50 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/80 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 transition-all text-xs"
                        >
                          <div>
                            <p className="font-semibold text-slate-800 dark:text-slate-200">{res.name}</p>
                            <p className="text-[10px] text-slate-400 dark:text-slate-500">{res.description}</p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-400" />
                        </a>
                      ))}
                    </div>
                  </CardSection>
                )}

                {/* Important Notes */}
                {sections.notes && (
                  <CardSection
                    title="Important Notes"
                    icon={<AlertTriangle className="w-4 h-4 text-yellow-500" />}
                    className="md:col-span-2 border-l-4 border-l-yellow-500"
                  >
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                      {sections.notes}
                    </p>
                  </CardSection>
                )}

                {/* Legal Disclaimer */}
                {sections.disclaimer && (
                  <CardSection
                    title="Legal Disclaimer"
                    icon={<AlertTriangle className="w-4 h-4 text-rose-500" />}
                    className="md:col-span-2 bg-rose-500/5 border-l-4 border-l-rose-500"
                  >
                    <p className="text-xs text-rose-600/90 dark:text-rose-400/95 leading-relaxed font-sans italic">
                      {sections.disclaimer}
                    </p>
                  </CardSection>
                )}
              </div>
            ) : (
              /* Fallback to Standard Markdown Rendering */
              <div className="glass-card rounded-2xl p-5 border border-slate-200/50 dark:border-slate-800/50 w-full prose prose-slate dark:prose-invert max-w-none text-sm leading-relaxed">
                <ReactMarkdown>{content}</ReactMarkdown>
              </div>
            )}

            {/* Response Footer / Actions */}
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <ActionButton onClick={handleCopy} label={copied ? 'Copied' : 'Copy'}>
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              </ActionButton>
              
              <ActionButton onClick={handleShare} label="Share">
                <Share2 className="w-3.5 h-3.5" />
              </ActionButton>

              <ActionButton onClick={handleDownloadPDF} label="Download PDF">
                <FileDown className="w-3.5 h-3.5" />
              </ActionButton>

              <ActionButton onClick={handleSave} label={saved ? 'Saved' : 'Save'}>
                <Bookmark className={`w-3.5 h-3.5 ${saved ? 'fill-emerald-500 text-emerald-500' : ''}`} />
              </ActionButton>

              {onRegenerate && (
                <ActionButton onClick={onRegenerate} label="Regenerate">
                  <RotateCw className="w-3.5 h-3.5" />
                </ActionButton>
              )}

              <span className="text-[10px] text-slate-400 dark:text-slate-600 ml-auto mr-2">
                🟢 Powered by Local Gemma AI
              </span>
            </div>
          </div>
        )}
      </div>

      {/* User Icon */}
      {isUser && (
        <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center justify-center flex-shrink-0 shadow-md">
          <User className="w-5 h-5" />
        </div>
      )}

      {/* Toast Notice */}
      <AnimatePresence>
        {showShareToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 right-6 px-4 py-2.5 rounded-xl bg-slate-900 text-slate-100 text-xs shadow-2xl border border-slate-800 z-50 flex items-center gap-2"
          >
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Link copied to clipboard for sharing!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CardSection({ title, icon, children, className = '' }) {
  return (
    <div className={`glass-card rounded-2xl p-5 border border-slate-200/50 dark:border-slate-800/50 shadow-sm ${className}`}>
      <div className="flex items-center gap-2 mb-3">
        <div className="p-1.5 bg-slate-100 dark:bg-slate-900/80 rounded-lg">
          {icon}
        </div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          {title}
        </h4>
      </div>
      {children}
    </div>
  );
}

function ActionButton({ onClick, children, label }) {
  return (
    <button
      onClick={onClick}
      title={label}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-900/50 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer"
    >
      {children}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}
