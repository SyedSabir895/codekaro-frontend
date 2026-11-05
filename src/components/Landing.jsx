import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BookOpenCheck,
  Bot,
  Compass,
  Gauge,
  Sparkles,
  SquareTerminal,
  Target,
  Trophy,
  UserPlus,
} from "lucide-react";

const features = [
  {
    icon: Compass,
    title: "A path that fits you",
    text: "Tell us your level and get language picks suited to where you are now.",
  },
  {
    icon: BookOpenCheck,
    title: "Curated video learning",
    text: "Skip the endless searching. Learn from video courses gathered in one place.",
  },
  {
    icon: SquareTerminal,
    title: "Code in your browser",
    text: "Write and run code right away, with nothing to install or configure.",
  },
  {
    icon: Bot,
    title: "AI-powered quiz games",
    text: "Test what you know with fresh questions and explanations for every answer.",
  },
  {
    icon: Gauge,
    title: "Progress you can see",
    text: "Your dashboard tracks time spent, projects finished and skills gained.",
  },
  {
    icon: Sparkles,
    title: "Learning that stays fun",
    text: "Short games and hands-on practice keep you coming back to the keyboard.",
  },
];

const steps = [
  { icon: UserPlus, title: "Create your free account", text: "Sign up with email or Google in seconds." },
  { icon: Target, title: "Choose your level", text: "Beginner, intermediate or expert. Start where it makes sense." },
  { icon: Trophy, title: "Learn, practice, repeat", text: "Watch, write code, play quizzes and see your progress grow." },
];

const audiences = [
  { title: "Complete beginners", text: "Know where to start and which language to learn first." },
  { title: "Students", text: "Reinforce what you study with practice and quick self-checks." },
  { title: "Working developers", text: "Sharpen your skills or pick up a new language on your schedule." },
];

function Landing() {
  const reduceMotion = useReducedMotion();
  const reveal = (delay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.45, delay },
        };

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="page flex flex-col items-center pt-16 text-center sm:pt-24">
        <motion.div {...reveal()} className="max-w-3xl">
          <span className="eyebrow">
            <Sparkles size={14} aria-hidden="true" /> Your coding home base
          </span>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-balance text-white sm:text-6xl">
            Learn to code, <span className="gradient-text">all in one place.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed muted">
            CodeKaro brings personalized language paths, video courses, an in-browser compiler
            and AI quiz games together, so you spend less time searching and more time coding.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/create-account" className="btn-primary px-6 py-3 text-base">
              Get started free <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link
              to="/create-account"
              state={{ mode: "login" }}
              className="btn-ghost px-6 py-3 text-base"
            >
              Log in
            </Link>
          </div>
        </motion.div>
      </section>

      {/* What it offers */}
      <section className="page" aria-labelledby="why-heading">
        <div className="max-w-2xl">
          <h2 id="why-heading" className="heading">Why learners use CodeKaro</h2>
          <p className="mt-3 muted">Learning to code is scattered. CodeKaro gives it one clear home.</p>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, text }, index) => (
            <motion.article key={title} {...reveal(index * 0.05)} className="card p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-ink-900/80 text-brand-300">
                <Icon size={21} aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-lg font-bold text-white">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed muted">{text}</p>
            </motion.article>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="page" aria-labelledby="how-heading">
        <h2 id="how-heading" className="heading">How it works</h2>
        <ol className="mt-8 grid gap-5 md:grid-cols-3">
          {steps.map(({ icon: Icon, title, text }, index) => (
            <li key={title} className="border-t border-white/10 pt-5">
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm font-semibold text-accent-400">0{index + 1}</span>
                <Icon size={20} className="text-brand-300" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-white">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed muted">{text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Audience */}
      <section className="page" aria-labelledby="audience-heading">
        <h2 id="audience-heading" className="heading">Made for every stage</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {audiences.map(({ title, text }) => (
            <div key={title} className="card p-6">
              <h3 className="font-bold text-white">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed muted">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="page pb-20">
        <div className="card px-6 py-12 text-center sm:px-12">
          <h2 className="heading">Ready to write your first line?</h2>
          <p className="mx-auto mt-3 max-w-xl muted">
            Create your free account to unlock courses, games and your personal dashboard.
          </p>
          <Link to="/create-account" className="btn-primary mt-7 px-6 py-3 text-base">
            Create free account <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Landing;
