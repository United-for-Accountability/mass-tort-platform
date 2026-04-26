import '../styles/globals.css';
import AIAssistant from '../components/AIAssistant';
import ConstructionBanner from '../components/ConstructionBanner';
import { Analytics } from "@vercel/analytics/next";
import { useEffect } from 'react';
import { trackEvent } from '../lib/analytics';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    const startedForms = new WeakSet();

    const getFormName = (form) => {
      return form.getAttribute('data-form-name') || form.id || form.getAttribute('name') || window.location.pathname;
    };

    const getFormParams = (form) => ({
      form_name: getFormName(form),
      page_path: window.location.pathname,
    });

    const handleFormInteraction = (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;

      const form = target.closest('form');
      if (!form) return;

      if (!startedForms.has(form)) {
        startedForms.add(form);
        trackEvent('form_start', getFormParams(form));
      }

      if (target instanceof HTMLInputElement && target.name === 'consent_checked' && target.checked) {
        trackEvent('consent_accepted', getFormParams(form));
      }
    };

    const handleFormSubmit = (event) => {
      const target = event.target;
      if (!(target instanceof HTMLFormElement)) return;

      trackEvent('form_submit', getFormParams(target));
    };

    document.addEventListener('input', handleFormInteraction, true);
    document.addEventListener('change', handleFormInteraction, true);
    document.addEventListener('submit', handleFormSubmit, true);

    return () => {
      document.removeEventListener('input', handleFormInteraction, true);
      document.removeEventListener('change', handleFormInteraction, true);
      document.removeEventListener('submit', handleFormSubmit, true);
    };
  }, []);

  return (
    <>
      <ConstructionBanner />
      <Component {...pageProps} />
      <AIAssistant />
      <Analytics />
    </>
  );
}
