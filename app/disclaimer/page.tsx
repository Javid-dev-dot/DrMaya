import type { Metadata } from "next";
import LegalLayout, { LegalSection } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Scope of the information on this website, limits of the content, and emergency guidance.",
};

export default function DisclaimerPage() {
  return (
    <LegalLayout
      eyebrow="Practice policies"
      title="Disclaimer"
      updated="February 2, 2026"
      summary="The content on this website is general information about psychotherapy services in California. It is not medical or mental-health advice, and it does not create a therapist–client relationship."
    >
      <LegalSection heading="No therapist–client relationship">
        <p>
          Reading this website, sending a message through the contact form, or booking a
          consultation does not establish a therapeutic relationship. A professional
          relationship begins only after an intake appointment, a mutual agreement on treatment
          goals, and completion of the practice&apos;s consent documents.
        </p>
      </LegalSection>

      <LegalSection heading="General information only">
        <p>
          Descriptions of anxiety, trauma, burnout, and the modalities used in this practice are
          written for a general audience. They cannot account for your history, medical
          conditions, or current medication. Do not change or stop any treatment on the basis of
          what you read here. Discuss any change with the prescribing clinician involved in your
          care.
        </p>
      </LegalSection>

      <LegalSection heading="Emergencies">
        <p>
          This website and the contact form are not monitored around the clock and must never be
          used in an emergency. If you are in danger of harming yourself or someone else, call
          or text 988 to reach the Suicide &amp; Crisis Lifeline, available 24 hours a day, or
          dial 911.
        </p>
        <p>
          If you are already in treatment here and something urgent comes up between sessions,
          call the practice at{" "}
          <a href="tel:+13105550198" className="text-brand-primary underline">
            (310) 555-0198
          </a>
          . Messages are returned within 24 to 48 business hours.
        </p>
      </LegalSection>

      <LegalSection heading="Results are not guaranteed">
        <p>
          Therapy outcomes depend on many factors, including history, timing, and the work done
          between sessions. While the approaches described here are evidence-based, no specific
          result can be promised for any individual.
        </p>
      </LegalSection>

      <LegalSection heading="External links and images">
        <p>
          Links to outside services, such as mapping and telehealth platforms, are provided for
          convenience. This practice is not responsible for the content or privacy practices of
          those services. Photographs on this website are illustrative and do not depict actual
          clients.
        </p>
      </LegalSection>

      <LegalSection heading="Licensure">
        <p>
          Dr. Maya Reynolds is licensed as a clinical psychologist in the State of California
          (PSY 31245) and practices in accordance with California and APA professional standards.
          Concerns about professional conduct can be raised with the California Board of
          Psychology.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
