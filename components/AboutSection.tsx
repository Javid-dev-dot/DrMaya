import Image from "next/image";
import { Clock, Laptop, Video } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import CredentialCard from "@/components/CredentialCard";
import TiltFrame from "@/components/TiltFrame";
import { images, imageAlts } from "@/lib/practice";

const credentials = [
  "Licensed Clinical Psychologist (CA PSY 31245)",
  "EMDR Certified for Trauma & Adverse Experiences",
  "Integrative Somatic & Nervous System Regulation",
  "Specialized in High-Performance Burnout & Perfectionism",
];

const facts = [
  { icon: Clock, label: "Session length", value: "50 minutes" },
  { icon: Video, label: "First contact", value: "Complimentary 15-minute call" },
  { icon: Laptop, label: "Format", value: "In-person & telehealth" },
];

export default function AboutSection() {
  return (
    <section id="about" data-reveal className="border-t border-brand-secondary/30 bg-brand-cream py-24">
      <div className="layout-container grid items-center gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <TiltFrame>
            <div
              data-image-reveal
              className="frame-ring relative aspect-[4/5] overflow-hidden rounded-3xl border border-brand-secondary/40"
            >
              <Image
                src={images.portrait}
                alt={imageAlts.portrait}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-overlay/75 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="font-serif text-2xl font-light text-brand-cream">
                  Dr. Maya Reynolds, PsyD
                </p>
                <p className="mt-1 font-sans text-[0.65rem] uppercase tracking-[0.2em] text-brand-teal-light">
                  Clinical Psychologist · CA PSY 31245
                </p>
              </div>
            </div>
          </TiltFrame>
        </div>

        <div id="approach" className="lg:col-span-7">
          <SectionHeading
            eyebrow="About Dr. Maya Reynolds"
            title={
              <>
                Therapy tailored to the functional individual struggling internally.
              </>
            }
          />

          <div
            data-image-reveal
            className="mb-8 rounded-2xl border-l-4 border-brand-accent bg-brand-sand/70 p-6"
          >
            <p className="font-serif text-xl italic leading-relaxed text-brand-dark/90 sm:text-2xl">
              &ldquo;Outwardly, you carry responsibilities with poise and precision. Internally,
              you may feel on the brink of exhaustion, constantly overthinking, and emotionally
              depleted.&rdquo;
            </p>
          </div>

          <div className="mb-10 space-y-5 font-sans text-base leading-relaxed text-brand-muted sm:text-lg">
            <p data-reveal-text>
              Based in Santa Monica, California, I provide an authentic, grounded, and
              collaborative therapeutic space. I specialize in working with entrepreneurs,
              executives, creatives, and high-achieving professionals navigating the hidden tolls
              of chronic anxiety, imposter fears, complex trauma, and burnout.
            </p>
            <p data-reveal-text>
              My philosophy moves beyond superficial symptom suppression. Real healing occurs when
              we explore and rewire the deeper survival patterns that keep your system locked in
              hyper-vigilance. We integrate Cognitive Behavioral Therapy (CBT), Eye Movement
              Desensitization and Reprocessing (EMDR), and somatic nervous system regulation to
              help your mind and body feel truly safe again.
            </p>
          </div>

          <div data-stagger className="grid gap-3 border-t border-brand-secondary/40 pt-6 sm:grid-cols-2">
            {credentials.map((cred) => (
              <CredentialCard key={cred} text={cred} />
            ))}
          </div>

          <dl className="mt-8 grid gap-4 sm:grid-cols-3">
            {facts.map((fact) => (
                  <div
                  key={fact.label}
                  className="flex items-start gap-3 rounded-xl border border-brand-secondary/40 bg-brand-cream p-4 dark:bg-brand-sand"
                >
                <fact.icon aria-hidden="true" size={18} className="mt-0.5 shrink-0 text-brand-accent" />
                <div>
                  <dt className="font-sans text-[0.6rem] uppercase tracking-[0.18em] text-brand-muted">
                    {fact.label}
                  </dt>
                  <dd className="mt-1 font-serif text-lg text-brand-dark">{fact.value}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
