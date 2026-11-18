import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import Navbar from './Navbar';
import Footer from './Footer';

const CASE_SLUG = 'federal-privatization-public-authority';
const CASE_TITLE =
  "The People's Government: Investigation Into Federal Privatization, Private Control, and the Transfer of Public Authority";

const categoryOptions = [
  'Federal employee experience',
  'Contractor employee experience',
  'Procurement or contracting concern',
  'Public service disruption',
  'Public infrastructure ownership',
  'Corporate ownership information',
  'Financial or billing concern',
  'Agency transparency concern',
  'Legal or constitutional concern',
  'Other documented evidence'
];

const initialFormData = {
  fullName: '',
  email: '',
  phone: '',
  communityLocation: '',
  relationship: '',
  agencyName: '',
  programOrContract: '',
  contractorName: '',
  firstObservedDate: '',
  submissionCategories: [],
  description: '',
  recordsAvailable: '',
  reportsMade: '',
  publicUsePermission: false,
  contactPermission: false,
  noProhibitedMaterial: false,
  consentChecked: false,
  signatureName: ''
};

export default function PublicAuthorityDeclarationForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [captchaToken, setCaptchaToken] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCategoryChange = (event) => {
    const { value, checked } = event.target;
    setFormData((current) => ({
      ...current,
      submissionCategories: checked
        ? [...current.submissionCategories, value]
        : current.submissionCategories.filter((item) => item !== value)
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitted(false);
    setErrorMessage('');

    if (!captchaToken) {
      setErrorMessage('Please complete the CAPTCHA before submitting.');
      return;
    }

    if (formData.submissionCategories.length === 0) {
      setErrorMessage('Please select at least one submission category.');
      return;
    }

    if (!formData.noProhibitedMaterial) {
      setErrorMessage('Please confirm that your submission contains none of the prohibited material listed above.');
      return;
    }

    if (!formData.consentChecked || !formData.signatureName.trim()) {
      setErrorMessage('Consent and a typed signature are required.');
      return;
    }

    setSubmitting(true);

    try {
      await addDoc(collection(db, 'DeclarationOfUnauthorizedRule'), {
        ...formData,
        intakeCategory: CASE_SLUG,
        caseSlug: CASE_SLUG,
        caseTitle: CASE_TITLE,
        verificationStatus: 'unverified',
        submittedAt: Timestamp.now(),
        clientSignedAt: new Date().toISOString()
      });

      setSubmitted(true);
      setFormData(initialFormData);
      setCaptchaToken(null);
      event.target.reset();
    } catch (error) {
      console.error('Error submitting public authority declaration:', error);
      setErrorMessage('Your submission could not be sent. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  const recaptchaSiteKey =
    process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || process.env.NEXT_PUBLIC_RECAPTCHA_KEY;

  return (
    <>
      <Head>
        <title>Submit Evidence: Federal Privatization and Public Authority | United for Accountability</title>
        <meta
          name="description"
          content="Submit documented information about federal privatization, contractor control, agency restructuring, public infrastructure ownership, or related public harm for a pre-litigation investigation."
        />
        <link
          rel="canonical"
          href="https://www.unitedforaccountability.org/cases/federal-privatization-public-authority/declaration"
        />
      </Head>

      <Navbar />

      <main className="bg-gray-50 py-12 px-6 md:px-12 lg:px-24">
        <div className="max-w-3xl mx-auto">
          <Link href="/cases/federal-privatization-public-authority" className="text-blue-800 underline">
            &larr; Back to the investigation
          </Link>
          <h1 className="mt-4 text-3xl font-bold text-blue-800 mb-3">Submit Evidence: The People&apos;s Government</h1>
          <p className="text-gray-700 mb-6">
            Tell us what you know about a specific agency, program, contract, system, or decision. Dates, contract numbers,
            and the records you can point to are more useful than general concerns. Every submission is treated as a lead to
            be checked against public records, not as a verified allegation.
          </p>

          <div className="bg-amber-50 border border-amber-300 rounded-lg p-5 mb-6 text-sm text-amber-950 space-y-2">
            <p className="font-semibold">Do not submit</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Classified or national-security information.</li>
              <li>Records you were not lawfully allowed to take or share.</li>
              <li>Passwords, credentials, or access tokens.</li>
              <li>Other people&apos;s private personal, medical, or financial information, or Social Security or account numbers.</li>
              <li>Material covered by a court order or a nondisclosure obligation you have not lawfully cleared.</li>
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-6 text-sm text-blue-950 space-y-2">
            <p className="font-semibold">If you are a federal or contractor employee</p>
            <p>
              United for Accountability cannot grant whistleblower protection, anonymity, or immunity. Legal protections for
              disclosures generally depend on making them through protected channels: your agency&apos;s Office of Inspector
              General (listed at{' '}
              <a className="underline" href="https://www.oversight.gov" target="_blank" rel="noreferrer">
                oversight.gov
              </a>
              ), the{' '}
              <a className="underline" href="https://osc.gov" target="_blank" rel="noreferrer">
                U.S. Office of Special Counsel
              </a>
              , or Congress. Contractor employees have protections under 41 U.S.C. 4712 for disclosures to specified
              recipients. Consider speaking with an attorney before sharing information you obtained at work.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-5 mb-6 text-sm text-gray-700 space-y-2">
            <p className="font-semibold text-gray-900">Privacy notice</p>
            <p>
              We collect what you type, your contact details, and the time you submit. Authorized United for Accountability
              reviewers use it to evaluate leads for this investigation and, if you allow, to contact you. We do not sell
              submissions. Nothing is published unless you check the public-use box below, and even then we remove your
              contact information. Submissions are deleted or anonymized when no longer needed for the investigation.
              Submitting does not create an attorney-client relationship and is not privileged or anonymous.
            </p>
          </div>

          {submitted && (
            <div className="bg-green-50 border border-green-300 rounded-lg p-4 mb-6 text-green-800 font-semibold" role="status">
              Thank you. Your submission was received and will be reviewed against public records.
            </div>
          )}

          {errorMessage && (
            <div className="bg-red-50 border border-red-300 rounded-lg p-4 mb-6 text-red-800 font-semibold" role="alert">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-7 bg-white p-6 rounded-lg shadow-md">
            <FormSection title="Your contact information">
              <TextInput label="Full name" name="fullName" required onChange={handleChange} />
              <TextInput label="Email address" name="email" type="email" required onChange={handleChange} />
              <TextInput label="Phone number" name="phone" type="tel" onChange={handleChange} />
              <TextInput label="Your city and state" name="communityLocation" placeholder="City, State" required onChange={handleChange} />
              <SelectInput
                label="Your relationship to the matter"
                name="relationship"
                required
                onChange={handleChange}
                options={[
                  'Current or former federal employee',
                  'Current or former contractor employee',
                  'Air traffic controller, technician, or aviation professional',
                  'Labor representative',
                  'Contractor, offeror, or small business',
                  'Member of the public affected by a service',
                  'Researcher, journalist, or accountability organization',
                  'Other'
                ]}
              />
            </FormSection>

            <FormSection title="What this concerns">
              <TextInput
                label="Federal agency or office"
                name="agencyName"
                placeholder="For example: FAA Air Traffic Organization"
                required
                onChange={handleChange}
              />
              <TextInput
                label="Program, system, facility, or contract number"
                name="programOrContract"
                placeholder="Use public names or numbers you are allowed to share"
                onChange={handleChange}
              />
              <TextInput
                label="Contractor or company involved, if any"
                name="contractorName"
                placeholder="Optional. Naming a company here is not treated as an allegation"
                onChange={handleChange}
              />
              <TextInput label="When did this happen or begin?" name="firstObservedDate" type="date" onChange={handleChange} />
            </FormSection>

            <FormSection title="Your submission">
              <fieldset>
                <legend className="block text-sm font-medium text-gray-700 mb-3">Select every category that applies *</legend>
                <div className="space-y-3">
                  {categoryOptions.map((option) => (
                    <label key={option} className="flex items-start text-sm text-gray-700">
                      <input
                        type="checkbox"
                        value={option}
                        checked={formData.submissionCategories.includes(option)}
                        onChange={handleCategoryChange}
                        className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded"
                      />
                      <span className="ml-3">{option}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <TextArea
                label="Describe what you know"
                name="description"
                rows="8"
                required
                placeholder="What happened, when, and how you know. Separate what you saw or documented yourself from what you heard or believe."
                onChange={handleChange}
              />

              <TextArea
                label="Records that could confirm it"
                name="recordsAvailable"
                rows="5"
                placeholder="Describe public records, contract numbers, reports, or documents. Do not paste confidential or restricted material."
                onChange={handleChange}
              />

              <TextArea
                label="Reports already made"
                name="reportsMade"
                rows="4"
                placeholder="Inspector General, Office of Special Counsel, Congress, agency, or union reports, with dates and responses."
                onChange={handleChange}
              />
            </FormSection>

            <FormSection title="Permissions and signature">
              <CheckboxInput
                name="noProhibitedMaterial"
                checked={formData.noProhibitedMaterial}
                onChange={handleChange}
                label="My submission does not contain classified information, unlawfully obtained records, credentials, or other people's private information. *"
              />
              <CheckboxInput
                name="publicUsePermission"
                checked={formData.publicUsePermission}
                onChange={handleChange}
                label="United for Accountability may quote or summarize my submission publicly after removing my contact information."
              />
              <CheckboxInput
                name="contactPermission"
                checked={formData.contactPermission}
                onChange={handleChange}
                label="United for Accountability or a reviewing attorney may contact me for clarification."
              />
              <CheckboxInput
                name="consentChecked"
                checked={formData.consentChecked}
                onChange={handleChange}
                label="I declare that the information submitted is true to the best of my knowledge and consent to its use for investigation, legal review, public-interest research, and potential litigation. *"
              />
              <TextInput label="Type your full name as your signature" name="signatureName" required onChange={handleChange} />
            </FormSection>

            {recaptchaSiteKey ? (
              <ReCAPTCHA sitekey={recaptchaSiteKey} onChange={(token) => setCaptchaToken(token)} />
            ) : (
              <p className="text-red-700 font-semibold">reCAPTCHA site key is missing. Form submission is disabled.</p>
            )}

            <button
              type="submit"
              disabled={submitting || !recaptchaSiteKey}
              className="w-full bg-blue-700 hover:bg-blue-800 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded transition"
            >
              {submitting ? 'Submitting\u2026' : 'Submit Evidence'}
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
}

function FormSection({ title, children }) {
  return (
    <section className="space-y-5">
      <h2 className="text-xl font-bold text-blue-800 border-b border-blue-100 pb-2">{title}</h2>
      {children}
    </section>
  );
}

function TextInput({ label, name, type = 'text', required = false, placeholder = '', onChange }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label} {required ? '*' : ''}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        onChange={onChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
      />
    </div>
  );
}

function SelectInput({ label, name, required = false, options, onChange }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label} {required ? '*' : ''}
      </label>
      <select
        id={name}
        name={name}
        required={required}
        onChange={onChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        defaultValue=""
      >
        <option value="" disabled>
          Select an option
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

function TextArea({ label, name, rows, required = false, placeholder = '', onChange }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label} {required ? '*' : ''}
      </label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        required={required}
        placeholder={placeholder}
        onChange={onChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
      />
    </div>
  );
}

function CheckboxInput({ name, checked, label, onChange }) {
  return (
    <label className="flex items-start text-sm text-gray-700">
      <input
        id={name}
        name={name}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded"
      />
      <span className="ml-3">{label}</span>
    </label>
  );
}
