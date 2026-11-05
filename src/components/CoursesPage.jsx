import React, { useState } from "react";
import { PlayCircle, Download, Film } from "lucide-react";

// Example courses with links for each skill level
const courses = {
  beginner: [
    {
      title: "Python for Beginners",
      watchLink: "https://youtu.be/ix9cRaBkVe0?si=3_VKDERvatujjcqK",
      downloadLink: "https://savefrom.app/2"
    },
    {
      title: "HTML/CSS for Beginners",
      watchLink: "https://youtu.be/G3e-cpL7ofc?si=qygtzBuiyiJ9gOlV",
      downloadLink: "https://savefrom.app/2"
    },
    {
      title: "Java for Beginners",
      watchLink: "https://youtu.be/eIrMbAQSU34?si=0zxQsrDoe-4QmF-M",
      downloadLink: "https://savefrom.app/2"
    }
  ],
  intermediate: [
    {
      title: "TypeScript Intermediate Learners",
      watchLink: "https://youtu.be/gieEQFIfgYc?si=JQyxBi34Y62j5t9M",
      downloadLink: "https://savefrom.app/2"
    },
    {
      title: "C++ for Intermediate Learners",
      watchLink: "https://youtu.be/-TkoO8Z07hI?si=6b3cgNnBbSWCrQs8",
      downloadLink: "https://savefrom.app/2"
    },
    {
      title: "Swift for Intermediate Learners",
      watchLink: "https://youtu.be/CwA1VWP0Ldw?si=g0WQJMCp2IwphW_t",
      downloadLink: "https://savefrom.app/2"
    }
  ],
  expert: [
    {
      title: "Rust for Experts",
      watchLink: "https://youtu.be/BpPEoZW5IiY?si=tVrbQ9CnQb3L7l4M",
      downloadLink: "https://savefrom.app/2"
    },
    {
      title: "F# for Experts",
      watchLink: "https://www.youtube.com/watch?v=c7eNDJN758U",
      downloadLink: "https://savefrom.app/2"
    },
    {
      title: "Kotlin for Experts",
      watchLink: "https://www.youtube.com/watch?v=EExSSotojVI",
      downloadLink: "https://savefrom.app/2"
    }
  ]
};

const sections = [
  { key: "beginner", title: "Beginner", tone: "text-emerald-300" },
  { key: "intermediate", title: "Intermediate", tone: "text-brand-300" },
  { key: "expert", title: "Expert", tone: "text-rose-300" }
];

function CoursesPage() {
  const [showVideo, setShowVideo] = useState(false);
  const [startTime, setStartTime] = useState(null);

  const toggleVideo = () => {
    setShowVideo(!showVideo);
  };

  const handleCourseClick = (course) => {
    // Update completed projects and skills mastered in local storage
    const completedProjects = parseInt(localStorage.getItem("completedProjects") || "0", 10) + 1;
    const skillsMastered = parseInt(localStorage.getItem("skillsMastered") || "0", 10) + 1;

    localStorage.setItem("completedProjects", completedProjects);
    localStorage.setItem("skillsMastered", skillsMastered);

    // Start timer if not already started
    if (!startTime) {
      setStartTime(Date.now());
    }
  };

  const handleVideoEnd = () => {
    if (startTime) {
      const endTime = Date.now();
      const timeSpent = (endTime - startTime) / 1000 / 60 / 60; // Convert milliseconds to hours

      // Update hours spent in local storage
      const hoursSpent = parseFloat(localStorage.getItem("hoursSpent") || "0") + timeSpent;
      localStorage.setItem("hoursSpent", hoursSpent.toFixed(2));

      // Reset start time
      setStartTime(null);
    }
  };

  return (
    <section className="page">
      <span className="eyebrow">Courses</span>
      <h1 className="heading mt-4">Curated video courses</h1>
      <p className="mt-2 muted">Hand-picked free courses for every stage of your journey.</p>

      <div className="mt-12 space-y-14">
        {sections.map((section) => (
          <div key={section.key}>
            <div className="mb-5 flex items-baseline justify-between border-b border-white/10 pb-3">
              <h2 className="text-xl font-bold text-white">
                <span className={section.tone}>{section.title}</span> courses
              </h2>
              <span className="text-sm muted">{courses[section.key].length} courses</span>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {courses[section.key].map((course) => (
                <div key={course.title} className="card card-hover flex flex-col p-5">
                  <div className="flex h-28 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500/20 via-ink-800 to-accent-400/10">
                    <PlayCircle size={36} className="text-white/70" />
                  </div>
                  <h3 className="mt-4 font-semibold text-white">{course.title}</h3>
                  <div className="mt-auto flex flex-col gap-2 pt-5">
                    <a
                      href={course.watchLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary w-full"
                      onClick={() => handleCourseClick(course)}
                    >
                      <PlayCircle size={16} /> Watch Video
                    </a>
                    <a
                      href={course.downloadLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ghost w-full"
                      title="Paste the watch video link on the download page"
                    >
                      <Download size={16} /> Download
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Button to Toggle Video */}
      <div className="mt-14 card flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold text-white">How to download a course</p>
          <p className="text-sm muted">Watch a quick walkthrough of the download steps.</p>
        </div>
        <button onClick={toggleVideo} className="btn-ghost">
          <Film size={16} /> {showVideo ? "Hide Video" : "Show Video"}
        </button>
      </div>

      {/* Video Section */}
      {showVideo && (
        <div className="mt-6">
          <video
            controls
            src="src/assets/Screen Recording 2025-01-30 183011.mp4"
            type="video/mp4"
            className="w-full rounded-2xl border border-white/10 shadow-2xl"
            onEnded={handleVideoEnd}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </section>
  );
}

export default CoursesPage;
