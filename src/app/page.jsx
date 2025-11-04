'use client';
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from '@clerk/nextjs';
import Link from 'next/link';

export default function Home() {
  const { user } = useUser();
  const role = user?.publicMetadata?.role;

  return (
    <>
      <SignedOut>
        <h1>Faça login</h1>
        <SignInButton mode="modal">
          <button>Entrar</button>
        </SignInButton>
        <SignUpButton mode="modal">
          <button>Criar conta</button>
        </SignUpButton>
      </SignedOut>

      <SignedIn>
        <UserButton
          appearance={{
            elements: {
              userButtonAvatarBox: { width: '250px', height: '250px' },
            },
          }}
        />

        <h1>Escolha seu acesso</h1>

        {/* Mostra botão conforme o papel do usuário */}
        {/* Se o papel for aluno ou professor */}
        {(role === 'aluno' || role === 'professor') && (
          <Link href="/aluno">
            <button>Área do Aluno</button>
          </Link>
        )}

        {role === 'professor' && (
          <Link href="/professor">
            <button>Área do Professor</button>
          </Link>
        )}

        {role === 'diretor' && (
          <Link href="/diretor">
            <button>Área do Diretor</button>
          </Link>
        )}
      </SignedIn>
    </>
  );
}
