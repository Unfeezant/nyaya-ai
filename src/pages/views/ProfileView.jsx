import { useAppContext } from '../../context/AppContext';
import { User, Mail, ShieldAlert, FileText, Calendar, Landmark, Scale, Cpu, Trash2 } from 'lucide-react';
import Card from '../../components/Card';
import Button from '../../components/Button';

export default function ProfileView() {
  const { chats, savedCases, deleteCase } = useAppContext();
  const user = JSON.parse(localStorage.getItem('nyaya-user') || '{"name":"Citizen Advocate","email":"citizen@nyaya.gov.in"}');

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        
        {/* User Card Profile details (col-span-4) */}
        <div className="md:col-span-4 space-y-6">
          <Card className="glass-card border border-slate-200/50 dark:border-slate-850 p-6 shadow-sm text-center flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-blue-650 dark:text-blue-300 font-bold text-3xl flex items-center justify-center shadow-lg relative">
              {user.name[0]}
              <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900" title="Online inference ready"></span>
            </div>
            
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 mt-4 font-display">{user.name}</h3>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{user.email}</p>

            <div className="w-full border-t border-slate-100 dark:border-slate-800/80 my-5 pt-4 text-left space-y-3 text-xs">
              <div className="flex justify-between items-center text-slate-400">
                <span>Account Role</span>
                <span className="font-bold text-slate-700 dark:text-slate-300">Public Citizen</span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span>Security Clearance</span>
                <span className="font-bold text-emerald-500">Sovereign Local</span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span>Total Actions</span>
                <span className="font-bold text-slate-700 dark:text-slate-300">{chats.length + savedCases.length}</span>
              </div>
            </div>
            
            <div className="w-full flex items-center justify-center gap-1.5 text-[10px] text-slate-400 dark:text-slate-600 bg-slate-50 dark:bg-slate-950/60 py-2 rounded-xl border border-slate-100 dark:border-slate-800/80">
              <span>🟢 Local Gemma AI Active</span>
            </div>
          </Card>
        </div>

        {/* Dynamic saved items case lists (col-span-8) */}
        <div className="md:col-span-8 space-y-6">
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider text-left">Saved Case Files & Advice</h4>
            
            {savedCases.length === 0 ? (
              <Card className="glass-card p-12 border border-slate-200/50 dark:border-slate-800 text-center text-slate-400">
                <p className="font-semibold text-xs">No saved legal dossiers or cases found.</p>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">Select "Save" on AI advice reports to save them here.</p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {savedCases.map((cs) => (
                  <Card key={cs.id} className="glass-card border border-slate-200/50 dark:border-slate-800 p-5 shadow-sm text-left flex flex-col justify-between h-full">
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <span className="p-2 bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 rounded-xl text-blue-600 dark:text-blue-400">
                          <Scale className="w-4 h-4" />
                        </span>
                        <button
                          onClick={() => deleteCase(cs.id)}
                          className="p-1 rounded hover:bg-rose-500/10 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 line-clamp-1 font-display">{cs.title || 'Advice Log'}</h4>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 leading-normal font-sans line-clamp-3">
                        {cs.content || JSON.stringify(cs.sections || {})}
                      </p>
                    </div>
                    
                    <div className="flex justify-between items-center mt-6 border-t border-slate-100 dark:border-slate-800/80 pt-3 text-[9px] text-slate-400 dark:text-slate-400 font-semibold">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" /> {new Date(cs.timestamp).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-0.5">
                        <Cpu className="w-3.5 h-3.5 text-emerald-500" /> Gemma local
                      </span>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Recent Consultation list */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider text-left">Recent Case Consultations</h4>
            <Card className="glass-card border border-slate-200/50 dark:border-slate-800 p-5 shadow-sm text-left">
              {chats.length === 0 ? (
                <p className="text-xs text-slate-400 dark:text-slate-500 text-center py-4 font-semibold">No recent AI chats found.</p>
              ) : (
                <div className="divide-y divide-slate-100 dark:divide-slate-800/50">
                  {chats.slice(0, 3).map((c, idx) => (
                    <div key={c.id} className={`flex justify-between items-center py-3 ${idx === 0 ? 'pt-0' : ''} ${idx === 2 ? 'pb-0' : ''}`}>
                      <div>
                        <p className="text-xs font-bold text-slate-700 dark:text-slate-200">{c.title}</p>
                        <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">{c.date}</p>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                        gemma3:4b
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
