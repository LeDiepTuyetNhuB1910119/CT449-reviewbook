<script>
export default {
  props: {
    categories: { type: Array, default: [] },
    activeIndex: { type: Number, default: -1 },
  },
  emits: ["getReviewByCategoryId"],
  methods: {
    updateActiveIndex(values) {
      this.$emit("getReviewByCategoryId", values);
    },
  },
};
</script>

<template>
  <ul class="list-group">
    <li
      class="list-group-item"
      v-for="(category, index) in categories"
      :key="category._id"
      :class="{ active: index === activeIndex }"
      @click="updateActiveIndex({ index, id: category._id })"
    >
      <b>{{ category.categoryName }}</b>
      <p>
        <router-link :to="`/categories/${category._id}`"
          >Hiệu chỉnh</router-link
        >
      </p>
    </li>
  </ul>
</template>
