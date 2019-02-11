<template>
  <div class="samples">
    <SampleApi />
    <SampleSocket />
  </div>
</template>

<script>
import SampleApi from "@/components/SampleApi.vue";
import SampleSocket from "@/components/SampleSocket.vue";

export default {
  name: "Samples",
  components: {
    SampleApi,
    SampleSocket
  }
};
</script>
