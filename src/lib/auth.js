import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

/*
Se não tem papeis, delete tudo e deixe só a função abaixo:
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export async function verificarAcesso() {
  const user = await currentUser();

  // Se não houver usuário logado, redireciona para a página inicial (login)
  if (!user) redirect('/');

  // Retorna o usuário autenticado (caso queira usar dados dele na página)
  return user;
}
*/

// Define hierarquia de papéis
const HIERARQUIA = {
  aluno: ['aluno'],
  professor: ['aluno', 'professor'],
  diretor: ['diretor'],
};

// Função para verificar acesso baseado em papéis
export async function verificarAcesso(rolesPermitidas) {
  const user = await currentUser(); // Obtém o usuário atual
  const roleUsuario = user?.publicMetadata?.role; // Obtém o papel do usuário
  // ? é usado para evitar erro se user for null
  // Se o usuário não tiver papel definido, considera como vazio
  // Se publicMetadata ou role não existir, roleUsuario será undefined
  const rolesDoUsuario = HIERARQUIA[roleUsuario] || []; // Obtém papéis do usuário baseado na hierarquia ou vazio se não definido

  // Se nenhuma role for exigida, permite acesso publicamente
  if (rolesPermitidas.length === 0) return null;

  // Requer login
  if (!user) redirect('/');

  // Verifica permissão
  // Se nenhuma das roles do usuário estiver nas permitidas, redireciona
  if (!rolesPermitidas.some((r) => rolesDoUsuario.includes(r))) redirect('/');

  // Retorna o usuário se o acesso for permitido
  return user;
}

