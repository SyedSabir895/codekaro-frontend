import React, { useState } from "react";

const Compiler = () => {
  const [language, setLanguage] = useState("python");

  const languages = [
    { name: "Python", value: "python" },
    { name: "JavaScript", value: "javascript" },
    { name: "Java", value: "java" },
    { name: "C", value: "c" },
    { name: "C++", value: "cpp" },
    { name: "Ruby", value: "ruby" },
    { name: "Go", value: "go" },
    // Add more languages as needed
  ];

  return (
    <div className="w-full">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="eyebrow">Playground</span>
          <h2 className="heading mt-4">Online Compiler</h2>
        </div>
        <label htmlFor="language" className="flex items-center gap-3 text-sm font-medium text-slate-300">
          Language
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="input w-44 cursor-pointer [color-scheme:dark]"
          >
            {languages.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="card overflow-hidden p-0">
        <iframe
          src={`https://onecompiler.com/embed/${language}?theme=dark`}
          className="block h-[70vh] min-h-[500px] w-full"
          style={{ border: "none" }}
          title="OneCompiler"
        ></iframe>
      </div>
    </div>
  );
};

export default Compiler;
