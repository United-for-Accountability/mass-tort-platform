import CaseDeclarationForm from '../../../components/CaseDeclarationForm';
import { getPlaceholderCase } from '../../../data/caseDefinitions';

export default function ConstitutionalDeclarationPage() {
  return <CaseDeclarationForm caseData={getPlaceholderCase('constitutional')} />;
}