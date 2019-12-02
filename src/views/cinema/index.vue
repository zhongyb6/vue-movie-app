<template>
  <div>
    <header-bar />
    <div class="cinema_body">
      <div class="cinema_menu">
        <ul>
          <li>
            <span>全城</span>
            <i class="iconfont icon-daosanjiao"></i>
          </li>
          <li>
            <span>品牌</span>
            <i class="iconfont icon-daosanjiao"></i>
          </li>
          <li>
            <span>特色</span>
            <i class="iconfont icon-daosanjiao"></i>
          </li>
        </ul>
      </div>
      <scroller>
        <ul class="cinema_list">
          <li v-for="item in cinemaList" :key="item.id">
            <div class="title">
              <span>{{ item.nm }}</span>
              <span class="price">
                {{ item.sellPrice }}
                <span class="q">元起</span>
              </span>
            </div>
            <div class="address">
              <span>{{ item.addr }}</span>
              <span class="dist">{{ item.distance }}</span>
            </div>
            <div class="tags">
              <span
                class="tag"
                v-for="(tag, idx) in formatCard(item.tag)"
                :key="idx"
              >
                {{ tag }}
              </span>
            </div>
          </li>
        </ul>
      </scroller>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import HeaderBar from "@/components/Header/index.vue";
export default {
  name: "CinemaIndex",
  components: {
    HeaderBar
  },
  data() {
    return {
      cinemaList: []
    };
  },
  computed: {
    ...mapState({
      id: state => state.id
    })
  },
  filter: {
    classCard(key) {
      const cardMap = {
        allowRefund: "b1",
        endorse: "b1",
        sell: "or",
        snack: "or"
      };
      return cardMap[key] ? cardMap[key] : "";
    }
  },
  mounted() {
    this.queryCinemaData();
  },
  methods: {
    queryCinemaData() {
      this.$http("/api/cinemaList?cityId=" + this.id).then(res => {
        if (res.data.msg === "ok") {
          this.cinemaList = res.data.data.cinemas;
        }
      });
    },
    formatCard(obj) {
      const cardMap = {
        allowRefund: "改签",
        endorse: "退",
        sell: "折扣卡",
        snack: "小吃"
      };
      let res = [];
      for (let key in obj) {
        if (obj[key] === 1 && cardMap[key]) {
          res.push(cardMap[key]);
        }
      }
      return res;
    }
  }
};
</script>

<style scoped>
.cinema_body {
  width: 100%;
  height: calc(100vh - 47px - 50px);
  position: relative;
  overflow: hidden;
}
.cinema_menu {
  width: 100%;
  height: 47px;
  border-bottom: 1px solid #e6e6e6;
  z-index: 10;
  background-color: #fff;
  position: relative;
}
.cinema_menu ul {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  overflow: hidden;
}
.cinema_menu ul li {
  flex: 1;
  text-align: center;
}
.cinema_menu ul li span {
  margin-right: 5px;
}
.cinema_menu ul li i {
  font-size: 14px;
}
.cinema_list {
  padding: 10px 20px;
}
.cinema_list li .title {
  margin-bottom: 10px;
}
.cinema_list li .title .price {
  margin-left: 10px;
  color: #ef4238;
}
.cinema_list li .title .price .q {
  margin-left: 3px;
  font-size: 11px;
}
.cinema_list .address {
  font-size: 14px;
  color: #666;
  clear: both;
  margin-bottom: 10px;
}
.cinema_list .address .dist {
  float: right;
}
.cinema_list .tags {
  padding-bottom: 20px;
  border-bottom: 1px solid #e6e6e6;
}
.cinema_list .tags .tag {
  padding: 5px;
  text-align: center;
  border: 1px solid #ef4238;
  margin-right: 10px;
  font-size: 12px;
  height: 15px;
  line-height: 15px;
  border-radius: 2px;
  color: #ef4238;
}
</style>
