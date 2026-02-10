import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowRight, Loader2, ShieldCheck } from 'lucide-react';
import Button from '../../components/Button';
import SEO from '../../components/SEO';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [creds, setCreds] = useState({
    email: '',
    password: ''
  });

  // Redirect if already logged in (Simple check)
  useEffect(() => {
    const token = sessionStorage.getItem('howlite_admin_token');
    if (token) navigate('/howlite/admin/dashboard');
  }, [navigate]);

  const handleChange = (e) => {
    setCreds({ ...creds, [e.target.name]: e.target.value });
    setError(''); // Clear error on type
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // USE THE SAME SCRIPT URL AS CHECKOUT (Or a dedicated one if you separated them)
    const AUTH_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

    try {
      const response = await fetch(AUTH_URL, {
        method: "POST",
        // Do NOT add headers here. Let the browser handle it.
        body: JSON.stringify({
          action: 'login',
          email: creds.email,
          password: creds.password
        }),
      });

      const data = await response.json();

      if (data.success) {
        // 1. Securely store session (clears on tab close)
        sessionStorage.setItem('howlite_admin_token', data.token);
        sessionStorage.setItem('howlite_admin_role', data.role);

        // 2. Navigate
        navigate('/howlite/admin/dashboard');
      } else {
        throw new Error(data.message || "Access Denied");
      }

    } catch (err) {
      console.error(err);
      setError("Invalid Credentials or Connection Failed");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-obsidian flex items-center justify-center px-6">
      <SEO title="Restricted Access" />

      <div className="w-full max-w-md animate-fade-up">

        {/* Minimal Header */}
        <div className="text-center mb-12 space-y-4">
          <ShieldCheck size={32} className="text-bronze mx-auto opacity-80" strokeWidth={1} />
          <h1 className="text-2xl font-serif italic text-bone">Atelier Access</h1>
          <p className="text-[10px] uppercase tracking-[0.25em] text-ash">Authorized Personnel Only</p>
        </div>

        {/* Login Card */}
        <div className="bg-surface border border-white/5 p-8 md:p-12 rounded-2xl shadow-2xl relative overflow-hidden">

          {/* Subtle Background Glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-bronze/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

          <form onSubmit={handleLogin} className="space-y-8 relative z-10">

            <div className="space-y-6">
              <div className="relative border-b border-white/10 focus-within:border-bronze transition-colors">
                <input
                  type="email"
                  name="email"
                  value={creds.email}
                  onChange={handleChange}
                  placeholder=" "
                  required
                  className="block w-full bg-transparent py-3 text-bone outline-none peer text-base font-light"
                />
                <label className="absolute left-0 top-3 text-ash text-xs uppercase tracking-widest transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-bronze peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-[10px] pointer-events-none">
                  Identity
                </label>
              </div>

              <div className="relative border-b border-white/10 focus-within:border-bronze transition-colors">
                <input
                  type="password"
                  name="password"
                  value={creds.password}
                  onChange={handleChange}
                  placeholder=" "
                  required
                  className="block w-full bg-transparent py-3 text-bone outline-none peer text-base font-light"
                />
                <label className="absolute left-0 top-3 text-ash text-xs uppercase tracking-widest transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-bronze peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-[10px] pointer-events-none">
                  Passkey
                </label>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-red-400 text-xs text-center tracking-widest uppercase animate-pulse">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              isLoading={loading}
              variant="primary"
              className="w-full"
              icon={ArrowRight}
              iconPosition="right"
            >
              {loading ? "Verifying" : "Enter"}
            </Button>

          </form>
        </div>

        <div className="text-center mt-12">
          <a href="/" className="text-[10px] uppercase tracking-widest text-ash/30 hover:text-ash transition-colors">
            Return to Catalogue
          </a>
        </div>

      </div>
    </div>
  );
};

export default AdminLogin;