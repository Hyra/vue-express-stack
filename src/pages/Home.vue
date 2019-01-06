<template>
  <div class="home">
    <h1 v-for="(user, index) in users" :key="index">{{ user.name }}</h1>
    <button @click="clickButton">Hello</button>
    <SampleApi />
  </div>
</template>

<script>
import SampleApi from "@/components/SampleApi.vue";

export default {
  name: "home",
  components: {
    SampleApi
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
  methods: {
    clickButton: function() {
      // console.log(this.$socket);
      // $socket is socket.io-client instance
      this.$socket.emit("emit_method", "sample emit");
    }
  }
};
</script>
