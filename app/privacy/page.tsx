import type { Metadata } from "next";
import LegalLayout, { LegalSection } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Privacy notice",
  description:
    "How Dr. Maya Reynolds, PsyD collects, uses, and protects information submitted through this website.",
};

export default function PrivacyPage() {
  return (
    <LegalLayout
      eyebrow="Practice policies"
      title="Privacy notice"
      updated="March 14, 2026"
      summary="This notice explains what information this website collects, how it is used, and the choices you have. It covers this website only. Clinical records created during therapy are governed by a separate privacy practices document provided at your first appointment."
    >
      <LegalSection heading="What this website collects">
        <p>
          When you submit the consultation form, we collect your name, email address, phone
          number (if provided), preferred session format, primary focus, and the short message
          you write. If you email or call the practice instead, we collect whatever information
          you choose to share in that message.
        </p>
        <p>
          Like most websites, our hosting provider records standard technical information such
          as browser type, device type, and the pages you visit. These logs are used for
          security and to keep the site working, and they are not linked to your clinical
          record.
        </p>
      </LegalSection>

      <LegalSection heading="How your information is used">
        <p>
          Contact information is used only to reply to your inquiry, schedule a consultation,
          and send the administrative messages required to run an appointment — reminders,
          invoices, and superbills. We do not sell your information, and we do not share it
          with advertisers.
        </p>
        <p>
          Please do not include diagnoses, medication names, session content, or other
          protected health information in the web form. That detail belongs in session, where
          it is protected by confidentiality and health-privacy law.
        </p>
      </LegalSection>

      <LegalSection heading="How long information is kept">
        <p>
          Inquiry messages are deleted once the conversation has closed, and in any case no
          later than 24 months after the last contact. Clinical records are retained for the
          period required by California law, which is a minimum of seven years after
          treatment ends.
        </p>
      </LegalSection>

      <LegalSection heading="Your choices">
        <p>
          You may ask us what information we hold about you, request a correction, or ask us to
          delete your inquiry. Email the practice and we will respond within 30 days. You can
          also ask us to stop contacting you at any time.
        </p>
      </LegalSection>

      <LegalSection heading="Questions">
        <p>
          For any privacy question, email{" "}
          <a href="mailto:contact@drmayareynolds.com" className="text-brand-primary underline">
            contact@drmayareynolds.com
          </a>{" "}
          or call the practice at{" "}
          <a href="tel:+13105550198" className="text-brand-primary underline">
            (310) 555-0198
          </a>
          .
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
