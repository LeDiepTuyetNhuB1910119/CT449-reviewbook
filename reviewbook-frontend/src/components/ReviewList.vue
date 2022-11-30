<script>
export default {
  props: {
    reviews: { type: Array, default: [], required: true },
  },
};
</script>

<template>
  <ul class="list-group">
    <li class="list-group-item" v-for="review in reviews" :key="review._id">
      <p>
        <b>Tên sách:</b> <span style="color: blue">{{ review.book }}</span>
      </p>
      <p><b>Tác giả:</b> {{ review.author }}</p>
      <div class="row">
        <div class="col">
          <router-link :to="`/detail/${review._id}`">Xem chi tiết</router-link>
        </div>
        <div class="col">
          <router-link :to="`/reviews/${review._id}`">Hiệu chỉnh</router-link>
        </div>
      </div>
    </li>
  </ul>
</template>
<style scoped>
.list-group-item {
  font-size: 15px;
  font-weight: 450;
}
</style>
