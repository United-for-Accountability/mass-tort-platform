import { useState } from 'react';

export default function SigningForSection({ formData, setFormData }) {
  const [showAttestation, setShowAttestation] = useState(false);

  const onChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : (type === 'checkbox' ? checked : value),
    }));
  };

  return (
    <section className="space-y-4">
      <h3 className="text-xl font-semibold">Who are you signing for?</h3>
      <div className="space-y-2">
        <label className="flex items-center gap-2">
          <input type="radio" name="sign_for" value="self" checked={formData.sign_for === 'self'} onChange={onChange} required />
          <span>Myself</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="radio" name="sign_for" value="minor" checked={formData.sign_for === 'minor'} onChange={onChange} />
          <span>My minor child</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="radio" name="sign_for" value="incapacity" checked={formData.sign_for === 'incapacity'} onChange={onChange} />
          <span>A loved one who cannot sign</span>
        </label>
      </div>

      {formData.sign_for !== 'self' && (
        <>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Your info</h4>
              <input name="signer_fullName" placeholder="Your full name" className="w-full border p-2" required onChange={onChange} />
              <input name="signer_email" placeholder="Your email" className="w-full border p-2 mt-2" required onChange={onChange} />
              <input name="signer_phone" placeholder="Your phone (optional)" className="w-full border p-2 mt-2" onChange={onChange} />
              <input name="relationship_to_person" placeholder="Relationship to person" className="w-full border p-2 mt-2" required onChange={onChange} />
            </div>
            <div>
              <h4 className="font-semibold mb-2">Person you’re representing</h4>
              <input name="rep_fullName" placeholder="Full name" className="w-full border p-2" required onChange={onChange} />
              <input type="date" name="rep_dob" className="w-full border p-2 mt-2" required onChange={onChange} />
              <div className="grid grid-cols-3 gap-2 mt-2">
                <input name="rep_city" placeholder="City" className="border p-2" onChange={onChange} />
                <input name="rep_state" placeholder="State" className="border p-2" onChange={onChange} />
                <input name="rep_zip" placeholder="ZIP" className="border p-2" onChange={onChange} />
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h4 className="font-semibold mb-2">Your legal authority</h4>
            <select name="authority_type" className="border p-2 w-full" required onChange={(e) => {
              onChange(e);
              setShowAttestation(e.target.value === 'No formal document – next of kin attestation');
            }}>
              <option value="">Select authority</option>
              {formData.sign_for === 'minor' ? (
                <>
                  <option>Parent</option>
                  <option>Legal Guardian</option>
                </>
              ) : (
                <>
                  <option>Power of Attorney</option>
                  <option>Court‑Appointed Conservator/Guardian</option>
                  <option>Healthcare Proxy</option>
                  <option>No formal document – next of kin attestation</option>
                </>
              )}
            </select>

            {showAttestation ? (
              <label className="flex items-start gap-2 mt-2">
                <input type="checkbox" name="authority_attestation" onChange={onChange} required />
                <span>I attest under penalty of perjury that I am next of kin/primary caregiver and the individual cannot consent, and no legally superior representative is available.</span>
              </label>
            ) : (
              <div className="mt-2">
                <label className="block mb-1">Upload proof of authority (PDF/JPG/PNG)</label>
                <input type="file" name="authority_file" accept=".pdf,.jpg,.jpeg,.png" onChange={onChange} />
              </div>
            )}
          </div>
        </>
      )}

      <div className="mt-4">
        <h4 className="font-semibold mb-2">Consent & Signature</h4>
        <label className="flex items-start gap-2">
          <input type="checkbox" name="consent_checked" required onChange={onChange} />
          <span>
            I agree to the <a href="/consent" target="_blank" className="underline">Consent & Use</a> terms and certify the information provided is true and correct.
            {formData.sign_for !== 'self' && ' I certify I am authorized to sign on behalf of the named individual and will provide documentation upon request.'}
          </span>
        </label>
        <input name="signature_name" placeholder="Type your full name as signature" className="w-full border p-2 mt-2" required onChange={onChange} />
      </div>
    </section>
  );
}
