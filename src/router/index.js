import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/movie",
    component: () =>
      import(/* webpackChunkName: "MovieIndex" */ "@/views/movie/index"),
    children: [
      {
        path: "nowPlaying",
        component: () =>
          import(
            /* webpackChunkName: "NowPlaying" */ "@/views/movie/nowPlaying"
          )
      },
      {
        path: "comingSoon",
        component: () =>
          import(
            /* webpackChunkName: "ComingSoon" */ "@/views/movie/comingSoon"
          )
      },
      {
        path: "detail/n/:movieId",
        components: {
          default: () =>
            import(
              /* webpackChunkName: "NowPlaying" */ "@/views/movie/nowPlaying"
            ),
          detail: () =>
            import(/* webpackChunkName: "MovieDetail" */ "@/views/movie/detail")
        },
        props: {
          detail: true
        }
      },
      {
        path: "detail/c/:movieId",
        components: {
          default: () =>
            import(
              /* webpackChunkName: "ComingSoon" */ "@/views/movie/comingSoon"
            ),
          detail: () =>
            import(/* webpackChunkName: "MovieDetail" */ "@/views/movie/detail")
        },
        props: {
          detail: true
        }
      },
      {
        path: "search",
        component: () =>
          import(
            /* webpackChunkName: "Search" */ "@/components/Search/index.vue"
          )
      },
      {
        path: "/",
        redirect: "/movie/nowPlaying"
      }
    ]
  },
  {
    path: "/cinema",
    name: "CinemaIndex",
    component: () =>
      import(/* webpackChunkName: "CinemaIndex" */ "@/views/cinema/index")
  },
  {
    path: "/mine",
    name: "MineIndex",
    component: () =>
      import(/* webpackChunkName: "MineIndex" */ "@/views/mine/index")
  },
  {
    path: "/*",
    redirect: "/movie"
  }
];

const router = new VueRouter({
  routes
});

export default router;
