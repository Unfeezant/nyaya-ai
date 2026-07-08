import { useAppContext } from '../../context/AppContext';
import { Calendar, CheckCircle2, Clock, Scale, FileText, FileSignature, MessageSquareCode, ShieldCheck } from 'lucide-react';
import Card from '../../components/Card';

export default function CaseTimelineView() {
  const { chats, evidence, complaints } = useAppContext();

  const buildTimeline = () => {
    const list = [];

    chats.forEach(c => {
      list.push({
        id: 'chat-' + c.id,
        title: 'Case Consultation Initialized',
        desc: `Consulted local Gemma assistant regarding: "${c.title}"`,
        status: 'completed',
        date: c.date,
        timestamp: Number(c.id),
        icon: <MessageSquareCode className="w-4 h-4 text-emerald-500" />
      });
    });

    evidence.forEach(e => {
      list.push({
        id: 'ev-' + e.id,
        title: `${e.type === 'document' ? 'Document Reviewed' : 'Evidence Uploaded'}`,
        desc: `Preserved "${e.name}" in Sovereign Evidence Locker under category: ${e.aiCategory}.`,
        status: 'completed',
        date: new Date(e.timestamp).toLocaleDateString(),
        timestamp: new Date(e.timestamp).getTime(),
        icon: e.type === 'document' ? <FileText className="w-4 h-4 text-emerald-500" /> : <ShieldCheck className="w-4 h-4 text-emerald-500" />
      });
    });

    complaints.forEach(cp => {
      list.push({
        id: 'comp-' + cp.id,
        title: `${cp.category} Complaint Generated`,
        desc: `Completed AI-assisted drafting: "${cp.title}".`,
        status: 'completed',
        date: cp.date,
        timestamp: cp.timestamp,
        icon: <FileSignature className="w-4 h-4 text-emerald-500" />
      });
    });

    // Sort by timestamp descending
    const sorted = list.sort((a, b) => b.timestamp - a.timestamp);

    // If there is any completed item, prepend a pending lawyer schedule checkpoint
    if (sorted.length > 0) {
      sorted.unshift({
        id: 'lawyer-schedule',
        title: 'Lawyer Consultation Scheduled',
        desc: 'Pending scheduling with District Legal Services Authority (DLSA) advocate panel.',
        status: 'pending',
        date: 'Pending Assignment',
        timestamp: Date.now() + 100000,
        icon: <Scale className="w-4 h-4 text-slate-500" />
      });
    }

    return sorted;
  };

  const events = buildTimeline();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      <div className="text-left mb-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Interactive Case Timeline</h3>
        <p className="text-xs text-slate-400 dark:text-slate-500">Track procedural updates, draft iterations, and scheduling checkpoints in your dossier.</p>
      </div>

      <Card className="glass-card border border-slate-200/50 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
        {events.length === 0 ? (
          <p className="text-xs text-slate-400 dark:text-slate-500 text-center py-8 font-medium leading-relaxed">
            No activity logged in your timeline yet. Start by consulting the AI assistant, drafting a complaint, or reviewing a contract.
          </p>
        ) : (
          <div className="relative border-l-2 border-slate-200 dark:border-slate-800 pl-6 sm:pl-8 space-y-8 text-left">
            {events.map((event) => (
              <div key={event.id} className="relative">
                {/* Timeline marker node */}
                <span className={`absolute -left-[35px] sm:-left-[43px] top-1.5 w-6 h-6 sm:w-8 sm:h-8 rounded-xl border flex items-center justify-center shadow-sm z-10 ${
                  event.status === 'completed'
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-500'
                    : 'bg-amber-50 dark:bg-amber-950/40 border-amber-500 text-amber-500 animate-pulse'
                }`}>
                  {event.status === 'completed' ? <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                </span>

                <div className="space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="text-sm font-bold text-slate-800 dark:text-slate-150 font-display flex items-center gap-2">
                      <span className="p-1 bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 rounded-lg">
                        {event.icon}
                      </span>
                      {event.title}
                    </h4>
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md max-w-fit flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {event.date}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans max-w-xl">
                    {event.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
      
      <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 dark:text-slate-600">
        <span>🟢 Timeline updated dynamically by Local Gemma dossier parser</span>
      </div>
    </div>
  );
}
