<template>
  <div class="page row">
    <div class="col-md-10">
      <InputSearch v-model="searchText" />
    </div>
    <div class="mt-4 col-md-5">
      <h4>
        Thể loại sách
        <i class="fa-regular fa-bookmark"></i>
      </h4>
      <CategoryList
        v-if="filteredCategoriesCount > 0"
        :categories="filteredCategories"
        @getReviewByCategoryId="getReviewByCategoryId"
        :activeIndex="activeIndex"
      />
      <p v-else>Không có thể loại sách nào.</p>

      <div class="mt-4 justify-content-around align-items-center">
        <button class="btn btn-sm btn-primary" @click="refreshList()">
          <i class="fa-sharp fa-solid fa-rotate"></i> Làm mới
        </button>
        <button class="btn btn-sm btn-success" @click="goToAddCategory">
          <i class="fas fa-plus"></i> Thêm mới
        </button>
      </div>
    </div>

    <div class="mt-4 col-md-7">
      <div v-if="activeCategory">
        <h4>
          Danh sách review
          <i class="fa-regular fa-rectangle-list"></i>
          <div class="mt-2"><ReviewList :reviews="reviews" /></div>
        </h4>
        <div class="mt-3 justify-content-around align-items-center">
          <button class="btn btn-sm btn-success" @click="goToAddReview">
            <i class="fas fa-plus"></i> Thêm mới
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import InputSearch from "@/components/InputSearch.vue";
import CategoryList from "@/components/CategoryList.vue";
import ReviewList from "@/components/ReviewList.vue";
import CategoryService from "@/services/category.service";
import ReviewService from "@/services/review.service";

export default {
  components: {
    InputSearch,
    CategoryList,
    ReviewList,
  },

  // Đoạn mã xử lý đầy đủ sẽ trình bày bên dưới
  data() {
    return {
      categories: [],
      reviews: [],
      activeIndex: -1,
      searchText: "",
    };
  },

  watch: {
    // Giám sát các thay đổi của biến searchText.
    // Bỏ chọn phần tử đang được chọn trong danh sách.
    searchText() {
      this.activeIndex = -1;
    },
  },

  computed: {
    // Chuyển các đối tượng category thành chuỗi để tiện cho tìm kiếm.
    categoryStrings() {
      return this.categories.map((category) => {
        const { categoryName } = category;
        return [categoryName].join("");
      });
    },
    // Trả về các category có chứa thông tin cần tìm kiếm.
    filteredCategories() {
      if (!this.searchText) return this.categories;
      return this.categories.filter((_category, index) =>
        this.categoryStrings[index].includes(this.searchText)
      );
    },

    activeCategory() {
      if (this.activeIndex < 0) return null;
      return this.filteredCategories[this.activeIndex];
    },

    filteredCategoriesCount() {
      return this.filteredCategories.length;
    },
  },

  methods: {
    async getReviewByCategoryId(values) {
      this.activeIndex = values.index;
      this.reviews = await ReviewService.getByCategoryId(values.id);
    },
    async retrieveCategories() {
      try {
        this.categories = await CategoryService.getAll();
      } catch (error) {
        console.log(error);
      }
    },
    refreshList() {
      this.retrieveCategories();
      this.activeIndex = -1;
    },
    goToAddCategory() {
      this.$router.push({ name: "category.add" });
    },
    goToAddReview() {
      this.$router.push({ name: "review.add" });
    },
  },
  mounted() {
    this.refreshList();
  },
};
</script>
<style scoped>
.page {
  text-align: left;
  max-width: 750px;
}
</style>
