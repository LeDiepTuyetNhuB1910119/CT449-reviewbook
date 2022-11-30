<template>
  <div v-if="review" class="page">
    <h4>Thêm review</h4>
    <ReviewForm :review="review" @submit:review="addReview" />
    <p>{{ message }}</p>
  </div>
</template>

<script>
import ReviewForm from "@/components/ReviewForm.vue";
import ReviewService from "@/services/review.service";

export default {
  components: {
    ReviewForm,
  },
  data() {
    return {
      review: {},
      message: "",
    };
  },
  methods: {
    async addReview(data) {
      try {
        await ReviewService.create(data);
        this.message = "Thể loại sách được thêm thành công.";
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.message = "";
  },
};
</script>
