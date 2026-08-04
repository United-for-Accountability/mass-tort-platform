import Head from 'next/head';
import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import Navbar from './Navbar';
import Footer from './Footer';

const systemOptions = [
  'Automated license plate reader (ALPR)',
  'Facial recognition or biometric identification',
  'Police, municipal, neighborhood, or private camera network',
  'Drone or aerial surveillance',
  'Cellphone, advertising, or commercial location data',
  'Connected vehicle, telematics, toll, parking, or mobility data',
  'Retail, landlord, employer, school, or workplace surveillance',
  'Data-fusion, watchlist, predictive-policing, or intelligence platform',
  'Unknown or other'
];

const harmOptions = [
  'Wrongful stop, search, detention, arrest, citation, or armed encounter',
  'False plate read, identity match, hotlist entry, or inaccurate record',
  'Tracking or disclosure of movements without meaningful notice or consent',
  'Exposure of medical, religious, political, legal, family, or other sensitive activity',
  'Retaliation, stalking, harassment, discrimination, or intimidation',
  'Immigration, employment, housing, insurance, education, or financial harm',
  'Chilling of speech, protest, worship, journalism, medical care, or association',
  'Denied access to records, correction, deletion, audit logs, policies, or contracts',
  'Unauthorized employee, officer, contractor, or personal use of surveillance data',
  'Whistleblower or public-record evidence of misuse, secrecy, or ignored safeguards',
  'Community concern without a known personal injury',
  'Other'
];

const initialFormData = {
  fullName: '',
  email: '',
  phone: '',
  cityCountyState: '',
  role: '',
  submissionType: '',
  agencyOrganization: '',
  vendorProvider: '',
  systemTypes: [],
  systemLocation: '',
  firstIncidentDate: '',
  harmTypes: [],
  incidentDescription: '',
  governmentAction: '',
  reportsAndRequests: '',
  evidenceAvailable: '',
  urgentDeadline: '',
  publicUsePermission: false,
  contactPermission: false,
  truthAttestation: false,
  consentChecked: false,
  signatureName: ''
};

export default function PrivacySurveillanceDeclarationForm() {
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

  const handleArrayChange = (field) => (event) => {
    const { value, checked } = event.target;
    setFormData((current) => ({
      ...current,
      [field]: checked
        ? [...current[field], value]
        : current[field].filter((item) => item !== value)
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

    if (formData.systemTypes.length === 0) {
      setErrorMessage('Please identify at least one surveillance system or select unknown or other.');
      return;
    }

    if (formData.harmTypes.length === 0) {
      setErrorMessage('Please select at least one harm or evidence category.');
      return;
    }

    if (!formData.truthAttestation || !formData.consentChecked || !formData.signatureName.trim()) {
      setErrorMessage('The truth attestation, consent, and typed signature are required.');
      return;
    }

    setSubmitting(true);

    try {
      await addDoc(collection(db, 'DeclarationOfCivilConstitutionalViolations'), {
        ...formData,
        intakeCategory: 'privacy-surveillance-rights',
        caseSlug: 'privacy-surveillance-rights',
        caseTitle: 'Privacy, Surveillance & Corporate Control Investigation',
        submittedAt: Timestamp.now(),
        clientSignedAt: new Date().toISOString()
      });

      setSubmitted(true);
      setFormData(initialFormData);
      setCaptchaToken(null);
      event.target.reset();
    } catch (error) {
      console.error('Error submitting privacy and surveillance declaration:', error);
      setErrorMessage('Your declaration could not be submitted. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  const recaptchaSiteKey =
    process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || process.env.NEXT_PUBLIC_RECAPTCHA_KEY;

  return (
    <>
      <Head>
        <title>Privacy & Surveillance Declaration | United for Accountability</title>
        <meta
          name="description"
          content="Document surveillance-related harm, wrongful tracking, data sharing, inaccurate alerts, chilling effects, public records, or whistleblower evidence."
        />
        <link
          rel="canonical"
          href="https://www.unitedforaccountability.org/cases/privacy-surveillance-rights/declaration"
        />
      </Head>

      <Navbar />

      <main className="bg-gray-50 py-12 px-6 md:px-12 lg:px-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-blue-900 mb-3">
            Privacy & Surveillance Declaration
          </h1>
          <p className="text-gray-700 mb-6">
            Provide facts tied to a specific system, search, alert, agency, company, contract, disclosure,
            or injury. Separate what you personally observed from what you suspect or learned from others.
          </p>

          <div className="bg-amber-50 border border-amber-300 rounded-lg p-5 mb-6 text-sm text-amber-950">
            <p className="font-semibold mb-2">Protect sensitive information</p>
            <p>
              Do not submit Social Security numbers, account credentials, medical records, privileged
              communications, confidential informant information, sealed records, trade secrets, or
              unlawfully obtained material. Preserve original documents, screenshots, videos, metadata,
              public-record responses, and correspondence. This form does not create an attorney-client
              relationship or pause any legal deadline.
            </p>
          </div>

          {submitted && (
            <div className="bg-green-50 border border-green-300 rounded-lg p-4 mb-6 text-green-800 font-semibold">
              Thank you. Your declaration has been added to the investigation record.
            </div>
          )}

          {errorMessage && (
            <div className="bg-red-50 border border-red-300 rounded-lg p-4 mb-6 text-red-800 font-semibold">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 rounded-lg shadow-md">
            <FormSection title="Your information">
              <TextInput label="Full name" name="fullName" required onChange={handleChange} />
              <TextInput label="Email address" name="email" type="email" required onChange={handleChange} />
              <TextInput label="Phone number" name="phone" type="tel" onChange={handleChange} />
              <TextInput
                label="City, county, and state"
                name="cityCountyState"
                placeholder="City, County, State"
                required
                onChange={handleChange}
              />
              <SelectInput
                label="Your role or relationship"
                name="role"
                required
                onChange={handleChange}
                options={[
                  'Person directly affected',
                  'Family member or witness',
                  'Attorney, advocate, journalist, or researcher',
                  'Public employee, law-enforcement employee, or former employee',
                  'Vendor, contractor, technician, or former employee',
                  'Elected official, appointed official, or agency employee',
                  'Community organization or civil-rights group',
                  'Other'
                ]}
              />
              <SelectInput
                label="What kind of submission is this?"
                name="submissionType"
                required
                onChange={handleChange}
                options={[
                  'Personal injury or direct surveillance harm',
                  'Witness statement',
                  'Public-record or policy evidence',
                  'Whistleblower or professional evidence',
                  'Community concern without known personal injury',
                  'Other'
                ]}
              />
            </FormSection>

            <FormSection title="System, agency, and company information">
              <TextInput
                label="Government agency, business, school, landlord, employer, or organization involved"
                name="agencyOrganization"
                required
                onChange={handleChange}
              />
              <TextInput
                label="Technology vendor or data provider"
                name="vendorProvider"
                placeholder="Examples: Flock Safety, another vendor, or unknown"
                onChange={handleChange}
              />
              <CheckboxGroup
                legend="Surveillance system or data source"
                options={systemOptions}
                selected={formData.systemTypes}
                onChange={handleArrayChange('systemTypes')}
              />
              <TextInput
                label="Camera, system, incident, or agency location"
                name="systemLocation"
                placeholder="Street, city, county, state, facility, or jurisdiction"
                required
                onChange={handleChange}
              />
              <TextInput
                label="First known incident or discovery date"
                name="firstIncidentDate"
                type="date"
                onChange={handleChange}
              />
            </FormSection>

            <FormSection title="Harm, government involvement, and evidence">
              <CheckboxGroup
                legend="Harm or evidence category"
                options={harmOptions}
                selected={formData.harmTypes}
                onChange={handleArrayChange('harmTypes')}
              />
              <TextArea
                label="Describe what happened"
                name="incidentDescription"
                rows="9"
                required
                placeholder="Include dates, locations, searches, alerts, officers or employees involved, statements made, actions taken, and the resulting harm. Identify which details are firsthand."
                onChange={handleChange}
              />
              <TextArea
                label="Describe government involvement"
                name="governmentAction"
                rows="5"
                placeholder="Explain whether an agency purchased, operated, searched, requested, received, shared, or acted on the information. Include warrant, subpoena, case, report, or incident numbers if known."
                onChange={handleChange}
              />
              <TextArea
                label="Complaints, public-record requests, correction requests, or appeals"
                name="reportsAndRequests"
                rows="5"
                placeholder="List agencies contacted, dates, request numbers, responses, denials, and any deadlines."
                onChange={handleChange}
              />
              <TextArea
                label="Evidence available"
                name="evidenceAvailable"
                rows="6"
                placeholder="Examples: incident reports, body-camera footage, screenshots, alerts, audit logs, contracts, policies, public records, correspondence, witness names, court records, or proof of damages. Do not paste confidential records here."
                onChange={handleChange}
              />
              <TextInput
                label="Known urgent deadline"
                name="urgentDeadline"
                placeholder="Court date, claim notice, appeal, records deadline, or statute date if known"
                onChange={handleChange}
              />
            </FormSection>

            <FormSection title="Permissions, attestation, and signature">
              <CheckboxInput
                name="publicUsePermission"
                checked={formData.publicUsePermission}
                onChange={handleChange}
                label="United for Accountability may quote or summarize my declaration publicly after removing direct contact information and reviewing it for safety and accuracy."
              />
              <CheckboxInput
                name="contactPermission"
                checked={formData.contactPermission}
                onChange={handleChange}
                label="United for Accountability or a reviewing attorney may contact me for clarification."
              />
              <CheckboxInput
                name="truthAttestation"
                checked={formData.truthAttestation}
                onChange={handleChange}
                label="I declare that the information is true and accurate to the best of my personal knowledge, and I have identified material based on belief, reports, or public records rather than firsthand observation. *"
              />
              <CheckboxInput
                name="consentChecked"
                checked={formData.consentChecked}
                onChange={handleChange}
                label="I consent to the use of this declaration for investigation, legal review, public-interest research, evidence preservation, and potential litigation. *"
              />
              <TextInput
                label="Type your full name as your signature"
                name="signatureName"
                required
                onChange={handleChange}
              />
            </FormSection>

            {recaptchaSiteKey ? (
              <ReCAPTCHA sitekey={recaptchaSiteKey} onChange={(token) => setCaptchaToken(token)} />
            ) : (
              <p className="text-red-700 font-semibold">
                reCAPTCHA site key is missing. Form submission is disabled.
              </p>
            )}

            <button
              type="submit"
              disabled={submitting || !recaptchaSiteKey}
              className="w-full bg-blue-800 hover:bg-blue-900 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded transition"
            >
              {submitting ? 'Submitting…' : 'Submit Declaration'}
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
      <h2 className="text-xl font-bold text-blue-900 border-b border-blue-100 pb-2">{title}</h2>
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
        <option value="" disabled>Select an option</option>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
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

function CheckboxGroup({ legend, options, selected, onChange }) {
  return (
    <fieldset>
      <legend className="block text-sm font-medium text-gray-700 mb-3">{legend} *</legend>
      <div className="space-y-3">
        {options.map((option) => (
          <label key={option} className="flex items-start text-sm text-gray-700">
            <input
              type="checkbox"
              value={option}
              checked={selected.includes(option)}
              onChange={onChange}
              className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <span className="ml-3">{option}</span>
          </label>
        ))}
      </div>
    </fieldset>
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
