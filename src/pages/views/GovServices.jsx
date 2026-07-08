import { useState } from 'react';
import { Landmark, ArrowUpRight, Search, FileText, CheckCircle, Info } from 'lucide-react';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { MOCK_GOV_SERVICES } from '../../services/mockData';

export default function GovServices() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredServices = MOCK_GOV_SERVICES.filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Directory Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="text-left">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Government Legal Services Directory</h3>
          <p className="text-xs text-slate-400 dark:text-slate-500">Official fees, eligibility rules, and links for Indian statutory filings.</p>
        </div>
        <div className="relative w-full md:w-80 flex items-center">
          <Search className="absolute left-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search registrations, passports, GST..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/25 text-xs text-slate-800 dark:text-slate-100 placeholder:text-slate-400 shadow-sm"
          />
        </div>
      </div>

      {/* Grid listing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
        {filteredServices.length === 0 ? (
          <Card className="glass-card col-span-2 p-12 text-center text-slate-400 border border-slate-200/50 dark:border-slate-850">
            <p className="text-xs font-semibold">No government services match your search query.</p>
          </Card>
        ) : (
          filteredServices.map((srv) => (
            <Card key={srv.id} className="glass-card border border-slate-200/50 dark:border-slate-800 p-6 flex flex-col justify-between shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center gap-2.5 border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div className="p-2 bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 rounded-xl text-blue-600 dark:text-blue-400">
                    <Landmark className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 font-display">{srv.name}</h4>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                    <p className="text-slate-600 dark:text-slate-300">
                      <span className="font-bold text-slate-800 dark:text-slate-200">Eligibility:</span> {srv.eligibility}
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <FileText className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-bold text-slate-800 dark:text-slate-200">Documents Needed:</span>
                      <ul className="list-disc pl-4 mt-1 space-y-0.5 text-[11px] text-slate-500 dark:text-slate-300">
                        {srv.documents.map((doc, idx) => (
                          <li key={idx}>{doc}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Meta details */}
                <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px]">
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider text-[9px]">Government Fee</span>
                    <p className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">{srv.fees}</p>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider text-[9px]">Processing Timeline</span>
                    <p className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">{srv.timeline}</p>
                  </div>
                </div>
              </div>

              {/* Action Portal Button */}
              <div className="pt-6">
                <a href={srv.url} target="_blank" rel="noreferrer" className="block w-full">
                  <Button variant="outline" size="sm" className="w-full gap-1.5 border-slate-200 dark:border-slate-800 text-xs">
                    Visit Official Portal <ArrowUpRight className="w-3.5 h-3.5" />
                  </Button>
                </a>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
