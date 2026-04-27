import CaseLandingPage from '../../../components/CaseLandingPage';
import { getPlaceholderCase } from '../../../data/caseDefinitions';

export default function ConstitutionalCasePage() {
  return <CaseLandingPage caseData={getPlaceholderCase('constitutional')} />;
}