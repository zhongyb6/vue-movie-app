<template>
  <div class="card">
    <div class="pic_show" @tap="toDetail(info.id)">
      <img v-lazy="setImgWH(info.img)" alt="" />
    </div>
    <div class="info_list" @tap="toDetail(info.id)">
      <template v-if="cardType === 'search'">
        <h2 class="ellipsis w100">
          {{ info.nm }}<span class="grade fr">{{ info.sc }}</span>
        </h2>
        <p class="ellipsis w100">{{ info.enm }}</p>
        <p class="ellipsis w100">{{ info.cat }}</p>
        <p class="ellipsis w100">{{ info.frt }}</p>
      </template>
      <template v-else>
        <h2 class="ellipsis">
          {{ info.nm }}
          <img v-if="info.version" src="@/assets/images/maxs.png" alt="" />
        </h2>
        <p>
          观众评
          <span class="grade">{{ info.sc }}</span>
          分
        </p>
        <p class="ellipsis">主演: {{ info.star }}</p>
        <p class="ellipsis">{{ info.showInfo }}</p>
      </template>
    </div>
    <div class="btn_mall" v-if="showBtn" @tap="buyTicket(info)">
      {{ btnText }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    info: {
      type: Object,
      required: true,
      default: () => {
        return {};
      }
    },
    cardType: {
      type: String,
      default: ""
    },
    showBtn: {
      type: Boolean,
      default: true
    },
    btnText: {
      type: String,
      default: "购票"
    }
  },
  methods: {
    buyTicket(params) {
      this.$emit("btnAction", params);
    },
    setImgWH(url) {
      return url.replace(/w\.h/, "128.180");
    },
    toDetail(id) {
      this.$emit("handleToDetail", id);
    }
  }
};
</script>

<style scoped>
.card {
  margin-top: 12px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e6e6e6;
  padding-bottom: 10px;
}
.card .pic_show {
  width: 64px;
  height: 90px;
}
.card .pic_show img {
  width: 100%;
}
.card .info_list {
  flex: 1;
  margin-left: 10px;
  position: relative;
}
.card .info_list h2 {
  font-size: 17px;
  line-height: 24px;
  width: 150px;
}
.card .info_list img {
  width: 50px;
  position: absolute;
  right: 10px;
  top: 5px;
}
.card .info_list p {
  font-size: 13px;
  color: #666;
  line-height: 22px;
  width: 200px;
}
.w100 {
  width: 100% !important;
}
.fr {
  float: right;
}
.card .info_list .grade {
  color: #faaf00;
  font-weight: 700;
  font-size: 15px;
}
.ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.card .btn_mall {
  width: 47px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  background-color: #f03d37;
  color: #fff;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
}
</style>
