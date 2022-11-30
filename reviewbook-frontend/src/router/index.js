import { createWebHistory, createRouter } from "vue-router";
import ReviewBook from "@/views/ReviewBook.vue";

const routes = [
  {
    path: "/",
    name: "reviewbook",
    component: ReviewBook,
  },
  {
    path: "/reviews/",
    name: "review.add",
    component: () => import("@/views/ReviewCreate.vue"),
  },

  {
    path: "/reviews/:id",
    name: "review.edit",
    component: () => import("@/views/ReviewEdit.vue"),
    props: true, // Truyền các biến trong $route.params vào làm props
  },

  {
    path: "/detail/:id",
    name: "review.detail",
    component: () => import("@/views/ReviewDetail.vue"),
  },

  {
    path: "/categories/",
    name: "category.add",
    component: () => import("@/views/CategoryCreate.vue"),
  },

  {
    path: "/categories/:id",
    name: "category.edit",
    component: () => import("@/views/CategoryEdit.vue"),
    props: true, // Truyền các biến trong $route.params vào làm props
  },

  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: () => import("@/views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
