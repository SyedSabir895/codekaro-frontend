import React, { useState } from "react";
import { CheckCircle2, Circle, Code2, Sparkles, Trophy } from "lucide-react";
import Compiler from "./Compiler"; // Import Compiler component
import VideoSuggestions from "./VideoSuggestions";

const recommendations = {
  beginner: ["Python", "JavaScript", "HTML"],
  intermediate: ["Java", "C++", "Swift"],
  expert: ["Rust", "Go", "Kotlin"]
};

const featuresAndBenefits = {
  Python: {
    features: ["Easy to learn and read", "Versatile: web development, data science, AI", "Large supportive community"],
    benefits: ["High demand in job market", "Used by top companies like Google and Instagram", "Great for beginners and professionals"]
  },
  JavaScript: {
    features: ["Runs on all browsers", "Used for front-end and back-end development", "Supports asynchronous programming"],
    benefits: ["Key language for web development", "High-paying job opportunities", "Huge community and resources available"]
  },
  HTML: {
    features: ["Block-based coding", "Visual learning tool", "Great for younger learners"],
    benefits: ["Helps build a foundation for learning other languages", "Enhances problem-solving and logic skills", "Engages creativity"]
  },
  Java: {
    features: ["Object-oriented", "Platform-independent", "Wide range of applications from mobile to enterprise systems"],
    benefits: ["Highly sought after by large companies", "Great for backend development", "Strong community and documentation"]
  },
  Swift: {
    features: ["Fast and efficient", "Great for iOS and macOS development", "Safe and modern syntax"],
    benefits: ["Essential for iOS app development", "High-paying jobs in mobile development", "Highly praised by developers for its simplicity"]
  },
  Rust: {
    features: ["Memory safety without a garbage collector", "Concurrency support", "Strong focus on performance"],
    benefits: ["Used by big tech companies like Mozilla and Dropbox", "One of the fastest-growing languages", "High demand in systems programming"]
  },
  Go: {
    features: ["Simple and concise syntax", "Built-in support for concurrency", "Fast execution speed"],
    benefits: ["Widely used in backend systems", "Great for cloud computing and microservices", "Popular among startups and tech giants"]
  },
  Kotlin: {
    features: ["Fully interoperable with Java", "Concise and expressive syntax", "Null safety"],
    benefits: ["Main language for Android app development", "Growing demand in Android development", "Supported by Google for Android apps"]
  }
};

function LanguageRecommendations({ skillLevel }) {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [showCompiler, setShowCompiler] = useState(false); // State to show compiler

  const handleLanguageSelect = (lang) => {
    setSelectedLanguage(lang);
  };

  const handleStartCoding = () => {
    setShowCompiler(true); // Show compiler when clicked
  };

  const renderLanguageList = () => {
    const languages = recommendations[skillLevel] || [];
    return languages.map((lang) => {
      const isSelected = selectedLanguage === lang;
      return (
        <li key={lang}>
          <button
            className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition cursor-pointer ${
              isSelected
                ? "border-brand-400/60 bg-brand-500/15 text-white"
                : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/20 hover:bg-white/[0.06]"
            }`}
            onClick={() => handleLanguageSelect(lang)}
          >
            {isSelected ? (
              <CheckCircle2 size={20} className="text-brand-300" />
            ) : (
              <Circle size={20} className="text-slate-600" />
            )}
            <span className="font-semibold">{lang}</span>
          </button>
        </li>
      );
    });
  };

  const renderLanguageInfo = (language) => {
    if (!language) return null;
    const { features, benefits } = featuresAndBenefits[language] || {};
    return (
      <div className="card w-full p-6 sm:p-8 text-left">
        <h3 className="text-xl font-bold text-white">
          Why learn <span className="gradient-text">{language}</span>?
        </h3>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div>
            <h4 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-brand-300">
              <Sparkles size={16} /> Features
            </h4>
            <ul className="mt-3 space-y-2">
              {features?.map((feature, index) => (
                <li key={index} className="flex gap-2 text-slate-300">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-accent-400">
              <Trophy size={16} /> Benefits
            </h4>
            <ul className="mt-3 space-y-2">
              {benefits?.map((benefit, index) => (
                <li key={index} className="flex gap-2 text-slate-300">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-400" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="page">
      {showCompiler ? (
        <Compiler />
      ) : (
        <div className="flex flex-col gap-8">
          <div>
            <span className="eyebrow">{skillLevel} track</span>
            <h1 className="heading mt-4">Recommended languages</h1>
            <p className="mt-2 muted">Pick a language to see a curated playlist and why it is worth learning.</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,22rem)_1fr]">
            <div className="flex flex-col gap-6">
              <div className="card p-5">
                <ul className="space-y-3">{renderLanguageList()}</ul>
              </div>

              <button className="btn-primary w-full py-3 text-base" onClick={handleStartCoding}>
                <Code2 size={18} /> Start Coding
              </button>
            </div>

            {selectedLanguage ? (
              <div className="flex flex-col gap-6">
                <VideoSuggestions language={selectedLanguage} />
                {renderLanguageInfo(selectedLanguage)}
              </div>
            ) : (
              <div className="card flex min-h-64 items-center justify-center border-dashed p-8 text-center muted">
                Select a language on the left to explore its features and benefits.
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default LanguageRecommendations;
