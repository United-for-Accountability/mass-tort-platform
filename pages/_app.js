import '../styles/globals.css';
import AIAssistant from '../components/AIAssistant';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <AIAssistant />
    </>
  );
}