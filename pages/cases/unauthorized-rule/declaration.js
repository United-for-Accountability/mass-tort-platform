import Head from 'next/head';
import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

export default function DeclarationForm() {
  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaToken) {
      alert('Please verify the CAPTCHA before submitting.');
      return;
    }

    try {
      await addDoc(collection(db, 'DeclarationOfUnauthorizedRule'), {
        ...formData,
        submittedAt: Timestamp.now()
      });
      setSubmitted(true);
      e.target.reset();
    } catch (err) {
      console.error('🔥 Error submitting declaration:', err);
    }
  };

  return (
    <>
      <Head>
        <title>Declaration of Unauthorized Rule | United for Accountability</title>
        <meta name="description" content="Sign the public declaration to lawfully reject unauthorized rule and defend your rights under the 9th Amendment." />
      </Head>

      <Navbar />

      <main className="bg-gray-50 py-12 px-6 md:px-12 lg:px-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-red-700 mb-6">✍️ Declaration of Unauthorized Rule</h1>

          {submitted && (
            <p className="text-green-700 text-lg font-semibold mb-6">
              ✅ Thank you! Your declaration has been recorded.
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
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

            <div className="flex items-start">
              <input id="consent" name="consent" type="checkbox" required onChange={handleChange} className="h-4 w-4 text-red-600" />
              <label htmlFor="consent" className="ml-2 text-sm text-gray-700">
                I affirm this is voluntary and may be used in a legal filing.
              </label>
            </div>

            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY}
              onChange={(token) => setCaptchaToken(token)}
              className="my-4"
            />
            <button type="submit" className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700">
              ✅ Submit My Declaration
            </button>
          </form>

          <div className="mt-16 border-t pt-10">
            <h2 className="text-2xl font-bold text-green-700 mb-4">🌱 Why This Is Bigger Than Money</h2>
            <p className="text-gray-800 text-lg mb-6">
              We understand that people are struggling. That the system has pushed many to the edge — financially, emotionally, even spiritually. And yes, if this mass tort succeeds, it may result in financial damages for some plaintiffs.
            </p>
            <p className="text-gray-800 text-lg mb-6">
              But this case is not just about that.
            </p>
            <p className="text-gray-800 text-lg mb-6">
              This is about reclaiming what money can’t buy:
            </p>
            <ul className="list-disc ml-6 text-gray-700 text-base mb-6">
              <li>Your right to live without fear of eviction, illness, or silence.</li>
              <li>Your right to be represented by a government that actually serves you.</li>
              <li>Your right to build a future — not just survive another year.</li>
            </ul>
            <p className="text-gray-800 text-lg mb-6">
              By joining this movement, you are helping to:
            </p>
            <ul className="list-disc ml-6 text-gray-700 text-base mb-6">
              <li>End government by corporate decree</li>
              <li>Reassert the dignity of every human life</li>
              <li>Force accountability into a system designed to forget you</li>
            </ul>
            <p className="text-gray-800 text-lg mb-6">
              If we win — and we will — we don’t just get restitution.<br />
              We get something deeper:<br />
              <strong className="text-red-700">The chance to live a fulfilling life, free from systemic control.</strong><br />
              The kind of life <em>you were always meant to live.</em>
            </p>
            <p className="text-lg text-red-700 font-semibold">
              This is not a lawsuit for dollars.<br />
              It’s a lawsuit for your future.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
