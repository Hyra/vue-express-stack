import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/";
import VueSocketIO from "vue-socket.io";

Vue.use(
  new VueSocketIO({
    debug: process.env.VUE_APP_SOCKET_DEBUG,
    connection: process.env.VUE_APP_SOCKET_URL,
    vuex: {
      store,
      actionPrefix: "SOCKET_",
      mutationPrefix: "SOCKET_"
    }
  })
);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
