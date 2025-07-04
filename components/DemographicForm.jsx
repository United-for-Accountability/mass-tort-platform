import { useState } from "react";

export default function DemographicForm({ onSubmit }) {
  const [form, setForm] = useState({
    age: '',
    race: '',
    gender: '',
    veteran: '',
    disability: '',
    income: '',
    children: '',
    immigration: '',
    contact: 'yes',
    anonymous: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-4 mt-8 bg-gray-50 p-6 rounded shadow text-sm">
      <h3 className="text-lg font-semibold text-gray-800">🔎 Optional Demographics & Contact Preferences</h3>
      <p className="text-gray-600 text-xs mb-4">
        These questions are optional and help us understand who is most affected. Data is confidential and protected.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input name="age" placeholder="Age" value={form.age} onChange={handleChange} className="border px-3 py-2 rounded" />
        <input name="race" placeholder="Race or Ethnicity" value={form.race} onChange={handleChange} className="border px-3 py-2 rounded" />
        <input name="gender" placeholder="Gender Identity" value={form.gender} onChange={handleChange} className="border px-3 py-2 rounded" />
        <select name="veteran" value={form.veteran} onChange={handleChange} className="border px-3 py-2 rounded">
          <option value="">Veteran?</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
        <select name="disability" value={form.disability} onChange={handleChange} className="border px-3 py-2 rounded">
          <option value="">Disability?</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
        <input name="income" placeholder="Income Range (e.g. <$25k)" value={form.income} onChange={handleChange} className="border px-3 py-2 rounded" />
        <select name="children" value={form.children} onChange={handleChange} className="border px-3 py-2 rounded">
          <option value="">Do you have children?</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
        <input name="immigration" placeholder="Immigration Status (optional)" value={form.immigration} onChange={handleChange} className="border px-3 py-2 rounded" />
      </div>

      <div className="flex flex-col gap-2 pt-4">
        <label className="flex gap-2 items-center">
          <input type="checkbox" name="anonymous" checked={form.anonymous} onChange={handleChange} />
          I prefer to stay anonymous publicly
        </label>

        <label className="flex gap-2 items-center">
          <span className="font-medium">Can we contact you for the mass tort?</span>
          <select name="contact" value={form.contact} onChange={handleChange} className="border px-3 py-2 rounded ml-2">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>
      </div>

      <div className="text-right">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Save & Continue
        </button>
      </div>
    </form>
  );
}