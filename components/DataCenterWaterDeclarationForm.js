import Head from 'next/head';
import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import Navbar from './Navbar';
import Footer from './Footer';

const harmOptions = [
  'Private well decline, dry well, reduced pressure, or increased pumping cost',
  'Municipal water or sewer rate increase, fee, surcharge, or public debt',
  'Water restriction, interruption, rationing, or unequal allocation',
  'Water-quality change, contamination concern, or unlawful discharge',
  'Property damage, subsidence, foundation damage, or loss of property value',
  'Crop, livestock, nursery, business, or other economic loss',
  'Failure to disclose water demand, contract terms, permit facts, or environmental impacts',
  'Tribal water-right, consultation, cultural-resource, or treaty concern',
  'Health concern potentially connected to water quality',
  'Other'
];

const initialFormData = {
  fullName: '',
  email: '',
  phone: '',
  communityLocation: '',
  streetAddress: '',
  relationship: '',
  dataCenterName: '',
  operatorOwner: '',
  facilityLocation: '',
  waterSource: '',
  firstObservedDate: '',
  harmTypes: [],
  harmDescription: '',
  agencyReports: '',
  evidenceAvailable: '',
  publicUsePermission: false,
  contactPermission: false,
  consentChecked: false,
  signatureName: ''
};

export default function DataCenterWaterDeclarationForm() {
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

  const handleHarmChange = (event) => {
    const { value, checked } = event.target;
    setFormData((current) => ({
      ...current,
      harmTypes: checked
        ? [...current.harmTypes, value]
        : current.harmTypes.filter((item) => item !== value)
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

    if (formData.harmTypes.length === 0) {
      setErrorMessage('Please select at least one type of harm or concern.');
      return;
    }

    if (!formData.consentChecked || !formData.signatureName.trim()) {
      setErrorMessage('Consent and a typed signature are required.');
      return;
    }

    setSubmitting(true);

    try {
      await addDoc(collection(db, 'DeclarationOfEnvironmentalExtraction'), {
        ...formData,
        intakeCategory: 'data-center-water-rights',
        caseSlug: 'data-center-water-rights',
        caseTitle: 'Data Center Water Rights & Community Harm Investigation',
        submittedAt: Timestamp.now(),
        clientSignedAt: new Date().toISOString()
      });

      setSubmitted(true);
      setFormData(initialFormData);
      setCaptchaToken(null);
      event.target.reset();
    } catch (error) {
      console.error('Error submitting data center water declaration:', error);
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
        <title>Data Center Water Harm Declaration | United for Accountability</title>
        <meta
          name="description"
          content="Submit a declaration documenting data-center water depletion, utility costs, contamination, permit failures, or other measurable community harm."
        />
        <link
          rel="canonical"
          href="https://www.unitedforaccountability.org/cases/data-center-water-rights/declaration"
        />
      </Head>

      <Navbar />

      <main className="bg-gray-50 py-12 px-6 md:px-12 lg:px-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-blue-800 mb-3">
            Data Center Water Harm Declaration
          </h1>
          <p className="text-gray-700 mb-6">
            Provide facts tied to a specific facility, community, water source, approval, contract,
            or measurable impact. A detailed and accurate timeline is more valuable than a broad
            allegation.
          </p>

          <div className="bg-amber-50 border border-amber-300 rounded-lg p-5 mb-6 text-sm text-amber-950">
            <p className="font-semibold mb-2">Before submitting</p>
            <p>
              Do not include Social Security numbers, financial account numbers, medical records,
              privileged communications, trade secrets, or documents obtained unlawfully. Preserve
              original evidence and metadata. Submission does not create an attorney-client
              relationship or guarantee representation.
            </p>
          </div>

          {submitted && (
            <div className="bg-green-50 border border-green-300 rounded-lg p-4 mb-6 text-green-800 font-semibold">
              Thank you. Your declaration has been added to the national evidence record.
            </div>
          )}

          {errorMessage && (
            <div className="bg-red-50 border border-red-300 rounded-lg p-4 mb-6 text-red-800 font-semibold">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-7 bg-white p-6 rounded-lg shadow-md">
            <FormSection title="Your contact information">
              <TextInput label="Full name" name="fullName" required onChange={handleChange} />
              <TextInput label="Email address" name="email" type="email" required onChange={handleChange} />
              <TextInput label="Phone number" name="phone" type="tel" onChange={handleChange} />
              <TextInput
                label="Your city, county, and state"
                name="communityLocation"
                placeholder="City, County, State"
                required
                onChange={handleChange}
              />
              <TextInput
                label="Street address"
                name="streetAddress"
                placeholder="Optional"
                onChange={handleChange}
              />
              <SelectInput
                label="Your relationship to the affected water system or community"
                name="relationship"
                required
                onChange={handleChange}
                options={[
                  'Resident or tenant',
                  'Homeowner or private-well owner',
                  'Municipal water or sewer customer',
                  'Farmer, rancher, nursery, or food producer',
                  'Local business owner',
                  'Tribal member or representative',
                  'Utility employee, contractor, engineer, or whistleblower',
                  'Public official or agency employee',
                  'Community organization or advocate',
                  'Other'
                ]}
              />
            </FormSection>

            <FormSection title="Facility and water information">
              <TextInput
                label="Data center or project name"
                name="dataCenterName"
                placeholder="Use the public project name if the operator is unknown"
                required
                onChange={handleChange}
              />
              <TextInput
                label="Owner, operator, developer, or tenant"
                name="operatorOwner"
                placeholder="Optional if unknown"
                onChange={handleChange}
              />
              <TextInput
                label="Facility location"
                name="facilityLocation"
                placeholder="Street, city, county, and state if known"
                required
                onChange={handleChange}
              />
              <SelectInput
                label="Known or suspected water source"
                name="waterSource"
                onChange={handleChange}
                options={[
                  'Municipal potable water',
                  'Municipal non-potable or reclaimed water',
                  'Groundwater or aquifer',
                  'Surface water, river, lake, or reservoir',
                  'Combination of sources',
                  'Unknown'
                ]}
              />
              <TextInput
                label="When did you first observe the impact?"
                name="firstObservedDate"
                type="date"
                onChange={handleChange}
              />
            </FormSection>

            <FormSection title="Harm or concern being documented">
              <fieldset>
                <legend className="block text-sm font-medium text-gray-700 mb-3">
                  Select every category that applies *
                </legend>
                <div className="space-y-3">
                  {harmOptions.map((option) => (
                    <label key={option} className="flex items-start text-sm text-gray-700">
                      <input
                        type="checkbox"
                        value={option}
                        checked={formData.harmTypes.includes(option)}
                        onChange={handleHarmChange}
                        className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded"
                      />
                      <span className="ml-3">{option}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <TextArea
                label="Describe what happened"
                name="harmDescription"
                rows="8"
                required
                placeholder="Give dates, measurable changes, who made decisions, what you personally observed, and how the impact affected you or the community. Distinguish facts from concerns or conclusions."
                onChange={handleChange}
              />

              <TextArea
                label="Reports made to utilities, agencies, elected officials, or the facility"
                name="agencyReports"
                rows="5"
                placeholder="List dates, offices contacted, complaint or permit numbers, and responses received."
                onChange={handleChange}
              />

              <TextArea
                label="Evidence currently available"
                name="evidenceAvailable"
                rows="5"
                placeholder="Examples: well logs, water bills, laboratory results, permits, contracts, meeting minutes, photographs, crop-loss records, or witnesses. Do not paste confidential records here."
                onChange={handleChange}
              />
            </FormSection>

            <FormSection title="Permissions and signature">
              <CheckboxInput
                name="publicUsePermission"
                checked={formData.publicUsePermission}
                onChange={handleChange}
                label="United for Accountability may quote or summarize my declaration publicly after removing direct contact information."
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
              className="w-full bg-blue-700 hover:bg-blue-800 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded transition"
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
