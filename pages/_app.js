import '../styles/globals.css';
import AIAssistant from '../components/AIAssistant';
import ConstructionBanner from '../components/ConstructionBanner';
import { Analytics } from "@vercel/analytics/next";

export default function App({ Component, pageProps }) {
  return (
    <>
      <ConstructionBanner />
      <Component {...pageProps} />
      <AIAssistant />
      <Analytics />
    </>
  );
}
