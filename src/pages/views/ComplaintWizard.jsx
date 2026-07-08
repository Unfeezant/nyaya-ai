import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FileSignature, ShieldAlert, Cpu, Check, ArrowRight, ArrowLeft, Printer, Copy, Mail, FileDown, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../components/Button';
import Card from '../../components/Card';
import { Input, Textarea } from '../../components/Form';
import { apiService } from '../../services/api';
import { useAppContext } from '../../context/AppContext';

export default function ComplaintWizard() {
  const { addComplaint } = useAppContext();
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [complaintDraft, setComplaintDraft] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const categories = [
    { id: 'Police Complaint', label: 'Police Complaint', icon: '🚨' },
    { id: 'Cyber Crime', label: 'Cyber Crime', icon: '💻' },
    { id: 'Consumer Court', label: 'Consumer Court', icon: '🛒' },
    { id: 'Women\'s Commission', label: 'Women\'s Commission', icon: '👩' },
    { id: 'Labour Department', label: 'Labour Department', icon: '🛠️' },
    { id: 'Traffic Violation', label: 'Traffic Dispute', icon: '🚦' },
    { id: 'Property dispute', label: 'Property', icon: '🏠' },
    { id: 'Municipality', label: 'Municipality', icon: '🏙️' },
    { id: 'Electricity board', label: 'Electricity Office', icon: '⚡' },
    { id: 'Water department', label: 'Water Supply', icon: '🚰' },
    { id: 'Income Tax', label: 'Income Tax', icon: '📈' },
    { id: 'RTI Request', label: 'RTI Petition', icon: 'ℹ️' },
    { id: 'GST dispute', label: 'GST Claim', icon: '📊' }
  ];

  const handleSelectCategory = (catId) => {
    setSelectedCategory(catId);
    setStep(2);
  };

  const handleDetailsSubmit = async (data) => {
    setLoading(true);
    setStep(3);
    try {
      const payload = {
        category: selectedCategory,
        ...data
      };
      const response = await apiService.generateComplaint(payload);
      setComplaintDraft(response);
      addComplaint({
        id: Date.now().toString(),
        category: selectedCategory,
        title: response.title || `${selectedCategory} Complaint Draft`,
        content: response.content,
        date: new Date().toLocaleDateString(),
        timestamp: Date.now()
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!complaintDraft) return;
    navigator.clipboard.writeText(complaintDraft.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    reset();
    setSelectedCategory('');
    setComplaintDraft(null);
    setStep(1);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Wizard Progress Bar */}
      <div className="flex justify-between items-center max-w-md mx-auto px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 rounded-2xl shadow-sm glass-card">
        <div className="flex items-center gap-2">
          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
            step >= 1 ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
          }`}>1</span>
          <span className="text-xs font-bold text-slate-600 dark:text-slate-450">Category</span>
        </div>
        <div className="w-10 h-0.5 bg-slate-200 dark:bg-slate-800" />
        <div className="flex items-center gap-2">
          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
            step >= 2 ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
          }`}>2</span>
          <span className="text-xs font-bold text-slate-600 dark:text-slate-450">Details</span>
        </div>
        <div className="w-10 h-0.5 bg-slate-200 dark:bg-slate-800" />
        <div className="flex items-center gap-2">
          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
            step >= 3 ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
          }`}>3</span>
          <span className="text-xs font-bold text-slate-600 dark:text-slate-450">Preview</span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* STEP 1: CATEGORY SELECTION */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <div className="text-center">
              <h3 className="text-lg font-bold font-display text-slate-850 dark:text-slate-100">Select Complaint Category</h3>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Choose the appropriate department or authority for filing.</p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleSelectCategory(cat.id)}
                  className="glass-card glass-card-hover p-5 border border-slate-200/50 dark:border-slate-850 rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer w-full"
                >
                  <span className="text-3xl mb-3">{cat.icon}</span>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{cat.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* STEP 2: INCIDENT DETAILS FORM */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4 max-w-2xl mx-auto"
          >
            <div className="flex items-center gap-2 mb-4">
              <Button variant="outline" size="sm" onClick={() => setStep(1)} className="p-2">
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Category: {selectedCategory}</h3>
                <p className="text-xs text-slate-400 dark:text-slate-500">Provide the factual parameters of your grievance.</p>
              </div>
            </div>

            <Card className="glass-card border border-slate-200/50 dark:border-slate-850 p-6 shadow-md">
              <form onSubmit={handleSubmit(handleDetailsSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Date of Incident"
                    type="date"
                    id="date"
                    error={errors.date?.message}
                    {...register("date", { required: "Incident date is required" })}
                  />
                  <Input
                    label="Location (City, State)"
                    type="text"
                    id="location"
                    placeholder="e.g. Noida, UP"
                    error={errors.location?.message}
                    {...register("location", { required: "Location is required" })}
                  />
                </div>

                <Input
                  label="Subject / Incidental Event"
                  type="text"
                  id="incident"
                  placeholder="e.g. Non-refunding of security deposit after vacancy notice"
                  error={errors.incident?.message}
                  {...register("incident", { required: "Subject is required" })}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Witness(es) (Optional)"
                    type="text"
                    id="witness"
                    placeholder="Names of witnesses if any"
                    {...register("witness")}
                  />
                  <Input
                    label="Evidence Files (Optional)"
                    type="text"
                    id="evidence"
                    placeholder="e.g. Lease deed and bank remittance screenshots"
                    {...register("evidence")}
                  />
                </div>

                <Textarea
                  label="Detailed Incident Narrative"
                  id="description"
                  placeholder="Explain exactly what happened, dates, amounts, names, and communication attempts..."
                  error={errors.description?.message}
                  {...register("description", { required: "Description narrative is required" })}
                />

                <div className="pt-4 flex gap-4">
                  <Button type="button" variant="outline" className="w-full" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button type="submit" variant="primary" className="w-full gap-2">
                    Next <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </form>
            </Card>
          </motion.div>
        )}

        {/* STEP 3: PREVIEW & LOCAL INF DRAFT */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4 max-w-3xl mx-auto"
          >
            {loading ? (
              <Card className="glass-card p-12 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-blue-900 border border-blue-800 flex items-center justify-center text-emerald-400 mb-6 shadow-xl">
                  <Cpu className="w-8 h-8 animate-spin" />
                </div>
                <h3 className="text-lg font-bold font-display text-slate-800 dark:text-slate-100">Gemma is compiling draft...</h3>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-2 max-w-sm">
                  Leveraging localized Indian legal datasets via `gemma3:4b` to structure a formal petition document.
                </p>
              </Card>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => setStep(2)} className="p-2">
                      <ArrowLeft className="w-4 h-4" />
                    </Button>
                    <div>
                      <h3 className="text-sm font-bold text-slate-800 dark:text-slate-205">Draft Preview</h3>
                      <p className="text-[10px] text-slate-450 dark:text-slate-500">Drafted by Local Gemma AI</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleCopy} className="gap-1.5 border-slate-200 dark:border-slate-800">
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </Button>
                    <Button variant="outline" size="sm" onClick={handlePrint} className="gap-1.5 border-slate-200 dark:border-slate-800">
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print</span>
                    </Button>
                    <Button variant="primary" size="sm" onClick={handleReset} className="gap-1.5">
                      <FileSignature className="w-3.5 h-3.5" />
                      <span>New Draft</span>
                    </Button>
                  </div>
                </div>

                <Card className="glass-card border border-slate-200/50 dark:border-slate-850 p-8 shadow-2xl bg-white text-slate-900 font-serif leading-relaxed text-sm whitespace-pre-wrap max-h-[500px] overflow-y-auto">
                  {complaintDraft ? complaintDraft.content : 'No draft content compiled.'}
                </Card>
                
                <div className="flex items-center justify-between px-3 text-[10px] text-slate-400 dark:text-slate-600">
                  <span>🟢 Compiled completely offline by local gemma3:4b</span>
                  <span className="italic">Standard draft format - verification recommended</span>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
