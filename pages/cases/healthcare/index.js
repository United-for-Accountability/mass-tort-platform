import CaseLandingPage from '../../../components/CaseLandingPage';
import { getPlaceholderCase } from '../../../data/caseDefinitions';

export default function HealthcareCasePage() {
  return <CaseLandingPage caseData={getPlaceholderCase('healthcare')} />;
}