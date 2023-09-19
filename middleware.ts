import { authMiddleware } from '@clerk/nextjs';

// Este ejemplo protege todas las rutas, incluidas las rutas api/trpc
// Edite esto para permitir que otras rutas sean públicas según sea necesario.
// Consulte https://clerk.com/docs/references/nextjs/auth-middleware para obtener más información sobre cómo configurar su middleware
export default authMiddleware({
  // publicRoutes: ['/test'],
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
