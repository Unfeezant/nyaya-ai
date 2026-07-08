import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Scale, ArrowRight, ShieldCheck, FileText, Languages, Cpu, BrainCircuit, Users, Landmark, AlertCircle, HelpCircle, ArrowUpRight } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import { useAppContext } from '../context/AppContext';

export default function Home() {
  const { theme, toggleTheme } = useAppContext();
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const features = [
    {
      icon: <BrainCircuit className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      title: "AI Legal Assistant",
      desc: "Instant ChatGPT-style advice based on localized BNS/IPC legal databases."
    },
    {
      icon: <FileText className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
      title: "Document Explainer",
      desc: "Upload leases, deeds, or contracts. Extract risks, responsibilities, and termination clauses instantly."
    },
    {
      icon: <Scale className="w-6 h-6 text-indigo-650 dark:text-indigo-400" />,
      title: "Complaint Wizard",
      desc: "Draft standard police, consumer, and labor complaints through an automated guided interview."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-amber-600 dark:text-amber-400" />,
      title: "Rights Checker",
      desc: "Instantly learn your legal protections, compensation guidelines, and timelines in everyday language."
    },
    {
      icon: <Landmark className="w-6 h-6 text-purple-600 dark:text-purple-400" />,
      title: "Gov Services Hub",
      desc: "Quick access to eligibility checklists, fees, and links for trademark, passport, and company filings."
    },
    {
      icon: <Languages className="w-6 h-6 text-rose-600 dark:text-rose-400" />,
      title: "Multilingual Support",
      desc: "Break barriers with support for Hindi, Tamil, Marathi, Punjabi, Gujarati, Bengali, and more."
    }
  ];

  const testimonials = [
    {
      name: "Rajesh K. Mehta",
      role: "SME Owner, Mumbai",
      quote: "NyayaAI saved me thousands in legal fees. I ran a vendor contract through the Document Explainer, and it caught a hidden 15% automatic price escalation clause."
    },
    {
      name: "Sonia G. Swamy",
      role: "Tenant, Bengaluru",
      quote: "The rights checker explained my deposit return guidelines clearly. I sent the output letter to my landlord, and he refunded my money within 48 hours without a dispute."
    },
    {
      name: "Dr. Anirban Sen",
      role: "Professor, Kolkata",
      quote: "As an academic, the local execution is crucial. I ran our IP trademark feasibility questions offline without sharing sensitive data with big tech companies."
    }
  ];

  const faqs = [
    {
      q: "Is my legal data private?",
      a: "Yes, 100%. NyayaAI is designed for national security and government-grade privacy. All AI models run locally on your hardware using Ollama (gemma3:4b). No drafts, contracts, or text leave your local system."
    },
    {
      q: "Can this replace a licensed attorney?",
      a: "No. NyayaAI acts as a legal first responder to explain laws and generate draft documentation in plain terms. It does not provide formal legal representation. Always consult a certified bar lawyer before court filings."
    },
    {
      q: "How does the local Gemma model work?",
      a: "We utilize Ollama's local inference framework, querying `gemma3:4b` locally. This ensures prompt responses, no API usage limits, and zero reliance on cloud service availability."
    },
    {
      q: "What languages does the platform support?",
      a: "We support 10 Indian regional languages (Hindi, Bengali, Punjabi, Tamil, Telugu, Kannada, Malayalam, Gujarati, Marathi, and English) for translations and document drafting."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      {/* Sticky Header / Navbar */}
      <nav className="sticky top-0 z-50 glass-nav shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-blue-900 flex items-center justify-center border border-blue-800">
                <Scale className="w-5 h-5 text-emerald-400" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 font-display">
                Nyaya<span className="text-blue-600 dark:text-blue-400">AI</span>
              </span>
              <span className="hidden md:inline-flex items-center ml-3 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/25">
                🟢 Powered by Local Gemma AI
              </span>
            </div>

            {/* Navigation links */}
            <div className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Features</a>
              <a href="#testimonials" className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Testimonials</a>
              <a href="#faq" className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">FAQ</a>
              <Link to="/dashboard" className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Dashboard</Link>
            </div>

            {/* CTA and Theme Toggle */}
            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-850 hover:bg-slate-100 dark:hover:bg-slate-900 cursor-pointer"
                title="Toggle Theme"
              >
                {theme === 'light' ? '🌙' : '☀️'}
              </button>
              <Link to="/login">
                <Button variant="ghost" size="sm">Login</Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="primary" size="sm" className="gap-1.5">
                  Get Started <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-24 md:pt-28 md:pb-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Background gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 dark:bg-blue-500/5 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-emerald-500/5 rounded-full blur-2xl pointer-events-none -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-650 dark:text-blue-400 border border-blue-500/20 mb-6"
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Offline LLM inference running locally via Ollama</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] font-display"
            >
              Justice Made Simple <br />
              <span className="bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
                with Local AI
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-base sm:text-lg text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl"
            >
              Understand your legal rights, generate complaints, explain legal documents, and receive multilingual legal guidance powered entirely by Gemma running locally.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-4 w-full sm:w-auto"
            >
              <Link to="/dashboard" className="w-full sm:w-auto">
                <Button variant="primary" size="lg" className="w-full gap-2">
                  Start Chat <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/dashboard?tab=explainer" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full gap-2">
                  Upload Document <FileText className="w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Animated Illustration Graphic */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative w-full max-w-[380px]"
            >
              <div className="absolute inset-0 rounded-full bg-blue-500/10 dark:bg-blue-500/5 blur-3xl -z-10" />
              <Card className="glass-card flex flex-col items-center justify-center p-8 border border-slate-200/50 dark:border-slate-800/80 shadow-2xl relative">
                {/* Simulated scales rotation */}
                <motion.div
                  animate={{ rotate: [-4, 4, -4] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="w-40 h-40 flex items-center justify-center text-blue-650 dark:text-blue-400"
                >
                  <Scale className="w-28 h-28" strokeWidth={1.5} />
                </motion.div>

                <div className="mt-6 text-center w-full">
                  <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-500 bg-emerald-500/10 py-1.5 px-3 rounded-full border border-emerald-500/20 max-w-fit mx-auto">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                    <span>LOCAL INFERENCE: ACTIVE</span>
                  </div>
                  <h3 className="font-bold text-slate-850 dark:text-slate-100 mt-4 text-sm font-display uppercase tracking-wider">Ollama Gemma Platform</h3>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Target Model: gemma3:4b (4.5GB)</p>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section id="features" className="py-24 bg-slate-100/40 dark:bg-slate-900/10 border-y border-slate-200/30 dark:border-slate-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-extrabold tracking-tight font-display sm:text-4xl">
              Complete Sovereign Legal Suite
            </h2>
            <p className="mt-4 text-slate-500 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
              NyayaAI provides critical legal tools running locally to ensure complete privacy, high response speeds, and zero compliance exposure.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Card className="glass-card glass-card-hover flex flex-col items-start text-left p-6 h-full border border-slate-250/50 dark:border-slate-800/60 shadow-md">
                  <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-850 mb-5">
                    {feat.icon}
                  </div>
                  <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 font-display">{feat.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">{feat.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight font-display sm:text-4xl">
            Trusted by Citizens & Small Businesses
          </h2>
          <p className="mt-4 text-slate-500 dark:text-slate-400 text-sm max-w-2xl mx-auto">
            See how individuals are using private AI assistance to resolve everyday legal issues, audit contracts, and stand up for their rights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <Card key={i} className="glass-card flex flex-col justify-between p-6 border border-slate-200/50 dark:border-slate-800/80 shadow-md">
              <div>
                <p className="text-slate-650 dark:text-slate-305 text-sm italic leading-relaxed">
                  "{t.quote}"
                </p>
              </div>
              <div className="flex items-center gap-3 mt-6 border-t border-slate-100 dark:border-slate-800/50 pt-4">
                <div className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 font-bold text-xs">
                  {t.name[0]}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">{t.name}</h4>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500">{t.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Accordion FAQ Section */}
      <section id="faq" className="py-24 bg-slate-100/40 dark:bg-slate-900/10 border-y border-slate-200/30 dark:border-slate-800/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight font-display sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-slate-500 dark:text-slate-400 text-sm">
              Answers regarding safety, local hosting, and technical specifications.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div key={index} className="glass-card rounded-2xl border border-slate-200/50 dark:border-slate-800/85 overflow-hidden">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="flex justify-between items-center w-full px-6 py-4 text-left font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100/30 dark:hover:bg-slate-900/40 transition-colors cursor-pointer text-sm sm:text-base"
                  >
                    <span>{faq.q}</span>
                    <HelpCircle className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-blue-500' : ''}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5 pt-1 text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed border-t border-slate-100/60 dark:border-slate-850/50">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200/40 dark:border-slate-850 py-16 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2 flex flex-col items-start">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-900 flex items-center justify-center border border-blue-800">
                <Scale className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100 font-display">
                Nyaya<span className="text-blue-600 dark:text-blue-400">AI</span>
              </span>
            </div>
            <p className="mt-4 text-xs text-slate-400 dark:text-slate-500 leading-relaxed max-w-sm">
              Sovereign, offline, and private legal intelligence. Designed to empower citizens, tenants, workers, and businesses with transparent access to their legal systems.
            </p>
            <div className="mt-4 text-[10px] font-semibold text-slate-500 flex items-center gap-1.5">
              <span>🟢 Powered by Local Gemma AI (gemma3:4b)</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-350">Platform</h4>
            <ul className="mt-4 space-y-2 text-xs text-slate-400 dark:text-slate-500">
              <li><Link to="/dashboard" className="hover:text-blue-600 dark:hover:text-blue-400">Dashboard</Link></li>
              <li><Link to="/dashboard?tab=chat" className="hover:text-blue-600 dark:hover:text-blue-400">AI Chat Assistant</Link></li>
              <li><Link to="/dashboard?tab=complaint" className="hover:text-blue-600 dark:hover:text-blue-400">Complaint Wizard</Link></li>
              <li><Link to="/dashboard?tab=explainer" className="hover:text-blue-600 dark:hover:text-blue-400">Document Explainer</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-350">Legal</h4>
            <ul className="mt-4 space-y-2 text-xs text-slate-400 dark:text-slate-500">
              <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Terms of Service</a></li>
              <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Legal Disclaimer</a></li>
              <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1">Contact <ArrowUpRight className="w-3 h-3" /></a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-200/40 dark:border-slate-900 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 dark:text-slate-500">
          <p>© 2026 NyayaAI Project. Built with Gemma running locally.</p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <a href="#" className="hover:text-slate-700 dark:hover:text-slate-300">GitHub</a>
            <a href="#" className="hover:text-slate-700 dark:hover:text-slate-300">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
