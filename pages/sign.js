import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useRef, useState } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import StoryAIHelper from '../components/StoryAIHelper';
import GuidedStoryHelper from '../components/GuidedStoryHelper';
// Submission handled via API route to ensure server-side validation

const signSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Sign the Declaration | United for Accountability",
  description:
    "Share your story of harm and join the United for Accountability mass tort movement by signing the Declaration.",
  url: "https://www.unitedforaccountability.org/sign",
};

export default function Sign() {
  const [harmStatement, setHarmStatement] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [mode, setMode] = useState(''); // '' | 'ai' | 'guided'

  const recaptchaRef = useRef(null);

  const harmCategories = [
    'housing',
    'healthcare',
    'policing',
    'environment',
    'economic'
  ];

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    addressLine1: '',
    city: '',
    state: '',
    county: '',
    zip: '',
    standingType: 'direct-harm',
    harmCategory: [],
    consentToLegalUse: false,
    perjuryDeclaration: false,
    eSignAcknowledgment: false,
    typedSignature: ''
  });

  const handleChange = (e) => {
    const { name, type, value, checked, options } = e.target;
    if (name === 'harmCategory') {
      const values = Array.from(options)
        .filter((o) => o.selected)
        .map((o) => o.value);
      setFormData((prev) => ({ ...prev, harmCategory: values }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await recaptchaRef.current.executeAsync();

    if (!formData.consentToLegalUse || !formData.perjuryDeclaration || !formData.eSignAcknowledgment) {
      alert('All legal acknowledgments must be accepted.');
      return;
    }
    if (!formData.typedSignature.trim()) {
      alert('Typed signature is required.');
      return;
    }
    if (formData.standingType === 'direct-harm' && !harmStatement.trim()) {
      alert('Please describe your harm.');
      return;
    }

    const clientSignedAt = new Date().toISOString();

    const res = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        harmStatement,
        clientSignedAt,
        token
      })
    });

    if (res.ok) {
      setSubmitted(true);
    } else {
      const { error } = await res.json();
      alert(error || 'Something went wrong submitting your declaration.');
    }
  };

  return (
    <>
      <Head>
        <title>Sign the Declaration | United for Accountability</title>
        <meta
          name="description"
          content="Share your story of harm and join the United for Accountability mass tort movement by signing the Declaration."
        />
        <meta property="og:title" content="Sign the Declaration" />
        <meta
          property="og:description"
          content="Submit your story of harm and sign the Declaration to help build a powerful mass tort case."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.unitedforaccountability.org/sign" />
        <meta
          property="og:image"
          content="https://www.unitedforaccountability.org/images/united-for-accountability-logo.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sign the Declaration | United for Accountability" />
        <meta
          name="twitter:description"
          content="Mass Tort | Civil Rights | Justice Movement"
        />
        <meta
          name="twitter:image"
          content="https://www.unitedforaccountability.org/images/united-for-accountability-logo.png"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(signSchema) }}
        />
      </Head>

      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-12 text-gray-900 grid md:grid-cols-2 gap-10">
        {submitted ? (
          <div className="md:col-span-2 bg-green-100 text-green-800 p-6 rounded shadow text-center">
            ✅ Thank you. Your story and information have been submitted.
          </div>
        ) : (
          <>
            {/* LEFT COLUMN: STORY ASSISTANT */}
            <div>
              <h2 className="text-xl font-bold mb-4">✍️ Tell Your Story</h2>
              <p className="text-sm text-gray-600 mb-4">
                This is your space to tell the truth. Choose how you want to begin.
              </p>

              {!mode && (
                <div className="space-y-3">
                  <button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                    onClick={() => setMode('guided')}
                  >
                    🤖 Let Ask Accountability Guide Me
                  </button>
                  <button
                    className="w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 px-4 rounded"
                    onClick={() => setMode('ai')}
                  >
                    ⚡ Write with AI Help
                  </button>
                </div>
              )}

              {mode === 'ai' && (
                <div className="mt-4">
                  <StoryAIHelper onComplete={(generated) => setHarmStatement(generated)} />
                </div>
              )}

              {mode === 'guided' && (
                <div className="mt-4">
                  <GuidedStoryHelper onComplete={(generated) => setHarmStatement(generated)} />
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: FORM */}
            <form onSubmit={handleSubmit}>
              <h2 className="text-xl font-bold mb-4">📋 Your Information</h2>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">First Name *</label>
                    <input name="firstName" value={formData.firstName} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Last Name *</label>
                    <input name="lastName" value={formData.lastName} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Email *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Phone *</label>
                  <input name="phone" value={formData.phone} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Address Line 1</label>
                  <input name="addressLine1" value={formData.addressLine1} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">City</label>
                    <input name="city" value={formData.city} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">State *</label>
                    <input name="state" value={formData.state} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">County *</label>
                    <input name="county" value={formData.county} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">ZIP</label>
                    <input name="zip" value={formData.zip} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Type of Standing *</label>
                  <select name="standingType" value={formData.standingType} onChange={handleChange} required className="w-full border px-3 py-2 rounded">
                    <option value="direct-harm">Direct harm</option>
                    <option value="third-party/associational">Third-party / Associational</option>
                    <option value="public-interest">Public interest</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Harm Category</label>
                  <select multiple name="harmCategory" value={formData.harmCategory} onChange={handleChange} className="w-full border px-3 py-2 rounded h-32">
                    {harmCategories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {formData.standingType === 'direct-harm' && (
                  <div>
                    <label className="block text-sm font-medium mb-1">Brief description of your harm *</label>
                    <textarea name="harmStatement" value={harmStatement} onChange={(e) => setHarmStatement(e.target.value)} required className="w-full border px-3 py-2 rounded" />
                  </div>
                )}

                <p className="text-sm mt-6">
                  <strong>Declaration:</strong> I declare under penalty of perjury that the foregoing is true and correct.
                </p>
                <p className="text-sm">
                  <strong>Electronic Signature:</strong> I agree that my typed name below constitutes my electronic signature and has the same legal effect as a handwritten signature under the ESIGN Act.
                </p>

                <label className="block mt-2">
                  <input type="checkbox" name="consentToLegalUse" checked={formData.consentToLegalUse} onChange={handleChange} required className="mr-2" />
                  I consent to the use of this declaration for legal proceedings.
                </label>
                <label className="block">
                  <input type="checkbox" name="perjuryDeclaration" checked={formData.perjuryDeclaration} onChange={handleChange} required className="mr-2" />
                  I make this declaration under penalty of perjury.
                </label>
                <label className="block">
                  <input type="checkbox" name="eSignAcknowledgment" checked={formData.eSignAcknowledgment} onChange={handleChange} required className="mr-2" />
                  I agree this is my electronic signature.
                </label>

                <div className="mt-2">
                  <label className="block text-sm font-medium mb-1">Type full legal name as signature *</label>
                  <input name="typedSignature" value={formData.typedSignature} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
                </div>

                <input type="hidden" name="clientSignedAt" value={new Date().toISOString()} />

                {harmStatement && (
                  <button type="submit" className="mt-6 w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 font-semibold">
                    🖊 Submit My Declaration
                  </button>
                )}
              </div>
              <ReCAPTCHA ref={recaptchaRef} sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY} size="invisible" />
            </form>
          </>
        )}
      </main>

      <Footer />
    </>
  );
}
