import { Bike, Car, MapPin, Wifi } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import OfficeGallery, { type GalleryImage } from "@/components/OfficeGallery";
import { practice } from "@/lib/practice";
import { images, imageAlts } from "@/lib/practice";

const galleryImages: GalleryImage[] = [
  {
    src: images.officeSeating,
    alt: imageAlts.officeSeating,
    caption: "Intimate consultation seating",
  },
  {
    src: images.officeLight,
    alt: imageAlts.officeLight,
    caption: "Sunlit, grounded atmosphere",
  },
  {
    src: images.officeCorner,
    alt: imageAlts.officeCorner,
    caption: "Private, confidential setting",
  },
];

const logistics = [
  {
    icon: Car,
    title: "Validated parking",
    desc: "Complimentary garage validation in the building. Enter from the Montana Ave lobby and take the elevator to Suite 300.",
  },
  {
    icon: Bike,
    title: "Easy to reach",
    desc: "Two blocks from the Expo Line, with a step-free entrance, accessible restroom, and elevator access on every floor.",
  },
  {
    icon: Wifi,
    title: "Telehealth-ready",
    desc: "Secure, HIPAA-compliant video sessions across California, with the same 50-minute pacing and continuity of care.",
  },
];

export default function OfficeSection() {
  return (
    <section
      id="office"
      data-reveal
      className="border-t border-brand-secondary/40 bg-brand-sand py-24"
    >
      <div className="layout-container">
        <SectionHeading
          align="center"
          eyebrow="Sanctuary & setting"
          title="A safe, tranquil space designed for deep reflection."
          lede="Located in the heart of Santa Monica, the office is curated as a grounding sanctuary where high-achieving professionals and creatives can unplug from performance mode and reconnect with themselves. Select any photo to view it larger."
        />

        <div data-image-reveal className="mt-16">
          <OfficeGallery images={galleryImages} />
        </div>

        <div data-stagger className="mt-16 grid gap-8 md:grid-cols-3">
          {logistics.map((item) => (
            <article
              key={item.title}
              className="pressable rounded-2xl border border-brand-secondary/50 bg-brand-cream/80 p-8 shadow-sm backdrop-blur-sm"
            >
              <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary">
                <item.icon aria-hidden="true" size={19} />
              </span>
              <h3 className="mb-3 font-serif text-2xl font-medium text-brand-dark">{item.title}</h3>
              <p className="text-sm leading-relaxed text-brand-muted">{item.desc}</p>
            </article>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 text-center">
          <a
            href={practice.mapHref}
            target="_blank"
            rel="noreferrer noopener"
            className="pressable inline-flex items-center gap-2 rounded-full border border-brand-secondary bg-brand-cream px-6 py-3 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-brand-primary"
          >
            <MapPin aria-hidden="true" size={15} />
            Open directions in Maps
          </a>
          <p className="max-w-2xl text-sm italic text-brand-muted">
            {practice.addressLines.join(", ")} · In-person and secure telehealth across
            California.
          </p>
        </div>
      </div>
    </section>
  );
}
