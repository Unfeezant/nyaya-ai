import { Scale, FileText, FileSignature, MessageSquareCode, ArrowRight, ShieldCheck, FolderGit, CalendarRange } from 'lucide-react';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { useAppContext } from '../../context/AppContext';

export default function Overview({ setTab }) {
  const { chats, evidence, complaints, savedCases } = useAppContext();

  const stats = [
    { name: 'Total Cases', value: savedCases.length.toString(), icon: <Scale className="w-5 h-5 text-blue-600 dark:text-blue-400" /> },
    { name: 'Documents Uploaded', value: evidence.length.toString(), icon: <FileText className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> },
    { name: 'Complaints Generated', value: complaints.length.toString(), icon: <FileSignature className="w-5 h-5 text-amber-600 dark:text-amber-400" /> },
    { name: 'AI Conversations', value: chats.length.toString(), icon: <MessageSquareCode className="w-5 h-5 text-purple-600 dark:text-purple-400" /> }
  ];

  const quickActions = [
    {
      title: 'Consult AI Assistant',
      desc: 'Ask general legal questions regarding civil, tenant, or labor disputes.',
      icon: <MessageSquareCode className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
      tab: 'chat'
    },
    {
      title: 'Draft Complaint',
      desc: 'Create structured police notifications, cyber cell claims, or consumer court cases.',
      icon: <FileSignature className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
      tab: 'complaint'
    },
    {
      title: 'Review Legal Contract',
      desc: 'Scan landlord agreements, NDA covenants, or corporate offers for risks.',
      icon: <FileText className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
      tab: 'explainer'
    },
    {
      title: 'Lookup Your Rights',
      desc: 'Check state statutes, notice thresholds, and labor compensation guidelines.',
      icon: <ShieldCheck className="w-5 h-5 text-indigo-500" />,
      tab: 'rights'
    }
  ];

  // Dynamic Recent Activity builder
  const buildRecentActivity = () => {
    const list = [];
    
    chats.forEach(c => {
      list.push({
        action: `AI consultation regarding "${c.title}"`,
        date: c.date,
        type: 'chat',
        timestamp: c.id
      });
    });

    evidence.forEach(e => {
      list.push({
        action: `Uploaded evidence: ${e.name}`,
        date: new Date(e.timestamp).toLocaleDateString(),
        type: 'document',
        timestamp: new Date(e.timestamp).getTime()
      });
    });

    complaints.forEach(cp => {
      list.push({
        action: `Drafted ${cp.category} Complaint`,
        date: cp.date,
        type: 'complaint',
        timestamp: cp.timestamp
      });
    });

    // Sort by timestamp descending
    return list.sort((a, b) => b.timestamp - a.timestamp).slice(0, 4);
  };

  const recentActivity = buildRecentActivity();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Welcome header banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 bg-slate-900 text-slate-100 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -z-1" />
        <div>
          <h2 className="text-xl font-bold font-display">Welcome Back, Advocate</h2>
          <p className="text-xs text-slate-400 mt-1">
            All tools are currently configured to run offline using Ollama and Gemma AI model.
          </p>
        </div>
        <Button variant="accent" size="sm" className="mt-4 sm:mt-0 gap-1.5" onClick={() => setTab('chat')}>
          Start New Consultation <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Stats counter grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <Card key={i} className="glass-card border border-slate-200/50 dark:border-slate-800 p-5 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500">{s.name}</p>
              <p className="text-2xl font-extrabold text-slate-850 dark:text-slate-100 mt-1 font-display">{s.value}</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800/80">
              {s.icon}
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick action grid (col-span-2) */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quickActions.map((act, i) => (
              <button
                key={i}
                onClick={() => setTab(act.tab)}
                 className="glass-card glass-card-hover p-5 border border-slate-200/50 dark:border-slate-800 text-left rounded-2xl flex flex-col justify-between cursor-pointer w-full"
              >
                <div>
                  <div className="p-2 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-lg w-fit mb-4">
                    {act.icon}
                  </div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 font-display">{act.title}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-405 mt-1.5 leading-relaxed">{act.desc}</p>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-bold text-blue-600 dark:text-blue-400 mt-5 uppercase tracking-wider">
                  <span>Open Tool</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Recent activity sidebar feed */}
        <div className="space-y-4">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">Recent Activity</h3>
          <Card className="glass-card border border-slate-200/50 dark:border-slate-800 p-5 shadow-sm space-y-4">
            {recentActivity.length === 0 ? (
              <p className="text-xs text-slate-400 dark:text-slate-500 text-center py-8 font-medium leading-relaxed">
                No activity logged yet. Start by consulting the AI, drafting a complaint, or reviewing a contract.
              </p>
            ) : (
              recentActivity.map((act, i) => (
                <div key={i} className="flex gap-3 items-start text-left">
                  <div className="p-2 bg-slate-50 dark:bg-slate-900 rounded-lg text-slate-400 border border-slate-100 dark:border-slate-800/80 mt-0.5">
                    {act.type === 'complaint' && <FileSignature className="w-4 h-4" />}
                    {act.type === 'document' && <FileText className="w-4 h-4" />}
                    {act.type === 'chat' && <MessageSquareCode className="w-4 h-4" />}
                    {act.type === 'evidence' && <FolderGit className="w-4 h-4" />}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-snug">{act.action}</p>
                    <p className="text-[10px] text-slate-405 dark:text-slate-500 mt-0.5">{act.date}</p>
                  </div>
                </div>
              ))
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
