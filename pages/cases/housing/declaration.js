import CaseDeclarationForm from '../../../components/CaseDeclarationForm';
import { getPlaceholderCase } from '../../../data/caseDefinitions';

export default function HousingDeclarationPage() {
  return <CaseDeclarationForm caseData={getPlaceholderCase('housing')} />;
}