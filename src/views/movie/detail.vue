<template>
  <div id="detailContainer" class="slider-enter-active">
    <header-bar :title="title">
      <i class="iconfont icon-fanhui" @click="handleBack"></i>
    </header-bar>
    <div class="detail_wrapper">
      <div class="detail_list">
        <div
          class="detail_list_bg"
          :style="{
            'background-image': 'url(' + setImgWH(detailInfo.img) + ')'
          }"
        ></div>
        <div class="detail_list_filter"></div>
        <div class="detail_list_content">
          <div class="detail_list_img">
            <img v-lazy="setImgWH(detailInfo.img)" alt="" />
          </div>
          <div class="detail_list_info">
            <h2>{{ detailInfo.nm }}</h2>
            <p>{{ detailInfo.enm }}</p>
            <p>{{ detailInfo.sc }}分</p>
            <p>{{ detailInfo.cat }}</p>
            <p>{{ detailInfo.src }} / {{ detailInfo.dur }}分钟</p>
            <p>{{ detailInfo.pubDesc }}</p>
          </div>
        </div>
      </div>
      <div class="detail_intro">
        <p>{{ detailInfo.dra }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderBar from "@/components/Header/index.vue";
export default {
  name: "MovieDetail",
  components: {
    HeaderBar
  },
  props: ["movieId"],
  data() {
    return {
      title: "影片详情",
      detailInfo: {}
    };
  },
  mounted() {
    this.queryDetail();
  },
  methods: {
    handleBack() {
      this.$router.back();
    },
    queryDetail() {
      this.$http.get("/api/detailmovie?movieId=" + this.movieId).then(res => {
        if (res.data.msg === "ok") {
          this.detailInfo = res.data.data.detailMovie;
        }
      });
    },
    setImgWH(url) {
      return url ? url.replace(/w\.h/, "148.248") : "";
    }
  }
};
</script>

<style scoped>
#detailContainer {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  z-index: 100;
  min-width: 100%;
  background: #fff;
}
.slider-enter-active {
  animation: 0.3s slideMove;
}
@keyframes slideMove {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
}

.detail_list {
  width: 100%;
  height: 200px;
  position: relative;
  overflow: hidden;
}
.detail_list_bg {
  width: 100%;
  height: 100%;
  background: 0 40%;
  filter: blur(20px);
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
}
.detail_list_filter {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #40454d;
  opacity: 0.6;
  top: 0;
  left: 0;
  z-index: 1;
}
.detail_list_content {
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
}
.detail_list_img {
  width: 108px;
  height: 150px;
  margin: 20px;
  border: 1px solid #f0f2f3;
}

.detail_list_img img {
  width: 100%;
  height: 100%;
}
.detail_list_info {
  margin-top: 20px;
}

.detail_list_info h2 {
  font-size: 20px;
  color: white;
  font-weight: normal;
  line-height: 40px;
}
.detail_list_info p {
  color: white;
  line-height: 20px;
  font-size: 14px;
}
.detail_intro {
  padding: 10px;
  text-indent: 2em;
}
</style>
