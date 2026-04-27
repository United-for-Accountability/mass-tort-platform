import Head from 'next/head';
import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { getPeoplesLastResortState } from '../../../data/contingentCases';

export default function PeoplesLastResortDeclaration() {
  const caseState = getPeoplesLastResortState();
  const initialFormData = {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    birthYear: '',
    residencyState: '',
    verificationMethod: 'manual-review',
    verificationReference: '',
    statement: '',
    adult_attestation: false,
    us_connection_attestation: false,
    verification_acknowledgement: false,
    verification_contact_consent: false,
    consent_checked: false,
    signature_name: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [captchaToken, setCaptchaToken] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [submissionError, setSubmissionError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmissionError('');

    if (!captchaToken) {
      alert('Please verify the CAPTCHA before submitting.');
      return;
    }

    if (!formData.consent_checked || !formData.signature_name.trim()) {
      alert('Consent and signature are required.');
      return;
    }

    if (!formData.adult_attestation || !formData.us_connection_attestation || !formData.verification_acknowledgement || !formData.verification_contact_consent) {
      alert('Please complete the required contingent-case attestations before submitting.');
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await fetch('/api/cases/peoples-last-resort/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          token: captchaToken,
        }),
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || 'Unable to submit declaration.');
      }

      setSubmitted(true);
      setFormData(initialFormData);
      setCaptchaToken(null);
      event.target.reset();
    } catch (error) {
      console.error('Error submitting contingent declaration:', error);
      setSubmissionError(error.message || 'Unable to submit declaration.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || process.env.NEXT_PUBLIC_RECAPTCHA_KEY;

  return (
    <>
      <Head>
        <title>{caseState.title} Declaration | United for Accountability</title>
        <meta
          name="description"
          content="Join the contingent declaration archive for The People's Last Resort. Submissions are preserved now and held pending identity-verification workflow, majority-threshold configuration, and any later court-denial trigger."
        />
      </Head>

      <Navbar />

      <main className="bg-stone-50 px-6 py-12 md:px-12 lg:px-24">
        <div className="mx-auto max-w-3xl space-y-8">
          <header className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-red-700">Contingent declaration intake</p>
            <h1 className="text-4xl font-bold text-slate-950">Join The People&apos;s Last Resort</h1>
            <p className="text-lg leading-8 text-slate-700">
              This form collects declarations now, but it does not claim that a verified-majority benchmark or a court dismissal already exists. Your submission is preserved as part of a contingent record while the verification workflow and later trigger conditions are built out.
            </p>
          </header>

          <section className="rounded-3xl border border-blue-200 bg-blue-50 p-6 text-blue-950">
            <h2 className="text-xl font-semibold">What your submission means right now</h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-blue-900">
              <li>Your declaration is collected immediately and stored under this case.</li>
              <li>It is not yet counted toward a verified-majority threshold.</li>
              <li>The post-denial notice remains inactive unless both the threshold and a court denial are recorded.</li>
            </ul>
          </section>

          {submitted && (
            <p className="rounded-2xl bg-green-50 px-5 py-4 text-lg font-semibold text-green-800">
              Thank you. Your declaration has been recorded and is now queued for verification review.
            </p>
          )}

          {submissionError && (
            <p className="rounded-2xl bg-red-50 px-5 py-4 text-sm font-semibold text-red-700">
              {submissionError}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl bg-white p-8 shadow-sm">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-slate-700">Full Name *</label>
              <input id="fullName" name="fullName" type="text" required onChange={handleChange} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm" />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email Address *</label>
              <input id="email" name="email" type="email" required onChange={handleChange} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm" />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-slate-700">Phone Number</label>
              <input id="phone" name="phone" type="tel" onChange={handleChange} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm" />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-slate-700">City and State *</label>
              <input id="location" name="location" type="text" required placeholder="City, State" onChange={handleChange} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm" />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="birthYear" className="block text-sm font-medium text-slate-700">Birth Year *</label>
                <input id="birthYear" name="birthYear" type="number" min="1900" max="2100" required onChange={handleChange} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm" />
              </div>
              <div>
                <label htmlFor="residencyState" className="block text-sm font-medium text-slate-700">State of Primary Residency *</label>
                <input id="residencyState" name="residencyState" type="text" required onChange={handleChange} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm" />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="verificationMethod" className="block text-sm font-medium text-slate-700">Preferred Verification Method *</label>
                <select id="verificationMethod" name="verificationMethod" required onChange={handleChange} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm" defaultValue="manual-review">
                  <option value="manual-review">Manual review with follow-up</option>
                  <option value="state-id-check">State ID check (review team follow-up)</option>
                  <option value="voter-roll-cross-check">Voter roll cross-check (review team follow-up)</option>
                </select>
              </div>
              <div>
                <label htmlFor="verificationReference" className="block text-sm font-medium text-slate-700">Verification Reference (optional)</label>
                <input id="verificationReference" name="verificationReference" type="text" placeholder="Last 4 digits, registration ID, or reviewer note" onChange={handleChange} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm" />
              </div>
            </div>

            <div>
              <label htmlFor="statement" className="block text-sm font-medium text-slate-700">Why are you joining this contingent case?</label>
              <textarea id="statement" name="statement" rows="6" onChange={handleChange} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm" placeholder="Describe why you believe this last-resort theory should be preserved or when you believe it would ripen." />
            </div>

            <section className="space-y-4 rounded-2xl bg-slate-50 p-5">
              <h2 className="text-lg font-semibold text-slate-950">Required attestations</h2>

              <label className="flex items-start gap-3 text-sm text-slate-700">
                <input name="adult_attestation" type="checkbox" onChange={handleChange} className="mt-1 h-4 w-4 rounded border-slate-300 text-red-700" />
                <span>I attest that I am an adult and understand this case uses an adult-majority theory.</span>
              </label>

              <label className="flex items-start gap-3 text-sm text-slate-700">
                <input name="us_connection_attestation" type="checkbox" onChange={handleChange} className="mt-1 h-4 w-4 rounded border-slate-300 text-red-700" />
                <span>I attest that I am part of the U.S. adult population this case is attempting to measure.</span>
              </label>

              <label className="flex items-start gap-3 text-sm text-slate-700">
                <input name="verification_acknowledgement" type="checkbox" onChange={handleChange} className="mt-1 h-4 w-4 rounded border-slate-300 text-red-700" />
                <span>I understand my submission enters a review queue and is not counted toward the majority threshold until verified by case administrators.</span>
              </label>

              <label className="flex items-start gap-3 text-sm text-slate-700">
                <input name="verification_contact_consent" type="checkbox" onChange={handleChange} className="mt-1 h-4 w-4 rounded border-slate-300 text-red-700" />
                <span>I consent to follow-up contact for verification evidence required to count my declaration toward the threshold.</span>
              </label>
            </section>

            <div>
              <label htmlFor="signature_name" className="block text-sm font-medium text-slate-700">Type Your Full Name as Signature *</label>
              <input id="signature_name" name="signature_name" type="text" required onChange={handleChange} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm" />
            </div>

            <label className="flex items-start gap-3 text-sm text-slate-700">
              <input name="consent_checked" type="checkbox" onChange={handleChange} className="mt-1 h-4 w-4 rounded border-slate-300 text-red-700" />
              <span>I consent to the use of my declaration for The People&apos;s Last Resort contingent case and understand that later filing or publication depends on future verification and court-status conditions.</span>
            </label>

            {recaptchaSiteKey ? (
              <ReCAPTCHA sitekey={recaptchaSiteKey} onChange={(token) => setCaptchaToken(token)} />
            ) : (
              <p className="text-red-600">reCAPTCHA site key missing. Form submission disabled.</p>
            )}

            <button type="submit" disabled={isSubmitting} className="w-full rounded-full bg-red-700 px-4 py-3 text-lg font-semibold text-white transition hover:bg-red-800 disabled:cursor-not-allowed disabled:bg-red-400">
              {isSubmitting ? 'Submitting...' : 'Submit contingent declaration'}
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
}