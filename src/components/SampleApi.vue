<template>
  <div class="sample-api">
    <h2>Sample API Component</h2>
    <div v-for="(user, index) in users" :key="index">{{ user.name }}</div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "SampleApi",
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

<style scoped lang="scss"></style>
