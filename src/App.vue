<template>
  <div>
    <router-view />
    <tab-bar />
  </div>
</template>
<script>
import TabBar from "@/components/TabBar/index.vue";
export default {
  name: "APP",
  components: {
    TabBar
  }
};
</script>
