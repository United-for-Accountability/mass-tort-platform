import '../styles/globals.css';
import AIAssistant from '../components/AIAssistant';
import ConstructionBanner from '../components/ConstructionBanner';

export default function App({ Component, pageProps }) {
  return (
    <>
      <ConstructionBanner />
      <Component {...pageProps} />
      <AIAssistant />
    </>
  );
}