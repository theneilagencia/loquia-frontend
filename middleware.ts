import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// MIDDLEWARE DESABILITADO TEMPORARIAMENTE
// Proteção de rotas movida para client-side

export async function middleware(request: NextRequest) {
  // Permitir todas as requisições
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
