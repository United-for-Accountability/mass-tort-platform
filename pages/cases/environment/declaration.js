import CaseDeclarationForm from '../../../components/CaseDeclarationForm';
import { getPlaceholderCase } from '../../../data/caseDefinitions';

export default function EnvironmentDeclarationPage() {
  return <CaseDeclarationForm caseData={getPlaceholderCase('environment')} />;
}