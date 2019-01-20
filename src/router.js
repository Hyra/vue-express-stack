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
        import(/* webpackChunkName: "Public" */ "./layouts/public.vue"),
      children: [
        {
          path: "",
          name: "home",
          component: () =>
            import(/* webpackChunkName: "home" */ "./pages/public/Home.vue")
        },
        {
          path: "signup",
          name: "signup",
          component: () =>
            import(/* webpackChunkName: "signup" */ "./pages/public/Signup.vue")
        }
      ]
    }
  ]
});
