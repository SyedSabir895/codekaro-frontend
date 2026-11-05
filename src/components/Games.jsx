import React, { useState } from "react";
import { Gamepad2, Loader2, CheckCircle2, XCircle, RotateCcw, Trophy } from "lucide-react";

// Flask quiz service (backend/app.py); Express uses port 5000
const QUIZ_API_URL = import.meta.env.VITE_QUIZ_API_URL || "http://localhost:5001/generate-quiz";

const LETTERS = ["A", "B", "C", "D"];

const Games = () => {
  const [language, setLanguage] = useState("");
  const [level, setLevel] = useState("easy");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({}); // question index -> chosen option index
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const generateQuiz = async () => {
    if (!language) {
      alert("Please enter a programming language.");
      return;
    }

    setLoading(true);
    setError("");
    setQuestions([]);
    setAnswers({});
    setSubmitted(false);

    try {
      const response = await fetch(QUIZ_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language, level }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || `Request failed with status ${response.status}`);
      }
      if (!data.questions?.length) {
        throw new Error("No questions generated.");
      }
      setQuestions(data.questions);
    } catch (error) {
      console.error("Error generating quiz:", error);
      setError(`Failed to generate questions: ${error.message}`);
    }

    setLoading(false);
  };

  const chooseOption = (questionIndex, optionIndex) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [questionIndex]: optionIndex }));
  };

  const answeredCount = Object.keys(answers).length;
  const score = questions.filter((q, i) => answers[i] === q.answerIndex).length;

  const submitQuiz = () => {
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const retryQuiz = () => {
    setAnswers({});
    setSubmitted(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Option styling: plain while answering, green/red once the quiz is submitted
  const optionClass = (q, questionIndex, optionIndex) => {
    const chosen = answers[questionIndex] === optionIndex;
    if (submitted) {
      if (optionIndex === q.answerIndex) return "border-emerald-400/60 bg-emerald-500/15 text-white";
      if (chosen) return "border-rose-400/60 bg-rose-500/15 text-white";
      return "border-white/5 text-slate-500";
    }
    return chosen
      ? "border-brand-400/70 bg-brand-500/20 text-white"
      : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/20 hover:bg-white/[0.06] cursor-pointer";
  };

  return (
    <section className="page max-w-3xl">
      <span className="eyebrow">
        <Gamepad2 size={14} /> Games
      </span>
      <h1 className="heading mt-4">AI Quiz Game</h1>
      <p className="mt-2 muted">Generate a quick quiz for any language and test yourself.</p>

      <div className="card mt-8 space-y-6 p-6">
        <label className="block">
          <span className="text-sm font-semibold text-slate-300">Programming Language</span>
          <input
            type="text"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            placeholder="e.g. Python"
            className="input mt-2"
          />
        </label>

        <div>
          <span className="text-sm font-semibold text-slate-300">Difficulty</span>
          <div className="mt-2 grid grid-cols-3 rounded-xl border border-white/10 bg-ink-900/70 p-1">
            {["easy", "medium", "hard"].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setLevel(lvl)}
                className={`rounded-lg py-2 text-sm font-medium capitalize transition cursor-pointer ${
                  level === lvl ? "bg-brand-500 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        <button onClick={generateQuiz} disabled={loading} className="btn-primary w-full py-3">
          {loading && <Loader2 size={18} className="animate-spin" />}
          {loading ? "Generating..." : questions.length ? "New Quiz" : "Generate Quiz"}
        </button>
      </div>

      {error && (
        <p className="mt-6 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">{error}</p>
      )}

      {/* Score summary */}
      {submitted && (
        <div className="card mt-8 flex flex-col items-center gap-3 p-6 text-center">
          <Trophy size={32} className="text-amber-300" />
          <p className="text-sm uppercase tracking-wider text-slate-400">Your score</p>
          <p className="text-4xl font-extrabold text-white">
            {score} <span className="text-slate-500">/ {questions.length}</span>
          </p>
          <p className="muted">
            {score === questions.length
              ? "Perfect! You nailed every question."
              : score >= questions.length / 2
              ? "Nice work! Review the answers below."
              : "Keep practicing. Check the answers below."}
          </p>
          <button onClick={retryQuiz} className="btn-ghost mt-2">
            <RotateCcw size={16} /> Try again
          </button>
        </div>
      )}

      {questions.length > 0 && (
        <div className="mt-8 space-y-5">
          {questions.map((q, qi) => {
            const isCorrect = answers[qi] === q.answerIndex;
            return (
              <div key={qi} className="card p-5">
                <div className="flex items-start justify-between gap-3">
                  <p className="font-semibold leading-relaxed text-white">
                    <span className="mr-2 text-brand-300">Q{qi + 1}.</span>
                    {q.question}
                  </p>
                  {submitted &&
                    (isCorrect ? (
                      <CheckCircle2 size={22} className="shrink-0 text-emerald-400" />
                    ) : (
                      <XCircle size={22} className="shrink-0 text-rose-400" />
                    ))}
                </div>

                <div className="mt-4 grid gap-2">
                  {q.options.map((option, oi) => (
                    <button
                      key={oi}
                      onClick={() => chooseOption(qi, oi)}
                      disabled={submitted}
                      className={`flex items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm transition ${optionClass(q, qi, oi)}`}
                    >
                      <span className="font-mono font-semibold">{LETTERS[oi]}.</span>
                      <span>{option}</span>
                    </button>
                  ))}
                </div>

                {submitted && (
                  <p className="mt-4 rounded-lg bg-white/[0.04] px-4 py-3 text-sm text-slate-300">
                    <span className="font-semibold text-emerald-300">
                      Answer: {LETTERS[q.answerIndex]}.
                    </span>{" "}
                    {q.explanation}
                  </p>
                )}
              </div>
            );
          })}

          {!submitted && (
            <div className="flex flex-col items-center gap-2">
              <button
                onClick={submitQuiz}
                disabled={answeredCount < questions.length}
                className="btn-primary w-full py-3"
              >
                Submit Quiz
              </button>
              <p className="text-sm muted">
                {answeredCount} of {questions.length} answered
              </p>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default Games;
