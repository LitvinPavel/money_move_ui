import { createRouter, createWebHistory } from "vue-router";

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
      path: "/sign-in",
      name: "SignInPage",
      component: () => import("@/pages/sign-in-page.vue"),
      meta: { title: "Авторизация" },
    },
    {
      path: "/sign-up",
      name: "SignUpPage",
      component: () => import("@/pages/sign-up-page.vue"),
      meta: { title: "Регистрация" },
    },
  ],
});

// router.beforeEach(async (to, from, next) => {
//   if (to.name === "SignInPage") {
//     await authGuard(to, from, next);
//   } else {
//     next();
//   }
// });

export default router;
