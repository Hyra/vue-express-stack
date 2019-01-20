import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/";

// import VueSocketIO from "vue-socket.io";
// Vue.use(
//   new VueSocketIO({
//     debug: process.env.VUE_APP_SOCKET_DEBUG
//       ? process.env.VUE_APP_SOCKET_DEBUG
//       : false,
//     connection: process.env.VUE_APP_SOCKET_URL
//       ? process.env.VUE_APP_SOCKET_URL
//       : "/",
//     vuex: {
//       store,
//       actionPrefix: "SOCKET_",
//       mutationPrefix: "SOCKET_"
//     }
//   })
// );

Vue.config.productionTip = false;

import ElementUI from "element-ui";
import locale from "element-ui/lib/locale/lang/en";
import "./element.scss";
Vue.use(ElementUI, { locale });

import { createProvider } from "./vue-apollo";

new Vue({
  router,
  store,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount("#app");
