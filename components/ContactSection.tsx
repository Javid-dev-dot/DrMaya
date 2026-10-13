"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  CheckCircle2,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Send,
  Shield,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { practice } from "@/lib/practice";

type Status = "idle" | "submitting" | "success" | "error";

interface Fields {
  name: string;
  email: string;
  phone: string;
  preferredFormat: string;
  areaOfInterest: string;
  message: string;
  consent: boolean;
  honeypot: string;
}

const initialFields: Fields = {
  name: "",
  email: "",
  phone: "",
  preferredFormat: "In-person (Santa Monica)",
  areaOfInterest: "Anxiety & Panic Disorders",
  message: "",
  consent: false,
  honeypot: "",
};

const MAX_MESSAGE = 1200;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(fields: Fields) {
  const errors: Partial<Record<keyof Fields, string>> = {};

  if (fields.name.trim().length < 2) {
    errors.name = "Please enter the name you would like us to use.";
  }
  if (!emailPattern.test(fields.email.trim())) {
    errors.email = "Enter a valid email address, for example name@company.com.";
  }
  if (fields.phone.trim() && fields.phone.replace(/\D/g, "").length < 7) {
    errors.phone = "Enter a phone number with at least 7 digits, or leave it blank.";
  }
  if (fields.message.length > MAX_MESSAGE) {
    errors.message = `Please keep your message under ${MAX_MESSAGE} characters.`;
  }
  if (!fields.consent) {
    errors.consent = "Please confirm you have read the privacy notice.";
  }

  return errors;
}

export default function ContactSection() {
  const [fields, setFields] = useState<Fields>(initialFields);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const errorSummaryRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  const update = <K extends keyof Fields>(key: K, value: Fields[K]) => {
    setFields((current) => ({ ...current, [key]: value }));
    if (touched[key] || errors[key]) {
      setErrors((current) => ({ ...current, [key]: undefined }));
    }
  };

  const handleBlur = (key: keyof Fields) => {
    setTouched((current) => ({ ...current, [key]: true }));
    setErrors(validate(fields));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (status === "submitting") return;

    const found = validate(fields);
    setErrors(found);
    setTouched({
      name: true,
      email: true,
      phone: true,
      message: true,
      consent: true,
      honeypot: true,
    });

    if (Object.keys(found).length > 0) {
      setStatus("error");
      setStatusMessage("Please review the highlighted fields and try again.");
      window.requestAnimationFrame(() => {
        errorSummaryRef.current?.focus();
      });
      return;
    }

    setStatus("submitting");
    setStatusMessage("");

    try {
      // Placeholder delivery step: swap for the practice's secure intake endpoint
      // or scheduling provider before launch.
      await new Promise((resolve) => window.setTimeout(resolve, 1100));
      setStatus("success");
      setStatusMessage("");
    } catch {
      setStatus("error");
      setStatusMessage(
        "We could not send your inquiry just now. Please call the practice or try again.",
      );
      window.requestAnimationFrame(() => {
        errorSummaryRef.current?.focus();
      });
    }
  };

  const resetForm = () => {
    setFields(initialFields);
    setErrors({});
    setTouched({});
    setStatus("idle");
    setStatusMessage("");
    window.requestAnimationFrame(() => nameRef.current?.focus());
  };

  const fieldClass = (key: keyof Fields) =>
    `dark-input w-full rounded-xl border bg-brand-sand px-4 py-3 text-sm text-brand-dark transition-[border-color,box-shadow] duration-200 placeholder:text-brand-muted/60 focus:outline-none focus:ring-2 focus:ring-brand-primary/40 ${
      errors[key] && touched[key] ? "error border-red-400 bg-red-50/40" : "border-brand-secondary"
    }`;

  const labelClass = "mb-2 block font-sans text-xs font-medium uppercase tracking-[0.16em] text-brand-muted";
  const errorClass =
    "mt-1.5 font-sans text-xs text-red-700 dark:text-red-200";

  const remaining = MAX_MESSAGE - fields.message.length;

  const errorList = (
    Object.keys(errors) as Array<keyof Fields>
  ).filter((key) => errors[key] && touched[key]);

  return (
    <section
      id="contact"
      data-reveal
      className="border-t border-brand-secondary/40 bg-brand-sand py-24 pb-28 lg:pb-24"
    >
      <div className="layout-container">
        <div className="grid items-start gap-16 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Begin your care"
              title="Connect for a confidential consultation."
            />

            <p className="mb-8 text-lg leading-relaxed text-brand-muted">
              Taking the first step toward therapy can feel vulnerable. Whether you are dealing
              with chronic exhaustion, unhealed trauma, or overwhelming anxiety, you do not have
              to carry it alone. Reach out directly or submit an inquiry to schedule an initial
              consultation.
            </p>

            <ul className="mb-8 space-y-6">
              <li className="pressable flex items-start gap-4 rounded-2xl border border-transparent p-2">
                <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary">
                  <MapPin aria-hidden="true" size={19} />
                </span>
                <div>
                  <h3 className="mb-1 font-sans text-sm font-semibold uppercase tracking-wide text-brand-dark">
                    Santa Monica practice
                  </h3>
                  <p className="text-sm leading-relaxed text-brand-muted">
                    <a
                      href={practice.mapHref}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="underline-sweep text-brand-primary"
                    >
                      {practice.addressLines[0]}
                      <br />
                      {practice.addressLines[1]}
                    </a>
                    <br />
                    <span className="mt-1 inline-block text-xs text-brand-accent">
                      Validated parking and step-free access
                    </span>
                  </p>
                </div>
              </li>

              <li className="pressable flex items-start gap-4 rounded-2xl border border-transparent p-2">
                <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary">
                  <Phone aria-hidden="true" size={19} />
                </span>
                <div>
                  <h3 className="mb-1 font-sans text-sm font-semibold uppercase tracking-wide text-brand-dark">
                    Direct phone
                  </h3>
                  <p className="text-sm leading-relaxed text-brand-muted">
                    <a href={practice.phoneHref} className="underline-sweep text-brand-primary">
                      {practice.phoneDisplay}
                    </a>
                    <br />
                    <span className="mt-1 inline-block text-xs text-brand-accent">
                      Replies within {practice.responseTime}
                    </span>
                  </p>
                </div>
              </li>

              <li className="pressable flex items-start gap-4 rounded-2xl border border-transparent p-2">
                <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary">
                  <Mail aria-hidden="true" size={19} />
                </span>
                <div>
                  <h3 className="mb-1 font-sans text-sm font-semibold uppercase tracking-wide text-brand-dark">
                    Confidential email
                  </h3>
                  <p className="text-sm leading-relaxed text-brand-muted">
                    <a href={practice.emailHref} className="underline-sweep text-brand-primary">
                      {practice.emailDisplay}
                    </a>
                  </p>
                </div>
              </li>
            </ul>

            <div className="mb-4 flex items-start gap-3 rounded-xl border border-brand-secondary/40 bg-brand-cream/80 p-4 font-sans text-xs leading-relaxed text-brand-muted">
              <Shield aria-hidden="true" size={18} className="mt-0.5 shrink-0 text-brand-primary" />
              <span>
                Please keep clinical details brief and avoid including diagnoses or other
                protected health information in this form. Detailed history is best shared in
                session, where it is protected by confidentiality.
              </span>
            </div>

            <div className="flex items-start gap-3 rounded-xl border border-brand-accent/40 bg-brand-accent/10 p-4 font-sans text-xs leading-relaxed text-brand-dark">
              <AlertTriangle aria-hidden="true" size={18} className="mt-0.5 shrink-0 text-brand-accent" />
              <span>
                This practice cannot respond to emergencies. If you are in crisis or at risk of
                harm, call or text{" "}
                <a href={practice.crisisHref} className="font-semibold underline">
                  {practice.crisisText}
                </a>{" "}
                (the {practice.crisisLabel}) or dial 911.
              </span>
            </div>
          </div>

          <div className="rounded-3xl border border-brand-secondary/50 bg-brand-cream p-8 shadow-lg md:p-10">
            {status === "success" ? (
              <div className="py-10 text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary">
                  <CheckCircle2 aria-hidden="true" size={34} />
                </div>
                <h3 className="font-serif text-3xl font-medium text-brand-dark">
                  Inquiry received
                </h3>
                <p className="mx-auto mt-4 max-w-md leading-relaxed text-brand-muted">
                  Thank you, {fields.name.trim() || "there"}. Dr. Maya Reynolds reviews new
                  inquiries personally and responds within {practice.responseTime} to arrange your
                  complimentary 15-minute consultation.
                </p>
                <dl className="mx-auto mt-8 grid max-w-md gap-3 text-left font-sans text-sm">
                  <div className="flex justify-between gap-4 rounded-xl bg-brand-sand/70 px-4 py-3">
                    <dt className="text-brand-muted">Preferred format</dt>
                    <dd className="font-medium text-brand-dark">{fields.preferredFormat}</dd>
                  </div>
                  <div className="flex justify-between gap-4 rounded-xl bg-brand-sand/70 px-4 py-3">
                    <dt className="text-brand-muted">Primary focus</dt>
                    <dd className="font-medium text-brand-dark">{fields.areaOfInterest}</dd>
                  </div>
                </dl>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <button
                    type="button"
                    onClick={resetForm}
                    suppressHydrationWarning
                    className="pressable rounded-full border border-brand-secondary bg-brand-cream px-6 py-3 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-brand-primary"
                  >
                    Send another message
                  </button>
                  <a
                    href={practice.phoneHref}
                    className="pressable rounded-full bg-brand-primary px-6 py-3 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-white"
                  >
                    Call the practice
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <h3 className="border-b border-brand-secondary/30 pb-3 font-serif text-2xl font-medium text-brand-dark">
                  Schedule an initial consultation
                </h3>

                <div
                  ref={errorSummaryRef}
                  tabIndex={-1}
                  role="alert"
                  aria-live="assertive"
                  className={status === "error" && errorList.length ? "" : "sr-only"}
                >
                  {status === "error" && errorList.length ? (
                    <div className="dark-panel-error rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800 dark:text-red-200">
                      <p className="font-semibold">
                        {errorList.length} {errorList.length === 1 ? "field needs" : "fields need"}{" "}
                        your attention.
                      </p>
                      <ul className="mt-2 list-disc space-y-1 pl-5">
                        {errorList.map((key) => (
                          <li key={key}>{errors[key]}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                  {status === "error" && !errorList.length ? (
                    <p className="text-sm text-red-700">{statusMessage}</p>
                  ) : null}
                </div>

                <div>
                  <label htmlFor="name" className={labelClass}>
                    Full name *
                  </label>
                    <input
                      ref={nameRef}
                      suppressHydrationWarning
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    value={fields.name}
                    onChange={(event) => update("name", event.target.value)}
                    onBlur={() => handleBlur("name")}
                    aria-invalid={Boolean(errors.name && touched.name)}
                    aria-describedby={errors.name && touched.name ? "name-error" : undefined}
                    className={fieldClass("name")}
                    placeholder="Jane Doe"
                  />
                  {errors.name && touched.name ? (
                    <p id="name-error" className={errorClass}>
                      {errors.name}
                    </p>
                  ) : null}
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label htmlFor="email" className={labelClass}>
                      Email address *
                    </label>
                    <input
                      id="email"
                      suppressHydrationWarning
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={fields.email}
                      onChange={(event) => update("email", event.target.value)}
                      onBlur={() => handleBlur("email")}
                      aria-invalid={Boolean(errors.email && touched.email)}
                      aria-describedby={errors.email && touched.email ? "email-error" : undefined}
                      className={fieldClass("email")}
                      placeholder="jane@example.com"
                    />
                    {errors.email && touched.email ? (
                      <p id="email-error" className={errorClass}>
                        {errors.email}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <label htmlFor="phone" className={labelClass}>
                      Phone number <span className="normal-case tracking-normal">(optional)</span>
                    </label>
                    <input
                      id="phone"
                      suppressHydrationWarning
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      value={fields.phone}
                      onChange={(event) => update("phone", event.target.value)}
                      onBlur={() => handleBlur("phone")}
                      aria-invalid={Boolean(errors.phone && touched.phone)}
                      aria-describedby={errors.phone && touched.phone ? "phone-error" : "phone-hint"}
                      className={fieldClass("phone")}
                      placeholder="(310) 555-0100"
                    />
                    {errors.phone && touched.phone ? (
                      <p id="phone-error" className={errorClass}>
                        {errors.phone}
                      </p>
                    ) : (
                      <p id="phone-hint" className="mt-1.5 font-sans text-xs text-brand-muted">
                        Only used to arrange the consultation call.
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label htmlFor="format" className={labelClass}>
                      Session format
                    </label>
                    <select
                      id="format"
                      suppressHydrationWarning
                      name="format"
                      value={fields.preferredFormat}
                      onChange={(event) => update("preferredFormat", event.target.value)}
                      className={fieldClass("preferredFormat")}
                    >
                      <option>In-person (Santa Monica)</option>
                      <option>Telehealth (California)</option>
                      <option>Flexible / either</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="interest" className={labelClass}>
                      Primary focus
                    </label>
                    <select
                      id="interest"
                      suppressHydrationWarning
                      name="interest"
                      value={fields.areaOfInterest}
                      onChange={(event) => update("areaOfInterest", event.target.value)}
                      className={fieldClass("areaOfInterest")}
                    >
                      <option>Anxiety &amp; Panic Disorders</option>
                      <option>Trauma &amp; EMDR Therapy</option>
                      <option>Burnout &amp; Perfectionism</option>
                      <option>Somatic &amp; Nervous System</option>
                      <option>General therapy inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <div className="flex items-baseline justify-between gap-3">
                    <label htmlFor="message" className={labelClass}>
                      How can Dr. Reynolds support you?
                    </label>
                    <span
                      className={`tabular mb-2 font-sans text-[0.68rem] ${
                        remaining < 0 ? "text-red-700" : "text-brand-muted"
                      }`}
                    >
                      {remaining} characters left
                    </span>
                  </div>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={fields.message}
                    onChange={(event) => update("message", event.target.value)}
                    onBlur={() => handleBlur("message")}
                    aria-invalid={Boolean(errors.message && touched.message)}
                    aria-describedby="message-hint"
                    className={`${fieldClass("message")} resize-none`}
                    placeholder="Briefly describe what you're looking for or any scheduling preferences..."
                  />
                  <p id="message-hint" className="mt-1.5 font-sans text-xs text-brand-muted">
                    Scheduling preferences and general goals are enough for a first reply.
                  </p>
                </div>

                <div>
                  <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-brand-secondary/50 bg-brand-sand/40 p-4 font-sans text-xs leading-relaxed text-brand-muted">
                    <input
                      id="consent"
                      suppressHydrationWarning
                      name="consent"
                      type="checkbox"
                      checked={fields.consent}
                      onChange={(event) => update("consent", event.target.checked)}
                      onBlur={() => handleBlur("consent")}
                      aria-invalid={Boolean(errors.consent && touched.consent)}
                      aria-describedby={errors.consent && touched.consent ? "consent-error" : undefined}
                      className="mt-0.5 h-4 w-4 shrink-0 rounded border-brand-secondary text-brand-primary focus:ring-brand-primary"
                    />
                    <span>
                      I have read the{" "}
                      <Link href="/privacy" className="font-semibold text-brand-primary underline">
                        privacy notice
                      </Link>{" "}
                      and agree that Dr. Maya Reynolds may contact me about my inquiry. This form
                      is not monitored for emergencies.
                    </span>
                  </label>
                  {errors.consent && touched.consent ? (
                    <p id="consent-error" className={errorClass}>
                      {errors.consent}
                    </p>
                  ) : null}
                </div>

                {/* Spam trap: hidden from people, tempting for bots */}
                <div aria-hidden="true" className="hidden">
                  <label htmlFor="company-website">Company website</label>
                    <input
                      id="company-website"
                      suppressHydrationWarning
                    name="company-website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={fields.honeypot}
                    onChange={(event) => update("honeypot", event.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  suppressHydrationWarning
                  disabled={status === "submitting"}
                  className="pressable flex w-full items-center justify-center gap-2.5 rounded-xl bg-brand-primary py-4 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-md hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 aria-hidden="true" size={16} className="animate-spin" />
                      Sending securely...
                    </>
                  ) : (
                    <>
                      <Send aria-hidden="true" size={16} />
                      Send confidential message
                    </>
                  )}
                </button>

                <p aria-live="polite" className="text-center font-sans text-xs text-brand-muted">
                  {status === "submitting"
                    ? "Sending your inquiry. This usually takes a moment."
                    : "Typical reply time: 24 to 48 business hours."}
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
