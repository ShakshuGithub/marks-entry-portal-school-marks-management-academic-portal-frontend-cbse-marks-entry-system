import React, { useState } from 'react';

interface Props {
  onLogin: () => void;
}

const Login: React.FC<Props> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const logoUrl = "https://emrs.tribal.gov.in/img/logo.png";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Case sensitive check as per requirement
    if (username === 'EMRS' && password === 'EMRS@369') {
      onLogin();
    } else {
      setError('Invalid Username or Password. Please try again.');
      // Auto-clear error after 3 seconds
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4 font-sans selection:bg-blue-200">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 transform transition-all">
        {/* Header Section */}
        <div className="bg-blue-900 p-10 text-center relative overflow-hidden">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0 100 L100 0 L100 100 Z" fill="white" />
            </svg>
          </div>
          
          <img 
            src={logoUrl} 
            alt="EMRS Logo" 
            className="h-28 w-28 mx-auto mb-6 object-contain brightness-0 invert relative z-10"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://tribal.nic.in/EMRS/images/logo.png";
            }}
          />
          <h1 className="text-white text-3xl font-black uppercase tracking-tighter relative z-10">
            EMRS KONCHUR
          </h1>
          <p className="text-blue-200 text-xs font-bold uppercase tracking-[0.2em] mt-2 relative z-10">
            Management Portal
          </p>
        </div>
        
        {/* Form Section */}
        <form onSubmit={handleSubmit} className="p-10 space-y-6">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 text-red-700 text-sm font-bold rounded-lg animate-bounce">
              {error}
            </div>
          )}
          
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Username</label>
            <div className="relative">
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all font-bold text-slate-700 placeholder:text-slate-300 placeholder:font-normal"
                placeholder="Enter EMRS ID"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Password</label>
            <div className="relative">
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all font-bold text-slate-700 placeholder:text-slate-300 placeholder:font-normal"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-blue-900 hover:bg-blue-800 active:scale-95 text-white font-black py-5 rounded-2xl shadow-xl shadow-blue-200 transition-all uppercase tracking-widest text-sm"
          >
            Authorize & Sign In
          </button>
        </form>
        
        {/* Footer Section */}
        <div className="px-10 pb-8 text-center">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            Academic Year 2025-26 • Restricted Access
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;