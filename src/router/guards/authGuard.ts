import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import { useAuth } from '@/composables/useAuth';

export const authGuard = async (
    _to: RouteLocationNormalized,
    _from: RouteLocationNormalized,
    next: NavigationGuardNext) => {
  const { checkAuth, token } = useAuth();
        console.log(token.value)
  if (token.value) {
    next();
  } else {
    const isAuthenticated = await checkAuth();
    if (isAuthenticated) {
      next();
    } else {
      next({ name: 'LoginPage' });
    }
  }
};