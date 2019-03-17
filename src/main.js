import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/";
import VueMq from "vue-mq";
import VueTimeago from "vue-timeago";

import "vue-awesome/icons";
import Icon from "vue-awesome/components/Icon";
Vue.component("v-icon", Icon);

import "./main.scss";

Vue.use(VueTimeago, {
  name: "Timeago", // Component name, `Timeago` by default
  locale: "en" // Default locale
  // We use `date-fns` under the hood
  // So you can use all locales from it
  // locales: {
  // "zh-CN": require("date-fns/locale/zh_cn"),
  // ja: require("date-fns/locale/ja")
  // }
});

Vue.use(VueMq, {
  breakpoints: {
    sm: 450,
    md: 1300,
    lg: Infinity
  },
  defaultBreakpoint: "sm" // customize this for SSR
});

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
