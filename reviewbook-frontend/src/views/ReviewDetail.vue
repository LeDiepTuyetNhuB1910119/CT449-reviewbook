<template>
  <div class="detail" style="text-align: center"><h4>Chi Tiết Review</h4></div>
  <div class="review">
    <div class="card" :v-if="review">
      <h5 class="card-header">{{ review.categoryId?.categoryName }}</h5>
      <div class="card-body">
        <h5 class="card-title text-primary text-center">{{ review.book }}</h5>
        <h6 class="card-subtitle mb-2 text-muted text-center">
          {{ review.author }}
        </h6>
        <p class="card-text">
          {{ review.content }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import ReviewService from "@/services/review.service";

export default {
  data() {
    return {
      review: {},
    };
  },
  async mounted() {
    //const id = this.$route.params.id;
    this.review = await ReviewService.getById(this.$route.params.id);
  },
};
</script>

<style scoped>
.card-body {
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 20px;
}
.card-text {
  text-align: justify;
}
</style>
