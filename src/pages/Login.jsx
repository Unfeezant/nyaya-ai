import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Scale, Lock, Mail, ArrowRight, UserCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/Button';
import Card from '../components/Card';
import { Input } from '../components/Form';

const PRESET_USERS = [
  { email: 'demo@nyaya.gov.in', password: 'password123', name: 'Advocate Ramesh' },
  { email: 'judge@nyaya.gov.in', password: 'password123', name: 'Justice Verma' }
];

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  useEffect(() => {
    if (!localStorage.getItem('nyaya-registered-users')) {
      localStorage.setItem('nyaya-registered-users', JSON.stringify(PRESET_USERS));
    }
  }, []);

  const onSubmit = (data) => {
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);
    
    // Simulate auth verification delay
    setTimeout(() => {
      setLoading(false);
      const users = JSON.parse(localStorage.getItem('nyaya-registered-users') || JSON.stringify(PRESET_USERS));
      
      if (isSignUp) {
        // Registering
        if (data.password !== data.confirmPassword) {
          setErrorMsg("Passwords do not match");
          return;
        }
        if (users.find(u => u.email.toLowerCase() === data.email.toLowerCase())) {
          setErrorMsg("Email is already registered");
          return;
        }
        const newUser = {
          email: data.email.toLowerCase(),
          password: data.password,
          name: data.name || 'Citizen Advocate'
        };
        const updatedUsers = [...users, newUser];
        localStorage.setItem('nyaya-registered-users', JSON.stringify(updatedUsers));
        setSuccessMsg("Account registered successfully! You can now log in.");
        setIsSignUp(false);
        reset();
      } else {
        // Logging in
        const matchedUser = users.find(u => u.email.toLowerCase() === data.email.toLowerCase() && u.password === data.password);
        if (!matchedUser) {
          setErrorMsg("Invalid email or password");
          return;
        }
        localStorage.setItem('nyaya-user', JSON.stringify({ email: matchedUser.email, name: matchedUser.name }));
        navigate('/dashboard');
      }
    }, 1200);
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
          {isSignUp ? 'Create your platform account' : 'Sign in to your platform'}
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
          <Card className="glass-card shadow-2xl p-8 border border-slate-200/50 dark:border-slate-800/80 space-y-6">
            
            {/* Status alerts */}
            {errorMsg && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-xl text-xs font-semibold text-left">
                ⚠️ {errorMsg}
              </div>
            )}
            {successMsg && (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-xl text-xs font-semibold text-left">
                ✅ {successMsg}
              </div>
            )}

            {/* Helper tips for presets */}
            {!isSignUp && (
              <div className="p-3 bg-blue-500/5 dark:bg-blue-500/10 border border-blue-500/10 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 rounded-xl text-[10px] text-left leading-relaxed">
                💡 <strong>Demo Preset Account</strong>:<br />
                • Email: <code className="bg-slate-100 dark:bg-slate-900 px-1 py-0.5 rounded select-all">demo@nyaya.gov.in</code><br />
                • Password: <code className="bg-slate-100 dark:bg-slate-900 px-1 py-0.5 rounded select-all">password123</code>
              </div>
            )}

            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
              
              {isSignUp && (
                <Input
                  label="Full Name"
                  id="name"
                  type="text"
                  placeholder="Advocate Ramesh"
                  error={errors.name?.message}
                  {...register("name", { required: isSignUp ? "Name is required" : false })}
                />
              )}

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

              {isSignUp && (
                <Input
                  label="Confirm Password"
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  error={errors.confirmPassword?.message}
                  {...register("confirmPassword", { required: isSignUp ? "Please confirm your password" : false })}
                />
              )}

              {!isSignUp && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500/25 bg-slate-50 dark:bg-slate-900 cursor-pointer"
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
              )}

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
                      Processing...
                    </span>
                  ) : (
                    <>
                      {isSignUp ? 'Register Account' : 'Sign In'} <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            </form>

            <div className="text-center text-xs">
              {isSignUp ? (
                <p className="text-slate-500 dark:text-slate-450">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => { setIsSignUp(false); setErrorMsg(''); setSuccessMsg(''); reset(); }}
                    className="font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer bg-transparent border-0"
                  >
                    Sign In here
                  </button>
                </p>
              ) : (
                <p className="text-slate-500 dark:text-slate-450">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => { setIsSignUp(true); setErrorMsg(''); setSuccessMsg(''); reset(); }}
                    className="font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer bg-transparent border-0"
                  >
                    Register here
                  </button>
                </p>
              )}
            </div>

            <div className="mt-6 pt-3 border-t border-slate-100 dark:border-slate-800">
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

              <div className="mt-4">
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
            
            <div className="text-center text-xs text-slate-400 dark:text-slate-500 flex items-center justify-center gap-1">
              <span>🟢 Powered by Local Gemma AI</span>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
