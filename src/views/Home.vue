<template>
  <div class="home">
    <h1 v-for="(user, index) in users" :key="index">{{ user.name }}</h1>
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
  created() {
    axios.get("/api/users").then(data => {
      this.users = data.data.users;
    });
  }
};
</script>
