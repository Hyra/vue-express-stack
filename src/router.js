import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: () =>
        import(/* webpackChunkName: "about" */ "./pages/Home.vue")
    },
    {
      path: "/samples",
      name: "samples",
      component: () =>
        import(/* webpackChunkName: "about" */ "./pages/Samples.vue")
    }
  ]
});
