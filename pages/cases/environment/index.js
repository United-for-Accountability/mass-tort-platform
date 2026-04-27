import CaseLandingPage from '../../../components/CaseLandingPage';
import { getPlaceholderCase } from '../../../data/caseDefinitions';

export default function EnvironmentCasePage() {
  return <CaseLandingPage caseData={getPlaceholderCase('environment')} />;
}