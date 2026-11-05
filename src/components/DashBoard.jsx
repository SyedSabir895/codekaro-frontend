import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Flame, Clock, FolderCheck, Award } from "lucide-react";

const DashBoard = () => {
  const [level, setLevel] = useState("intermediate");
  const [userName, setUserName] = useState("Guest");
  const [learningStreak, setLearningStreak] = useState(0);
  const [hoursSpent, setHoursSpent] = useState(0);
  const [completedProjects, setCompletedProjects] = useState(0);
  const [skillsMastered, setSkillsMastered] = useState(0);

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
    }

    // Fetch user data from local storage or backend
    const streak = localStorage.getItem("learningStreak") || 0;
    const hours = parseFloat(localStorage.getItem("hoursSpent") || "0");
    const projects = localStorage.getItem("completedProjects") || 0;
    const skills = localStorage.getItem("skillsMastered") || 0;

    setLearningStreak(streak);
    setHoursSpent(hours);
    setCompletedProjects(projects);
    setSkillsMastered(skills);
  }, []);

  const formatTimeSpent = (hours) => {
    const h = Math.floor(hours);
    const m = Math.floor((hours - h) * 60);
    const s = Math.floor(((hours - h) * 60 - m) * 60);
    return `${h}h ${m}m ${s}s`;
  };

  const levelData = {
    beginner: { progress: 90, topics: [{ name: "HTML/CSS", progress: 95 }, { name: "JavaScript Basics", progress: 85 }, { name: "Python Basics", progress: 80 }] },
    intermediate: { progress: 65, topics: [{ name: "React", progress: 70 }, { name: "Node.js", progress: 60 }, { name: "Data Structures", progress: 65 }] },
    advanced: { progress: 30, topics: [{ name: "System Design", progress: 35 }, { name: "Machine Learning", progress: 25 }, { name: "Cloud Architecture", progress: 30 }] },
  };

  const { progress, topics } = levelData[level];

  const stats = [
    { title: "Learning Streak", value: `${learningStreak} days`, icon: Flame, tone: "text-amber-300 bg-amber-400/10" },
    { title: "Time Spent", value: formatTimeSpent(hoursSpent), icon: Clock, tone: "text-accent-400 bg-accent-400/10" },
    { title: "Completed Projects", value: completedProjects, icon: FolderCheck, tone: "text-emerald-300 bg-emerald-400/10" },
    { title: "Skills Mastered", value: skillsMastered, icon: Award, tone: "text-brand-300 bg-brand-400/10" },
  ];

  const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);

  return (
    <section className="page">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-accent-400 text-2xl font-bold text-white">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Welcome back, {userName}!</h1>
            <p className="muted">Continue your learning journey</p>
          </div>
        </div>
        <span className="eyebrow self-start sm:self-auto">Current level: {capitalize(level)}</span>
      </div>

      {/* Stats Section */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              className="card p-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.tone}`}>
                <Icon size={20} />
              </div>
              <h3 className="mt-4 text-sm muted">{stat.title}</h3>
              <div className="mt-1 text-2xl font-bold text-white">{stat.value}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Learning Progress Section */}
      <div className="card mb-6 p-6">
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">Learning Progress</h2>
            <p className="text-sm muted">{progress}% of the {level} track completed</p>
          </div>
          <div className="flex rounded-xl border border-white/10 bg-ink-900/70 p-1">
            {["beginner", "intermediate", "advanced"].map((lvl) => (
              <button
                key={lvl}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition cursor-pointer ${
                  level === lvl ? "bg-brand-500 text-white" : "text-slate-400 hover:text-white"
                }`}
                onClick={() => setLevel(lvl)}
              >
                {capitalize(lvl)}
              </button>
            ))}
          </div>
        </div>

        {/* Animated Main Progress Bar */}
        <div className="mb-6 h-2 rounded-full bg-white/10">
          <motion.div
            className="h-2 rounded-full bg-gradient-to-r from-brand-500 to-accent-400"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </div>

        {/* Animated Topic Progress Bars */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic, index) => (
            <div key={index} className="rounded-xl border border-white/10 bg-ink-900/60 p-4">
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-slate-200">{topic.name}</span>
                <span className="font-mono text-slate-400">{topic.progress}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/10">
                <motion.div
                  className="h-1.5 rounded-full bg-brand-400"
                  initial={{ width: "0%" }}
                  animate={{ width: `${topic.progress}%` }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interests & Recommended Paths Section */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {[
          { title: "Your Interests", tags: ["Web Development", "Mobile Apps", "Machine Learning", "Cloud Computing"] },
          { title: "Recommended Paths", tags: ["Frontend Development", "React Development", "AI & ML"] },
        ].map((group, groupIndex) => (
          <motion.div
            key={group.title}
            className="card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 + groupIndex * 0.2 }}
          >
            <h2 className="mb-4 text-lg font-semibold text-white">{group.title}</h2>
            <div className="flex flex-wrap gap-2">
              {group.tags.map((tag, index) => (
                <span key={index} className="chip px-3.5 py-1.5 text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default DashBoard;
