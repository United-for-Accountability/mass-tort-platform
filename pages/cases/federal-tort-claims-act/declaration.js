import Head from 'next/head';
import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { db } from '../../../lib/firebase';
import { getFtcaConsentChallengeState } from '../../../data/contingentCases';

export default function FederalTortClaimsActDeclaration() {
  const caseState = getFtcaConsentChallengeState();
  const initialFormData = {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    statement: '',
    adult_attestation: false,
    us_population_attestation: false,
    verification_acknowledgement: false,
    court_respect_acknowledgement: false,
    consent_checked: false,
    signature_name: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [captchaToken, setCaptchaToken] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!captchaToken) {
      alert('Please verify the CAPTCHA before submitting.');
      return;
    }

    if (!formData.consent_checked || !formData.signature_name.trim()) {
      alert('Consent and signature are required.');
      return;
    }

    if (
      !formData.adult_attestation ||
      !formData.us_population_attestation ||
      !formData.verification_acknowledgement ||
      !formData.court_respect_acknowledgement
    ) {
      alert('Please complete the required FTCA case attestations before submitting.');
      return;
    }

    try {
      await addDoc(collection(db, caseState.collectionName), {
        ...formData,
        caseSlug: caseState.slug,
        caseTitle: caseState.title,
        activationMode: caseState.activationMode,
        thresholdType: caseState.thresholdType,
        verification_status: 'pending-review',
        counted_toward_threshold: false,
        submittedAt: Timestamp.now(),
        clientSignedAt: new Date().toISOString()
      });
      setSubmitted(true);
      setFormData(initialFormData);
      event.target.reset();
    } catch (error) {
      console.error('Error submitting FTCA declaration:', error);
    }
  };

  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || process.env.NEXT_PUBLIC_RECAPTCHA_KEY;

  return (
    <>
      <Head>
        <title>{caseState.title} Declaration | United for Accountability</title>
        <meta
          name="description"
          content="Join the contingent declaration record for the FTCA consent challenge. Submissions are preserved now while majority verification is built and before any activation claim is made."
        />
      </Head>

      <Navbar />

      <main className="bg-stone-50 px-6 py-12 md:px-12 lg:px-24">
        <div className="mx-auto max-w-3xl space-y-8">
          <header className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-800">Contingent declaration intake</p>
            <h1 className="text-4xl font-bold text-slate-950">Join the FTCA Consent Challenge</h1>
            <p className="text-lg leading-8 text-slate-700">
              This declaration form preserves support for a constitutional challenge to the Federal Tort Claims Act&apos;s consent barrier. The campaign states that activation requires verified support exceeding one-half of the U.S. adult population, so current submissions are recorded now but do not yet count toward that threshold.
            </p>
          </header>

          <section className="rounded-3xl border border-blue-200 bg-blue-50 p-6 text-blue-950">
            <h2 className="text-xl font-semibold">What your submission means right now</h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-blue-900">
              <li>Your declaration is collected immediately and stored under this FTCA case.</li>
              <li>It is preserved as support and testimony, not as proof that the majority threshold has already been reached.</li>
              <li>Only verified U.S. adults can eventually count toward activation of the mass demand.</li>
            </ul>
          </section>

          {submitted && (
            <p className="rounded-2xl bg-green-50 px-5 py-4 text-lg font-semibold text-green-800">
              Thank you. Your FTCA declaration has been recorded.
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

            <div>
              <label htmlFor="statement" className="block text-sm font-medium text-slate-700">Why are you supporting this challenge?</label>
              <textarea
                id="statement"
                name="statement"
                rows="6"
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm"
                placeholder="Describe why the sovereign people should be able to seek judicial accountability without government consent, or describe the systemic harms you believe this challenge should put before the courts."
              />
            </div>

            <section className="space-y-4 rounded-2xl bg-slate-50 p-5">
              <h2 className="text-lg font-semibold text-slate-950">Required attestations</h2>

              <label className="flex items-start gap-3 text-sm text-slate-700">
                <input name="adult_attestation" type="checkbox" onChange={handleChange} className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-800" />
                <span>I attest that I am an adult and understand this campaign uses an adult-majority activation theory.</span>
              </label>

              <label className="flex items-start gap-3 text-sm text-slate-700">
                <input name="us_population_attestation" type="checkbox" onChange={handleChange} className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-800" />
                <span>I attest that I am part of the U.S. adult population this campaign is attempting to measure for activation.</span>
              </label>

              <label className="flex items-start gap-3 text-sm text-slate-700">
                <input name="verification_acknowledgement" type="checkbox" onChange={handleChange} className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-800" />
                <span>I understand that my submission will remain pending verification and does not count toward any majority threshold until a formal identity-verification workflow exists.</span>
              </label>

              <label className="flex items-start gap-3 text-sm text-slate-700">
                <input name="court_respect_acknowledgement" type="checkbox" onChange={handleChange} className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-800" />
                <span>I understand this campaign is directed to the courts for constitutional review and is asking the judiciary to hear the claim rather than bypassing the judicial process.</span>
              </label>
            </section>

            <div>
              <label htmlFor="signature_name" className="block text-sm font-medium text-slate-700">Type Your Full Name as Signature *</label>
              <input id="signature_name" name="signature_name" type="text" required onChange={handleChange} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm" />
            </div>

            <label className="flex items-start gap-3 text-sm text-slate-700">
              <input name="consent_checked" type="checkbox" onChange={handleChange} className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-800" />
              <span>I consent to the use of my declaration for the FTCA consent challenge and understand that any claim of activation depends on a later verified-majority benchmark.</span>
            </label>

            {recaptchaSiteKey ? (
              <ReCAPTCHA sitekey={recaptchaSiteKey} onChange={(token) => setCaptchaToken(token)} />
            ) : (
              <p className="text-red-600">reCAPTCHA site key missing. Form submission disabled.</p>
            )}

            <button type="submit" className="w-full rounded-full bg-blue-800 px-4 py-3 text-lg font-semibold text-white transition hover:bg-blue-900">
              Submit FTCA declaration
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
}