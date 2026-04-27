import Head from 'next/head';
import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import SigningForSection from '../../../components/SigningForSection';

export default function DeclarationForm() {
  const initialFormData = {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    address: '',
    race: '',
    gender: '',
    age: '',
    income: '',
    statement: '',
    sign_for: 'self',
    signer_fullName: '',
    signer_email: '',
    signer_phone: '',
    relationship_to_person: '',
    rep_fullName: '',
    rep_dob: '',
    rep_city: '',
    rep_state: '',
    rep_zip: '',
    authority_type: '',
    authority_file: null,
    authority_attestation: false,
    consent_checked: false,
    signature_name: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [submitted, setSubmitted] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaToken) {
      alert('Please verify the CAPTCHA before submitting.');
      return;
    }

    if (!formData.consent_checked || !formData.signature_name.trim()) {
      alert('Consent and signature are required.');
      return;
    }

    if (formData.sign_for === 'minor') {
      if (!formData.rep_dob) {
        alert('Date of birth required for the person represented.');
        return;
      }
      const age = Math.floor((Date.now() - new Date(formData.rep_dob).getTime()) / (365.25 * 24 * 60 * 60 * 1000));
      if (age >= 18) {
        alert('Represented person must be under 18.');
        return;
      }
      if (!['Parent', 'Legal Guardian'].includes(formData.authority_type)) {
        alert('Invalid authority type for minor.');
        return;
      }
      if (formData.authority_type === 'Legal Guardian' && !formData.authority_file) {
        alert('Proof of authority is required for Legal Guardian.');
        return;
      }
    }

    if (formData.sign_for === 'incapacity') {
      if (!formData.authority_type) {
        alert('Authority type required.');
        return;
      }
      const needsFile = ['Power of Attorney', 'Court‑Appointed Conservator/Guardian', 'Healthcare Proxy'].includes(formData.authority_type);
      if (needsFile && !formData.authority_file) {
        alert('Proof of authority file required.');
        return;
      }
      if (formData.authority_type === 'No formal document – next of kin attestation' && !formData.authority_attestation) {
        alert('Attestation checkbox required.');
        return;
      }
    }

    try {
      const submissionData = { ...formData };
      delete submissionData.authority_file;
      submissionData.submittedAt = Timestamp.now();
      submissionData.clientSignedAt = new Date().toISOString();
      await addDoc(collection(db, 'DeclarationOfPalestineRecognition'), submissionData);
      setSubmitted(true);
      setFormData(initialFormData);
      e.target.reset();
    } catch (err) {
      console.error('🔥 Error submitting declaration:', err);
    }
  };

  return (
    <>
      <Head>
        <title>Declaration to Recognize Palestine | United for Accountability</title>
        <meta name="description" content="Sign the global declaration to recognize Palestine as a sovereign state and hold governments accountable under constitutional and international law." />
      </Head>

      <Navbar />

      <main className="bg-gray-50 py-12 px-6 md:px-12 lg:px-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-green-700 mb-6">✍️ Declaration of Recognition: We Recognize Palestine</h1>

          {submitted && (
            <p className="text-green-700 text-lg font-semibold mb-6">
              ✅ Thank you! Your declaration has been recorded.
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
            <SigningForSection formData={formData} setFormData={setFormData} />

            {formData.sign_for === 'self' && (
              <>
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name *</label>
                  <input type="text" id="fullName" name="fullName" required onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address *</label>
                  <input type="email" id="email" name="email" required onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number (optional)</label>
                  <input type="tel" id="phone" name="phone" onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>
              </>
            )}

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">City & State *</label>
              <input type="text" id="location" name="location" required placeholder="City, State" onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Home Address (optional)</label>
              <input type="text" id="address" name="address" placeholder="Street Address" onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
            </div>

            <div>
              <label htmlFor="race" className="block text-sm font-medium text-gray-700">Race / Ethnicity (optional)</label>
              <input type="text" id="race" name="race" placeholder="e.g., Black, Latino, White, Asian, Indigenous..." onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
            </div>

            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender Identity (optional)</label>
              <input type="text" id="gender" name="gender" onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
            </div>

            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age Range (optional)</label>
              <select id="age" name="age" onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                <option value="">Select...</option>
                <option>Under 18</option>
                <option>18–24</option>
                <option>25–34</option>
                <option>35–44</option>
                <option>45–54</option>
                <option>55–64</option>
                <option>65+</option>
              </select>
            </div>

            <div>
              <label htmlFor="income" className="block text-sm font-medium text-gray-700">Income Bracket (optional)</label>
              <input type="text" id="income" name="income" placeholder="e.g., $0–25k, $25–50k..." onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
            </div>

            <div className="text-sm text-gray-600 bg-gray-100 p-4 rounded">
              <strong>Why are we asking for this?</strong>
              <ul className="list-disc ml-6 mt-1 text-gray-600 text-sm">
                <li>Identify patterns of systemic harm (racial, regional, age-based, etc.)</li>
                <li>Strengthen legal standing in federal civil rights claims</li>
                <li>Contact you if your declaration becomes part of a formal filing</li>
                <li>Ensure jurisdictional accuracy for where the harm occurred</li>
              </ul>
              <p className="mt-2">We will never sell or publish your information. All data is encrypted and used only for lawful public-interest litigation.</p>
            </div>

            <div>
              <label htmlFor="statement" className="block text-sm font-medium text-gray-700">Why are you signing? (optional)</label>
              <textarea id="statement" name="statement" rows="4" onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="Your personal thoughts or message..."></textarea>
            </div>

            {(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || process.env.NEXT_PUBLIC_RECAPTCHA_KEY) ? (
              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || process.env.NEXT_PUBLIC_RECAPTCHA_KEY}
                onChange={(token) => setCaptchaToken(token)}
                className="my-4"
              />
            ) : (
              <p className="text-red-600">
                reCAPTCHA site key missing. Form submission disabled.
              </p>
            )}
            <button type="submit" className="w-full bg-green-700 text-white py-2 px-4 rounded hover:bg-green-800">
              ✅ Submit My Declaration
            </button>
          </form>

          <div className="mt-12 text-sm text-gray-700 bg-gray-100 p-6 rounded">
            <p className="mb-2">
              Your voice becomes part of a coordinated legal filing to end systemic denial of Palestinian statehood, challenge government complicity, and establish retained public rights under the 9th Amendment and international law.
            </p>
            <p>
              This is not just a petition. It is a lawful declaration of recognition, solidarity, and legal standing.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
