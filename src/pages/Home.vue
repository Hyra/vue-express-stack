<template>
  <div class="home">
    <SampleApi />
    <SampleSocket />
  </div>
</template>

<script>
import SampleApi from "@/components/SampleApi.vue";
import SampleSocket from "@/components/SampleSocket.vue";

export default {
  name: "home",
  components: {
    SampleApi,
    SampleSocket
  }
};
</script>
