import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Scale, Lock, Mail, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import Card from '../components/Card';
import { Input } from '../components/Form';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    setLoading(true);
    // Simulate auth verification delay
    setTimeout(() => {
      setLoading(false);
      localStorage.setItem('nyaya-user', JSON.stringify({ email: data.email, name: 'Citizen Advocate' }));
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-300">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-500/5 dark:bg-blue-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-blue-900 flex items-center justify-center border border-blue-800 shadow-md">
            <Scale className="w-5 h-5 text-emerald-400" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 font-display">
            Nyaya<span className="text-blue-600 dark:text-blue-400">AI</span>
          </span>
        </Link>
        <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 font-display">
          Sign in to your platform
        </h2>
        <p className="mt-2 text-center text-xs text-slate-400 dark:text-slate-500">
          Secure, offline-first national legal intelligence
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="glass-card shadow-2xl p-8 border border-slate-200/50 dark:border-slate-800/80">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <Input
                label="Email address"
                id="email"
                type="email"
                placeholder="citizen@nyaya.gov.in"
                error={errors.email?.message}
                {...register("email", { 
                  required: "Email is required", 
                  pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" } 
                })}
              />

              <Input
                label="Password"
                id="password"
                type="password"
                placeholder="••••••••"
                error={errors.password?.message}
                {...register("password", { 
                  required: "Password is required",
                  minLength: { value: 6, message: "Password must be at least 6 characters" }
                })}
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-slate-350 text-blue-600 focus:ring-blue-500/25 bg-slate-50 dark:bg-slate-900 cursor-pointer"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-xs text-slate-500 dark:text-slate-400 select-none">
                    Remember me
                  </label>
                </div>

                <div className="text-xs">
                  <a href="#" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                    Forgot password?
                  </a>
                </div>
              </div>

              <div>
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full justify-center gap-2"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin"></span>
                      Authing...
                    </span>
                  ) : (
                    <>
                      Sign In <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200 dark:border-slate-800" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-white dark:bg-slate-900 px-3 text-slate-400 dark:text-slate-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => {
                    localStorage.setItem('nyaya-user', JSON.stringify({ email: 'sso@gmail.com', name: 'Google Citizen' }));
                    navigate('/dashboard');
                  }}
                  className="w-full inline-flex justify-center items-center gap-2 py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800/80 cursor-pointer transition-colors"
                >
                  <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  <span>Sign in with Google</span>
                </button>
              </div>
            </div>
            
            <div className="mt-6 text-center text-xs text-slate-400 dark:text-slate-655 flex items-center justify-center gap-1">
              <span>🟢 Powered by Local Gemma AI</span>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
