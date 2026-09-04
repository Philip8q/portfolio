import { motion } from "framer-motion";

export default function CircularText() {
  return (
    <div className="relative w-40 h-40 flex items-center justify-center">
      {/* Rotating text ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <path
              id="circlePath"
              d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
            />
          </defs>
          <text
            fill="currentColor"
            className="text-light-text dark:text-dark-text text-[13px] font-medium"
          >
            <textPath href="#circlePath" startOffset="0%">
              Web Developer . Automation Engineer . n8n Expert .{" "}
            </textPath>
          </text>
        </svg>
      </motion.div>

      {/* Center button */}
      <a
        href="mailto:caysonb8@gmail.com"
        className="relative z-10 w-20 h-20 rounded-full
                   bg-light-text dark:bg-dark-text
                   flex items-center justify-center
                   hover:scale-105 transition-transform"
      >
        <span className="text-white font-bold text-sm text-center leading-tight">
          Hire<br />Me
        </span>
      </a>
    </div>
  );
}
