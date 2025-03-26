import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import { api } from '@/api';
import { useRouter } from 'vue-router';

export const authGuard = async (
    _to: RouteLocationNormalized,
    _from: RouteLocationNormalized,
    next: NavigationGuardNext) => {
      const router = useRouter();
      try {
        const response = await api.post('/auth/refresh', {}, {
          withCredentials: true
        });
        if (response?.data.user) return router.push({ name: 'HomePage' });
        next();
      } catch (err) {
        next();
      }
};