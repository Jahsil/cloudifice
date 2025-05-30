import { useAuthStore } from '@/stores/auth';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const auth = useAuthStore();

  if (['/login', '/signup'].includes(to.path)) {
    return;
  }

  if (!auth.user) {
    try {
      await auth.getUser();
    } catch (error) {
      console.log('🚀 ~ defineNuxtRouteMiddleware ~ error:', error);
    }
  }

  if (!auth.user) {
    return navigateTo('/login', { replace: true });
  }
});
