import CaseLandingPage from '../../../components/CaseLandingPage';
import { getPlaceholderCase } from '../../../data/caseDefinitions';

export default function HousingCasePage() {
  return <CaseLandingPage caseData={getPlaceholderCase('housing')} />;
}