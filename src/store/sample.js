import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: { connected: false },
  mutations: {
    SOCKET_CONNECT(state) {
      state.connected = true;
    },
    SOCKET_PONGEVENT() {
      console.log("SOCKET_PONGEVENT");
    }
  },
  actions: {
    SOCKET_pongEvent() {
      console.log("SOCKET_pongEvent");
    },
    socket_pongEvent() {
      console.log("socket_pongEvent");
    }
  }
});
