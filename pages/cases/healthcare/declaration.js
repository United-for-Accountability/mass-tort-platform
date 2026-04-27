import CaseDeclarationForm from '../../../components/CaseDeclarationForm';
import { getPlaceholderCase } from '../../../data/caseDefinitions';

export default function HealthcareDeclarationPage() {
  return <CaseDeclarationForm caseData={getPlaceholderCase('healthcare')} />;
}