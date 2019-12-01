<template>
  <div id="main">
    <header-bar />
    <div id="content">
      <div class="movie_menu">
        <router-link tag="div" class="city_name" to="/movie/city">
          <span>{{ nm }}</span>
          <i
            class="iconfont"
            :class="[
              $route.path === '/movie/city' ? 'icon-upper' : 'icon-daosanjiao'
            ]"
          ></i>
        </router-link>
        <div class="hot_switch">
          <router-link tag="div" class="hot_item" to="/movie/nowPlaying">
            正在热映
          </router-link>
          <router-link tag="div" class="hot_item" to="/movie/comingSoon">
            即将上映
          </router-link>
        </div>
        <router-link tag="div" class="search_entry" to="/movie/search">
          <i class="iconfont icon-sousuo"></i>
        </router-link>
      </div>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <router-view name="detail" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import HeaderBar from "@/components/Header/index.vue";
export default {
  name: "MoveIndex",
  components: {
    HeaderBar
  },
  computed: {
    ...mapState({
      nm: state => state.nm
    })
  }
};
</script>

<style scoped>
#content .movie_menu {
  width: 100%;
  height: 45px;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  z-index: 10;
  -webkit-box-pack: justify;
  -webkit-box-align: center;
}
#content .movie_menu .city_name {
  height: 100%;
  line-height: 44px;
  margin-left: 20px;
}
#content .movie_menu .city_name.router-link-active {
  color: #ef4238;
  border-bottom: 2px solid #ef4238;
}
#content .movie_menu .city_name i {
  font-size: 14px;
  margin-left: 5px;
}
#content .movie_menu .hot_switch {
  display: flex;
  height: 100%;
  line-height: 44px;
}

#content .movie_menu .hot_item {
  font-size: 15px;
  width: 80px;
  color: #666;
  text-align: center;
  margin: 0 12px;
  font-weight: 700;
}
#content .movie_menu .hot_item.router-link-active {
  color: #ef4238;
  border-bottom: 2px solid #ef4238;
}
#content .movie_menu .search_entry {
  height: 100%;
  line-height: 44px;
  margin-right: 20px;
}
#content .movie_menu .search_entry i {
  color: red;
  font-size: 24px;
}
</style>
