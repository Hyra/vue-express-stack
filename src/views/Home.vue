<template>
  <div class="home">
    <h1 v-for="(user, index) in users" :key="index">{{ user.name }}</h1>
    <button @click="clickButton">Hello</button>
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import axios from "axios";
export default {
  name: "home",
  components: {
    HelloWorld
  },
  data() {
    return {
      users: []
    };
  },
  sockets: {
    connect: function() {
      console.log("socket connected");
    },
    customEmit: function(data) {
      console.log(
        'this method was fired by the socket server. eg: io.emit("customEmit", data)',
        data
      );
    }
    // time: function(data) {
    //   console.log("time!");
    // }
  },
  created() {
    axios.get("/api/users").then(data => {
      this.users = data.data.users;
    });
    // this.sockets.subscribe("time", data => {
    // console.log(data);
    // });
  },
  methods: {
    clickButton: function() {
      // console.log(this.$socket);
      // $socket is socket.io-client instance
      this.$socket.emit("emit_method", "sample emit");
    }
  }
};
</script>
