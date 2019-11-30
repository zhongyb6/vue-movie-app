import Vue from "vue";
import App from "./App.vue";
import axios from "axios";
import VueLazyload from "vue-lazyload";
import router from "./router";
import store from "./store";
import "@/assets/css/reset.css";
import "@/assets/iconfont/iconfont.css";
import Scroller from "@/components/Scroller/index.vue";

Vue.component("Scroller", Scroller);

Vue.use(VueLazyload);
Vue.prototype.$http = axios;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
