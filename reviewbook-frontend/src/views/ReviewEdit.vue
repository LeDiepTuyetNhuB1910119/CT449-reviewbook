<template>
  <div v-if="review" class="page">
    <h4>Hiệu chỉnh Review</h4>
    <ReviewForm
      :review="review"
      @submit:review="updateReview"
      @delete:review="deleteReview"
    />
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
  props: {
    id: { type: String, required: true },
  },
  data() {
    return {
      review: null,
      message: "",
    };
  },
  methods: {
    async getReview(id) {
      try {
        this.review = await ReviewService.getById(id);
      } catch (error) {
        console.log(error);
        // Chuyển sang trang NotFound đồng thời giữ cho URL không đổi
        this.$router.push({
          name: "notfound",
          params: {
            pathMatch: this.$route.path.split("/").slice(1),
          },
          query: this.$route.query,
          hash: this.$route.hash,
        });
      }
    },
    async updateReview(data) {
      try {
        await ReviewService.update(this.review._id, data);
        this.message = "Bài Review được cập nhật thành công.";
      } catch (error) {
        console.log(error);
      }
    },
    async deleteReview() {
      if (confirm("Bạn muốn xóa bài review này?")) {
        try {
          await ReviewService.delete(this.review._id);
          this.$router.push({ name: "reviewbook" });
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
  created() {
    this.getReview(this.id);
    this.message = "";
  },
};
</script>
