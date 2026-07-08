import { useAppContext } from '../../context/AppContext';
import { Settings, Shield, ShieldCheck, Sun, Moon, Trash2, Database, Download } from 'lucide-react';
import Card from '../../components/Card';
import Button from '../../components/Button';

export default function SettingsView() {
  const { theme, toggleTheme, language, clearHistory, chats, savedCases } = useAppContext();

  const handleExport = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      chats,
      savedCases
    };
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = `nyaya_ai_backup_${Date.now()}.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleClear = () => {
    if (confirm("Are you sure you want to delete all local history and saved documents? This action is permanent!")) {
      clearHistory();
      alert("All local data has been purged.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      <div className="text-left mb-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">System Preferences</h3>
        <p className="text-xs text-slate-400 dark:text-slate-500">Configure theme, clear local databases, or backup offline legal dossiers.</p>
      </div>

      <div className="space-y-4">
        {/* Appearance Settings */}
        <Card className="glass-card border border-slate-200/50 dark:border-slate-850 p-5 shadow-sm text-left flex justify-between items-center">
          <div>
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-200">System Theme Mode</h4>
            <p className="text-[11px] text-slate-450 dark:text-slate-500 mt-0.5">Toggle between dark mode and light mode interfaces.</p>
          </div>
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-850 transition-colors cursor-pointer text-xs font-semibold"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
          </button>
        </Card>

        {/* Storage / Data Backup */}
        <Card className="glass-card border border-slate-200/50 dark:border-slate-850 p-5 shadow-sm text-left space-y-4">
          <div>
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-200">Local Dossier Backup</h4>
            <p className="text-[11px] text-slate-450 dark:text-slate-500 mt-0.5">Export all saved files and chat threads as a backup file.</p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" size="sm" className="gap-1.5 border-slate-200 dark:border-slate-800" onClick={handleExport}>
              <Download className="w-4 h-4" /> Export JSON Dossier
            </Button>
            <Button variant="danger" size="sm" className="gap-1.5" onClick={handleClear}>
              <Trash2 className="w-4 h-4" /> Delete Cache / History
            </Button>
          </div>
        </Card>

        {/* Security Info Card */}
        <Card className="glass-card border border-slate-200/50 dark:border-slate-850 p-5 shadow-sm text-left flex gap-4 bg-emerald-500/5 border-l-4 border-l-emerald-500">
          <div className="p-2 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-emerald-500 h-fit">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wide">Government-grade Trust Policy</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-1 font-sans">
              All computing remains restricted to this device. Since NyayaAI executes all generative tasks via the local Ollama daemon (`gemma3:4b`), no cloud processing is used. This prevents intellectual property leakage and satisfies sovereignty protocols.
            </p>
          </div>
        </Card>
      </div>
      
      <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 dark:text-slate-600">
        <span>🟢 Security settings active. Running sovereign local gemma3:4b</span>
      </div>
    </div>
  );
}
