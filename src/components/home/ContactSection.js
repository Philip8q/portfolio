import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { siteConfig } from "@/data/siteConfig";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "AI & Automation Inquiry",
    message: "",
    "bot-field": "",
  });

  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent spam if bot field populated
    if (formData["bot-field"]) {
      return;
    }

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus("error");
      setErrorMessage("Please complete all required fields before transmitting.");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const encodedBody = new URLSearchParams({
        "form-name": "contact",
        ...formData,
      }).toString();

      const response = await fetch("/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: encodedBody,
      });

      if (response.ok) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          subject: "AI & Automation Inquiry",
          message: "",
          "bot-field": "",
        });
      } else {
        throw new Error(`Server returned status ${response.status}`);
      }
    } catch (err) {
      console.error("Form transmission error:", err);
      setStatus("error");
      setErrorMessage("Transmission encountered a network interruption. Please retry or connect via WhatsApp.");
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setErrorMessage("");
  };

  return (
    <section id="contact" className="py-24 px-6 bg-light-card/40 dark:bg-dark-card/40 transition-colors">
      <div className="max-w-[1200px] mx-auto">
        <AnimatedSection>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3 bg-zinc-900/10 dark:bg-zinc-100/10 text-zinc-900 dark:text-zinc-100 text-xs font-semibold uppercase tracking-wider">
              <Icon icon="mdi:send-check-outline" width={14} height={14} />
              Direct Transmission
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-light-text dark:text-dark-text mb-3">
              Send a Message or Discuss a Project
            </h2>
            <p className="text-light-secondary dark:text-dark-secondary text-base">
              Whether you need an intelligent lead pipeline, an n8n automation, or want to discuss an engineering role, transmit your details directly to my inbox.
            </p>
          </div>
        </AnimatedSection>

        <div className="max-w-2xl mx-auto">
          <AnimatedSection delay={0.1}>
            <div className="p-5 sm:p-8 md:p-10 rounded-2xl border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card shadow-sm">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    className="text-center py-10"
                  >
                    <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                      <Icon icon="mdi:check-circle-outline" width={36} height={36} />
                    </div>
                    <h3 className="text-2xl font-bold text-light-text dark:text-dark-text mb-2">
                      Transmission Received
                    </h3>
                    <p className="text-light-secondary dark:text-dark-secondary mb-8 max-w-md mx-auto text-sm sm:text-base">
                      Thank you for reaching out. Your message has been dispatched directly to my inbox, and I will follow up shortly.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                      <button
                        type="button"
                        onClick={handleReset}
                        className="w-full sm:w-auto px-6 py-3 rounded-lg border border-light-border dark:border-dark-border text-light-text dark:text-dark-text font-medium hover:border-zinc-500 transition-colors text-sm"
                      >
                        Send Another Message
                      </button>
                      <a
                        href={siteConfig.bookingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-semibold hover:opacity-90 transition-opacity text-sm"
                      >
                        <Icon icon="mdi:calendar-check" width={18} height={18} />
                        Book Instant Call
                      </a>
                    </div>
                  </motion.div>
                ) : (
                  <form
                    key="form"
                    name="contact"
                    method="POST"
                    data-netlify="true"
                    netlify-honeypot="bot-field"
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    noValidate
                  >
                    {/* Hidden inputs for Netlify Forms routing */}
                    <input type="hidden" name="form-name" value="contact" />
                    <p className="hidden">
                      <label>
                        Don’t fill this out if you are human:{" "}
                        <input
                          name="bot-field"
                          value={formData["bot-field"]}
                          onChange={handleChange}
                        />
                      </label>
                    </p>

                    {/* Error Banner */}
                    {status === "error" && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm flex items-start gap-3"
                        role="alert"
                      >
                        <Icon icon="mdi:alert-circle-outline" width={20} height={20} className="shrink-0 mt-0.5" />
                        <div>{errorMessage}</div>
                      </motion.div>
                    )}

                    {/* Name & Email Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-xs font-semibold text-light-text dark:text-dark-text uppercase tracking-wider mb-2"
                        >
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Alex Morgan"
                          className="w-full px-4 py-3 rounded-xl border border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-zinc-500/40 transition-all placeholder:text-light-secondary/50 dark:placeholder:text-dark-secondary/50"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-xs font-semibold text-light-text dark:text-dark-text uppercase tracking-wider mb-2"
                        >
                          Work Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="alex@enterprise.com"
                          className="w-full px-4 py-3 rounded-xl border border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-zinc-500/40 transition-all placeholder:text-light-secondary/50 dark:placeholder:text-dark-secondary/50"
                        />
                      </div>
                    </div>

                    {/* Inquiry Type / Subject */}
                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-xs font-semibold text-light-text dark:text-dark-text uppercase tracking-wider mb-2"
                      >
                        Project Scope or Focus
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-zinc-500/40 transition-all"
                      >
                        <option value="AI & Automation Inquiry">AI &amp; Automation Lead Engine</option>
                        <option value="n8n Workflow Integration">n8n Workflow Architecture</option>
                        <option value="Full Stack Engineering Role">Software Engineering Opportunity</option>
                        <option value="General Consultation">General Engineering Inquiry</option>
                      </select>
                    </div>

                    {/* Message Body */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-xs font-semibold text-light-text dark:text-dark-text uppercase tracking-wider mb-2"
                      >
                        Project Details or Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell me about your pipeline goals, timeline, or engineering opportunity..."
                        className="w-full px-4 py-3 rounded-xl border border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-zinc-500/40 transition-all placeholder:text-light-secondary/50 dark:placeholder:text-dark-secondary/50 resize-y"
                      />
                    </div>

                    {/* Submit Button */}
                    <div>
                      <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="w-full py-3.5 px-6 min-h-[48px] rounded-xl font-semibold text-sm transition-all duration-200 shadow-sm flex items-center justify-center gap-2.5 bg-zinc-900 text-white hover:bg-black dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {status === "submitting" ? (
                          <>
                            <Icon icon="mdi:loading" width={20} height={20} className="animate-spin" />
                            <span>Transmitting Message...</span>
                          </>
                        ) : (
                          <>
                            <Icon icon="mdi:send-outline" width={18} height={18} />
                            <span>Send Message</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Security and SLA Note */}
                    <div className="flex items-center justify-between pt-2 text-xs text-light-secondary dark:text-dark-secondary">
                      <span className="flex items-center gap-1.5">
                        <Icon icon="mdi:shield-check-outline" width={15} height={15} className="text-emerald-500" />
                        Spam protected by Netlify edge filters
                      </span>
                      <span>Response window within 24 hours</span>
                    </div>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
