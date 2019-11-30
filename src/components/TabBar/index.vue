<template>
  <footer id="footer">
    <ul>
      <router-link
        v-for="item in tabConfig"
        :tag="item.tag"
        :to="item.to"
        :key="item.id"
      >
        <i class="iconfont" :class="item.icon"></i>
        <p>{{ item.text }}</p>
      </router-link>
    </ul>
  </footer>
</template>

<script>
import config from "../../../config/tabbar";
export default {
  name: "TabBar",
  data() {
    return {
      tabConfig: config
    };
  }
};
</script>

<style scoped>
#footer {
  width: 100%;
  height: 50px;
  position: fixed;
  left: 0;
  bottom: 0;
  background: #fff;
  border-top: 1px solid #ebe8e3;
}
#footer ul {
  display: flex;
  text-align: center;
  height: 50px;
  align-items: center;
}
#footer ul li {
  flex: 1;
  height: 40px;
}
#footer ul li.router-link-active {
  color: #f03d37;
}
#footer ul li.active {
  color: #f03d37;
}
#footer ul i {
  font-size: 20px;
}
#footer ul p {
  font-size: 12px;
  line-height: 18px;
}
</style>
