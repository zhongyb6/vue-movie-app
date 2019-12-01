<template>
  <div class="search_body">
    <div class="search_input">
      <div class="search_input_wrapper">
        <i class="iconfont icon-sousuo"></i>
        <input type="text" placeholder="搜索电影" v-model="movieMsg" />
      </div>
    </div>
    <scroller>
      <div class="search_result">
        <h1>电影/电视剧/综艺</h1>
        <card
          v-for="item in searchList"
          :key="item.id"
          :info="item"
          :showBtn="showBuyBtn"
          :cardType="cardType"
          @handleToDetail="handleToDetail"
        />
      </div>
    </scroller>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Card from "@/components/Card/index.vue";
export default {
  name: "Search",
  components: {
    Card
  },
  computed: {
    ...mapState({
      nm: state => state.nm,
      id: state => state.id
    })
  },
  data() {
    return {
      movieMsg: "",
      showBuyBtn: false,
      searchList: [],
      cardType: "search"
    };
  },
  watch: {
    movieMsg(newVal) {
      if (newVal) {
        this.querySearchDetail(newVal);
      }
    },
    id(newVal) {
      if (newVal) {
        this.querySearchDetail(this.movieMsg);
      }
    }
  },
  methods: {
    querySearchDetail(value) {
      this.$http
        .get("/api/searchList?cityId=" + this.id + "&kw=" + value)
        .then(res => {
          if (res.data.msg === "ok") {
            this.searchList = res.data.data.movies.list;
            console.log(this.searchList);
          }
        });
    },
    handleToDetail(id) {
      this.$router.push("/movie/detail/n/" + id);
    }
  }
};
</script>

<style scoped>
.search_body {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.search_input {
  position: relative;
  background: #f5f5f5;
  padding: 8px 10px;
  border-bottom: 1px solid #e5e5e5;
  z-index: 10;
}
.search_input_wrapper {
  margin: 0 10px;
  padding: 0 10px;
  border: 1px solid #f5f5f5;
  border-radius: 5px;
  height: 30px;
  line-height: 30px;
  display: flex;
  background-color: #fff;
}
.search_input_wrapper i {
  margin-right: 10px;
  line-height: 28px;
}
.search_input_wrapper input {
  flex: 1;
  border: none;
  outline: none;
  color: #999;
  background-color: #fff;
}
.search_result {
  width: 100%;
  padding: 0 10px;
  margin-bottom: 150px;
  overflow: hidden;
}
.search_result h1 {
  font-size: 15px;
  color: #999;
  padding: 9px 15px;
  border-bottom: 1px solid #e6e6e6;
}
</style>
