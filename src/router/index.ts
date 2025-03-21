import { createRouter, createWebHistory } from "vue-router";
import { authGuard } from "./guards/authGuard";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // {
    //   path: "/:pathMatch(.*)*",
    //   name: "ErrorPage",
    //   redirect: "/",
    // },
    {
      path: "/",
      name: "HomePage",
      component: () => import("@/pages/home-page.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/login",
      name: "LoginPage",
      component: () => import("@/pages/login-page.vue"),
      meta: { title: "Рабочий стол" },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    await authGuard(to, from, next);
  } else {
    next();
  }
});

export default router;
