import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sprout, Rocket, Flame, ArrowRight, Sparkles } from 'lucide-react';

const levels = [
  {
    path: '/beginner',
    title: 'Beginner',
    description: 'Start from zero with friendly languages and guided basics.',
    langs: ['Python', 'JavaScript', 'HTML'],
    icon: Sprout,
    tone: 'from-emerald-400/20 to-emerald-400/0 text-emerald-300',
  },
  {
    path: '/intermediate',
    title: 'Intermediate',
    description: 'Level up with typed languages and real-world projects.',
    langs: ['Java', 'C++', 'Swift'],
    icon: Rocket,
    tone: 'from-brand-400/25 to-brand-400/0 text-brand-300',
  },
  {
    path: '/expert',
    title: 'Expert',
    description: 'Master systems, performance and modern tooling.',
    langs: ['Rust', 'Go', 'Kotlin'],
    icon: Flame,
    tone: 'from-rose-400/20 to-rose-400/0 text-rose-300',
  },
];

function SkillLevelSelector() {
  const navigate = useNavigate();

  return (
    <section className="page flex flex-col items-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl"
      >
        <span className="eyebrow">
          <Sparkles size={14} /> Learn to code, your way
        </span>
        <h1 className="mt-6 text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
          Pick your level. <span className="gradient-text">Start building.</span>
        </h1>
        <p className="mt-5 text-lg muted">
          Personalized language picks, curated video courses, an in-browser compiler and AI quizzes — all in one place.
        </p>
      </motion.div>

      <div className="mt-10 grid w-full gap-5 md:grid-cols-3">
        {levels.map((level, index) => {
          const Icon = level.icon;
          return (
            <motion.button
              key={level.path}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 + index * 0.1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(level.path)}
              className="card card-hover group relative overflow-hidden p-6 text-left cursor-pointer"
            >
              <div className={`absolute inset-x-0 top-0 h-32 bg-gradient-to-b ${level.tone} opacity-60`} />
              <div className="relative">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-ink-900/80 ${level.tone}`}>
                  <Icon size={22} />
                </div>
                <h2 className="mt-6 text-xl font-bold text-white">{level.title}</h2>
                <p className="mt-2 text-sm muted">{level.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {level.langs.map((lang) => (
                    <span key={lang} className="chip">{lang}</span>
                  ))}
                </div>
                <div className="mt-6 flex items-center gap-1 text-sm font-semibold text-brand-300">
                  Get started
                  <ArrowRight size={16} className="transition group-hover:translate-x-1" />
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}

export default SkillLevelSelector;
