import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Scale, Lock, Mail, ArrowRight, UserCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/Button';
import Card from '../components/Card';
import { Input } from '../components/Form';
import { useAppContext } from '../context/AppContext';

const PRESET_USERS = [
  { email: 'demo@nyaya.gov.in', password: 'password123', name: 'Advocate Ramesh' },
  { email: 'judge@nyaya.gov.in', password: 'password123', name: 'Justice Verma' }
];

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [customGoogleName, setCustomGoogleName] = useState('');
  const [customGoogleEmail, setCustomGoogleEmail] = useState('');
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const [otpError, setOtpError] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [pendingUser, setPendingUser] = useState(null);
  const [rememberMe, setRememberMe] = useState(false);
  const [googleRememberMe, setGoogleRememberMe] = useState(true);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { loginUser } = useAppContext();

  const validateGmail = (email) => {
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return gmailRegex.test(email);
  };

  const handleGoogleLogin = (name, email) => {
    setShowGoogleModal(false);
    loginUser({ email: email.toLowerCase(), name });
    navigate('/dashboard');
  };

  const startGoogleVerification = (name, email) => {
    if (!validateGmail(email)) {
      alert("Only legitimate @gmail.com addresses are supported for verification.");
      return;
    }
    
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    setPendingUser({
      type: 'google',
      email: email.toLowerCase(),
      name
    });
    setOtpInput('');
    setOtpError('');
    setShowGoogleModal(false);
    setShowOtpModal(true);
  };

  const handleVerifyOtp = () => {
    if (otpInput !== generatedOtp) {
      setOtpError("Incorrect verification code. Please check the code and try again.");
      return;
    }
    
    const users = JSON.parse(localStorage.getItem('nyaya-registered-users') || '[]');
    
    if (pendingUser.type === 'traditional') {
      const newUser = {
        email: pendingUser.email,
        password: pendingUser.password,
        name: pendingUser.name
      };
      const updatedUsers = [...users, newUser];
      localStorage.setItem('nyaya-registered-users', JSON.stringify(updatedUsers));
      
      // Automatically log them in on successful verification
      loginUser({ email: pendingUser.email, name: pendingUser.name });
      
      // Handle traditional remember-me option
      if (rememberMe) {
        localStorage.setItem('nyaya-remembered-email', pendingUser.email);
      } else {
        localStorage.removeItem('nyaya-remembered-email');
      }
      
      setSuccessMsg("Email verified! Logging you in...");
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } else if (pendingUser.type === 'google') {
      loginUser({ email: pendingUser.email, name: pendingUser.name });
      
      // Save to Google SSO remember-me option
      if (googleRememberMe) {
        localStorage.setItem('nyaya-remembered-google', JSON.stringify({ name: pendingUser.name, email: pendingUser.email }));
      } else {
        localStorage.removeItem('nyaya-remembered-google');
      }
      
      navigate('/dashboard');
    }
    
    setShowOtpModal(false);
    setPendingUser(null);
  };

  const getGoogleSuggestions = () => {
    const remembered = localStorage.getItem('nyaya-remembered-google');
    if (remembered) {
      return [JSON.parse(remembered)];
    }
    return []; // No suggestions unless checked in Remember Me!
  };

  useEffect(() => {
    if (!localStorage.getItem('nyaya-registered-users')) {
      localStorage.setItem('nyaya-registered-users', JSON.stringify(PRESET_USERS));
    }
    
    // Pre-populate remembered email if present
    const rememberedEmail = localStorage.getItem('nyaya-remembered-email');
    if (rememberedEmail) {
      reset({ email: rememberedEmail });
      setRememberMe(true);
    }
  }, [reset]);

  const onSubmit = (data) => {
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);
    
    // Simulate auth verification delay
    setTimeout(() => {
      setLoading(false);
      const users = JSON.parse(localStorage.getItem('nyaya-registered-users') || JSON.stringify(PRESET_USERS));
      
      if (isSignUp) {
        // Enforce legitimate @gmail.com check
        if (!validateGmail(data.email)) {
          setErrorMsg("Only legitimate @gmail.com addresses are supported for verification.");
          return;
        }
        if (data.password !== data.confirmPassword) {
          setErrorMsg("Passwords do not match");
          return;
        }
        if (users.find(u => u.email.toLowerCase() === data.email.toLowerCase())) {
          setErrorMsg("Email is already registered");
          return;
        }
        
        // Trigger OTP verification instead of registering immediately
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        setGeneratedOtp(code);
        setPendingUser({
          type: 'traditional',
          email: data.email.toLowerCase(),
          password: data.password,
          name: data.name || 'Citizen Advocate'
        });
        setOtpInput('');
        setOtpError('');
        setShowOtpModal(true);
      } else {
        // Logging in traditionally
        const matchedUser = users.find(u => u.email.toLowerCase() === data.email.toLowerCase() && u.password === data.password);
        if (!matchedUser) {
          setErrorMsg("Invalid email or password");
          return;
        }
        loginUser({ email: matchedUser.email, name: matchedUser.name });
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
          <img src="/logo.jpg" alt="NyayaAI logo" className="w-10 h-10 rounded-xl object-cover border border-blue-800 shadow-md" />
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
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500/25 bg-slate-50 dark:bg-slate-900 cursor-pointer"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-xs text-slate-500 dark:text-slate-400 select-none cursor-pointer">
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
                  onClick={() => setShowGoogleModal(true)}
                  className="w-full inline-flex justify-center items-center gap-2 py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800/80 cursor-pointer transition-colors"
                >
                  <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
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

      <AnimatePresence>
        {showGoogleModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowGoogleModal(false)}
              className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs"
            />
            
            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 w-full max-w-sm relative z-10 text-left space-y-4"
            >
              <div className="flex flex-col items-center text-center pb-2 border-b border-slate-100 dark:border-slate-800">
                <svg className="w-6 h-6 mb-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 font-display">Sign in with Google</h3>
                <p className="text-[10px] text-slate-405 dark:text-slate-500 mt-0.5">to continue to NyayaAI</p>
              </div>

              {/* Accounts list */}
              <div className="space-y-2">
                {getGoogleSuggestions().map((sug, idx) => {
                  const initial = sug.name[0].toUpperCase();
                  const bgColors = [
                    'bg-blue-100 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400',
                    'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400',
                    'bg-purple-100 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400'
                  ];
                  const colorClass = bgColors[idx % bgColors.length];
                  return (
                    <button
                      key={idx}
                      onClick={() => handleGoogleLogin(sug.name, sug.email)}
                      className="w-full flex items-center gap-3 p-3 rounded-xl border border-slate-100 dark:border-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer text-left"
                    >
                      <div className={`w-8 h-8 rounded-full ${colorClass} font-bold text-xs flex items-center justify-center`}>
                        {initial}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{sug.name}</p>
                        <p className="text-[10px] text-slate-400 dark:text-slate-500">{sug.email}</p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Custom Input */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Use Another Account</p>
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Your Name (e.g. Adv. Amit)"
                    value={customGoogleName}
                    onChange={(e) => setCustomGoogleName(e.target.value)}
                    className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-blue-500/25 text-slate-800 dark:text-slate-100 placeholder:text-slate-400"
                  />
                  <input
                    type="email"
                    placeholder="email@gmail.com"
                    value={customGoogleEmail}
                    onChange={(e) => setCustomGoogleEmail(e.target.value)}
                    className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-blue-500/25 text-slate-800 dark:text-slate-100 placeholder:text-slate-400"
                  />
                  <div className="flex items-center py-1">
                    <input
                      id="google-remember-me"
                      type="checkbox"
                      checked={googleRememberMe}
                      onChange={(e) => setGoogleRememberMe(e.target.checked)}
                      className="h-3.5 w-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500/25 bg-slate-50 dark:bg-slate-900 cursor-pointer"
                    />
                    <label htmlFor="google-remember-me" className="ml-2 block text-[10px] text-slate-500 dark:text-slate-400 select-none cursor-pointer">
                      Remember me on this device
                    </label>
                  </div>
                  <Button
                    onClick={() => {
                      if (customGoogleName.trim() && customGoogleEmail.trim()) {
                        startGoogleVerification(customGoogleName, customGoogleEmail);
                      }
                    }}
                    disabled={!customGoogleName.trim() || !customGoogleEmail.trim()}
                    variant="primary"
                    size="sm"
                    className="w-full justify-center"
                  >
                    Continue
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showOtpModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowOtpModal(false)}
              className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs"
            />
            
            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 w-full max-w-sm relative z-10 text-left space-y-4"
            >
              <div className="flex flex-col items-center text-center pb-2 border-b border-slate-100 dark:border-slate-800">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 dark:bg-blue-500/10 flex items-center justify-center mb-2 text-xl">
                  ✉️
                </div>
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 font-display">Verify your email address</h3>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
                  We sent a 6-digit verification code to <span className="font-semibold text-slate-700 dark:text-slate-300">{pendingUser?.email}</span>.
                </p>
              </div>

              {otpError && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-xl text-[10px] font-semibold text-left">
                  ⚠️ {otpError}
                </div>
              )}

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Verification Code</label>
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="Enter 6-digit code"
                    value={otpInput}
                    onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, ''))}
                    className="w-full text-center tracking-widest text-lg font-bold py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-800 dark:text-slate-100"
                  />
                </div>

                <div className="p-3 bg-blue-500/5 border border-blue-500/10 rounded-xl text-[10px] text-blue-600 dark:text-blue-400 space-y-1">
                  <p className="font-bold">🔧 Local Sandbox Verification Service</p>
                  <p>In a live deployment, this code is sent to your inbox. For offline testing, your verification code is: <span className="font-bold text-xs underline">{generatedOtp}</span></p>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => setShowOtpModal(false)}
                    variant="outline"
                    className="w-1/2 justify-center"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleVerifyOtp}
                    variant="primary"
                    className="w-1/2 justify-center"
                    disabled={otpInput.length !== 6}
                  >
                    Verify & Login
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
