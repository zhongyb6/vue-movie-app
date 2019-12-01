<template>
  <div class="city_body">
    <scroller ref="city_list">
      <div class="city_list">
        <div class="city_hot">
          <h2>热门城市</h2>
          <ul>
            <li v-for="item in hotList" :key="item.id" @tap="setCity(item)">
              {{ item.nm }}
            </li>
          </ul>
        </div>
        <div class="city_sort" ref="city_sort">
          <div v-for="item in cityList" :key="item.index">
            <h2>{{ item.index }}</h2>
            <ul>
              <li v-for="city in item.list" :key="city.id" @tap="setCity(city)">
                {{ city.nm }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </scroller>
    <div class="city_index">
      <ul>
        <li
          v-for="(item, idx) in cityList"
          :key="item.id"
          :class="{ active: currIndex === item.index }"
          @click="scrollToCity(item.index, idx)"
        >
          {{ item.index }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "City",
  data() {
    return {
      hotList: [],
      cityList: [],
      currIndex: ""
    };
  },
  computed: {
    ...mapState({
      nm: state => state.nm,
      id: state => state.id
    })
  },
  mounted() {
    let hl = JSON.parse(localStorage.getItem("hot-list")) || [];
    let cl = JSON.parse(localStorage.getItem("city-list")) || [];
    if (hl.length && cl.length) {
      this.hotList = hl;
      this.cityList = cl;
    } else {
      this.queryCityData();
    }
  },
  methods: {
    ...mapActions(["changeCity"]),
    queryCityData() {
      this.$http("/api/cityList").then(res => {
        if (res.data.msg === "ok") {
          let cities = res.data.data.cities;
          const { hotList, cityList } = this.formatCityData(cities);
          this.hotList = hotList;
          this.cityList = cityList;
          localStorage.setItem("hot-list", JSON.stringify(this.hotList));
          localStorage.setItem("city-list", JSON.stringify(this.cityList));
        }
      });
    },
    formatCityData(arr = []) {
      let hotList = arr.filter(item => item.isHot === 1);
      let cityList = [];
      for (let i = 0; i < arr.length; i++) {
        let firstLetter = arr[i].py.substring(0, 1).toUpperCase();
        if (!cityList.some(item => item.index === firstLetter)) {
          cityList.push({
            index: firstLetter,
            list: [
              {
                nm: arr[i].nm,
                id: arr[i].id
              }
            ]
          });
        } else {
          let idx = cityList.findIndex(item => item.index === firstLetter);
          cityList[idx].list.push({
            nm: arr[i].nm,
            id: arr[i].id
          });
        }
      }
      cityList.sort((a, b) => {
        if (a.index > b.index) {
          return 1;
        } else {
          return -1;
        }
      });
      return { hotList, cityList };
    },
    scrollToCity(index, idx) {
      this.currIndex = index;
      let h2 = this.$refs.city_sort.getElementsByTagName("h2");
      this.$refs.city_list.toScrollTop(h2[idx]);
    },
    setCity(params) {
      let opts = {
        nm: params.nm || "",
        id: params.id || ""
      };
      localStorage.setItem("nowNm", params.nm);
      localStorage.setItem("nowId", params.id);
      this.changeCity(opts);
      this.$router.push("/movie/nowPlaying");
    }
  }
};
</script>

<style scoped>
.city_body {
  width: 100%;
  height: 100%;
  padding: 0 20px;
  overflow: hidden;
  position: relative;
}

.city_list {
  width: 90%;
}

.city_hot h2 {
  font-size: 18px;
  line-height: 30px;
}

.city_hot ul {
  width: 100%;
  clear: both;
  display: flex;
  flex-wrap: wrap;
}

.city_hot ul li {
  padding: 5px;
  margin: 5px;
  width: 30%;
  text-align: center;
  border: 1px solid #e6e6e6;
  background-color: #e6e6e6;
  border-radius: 5px;
}

.city_sort ul li {
  padding: 5px;
  margin: 5px;
  text-align: left;
  border: 1px solid #e6e6e6;
  background-color: #e6e6e6;
  border-radius: 5px;
}

.city_index ul {
  position: fixed;
  right: 20px;
  top: 120px;
}
.city_index ul li.active {
  color: #ef4238;
}
</style>
