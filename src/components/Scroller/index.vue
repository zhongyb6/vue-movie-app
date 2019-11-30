<template>
  <div class="wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  mounted() {
    this.$nextTick(() => {
      this.scrollRef = new BScroll(this.$refs.wrapper, {
        probeType: 1,
        tap: true
      });

      this.scrollRef.on("scroll", pos => {
        this.$emit("handleToScroll", pos);
      });

      this.scrollRef.on("touchEnd", pos => {
        this.$emit("handleToTouchEnd", pos);
      });
    });
  },
  methods: {
    scrollTo(y) {
      this.scrollRef.scrollTo(y);
    }
  }
};
</script>

<style scoped>
.wrapper {
  height: 100%;
}
</style>
