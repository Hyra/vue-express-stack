<template>
  <div class="sample-api">
    <h1>Sample Socket Component</h1>
    <button @click="clickButton">Emit Event</button>
  </div>
</template>

<script>
export default {
  name: "SampleSocket",
  sockets: {
    connect: function() {},
    pongEvent: function() {}
  },
  methods: {
    clickButton: function() {
      this.$socket.emit("pingEvent", "Sample data");
    }
  }
};
</script>

<style scoped lang="scss"></style>
