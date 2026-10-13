import type { Metadata } from "next";
import LegalLayout, { LegalSection } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Good Faith Estimate",
  description:
    "Cost information and a Good Faith Estimate summary for clients of Dr. Maya Reynolds, PsyD.",
};

export default function GoodFaithEstimatePage() {
  return (
    <LegalLayout
      eyebrow="Fees & estimates"
      title="Good Faith Estimate"
      updated="January 9, 2026"
      summary="You have the right to receive a Good Faith Estimate explaining how much your care will cost. The figures below are the current uninsured, self-pay rates for this practice and are provided so you can plan before your first session."
    >
      <LegalSection heading="Current self-pay rates">
        <ul className="space-y-3">
          <li className="flex items-baseline justify-between gap-6 border-b border-brand-secondary/40 pb-3">
            <span>Initial intake session (60 minutes)</span>
            <span className="tabular font-medium text-brand-dark">$285</span>
          </li>
          <li className="flex items-baseline justify-between gap-6 border-b border-brand-secondary/40 pb-3">
            <span>Individual therapy session (50 minutes)</span>
            <span className="tabular font-medium text-brand-dark">$240</span>
          </li>
          <li className="flex items-baseline justify-between gap-6 border-b border-brand-secondary/40 pb-3">
            <span>EMDR session (75 minutes)</span>
            <span className="tabular font-medium text-brand-dark">$310</span>
          </li>
          <li className="flex items-baseline justify-between gap-6">
            <span>Complimentary consultation call (15 minutes)</span>
            <span className="tabular font-medium text-brand-dark">No charge</span>
          </li>
        </ul>
        <p>
          Rates are reviewed each January. Your rate is locked for the course of your treatment
          once you begin, and you will receive written notice at least 60 days before any change
          takes effect.
        </p>
      </LegalSection>

      <LegalSection heading="How the estimate works">
        <p>
          Before your first appointment you receive a written estimate that lists the expected
          number of sessions and the total expected cost. If the plan changes during treatment —
          for example, if we agree to add EMDR — a revised estimate is issued before the change
          begins.
        </p>
        <p>
          Payment is collected at the time of the appointment by card or ACH. Cancellations made
          at least 48 hours in advance are free of charge; within 48 hours the full session rate
          applies.
        </p>
      </LegalSection>

      <LegalSection heading="Insurance and reimbursement">
        <p>
          This practice is out of network. That choice protects confidentiality and keeps
          treatment decisions between you and your therapist. If you have PPO coverage, the
          practice provides a monthly superbill with the diagnostic and procedure codes your
          insurer needs for reimbursement.
        </p>
        <p>
          Coverage varies by plan. Many clients with high-deductible plans pay the session rate
          directly and receive partial reimbursement once the deductible is met.
        </p>
      </LegalSection>

      <LegalSection heading="Disputing a bill">
        <p>
          If you receive a bill that is at least $400 more than your Good Faith Estimate, you
          may dispute it. Start a dispute within 120 calendar days of the original bill by
          emailing{" "}
          <a href="mailto:contact@drmayareynolds.com" className="text-brand-primary underline">
            contact@drmayareynolds.com
          </a>
          . You will receive a written response within 30 days.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
