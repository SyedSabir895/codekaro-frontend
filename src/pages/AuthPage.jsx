import { useState, useEffect } from "react";
import api, { saveSession } from "../api";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../Firebase";
import { Code2, Infinity as InfinityIcon, Gamepad2, UserRound, Bot } from "lucide-react";

const perks = [
  { icon: Code2, label: "Practice-driven" },
  { icon: InfinityIcon, label: "Unlimited learning" },
  { icon: Gamepad2, label: "Fun AI quiz games" },
  { icon: UserRound, label: "Personalized paths" },
  { icon: Bot, label: "AI enhanced" },
];

const AuthPage = () => {
  const [isRegister, setIsRegister] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userName, setUserName] = useState(
    localStorage.getItem("userName") || ""
  );
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) setUserName(storedName);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const url = `/auth/${isRegister ? "register" : "login"}`;
      const { fullName, email, password } = formData;
      const payload = isRegister
        ? { fullName, email, password }
        : { email, password };

      const response = await api.post(url, payload);

      if (response.data.token) {
        saveSession(response.data);
        setUserName(response.data.user.fullName);
        alert(response.data.message);
        navigate("/");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);

      // Backend verifies the Firebase ID token and returns the app's own JWT
      const idToken = await result.user.getIdToken();
      const response = await api.post("/auth/google", { idToken });

      saveSession(response.data);
      setUserName(response.data.user.fullName);
      navigate("/");
    } catch (err) {
      console.error("Google login error:", err);
      setError(`Google login failed: ${err.response?.data?.message || err.code || err.message}`);
    }
  };

  return (
    <section className="page flex justify-center">
      <div className="card grid w-full max-w-4xl overflow-hidden md:grid-cols-2">
        {/* Form Section */}
        <div className="p-6 sm:p-10">
          <h1 className="text-2xl font-bold text-white">
            {isRegister ? "Create your account" : "Welcome back"}
          </h1>
          <p className="mt-1 text-sm muted">
            {isRegister ? "Start your coding journey in seconds." : "Log in to continue learning."}
          </p>

          <div className="mt-6 grid grid-cols-2 rounded-xl border border-white/10 bg-ink-900/70 p-1">
            {[
              { label: "Register", value: true },
              { label: "Log in", value: false },
            ].map((tab) => (
              <button
                key={tab.label}
                type="button"
                className={`rounded-lg py-2 text-sm font-semibold transition cursor-pointer ${
                  isRegister === tab.value ? "bg-brand-500 text-white shadow" : "text-slate-400 hover:text-white"
                }`}
                onClick={() => setIsRegister(tab.value)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {isRegister && (
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                autoComplete="off"
                onChange={handleChange}
                className="input"
                required
              />
            )}
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              autoComplete="off"
              onChange={handleChange}
              className="input"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              autoComplete="off"
              onChange={handleChange}
              className="input"
              required
            />
            {error && (
              <p className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-300">{error}</p>
            )}
            <button type="submit" className="btn-primary w-full py-3" disabled={loading}>
              {loading
                ? "Processing..."
                : isRegister
                ? "Create Account"
                : "Log in"}
            </button>
          </form>

          <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-wider text-slate-500">
            <div className="h-px flex-1 bg-white/10"></div>
            or
            <div className="h-px flex-1 bg-white/10"></div>
          </div>
          <button onClick={handleGoogleLogin} className="btn-ghost w-full py-3">
            <img src="/google-icon-logo-svgrepo-com.svg" alt="" className="h-5 w-5" />
            Continue with Google
          </button>
          <p className="mt-6 text-center text-xs text-slate-500">
            By continuing, you agree to our{" "}
            <span className="text-brand-300">Terms of Use</span> and{" "}
            <span className="text-brand-300">Privacy Policy</span>
          </p>
        </div>

        {/* Perks Section */}
        <div className="relative hidden flex-col justify-center overflow-hidden bg-gradient-to-br from-brand-600 via-brand-500 to-accent-400/80 p-10 md:flex">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
          <h2 className="relative text-3xl font-extrabold leading-tight text-white">
            Unlock your coding journey
          </h2>
          <ul className="relative mt-8 space-y-4">
            {perks.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3 text-white/90">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15">
                  <Icon size={18} />
                </span>
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AuthPage;
