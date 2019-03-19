import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: () =>
        import(/* webpackChunkName: "public" */ "./layouts/Public.vue"),
      children: [
        {
          path: "",
          name: "home",
          component: () =>
            import(/* webpackChunkName: "home" */ "./pages/public/Home.vue")
        }
      ]
    },
    {
      path: "/",
      component: () =>
        import(/* webpackChunkName: "Auth" */ "./layouts/Auth.vue"),
      children: [
        {
          path: "signup",
          name: "signup",
          component: () =>
            import(/* webpackChunkName: "signup" */ "./pages/auth/Signup.vue")
        },
        {
          path: "login",
          name: "login",
          component: () =>
            import(/* webpackChunkName: "login" */ "./pages/auth/Login.vue")
        },
        {
          path: "forgot-password",
          name: "forgot-password",
          component: () =>
            import(/* webpackChunkName: "forgot-password" */ "./pages/auth/ForgotPassword.vue")
        },
        {
          path: "reset-password/:userId/:token",
          name: "reset-password",
          component: () =>
            import(/* webpackChunkName: "reset-password" */ "./pages/auth/ResetPassword.vue")
        },
        {
          path: "token-expired",
          name: "token-expired",
          component: () =>
            import(/* webpackChunkName: "token-expired" */ "./pages/auth/TokenExpired.vue")
        },
        {
          path: "profiles",
          name: "profiles",
          component: () =>
            import(/* webpackChunkName: "profiles" */ "./pages/auth/Profiles.vue")
        }
      ]
    },
    {
      path: "/:dojoSlug/admin",
      component: () =>
        import(/* webpackChunkName: "admin" */ "./layouts/Admin.vue"),
      children: [
        {
          path: "",
          name: "dashboard",
          component: () =>
            import(/* webpackChunkName: "dashboard" */ "./pages/admin/Dashboard.vue")
        },
        {
          path: "students",
          name: "students",
          component: () =>
            import(/* webpackChunkName: "students" */ "./pages/admin/Students.vue")
        },
        {
          path: "students/new",
          name: "student-new",
          component: () =>
            import(/* webpackChunkName: "student-new" */ "./pages/admin/StudentNew.vue")
        },
        {
          path: "students/:studentId",
          name: "student",
          component: () =>
            import(/* webpackChunkName: "student" */ "./pages/admin/Student.vue")
        },
        {
          path: "students/:studentId/edit",
          name: "student-edit",
          component: () =>
            import(/* webpackChunkName: "student-edit" */ "./pages/admin/StudentEdit.vue")
        },
        {
          path: "billing/invoices",
          name: "invoices",
          component: () =>
            import(/* webpackChunkName: "invoices" */ "./pages/admin/Invoices.vue")
        },
        {
          path: "billing/invoices/:invoiceId",
          name: "invoice",
          component: () =>
            import(/* webpackChunkName: "invoice" */ "./pages/admin/Invoice.vue")
        },
        {
          path: "billing/contribution-plans",
          name: "contribution-plans",
          component: () =>
            import(/* webpackChunkName: "contribution-plans" */ "./pages/admin/ContributionPlans.vue")
        },
        {
          path: "billing/contribution-plans/:planId",
          name: "plan",
          component: () =>
            import(/* webpackChunkName: "plan" */ "./pages/admin/ContributionPlan.vue")
        },
        {
          path: "billing/subscriptions",
          name: "subscriptions",
          component: () =>
            import(/* webpackChunkName: "subscriptions" */ "./pages/admin/Subscriptions.vue")
        },
        {
          path: "balance",
          name: "balance",
          component: () =>
            import(/* webpackChunkName: "balance" */ "./pages/admin/BalanceOverview.vue")
        },
        {
          path: "balance/payouts",
          name: "payouts",
          component: () =>
            import(/* webpackChunkName: "payouts" */ "./pages/admin/BalancePayouts.vue")
        },
        {
          path: "balance/transactions",
          name: "transactions",
          component: () =>
            import(/* webpackChunkName: "transactions" */ "./pages/admin/BalanceTransactions.vue")
        },
        {
          path: "settings/profile",
          name: "settings",
          component: () =>
            import(/* webpackChunkName: "settings" */ "./pages/admin/Settings.vue")
        },
        {
          path: "settings/payments",
          name: "paymentsettings",
          component: () =>
            import(/* webpackChunkName: "paymentsettings" */ "./pages/admin/PaymentSettings.vue")
        }
      ]
    },
    {
      path: "/:dojoSlug",
      component: () =>
        import(/* webpackChunkName: "Student" */ "./layouts/Student.vue"),
      children: [
        {
          path: "",
          name: "student-dashboard",
          component: () =>
            import(/* webpackChunkName: "student-dashboard" */ "./pages/student/Dashboard.vue")
        },
        {
          path: "invoices",
          name: "student-invoices",
          component: () =>
            import(/* webpackChunkName: "student-dashboard" */ "./pages/student/Invoices.vue")
        },
        {
          path: "invoice/:invoiceId",
          name: "student-invoice",
          component: () =>
            import(/* webpackChunkName: "student-dashboard" */ "./pages/student/Invoice.vue")
        },
        {
          path: "settings",
          name: "student-settings",
          component: () =>
            import(/* webpackChunkName: "student-dashboard" */ "./pages/student/Settings.vue")
        }
      ]
    }
  ]
});
