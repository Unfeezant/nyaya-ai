import { useState } from 'react';
import { ShieldCheck, Search, Scale, FileText, Calendar, Landmark, Coins, HelpCircle, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../../components/Button';
import Card from '../../components/Card';
import { apiService } from '../../services/api';

export default function RightsChecker() {
  const [situation, setSituation] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const examples = [
    "I was fired today.",
    "My landlord is locking my house door.",
    "I bought a mobile phone and it broke in 2 days but store won't replace.",
    "My salary has been delayed by 3 months."
  ];

  const handleCheck = async (queryText) => {
    const searchQuery = queryText || situation;
    if (!searchQuery.trim() || loading) return;

    setSituation(searchQuery);
    setLoading(true);
    setResults(null);

    try {
      const response = await apiService.checkRights(searchQuery);
      setResults(response);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center max-w-xl mx-auto">
        <div className="w-12 h-12 rounded-2xl bg-blue-900 flex items-center justify-center border border-blue-800 shadow-xl mb-4 mx-auto">
          <ShieldCheck className="w-6 h-6 text-emerald-400" />
        </div>
        <h3 className="text-xl font-bold font-display text-slate-850 dark:text-slate-100 font-display">Instant Rights Checker</h3>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
          Describe any personal or professional dispute in plain terms. Gemma will map it to statutory rights and protections.
        </p>
      </div>

      {/* Input box card */}
      <Card className="glass-card border border-slate-200/50 dark:border-slate-850 p-6 shadow-md">
        <div className="flex gap-2">
          <div className="flex-1 relative flex items-center">
            <Search className="absolute left-3.5 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="e.g. I was fired without notice; landlord refuses refund..."
              value={situation}
              onChange={(e) => setSituation(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/25 text-xs sm:text-sm text-slate-850 dark:text-slate-100 placeholder:text-slate-400"
            />
          </div>
          <Button
            onClick={() => handleCheck()}
            disabled={!situation.trim() || loading}
            variant="primary"
            className="px-6 cursor-pointer"
          >
            Check Rights
          </Button>
        </div>
        
        {/* Suggestion list */}
        <div className="mt-4 flex flex-wrap gap-2 items-center text-xs">
          <span className="text-slate-400 dark:text-slate-550 font-bold uppercase tracking-wider text-[10px]">Try:</span>
          {examples.map((ex, i) => (
            <button
              key={i}
              onClick={() => handleCheck(ex)}
              className="px-3 py-1.5 rounded-lg border border-slate-200/50 dark:border-slate-800/80 hover:bg-slate-100/50 dark:hover:bg-slate-850 text-slate-500 dark:text-slate-400 text-left hover:text-slate-850 transition-colors cursor-pointer"
            >
              {ex}
            </button>
          ))}
        </div>
      </Card>

      {/* Loading Reasoning indicator */}
      {loading && (
        <Card className="glass-card max-w-xl mx-auto p-12 shadow-xl border border-slate-200/50 dark:border-slate-850 text-center">
          <div className="w-12 h-12 rounded-xl bg-blue-900 border border-blue-800 flex items-center justify-center text-emerald-450 mb-4 mx-auto shadow-md">
            <Cpu className="w-6 h-6 text-emerald-450 animate-spin" />
          </div>
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 font-display">Gemma is analyzing protections...</h3>
          <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 uppercase tracking-wider">⚡ local inference on gemma3:4b</p>
        </Card>
      )}

      {/* Dynamic Results panel */}
      {results && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          
          {/* Rights card */}
          <Card className="glass-card border border-slate-200/50 dark:border-slate-850 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4 border-b border-slate-100 dark:border-slate-800/80 pb-3">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide font-display">Your Legal Rights</h4>
            </div>
            <ul className="space-y-3">
              {results.rights.map((r, i) => (
                <li key={i} className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Laws card */}
          <Card className="glass-card border border-slate-200/50 dark:border-slate-850 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4 border-b border-slate-100 dark:border-slate-800/80 pb-3">
              <Scale className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide font-display">Applicable Acts / Laws</h4>
            </div>
            <ul className="space-y-3">
              {results.laws.map((l, i) => (
                <li key={i} className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0"></span>
                  <span>{l}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Compensation Card */}
          <Card className="glass-card border border-slate-200/50 dark:border-slate-850 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-3 border-b border-slate-100 dark:border-slate-800/80 pb-3">
              <Coins className="w-5 h-5 text-amber-500" />
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide font-display">Eligible Compensation</h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans font-semibold">
              {results.compensation}
            </p>
          </Card>

          {/* Documents Needed Card */}
          <Card className="glass-card border border-slate-200/50 dark:border-slate-850 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-3 border-b border-slate-100 dark:border-slate-800/80 pb-3">
              <FileText className="w-5 h-5 text-indigo-500" />
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide font-display">Required Documents</h4>
            </div>
            <ul className="space-y-2">
              {results.documents.map((doc, i) => (
                <li key={i} className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-slate-400 flex-shrink-0"></span>
                  <span>{doc}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Timeline and Filing card */}
          <Card className="glass-card border border-slate-200/50 dark:border-slate-850 p-6 shadow-sm md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3 border-b border-slate-100 dark:border-slate-800/85 pb-2">
                <Calendar className="w-4 h-4 text-purple-500" />
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-300 uppercase tracking-wide">Filing Timeline limits</h4>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans">{results.timeline}</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-3 border-b border-slate-100 dark:border-slate-800/85 pb-2">
                <Landmark className="w-4 h-4 text-rose-500" />
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-300 uppercase tracking-wide">Government Offices / Forums</h4>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans">{results.offices}</p>
            </div>
          </Card>
          
          <div className="md:col-span-2 flex justify-between items-center text-[10px] text-slate-400 dark:text-slate-600 px-3 mt-2">
            <span>🟢 Analysis completed locally by gemma3:4b</span>
            <span>Always consult DLSA/Legal Aid for court applications</span>
          </div>
        </div>
      )}
    </div>
  );
}
