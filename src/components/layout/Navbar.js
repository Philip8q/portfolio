import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "@/components/ui/ThemeToggle";
import SocialIcons from "@/components/ui/SocialIcons";
import { siteConfig } from "@/data/siteConfig";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/#projects" },
  { name: "Writing", href: "/#writing" },
  { name: "Contact", href: "/#contact" },
  { name: "About", href: "/about" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const menuRef = useRef(null);

  // Close mobile menu on Escape key press or outside click
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setMobileOpen(false);
    };

    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMobileOpen(false);
      }
    };

    if (mobileOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [router.asPath]);

  return (
    <nav
      ref={menuRef}
      className="fixed top-0 left-0 right-0 z-50
                 bg-light-bg/85 dark:bg-dark-bg/85 backdrop-blur-md
                 border-b border-light-border/50 dark:border-dark-border/50 transition-colors"
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 h-20 flex items-center justify-between">
        {/* Left: Nav links */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? router.pathname === "/" && !router.asPath.includes("#")
                : link.href.startsWith("/#")
                ? router.asPath.includes(link.href.replace("/", ""))
                : router.pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors relative py-1
                  ${
                    isActive
                      ? "text-light-text dark:text-dark-text font-semibold"
                      : "text-light-secondary dark:text-dark-secondary hover:text-light-text dark:hover:text-dark-text"
                  }`}
              >
                {link.name}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-light-accent dark:bg-dark-accent rounded-full"
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Center: Logo */}
        <Link
          href="/"
          className="md:absolute md:left-1/2 md:-translate-x-1/2 group"
          aria-label="Philip Omondi Home"
        >
          <div className="w-11 h-11 rounded-full bg-light-text dark:bg-dark-text
                          flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <span className="text-white dark:text-dark-bg font-bold text-sm tracking-wider">
              PO
            </span>
          </div>
        </Link>

        {/* Right: CV button + Social icons + Theme toggle */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href={siteConfig.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold px-3 py-1.5 rounded-full border border-light-border dark:border-dark-border text-light-text dark:text-dark-text hover:border-light-accent dark:hover:border-dark-accent hover:text-light-accent dark:hover:text-dark-accent transition-colors"
          >
            CV
          </a>
          <a
            href={siteConfig.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold px-3 py-1.5 rounded-full bg-light-accent/10 dark:bg-dark-accent/10 text-light-accent dark:text-dark-accent hover:bg-light-accent hover:text-white dark:hover:bg-dark-accent dark:hover:text-dark-bg transition-all"
          >
            Book Call
          </a>
          <div className="h-4 w-px bg-light-border dark:bg-dark-border mx-1" />
          <SocialIcons size={19} />
          <ThemeToggle />
        </div>

        {/* Mobile menu button and theme toggle */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button
            className="flex flex-col gap-1.5 p-2 rounded-lg hover:bg-light-border/40 dark:hover:bg-dark-border/40 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="block w-6 h-0.5 bg-light-text dark:bg-dark-text origin-center"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-6 h-0.5 bg-light-text dark:bg-dark-text"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="block w-6 h-0.5 bg-light-text dark:bg-dark-text origin-center"
            />
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden
                       bg-light-bg/95 dark:bg-dark-bg/95 backdrop-blur-xl
                       border-b border-light-border dark:border-dark-border shadow-xl"
          >
            <div className="px-8 py-5 flex flex-col gap-3.5">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`text-base font-medium transition-colors py-1
                    ${
                      router.pathname === link.href
                        ? "text-light-accent dark:text-dark-accent font-semibold"
                        : "text-light-secondary dark:text-dark-secondary hover:text-light-text dark:hover:text-dark-text"
                    }`}
                >
                  {link.name}
                </Link>
              ))}

              <div className="flex items-center gap-3 pt-2">
                <a
                  href={siteConfig.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center text-xs font-semibold py-2 rounded-lg border border-light-border dark:border-dark-border text-light-text dark:text-dark-text"
                >
                  View CV
                </a>
                <a
                  href={siteConfig.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center text-xs font-semibold py-2 rounded-lg bg-light-accent text-white dark:bg-dark-accent dark:text-dark-bg"
                >
                  Book a Call
                </a>
              </div>

              <div className="pt-3 border-t border-light-border dark:border-dark-border">
                <p className="text-xs font-medium uppercase tracking-wider text-light-secondary dark:text-dark-secondary mb-2.5">
                  Connect
                </p>
                <SocialIcons size={22} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
