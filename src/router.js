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
        import(/* webpackChunkName: "Public" */ "./layouts/Public.vue"),
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
          path: "reset-password",
          name: "reset-password",
          component: () =>
            import(/* webpackChunkName: "reset-password" */ "./pages/auth/ResetPassword.vue")
        },
        {
          path: "token-expired",
          name: "token-expired",
          component: () =>
            import(/* webpackChunkName: "token-expired" */ "./pages/auth/TokenExpired.vue")
        }
      ]
    },
    {
      path: "/:dojoSlug",
      component: () =>
        import(/* webpackChunkName: "Public" */ "./layouts/Admin.vue"),
      children: [
        {
          path: "",
          name: "dashboard",
          component: () =>
            import(/* webpackChunkName: "dashboard" */ "./pages/admin/Dashboard.vue")
        }
      ]
    }
  ]
});
