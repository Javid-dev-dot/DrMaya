"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, MessageCircleQuestion, Search, X } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { practice } from "@/lib/practice";

interface FAQItem {
  question: string;
  answer: string;
  group: string;
}

const faqs: FAQItem[] = [
  {
    group: "Fit",
    question: "Who do you typically work with?",
    answer:
      "I specialize in working with high-achieving adults, entrepreneurs, executives, and creatives who outwardly appear functional and successful, but internally struggle with chronic stress, anxiety, perfectionism, emotional exhaustion, or burnout.",
  },
  {
    group: "Approach",
    question: "What therapeutic modalities and evidence-based approaches do you use?",
    answer:
      "My work is grounded, warm, and collaborative. I integrate Cognitive Behavioral Therapy (CBT), Eye Movement Desensitization and Reprocessing (EMDR) for trauma resolution, mindfulness, and somatic nervous system regulation to help you address both cognitive thought patterns and physiological stress symptoms.",
  },
  {
    group: "Logistics",
    question: "Do you offer in-person sessions, telehealth, or both?",
    answer:
      "I offer both. In-person therapy takes place in my tranquil, private office located on Montana Avenue in Santa Monica. For clients located elsewhere in California or those with demanding schedules, I offer secure, HIPAA-compliant telehealth sessions.",
  },
  {
    group: "Getting started",
    question: "What can I expect in our initial consultation?",
    answer:
      "We begin with a complimentary 15-minute phone consultation to discuss what brings you to therapy, clarify your goals, and ensure we are a good clinical fit. If we decide to move forward, we schedule an in-depth 50-minute initial intake session.",
  },
  {
    group: "Approach",
    question: "How does therapy address physical symptoms of stress and burnout?",
    answer:
      "Chronic stress directly impacts the autonomic nervous system, manifesting as insomnia, muscle tension, headaches, and digestive distress. By incorporating somatic awareness and physiological down-regulation tools, we help your body learn that it is safe to release tension and rest.",
  },
  {
    group: "Fees",
    question: "Do you accept insurance?",
    answer:
      "I am an out-of-network provider. This ensures complete confidentiality, personalized session pacing, and treatment unconstrained by insurance restrictions. I provide detailed monthly superbills for you to submit to your PPO insurance for potential reimbursement, along with a Good Faith Estimate in accordance with the No Surprises Act.",
  },
  {
    group: "Fees",
    question: "What are your fees and how do I pay?",
    answer:
      "Sessions are billed at a flat 50-minute rate. Payment is collected by card or ACH at the time of the appointment, and a written cost estimate is shared before the first session so there are no surprises.",
  },
  {
    group: "Getting started",
    question: "What is your cancellation policy?",
    answer:
      "Sessions can be rescheduled or cancelled without charge up to 48 hours in advance. Within 48 hours, the full session rate applies because the time is held for you.",
  },
];

export default function FAQSection() {
  const [query, setQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const headerRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const normalized = query.trim().toLowerCase();
  const visible = useMemo(() => {
    if (!normalized) return faqs.map((faq, index) => ({ faq, index }));
    return faqs
      .map((faq, index) => ({ faq, index }))
      .filter(
        ({ faq }) =>
          faq.question.toLowerCase().includes(normalized) ||
          faq.answer.toLowerCase().includes(normalized) ||
          faq.group.toLowerCase().includes(normalized),
      );
  }, [normalized]);

  const toggle = (index: number) =>
    setOpenIndex((current) => (current === index ? null : index));

  const onHeaderKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, position: number) => {
    const keys = ["ArrowDown", "ArrowUp", "Home", "End"];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    const last = visible.length - 1;
    let next = position;
    if (event.key === "ArrowDown") next = position === last ? 0 : position + 1;
    if (event.key === "ArrowUp") next = position === 0 ? last : position - 1;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = last;
    headerRefs.current[next]?.focus();
  };

  return (
    <section
      id="faq"
      data-reveal
      className="border-t border-brand-secondary/30 bg-brand-cream py-24"
    >
      <div className="layout-container max-w-4xl">
        <SectionHeading
          align="center"
          eyebrow="Questions & clarity"
          title="Frequently asked questions"
        />

        <div className="mx-auto mt-10 max-w-md">
          <label htmlFor="faq-search" className="sr-only">
            Search questions
          </label>
          <div className="pressable flex items-center gap-3 rounded-full border border-brand-secondary bg-brand-sand/70 px-5 py-3">
            <Search aria-hidden="true" size={16} className="shrink-0 text-brand-primary" />
            <input
              id="faq-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search topics, e.g. insurance or EMDR"
              className="w-full bg-transparent font-sans text-sm text-brand-dark placeholder:text-brand-muted/70 focus:outline-none"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="pressable flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-brand-muted hover:bg-brand-cream hover:text-brand-primary dark:hover:bg-brand-sand"
              >
                <X aria-hidden="true" size={14} />
              </button>
            ) : null}
          </div>
        </div>

        <p aria-live="polite" className="mt-4 text-center font-sans text-xs text-brand-muted">
          {normalized
            ? `${visible.length} ${visible.length === 1 ? "question" : "questions"} matching your search`
            : undefined}
        </p>

        <div className="mt-8 space-y-4">
          {visible.map(({ faq, index }, position) => {
            const isOpen = openIndex === index;
            const panelId = `faq-panel-${index}`;
            const headerId = `faq-header-${index}`;

            return (
              <div
                key={faq.question}
                data-stagger-item
                className="overflow-hidden rounded-2xl border border-brand-secondary/50 bg-brand-sand/60 transition-[border-color,box-shadow,background-color] duration-300 hover:border-brand-primary/30 hover:shadow-md"
              >
                <h3>
                  <button
                    ref={(node) => {
                      headerRefs.current[position] = node;
                    }}
                    type="button"
                    suppressHydrationWarning
                    id={headerId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(index)}
                    onKeyDown={(event) => onHeaderKeyDown(event, position)}
                    className="flex w-full items-center justify-between gap-4 p-6 text-left focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand-primary"
                  >
                    <span className="font-serif text-xl font-medium text-brand-dark md:text-2xl">
                      {faq.question}
                    </span>
                    <span className="flex shrink-0 items-center gap-3">
                      <span className="hidden font-sans text-[0.6rem] uppercase tracking-[0.2em] text-brand-muted sm:block">
                        {faq.group}
                      </span>
                      <ChevronDown
                        aria-hidden="true"
                        className={`h-5 w-5 text-brand-primary transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={headerId}
                  aria-hidden={!isOpen}
                  data-open={isOpen}
                  className="reveal-panel"
                >
                  <div>
                    <p className="border-t border-brand-secondary/25 px-6 pb-6 pt-4 font-sans leading-relaxed text-brand-muted">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {visible.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-brand-secondary bg-brand-sand/50 p-10 text-center">
            <MessageCircleQuestion
              aria-hidden="true"
              size={26}
              className="mx-auto mb-4 text-brand-primary"
            />
            <p className="font-serif text-xl text-brand-dark">
              No questions match &ldquo;{query}&rdquo;
            </p>
            <p className="mt-2 text-sm text-brand-muted">
              Try a broader term such as &ldquo;fees&rdquo;, &ldquo;trauma&rdquo;, or
              &ldquo;telehealth&rdquo;.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => setQuery("")}
                className="pressable rounded-full border border-brand-secondary bg-brand-cream px-5 py-2.5 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-brand-primary"
                suppressHydrationWarning
              >
                Reset search
              </button>
              <Link
                href="#contact"
                className="pressable rounded-full bg-brand-primary px-5 py-2.5 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-white"
              >
                Ask directly
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-12 flex flex-col items-center gap-3 rounded-2xl border border-brand-secondary/40 bg-brand-sand/50 p-8 text-center">
            <p className="font-serif text-xl text-brand-dark">Still deciding whether to reach out?</p>
            <p className="max-w-xl text-sm leading-relaxed text-brand-muted">
              The complimentary 15-minute consultation carries no obligation. Ask about fit,
              availability, or fees before booking anything.
            </p>
            <div className="mt-2 flex flex-wrap justify-center gap-3">
              <Link
                href="#contact"
                className="pressable rounded-full bg-brand-primary px-6 py-3 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-white"
              >
                Book a consultation
              </Link>
              <a
                href={practice.phoneHref}
                className="pressable rounded-full border border-brand-secondary bg-brand-cream px-6 py-3 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-brand-primary"
              >
                Call {practice.phoneDisplay}
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
