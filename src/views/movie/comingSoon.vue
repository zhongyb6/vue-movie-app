<template>
  <div class="movie_body">
    <Scroller
      @handleToScroll="handleToScroll"
      @handleToTouchEnd="handleToTouchEnd"
    >
      <div class="movie_wrapper">
        <card
          v-for="item in comingSoonList"
          :key="item.id"
          :info="item"
          :showBtn="showBtn"
          :btnText="btnText"
          @btnAction="handlePreSell"
          @handleToDetail="handleToDetail"
        />
      </div>
    </Scroller>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Card from "@/components/Card/index.vue";
export default {
  name: "comingSoon",
  components: {
    Card
  },
  data() {
    return {
      comingSoonList: [],
      showBtn: true,
      btnText: "预售"
    };
  },
  computed: {
    ...mapState({
      nm: state => state.nm,
      id: state => state.id
    })
  },
  watch: {
    id(newVal) {
      if (newVal) {
        this.queryData();
      }
    }
  },
  mounted() {
    this.queryData();
  },
  methods: {
    queryData() {
      this.$http.get("/api/movieComingList?cityId=" + this.id).then(res => {
        if (res.data.msg === "ok") {
          this.comingSoonList = res.data.data.comingList;
        }
      });
    },
    handleToScroll(pos) {
      console.log("handleToScroll", pos);
    },
    handleToTouchEnd(pos) {
      console.log("handleToTouchEnd", pos);
      if (pos.y > 50) {
        this.queryData();
      }
    },
    handlePreSell(params) {
      console.log(params);
    },
    handleToDetail(id) {
      this.$router.push("/movie/detail/c/" + id);
    }
  }
};
</script>

<style scoped>
.movie_body {
  flex: 1;
  overflow: auto;
  position: relative;
}
.movie_wrapper {
  position: relative;
  margin: 0 12px;
}
</style>
