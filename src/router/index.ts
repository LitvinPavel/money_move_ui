import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Root',
      component: () => import('@/layouts/default-layout.vue'),
      children: [
        {
          path: "",
          name: "WalletPage",
          component: () => import("@/pages/wallet-page.vue"),
        },
        {
          path: "calendar",
          name: "CalendarPage",
          component: () => import("@/pages/calendar-page.vue"),
        },
        {
          path: "history",
          name: "HistoryPage",
          component: () => import("@/pages/history-page.vue"),
        },
        {
          path: "setting",
          name: "SettingPage",
          component: () => import("@/pages/setting-page.vue"),
        },
        {
          path: "/create",
          name: "CreateRoot",
          children: [
            {
              path: "account",
              name: "CreateAccountPage",
              component: () => import("@/pages/create/account-page.vue"),
            },
            {
              path: "transaction",
              name: "CreateTransactionPage",
              component: () => import("@/pages/create/transaction-page.vue"),
            },
            {
              path: "vacation",
              name: "CreateVacationPage",
              component: () => import("@/pages/create/vacation-page.vue"),
            }
          ]
        }
      ]
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
    // {
    //   path: "/:pathMatch(.*)*",
    //   name: "ErrorPage",
    //   redirect: "/",
    // },
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
