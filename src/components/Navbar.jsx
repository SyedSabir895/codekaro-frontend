import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, User, LayoutDashboard, LogOut, UserPlus } from "lucide-react"; // Icons for navbar
import { signOut } from "firebase/auth";
import { auth } from "../Firebase";
import { clearSession } from "../api";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/courses", label: "Courses" },
  { to: "/blog", label: "Blog" },
  { to: "/games", label: "Games" },
  { to: "/about", label: "About Us" },
];

const linkClass = ({ isActive }) =>
  `rounded-lg px-3.5 py-2 text-sm font-medium transition ${
    isActive ? "bg-white/10 text-white" : "text-slate-400 hover:text-white hover:bg-white/5"
  }`;

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [progress, setProgress] = useState(40); // Dummy progress (replace with actual progress)
  const [userName, setUserName] = useState(localStorage.getItem("userName") || ""); // Fetch stored user name
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch user data from localStorage when component mounts
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedName = localStorage.getItem("userName");

    if (storedUser) {
      setUserName(storedUser.fullName || storedName || ""); // Use fullName if available
    }
  }, []);

  // Close menus and pick up a fresh login when route changes
  useEffect(() => {
    setIsDropdownOpen(false);
    setIsOpen(false);
    setUserName(localStorage.getItem("userName") || "");
  }, [location.pathname]);

  // Logout Function
  const handleLogout = () => {
    clearSession();
    signOut(auth).catch(() => {}); // also end the Firebase (Google) session
    setUserName("");
    navigate("/"); // Redirect to home
  };

  return (
    <nav className="fixed top-0 z-20 w-full border-b border-white/10 bg-ink-950/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src="/logo.png" alt="CodeKaro" className="h-9 w-auto object-contain brightness-0 invert" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} end className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {/* Account Button */}
          <div className="relative">
            <button
              className="flex h-10 items-center gap-2 rounded-full border border-white/10 bg-white/5 pl-1 pr-3 text-sm font-medium text-slate-200 transition hover:bg-white/10 cursor-pointer"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-accent-400 text-white">
                {userName ? userName.charAt(0).toUpperCase() : <User size={16} />}
              </span>
              <span className="hidden sm:block max-w-28 truncate">{userName || "Account"}</span>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-60 rounded-2xl border border-white/10 bg-ink-900/95 p-2 shadow-2xl shadow-black/40 backdrop-blur-xl">
                {!userName ? (
                  <button
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-slate-200 hover:bg-white/5"
                    onClick={() => navigate("/create-account")}
                  >
                    <UserPlus size={16} className="text-brand-300" />
                    Create Account
                  </button>
                ) : (
                  <>
                    <button
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-slate-200 hover:bg-white/5"
                      onClick={() => navigate("/dashboard")}
                    >
                      <LayoutDashboard size={16} className="text-brand-300" />
                      Dashboard
                    </button>

                    {/* Progress Bar */}
                    <div className="px-3 py-2">
                      <div className="flex justify-between text-xs">
                        <span className="font-medium text-slate-300">Video Progress</span>
                        <span className="text-slate-500">{progress}%</span>
                      </div>
                      <div className="mt-1.5 h-1.5 w-full rounded-full bg-white/10">
                        <div className="h-1.5 rounded-full bg-gradient-to-r from-brand-500 to-accent-400" style={{ width: `${progress}%` }}></div>
                      </div>
                    </div>

                    <div className="my-1 border-t border-white/10"></div>

                    <button
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-rose-300 hover:bg-rose-500/10"
                      onClick={handleLogout}
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden rounded-lg p-2 text-slate-300 hover:bg-white/5"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col gap-1 border-t border-white/10 px-4 py-3">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} end className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
