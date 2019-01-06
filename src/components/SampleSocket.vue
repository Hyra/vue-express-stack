<template>
  <div class="sample-api">
    <h2>Sample Socket Component</h2>
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
