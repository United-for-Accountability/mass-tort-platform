import CaseDeclarationForm from '../../../components/CaseDeclarationForm';
import { getPlaceholderCase } from '../../../data/caseDefinitions';

export default function InstitutionalAbuseDeclarationPage() {
  return <CaseDeclarationForm caseData={getPlaceholderCase('institutional-abuse')} />;
}