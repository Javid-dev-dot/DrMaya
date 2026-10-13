import { Compass, HeartPulse, Shield, Sparkles } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import SpecialtyCard from "@/components/SpecialtyCard";

const specialties = [
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: "Anxiety & Panic Disorders",
    subtitle: "Break free from anticipatory dread and catastrophic cycles.",
    description:
      "High achievers often experience anxiety as an unrelenting hum of urgency. Using targeted Cognitive Behavioral Therapy (CBT) and physiological grounding, we untangle chronic worry, panic cycles, and the fear of losing control.",
    signals: "racing thoughts, chest tightness, planning for the worst, avoiding what scares you",
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Trauma & EMDR Therapy",
    subtitle: "Process single-incident trauma and long-standing complex patterns.",
    description:
      "Trauma is stored in both mind and physiology. Using EMDR and somatic stabilization, we reprocess painful memories, relational wounds, and persistent triggers with safety, dignity, and deep pacing.",
    signals: "flashbacks, hypervigilance, numbness, startle responses, old memories that still sting",
  },
  {
    icon: <Compass className="h-6 w-6" />,
    title: "Burnout & Perfectionism",
    subtitle: "Rebuild your relationship with ambition, rest, and self-worth.",
    description:
      "For entrepreneurs, executives, and creatives whose self-esteem is tied to relentless productivity. We address the emotional depletion of perfectionism to build sustainable, regenerative ways of living.",
    signals: "cynicism, exhaustion that sleep does not fix, guilt when resting, harsh inner critic",
  },
  {
    icon: <HeartPulse className="h-6 w-6" />,
    title: "Nervous System Regulation",
    subtitle: "Resolve insomnia, muscle tension, and chronic physiological hyper-arousal.",
    description:
      "When psychological stress manifests as physical symptoms—such as insomnia, jaw clenching, and fatigue—we employ somatic techniques to help your autonomic nervous system return to a rested state of safety.",
    signals: "insomnia, digestive distress, clenched jaw, headaches, wired-but-tired evenings",
  },
];

const modalities = [
  "Cognitive Behavioral Therapy (CBT)",
  "EMDR Trauma Therapy",
  "Somatic Experiencing",
  "Polyvagal Nervous System Regulation",
  "Mindfulness-Based Stress Reduction",
  "Relational Psychodynamics",
];

export default function SpecialtiesSection() {
  return (
    <section
      id="specialties"
      data-reveal
      className="border-t border-brand-secondary/40 bg-brand-sand py-24"
    >
      <div className="layout-container">
        <SectionHeading
          align="center"
          eyebrow="Clinical Specialties"
          title="Focused, evidence-based psychological care."
          lede="Therapy is not one-size-fits-all. Every session integrates scientifically validated modalities with intuitive, client-centered care for long-lasting transformation."
        />

        <div data-stagger className="mt-16 grid gap-8 md:grid-cols-2">
          {specialties.map((item, index) => (
            <SpecialtyCard key={item.title} index={index} {...item} />
          ))}
        </div>

        <div
          data-image-reveal
          className="mt-16 rounded-2xl border border-brand-primary/15 bg-brand-primary/5 p-8 text-center sm:p-10"
        >
          <h3 className="mb-6 font-serif text-xl font-medium text-brand-dark">
            Integrated modalities & scientific methods
          </h3>
          <ul className="flex flex-wrap justify-center gap-3">
            {modalities.map((tag) => (
              <li
                key={tag}
                className="pressable rounded-full border border-brand-secondary/60 bg-brand-cream px-4 py-2 font-sans text-xs tracking-wide text-brand-dark shadow-xs"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
