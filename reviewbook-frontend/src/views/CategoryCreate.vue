<template>
  <div v-if="category" class="page">
    <h4>Thêm thể loại sách</h4>
    <CategoryForm :category="category" @submit:category="addCategory" />
    <p>{{ message }}</p>
  </div>
</template>

<script>
import CategoryForm from "@/components/CategoryForm.vue";
import CategoryService from "@/services/category.service";

export default {
  components: {
    CategoryForm,
  },
  data() {
    return {
      category: {},
      message: "",
    };
  },
  methods: {
    async addCategory(data) {
      try {
        await CategoryService.create(data);
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
