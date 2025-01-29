import { useAuthStore } from "@/stores/auth";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const auth = useAuthStore();

  if (["/login", "/signup"].includes(to.path)) {
    return;
  }

  if (!auth.user) {
    await auth.getUser();
  }

  if (!auth.user) {
    return navigateTo("/login", { replace: true });
  }
});
