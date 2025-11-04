import { verificarAcesso } from '@/lib/auth';

export default async function AlunoPage() {
  await verificarAcesso(['aluno']);

  return <h1>Área do Aluno</h1>;
}
