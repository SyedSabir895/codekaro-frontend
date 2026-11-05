import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaInstagram, FaTwitter } from "react-icons/fa";
import { GraduationCap, Code2, Users } from "lucide-react";

const socials = [
  { href: "https://github.com/SyedSabir895", icon: FaGithub, label: "GitHub" },
  { href: "https://www.linkedin.com/in/syed-sabir/", icon: FaLinkedin, label: "LinkedIn" },
  { href: "", icon: FaInstagram, label: "Instagram" },
  { href: "https://x.com/chotu_syed_", icon: FaTwitter, label: "X" },
];

const pillars = [
  { icon: GraduationCap, title: "For every level", text: "Paths tailored for beginners, intermediate learners and experts." },
  { icon: Code2, title: "Hands-on", text: "Courses, projects, coding challenges and an in-browser compiler." },
  { icon: Users, title: "Built by makers", text: "Developers and educators crafting practical, up-to-date content." },
];

export default function AboutUs() {
  return (
    <section className="page">
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl"
      >
        <span className="eyebrow">About us</span>
        <h1 className="heading mt-4">
          Making coding <span className="gradient-text">accessible and fun</span>
        </h1>
      </motion.div>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {pillars.map(({ icon: Icon, title, text }) => (
          <div key={title} className="card p-5">
            <Icon size={22} className="text-brand-300" />
            <h2 className="mt-3 font-semibold text-white">{title}</h2>
            <p className="mt-1 text-sm muted">{text}</p>
          </div>
        ))}
      </div>

      <div className="card mt-6 p-6 sm:p-8">
        <div className="space-y-4 leading-relaxed text-slate-300">
          <p>
            Welcome to our platform! We are committed to providing an exceptional
            learning and development experience for individuals at all skill
            levels.
          </p>
          <p>
            Our mission is to make coding not only accessible but also
            engaging, interactive, and enjoyable for everyone. We believe that
            technology and programming have the power to transform lives, open new
            opportunities, and drive innovation. That’s why we have designed our
            platform to cater to beginners, intermediate learners, and experts
            alike, ensuring a seamless and enriching journey.
            Our platform offers a wide range of resources, including structured courses, hands-on
            projects, coding challenges, and real-world applications. Whether you
            are just starting out or looking to enhance your existing skills, we
            provide the guidance and support you need to succeed.
          </p>
          <p>
            Our team is made up of passionate developers, experienced educators,
            and forward-thinking innovators, all dedicated to empowering learners
            through high-quality educational resources.
            Our developers bring industry expertise, ensuring that our content stays relevant,
            practical, and aligned with the latest technological advancements.
            They design and build interactive tools, hands-on projects, and
            real-world applications to help learners gain practical coding
            experience. Our educators craft well-structured courses, tutorials,
            and learning paths that cater to different skill levels—from complete
            beginners to advanced programmers.
            They focus on making complex
            concepts easy to understand, engaging, and accessible to everyone.
          </p>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="mt-12 flex flex-col items-center gap-4 border-t border-white/10 pt-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">Connect with us</p>
        <div className="flex gap-3">
          {socials.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-lg text-slate-300 transition hover:border-brand-400/40 hover:text-white"
            >
              <Icon />
            </a>
          ))}
        </div>
      </footer>
    </section>
  );
}
