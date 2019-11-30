<template>
  <div>
    <header-bar :title="title" />
  </div>
</template>

<script>
import HeaderBar from "@/components/Header/index.vue";
export default {
  name: "MineIndex",
  components: {
    HeaderBar
  },
  data() {
    return {
      title: "我的汪汪"
    };
  }
};
</script>

<style scoped></style>
