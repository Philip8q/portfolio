import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "@/components/ui/ThemeToggle";
import SocialIcons from "@/components/ui/SocialIcons";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50
                 bg-light-bg/80 dark:bg-dark-bg/80 backdrop-blur-md"
    >
      <div className="max-w-[1400px] mx-auto px-8 h-20 flex items-center justify-between">
        {/* Left: Nav links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-base font-medium transition-colors relative
                ${
                  router.pathname === link.href
                    ? "text-light-text dark:text-dark-text"
                    : "text-light-secondary dark:text-dark-secondary hover:text-light-text dark:hover:text-dark-text"
                }`}
            >
              {link.name}
              {router.pathname === link.href && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-light-text dark:bg-dark-text"
                />
              )}
            </Link>
          ))}
        </div>

        {/* Center: Logo */}
        <Link href="/" className="absolute left-1/2 -translate-x-1/2">
          <div className="w-12 h-12 rounded-full bg-light-text dark:bg-dark-text
                          flex items-center justify-center">
            <span className="text-white font-bold text-sm">PO</span>
          </div>
        </Link>

        {/* Right: Social icons + Theme toggle */}
        <div className="hidden md:flex items-center gap-5">
          <SocialIcons size={20} />
          <ThemeToggle />
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <motion.span
            animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="block w-6 h-0.5 bg-light-text dark:bg-dark-text"
          />
          <motion.span
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block w-6 h-0.5 bg-light-text dark:bg-dark-text"
          />
          <motion.span
            animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="block w-6 h-0.5 bg-light-text dark:bg-dark-text"
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden
                       bg-light-bg dark:bg-dark-bg
                       border-b border-light-border dark:border-dark-border"
          >
            <div className="px-8 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`text-sm font-medium
                    ${
                      router.pathname === link.href
                        ? "text-light-accent dark:text-dark-accent"
                        : "text-light-secondary dark:text-dark-secondary"
                    }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex items-center gap-4 pt-2">
                <SocialIcons size={20} />
                <ThemeToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
