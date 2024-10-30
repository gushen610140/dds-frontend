import { createWebHashHistory, createRouter } from "vue-router";
import { useUserStore } from "../stores/useUserStore";
import { useToast } from "vue-toastification";

const routes = [
  { path: "/", component: () => import("../pages/HomePage.vue") },
  { path: "/login", component: () => import("../pages/LoginPage.vue") },
  {
    path: "/put",
    component: () => import("../pages/PutPage.vue"),
    beforeEnter: (to, from, next) => {
      if (!useUserStore().isLogin) {
        useToast().error("请先进行登录!");
      } else {
        next();
      }
    },
  },
  {
    path: "/list",
    component: () => import("../pages/ListPage.vue"),
    beforeEnter: (to, from, next) => {
      if (!useUserStore().isLogin) {
        useToast().error("请先进行登录!");
      } else {
        next();
      }
    },
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
