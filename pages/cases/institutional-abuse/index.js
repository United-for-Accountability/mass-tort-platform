import CaseLandingPage from '../../../components/CaseLandingPage';
import { getPlaceholderCase } from '../../../data/caseDefinitions';

export default function InstitutionalAbuseCasePage() {
  return <CaseLandingPage caseData={getPlaceholderCase('institutional-abuse')} />;
}