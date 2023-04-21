import { login } from "@store/login";
import { createRouter, createWebHistory } from "vue-router";

// 라우터 설계
const routes = [
  {
    path: "/",
    name: "/",
    meta: { layout: "ClearLayout" },
    component: () => import("../views/login/signIn/index.vue"),
  },
  {
    path: "/sign-in",
    meta: { layout: "ClearLayout" },
    name: "sign-in",
    component: () => import("../views/login/signIn/index.vue"),
  },
  {
    path: "/sign-up",
    meta: { layout: "ClearLayout" },
    name: "sign-up",
    component: () => import("../views/login/signUp/index.vue"),
  },
  {
    path: "/home",
    name: "home",
    meta: { requiresAuth: true },
    component: () => import("../views/todo/index.vue"),
  },
];

// 라우터 생성
const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, _from, next) => {
  if (to.path === "/sign-in" && !login.isNeedLogin) {
    return next("home");
  }

  if (!login.isNeedLogin) {
    const { access, refresh } = login.token;

    //@@ refreshToken이 없을 경우 로그인 창 띄우기
    if (refresh === null) {
      //
    } else if (access === null && refresh !== null) {
      //refreshToken은 있고 accessToken만 있을 경우 재발급요청
      await login.refreshToken();
    } else if (access === null && refresh == null) {
      //토큰이 다 있다면 페이지 이동 전 토큰 검증
      // await login.verifyToken();
    }

    if (!access && !refresh) {
      localStorage.clear();
      login.isNeedLogin = true;
      return next("sign-in");
    }

    return next();
  } else {
    return next();
  }
});

// 라우터 추출 (main.js에서 import)
export { router };
