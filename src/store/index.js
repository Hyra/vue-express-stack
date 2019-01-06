/* eslint-disable import/no-namespace */

import Vue from "vue";
import Vuex from "vuex";

// import VuexPersistence from "vuex-persist";
// const vuexLocal = new VuexPersistence({
//   storage: window.localStorage
// });

Vue.use(Vuex);
const requireModule = require.context(".", false, /\.js$/);

const modules = {};
for (const filename of requireModule.keys()) {
  if (filename === "./index.js") {
    continue;
  }
  const name = filename.replace(/^\.\/|\.js$/g, "");
  modules[name] = {
    strict: true,
    namespaced: true,
    ...requireModule(filename)
  };
}

export default new Vuex.Store({
  strict: true,
  modules
  //   plugins: [vuexLocal.plugin]
});
