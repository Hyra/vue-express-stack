/* global __dirname */
/* eslint-disable import/no-commonjs, import/no-nodejs-modules */

let target = "http://localhost:3000";
// console.log(process.env);
module.exports = {
  devServer: {
    proxy: {
      "/api": { target }
    }
  }
};
