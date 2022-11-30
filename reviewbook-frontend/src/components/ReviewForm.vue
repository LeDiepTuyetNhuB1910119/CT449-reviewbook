<template>
  <Form @submit="submitReview" :validation-schema="reviewFormSchema">
    <div class="form-group">
      <label for="book"><b>Tên sách:</b></label>
      <Field
        name="book"
        type="text"
        class="form-control"
        v-model="reviewLocal.book"
      />
      <ErrorMessage name="book" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="author"><b>Tác giả:</b></label>
      <Field
        name="author"
        type="text"
        class="form-control"
        v-model="reviewLocal.author"
      />
      <ErrorMessage name="author" class="error-feedback" />
    </div>

    <div class="form-group">
      <label for="categoryId"><b>Thể loại:</b></label>
      <Field
        name="categoryId"
        as="select"
        class="form-select"
        v-model="reviewLocal.categoryId"
      >
        <option
          v-for="category in categories"
          :key="category._id"
          :value="category._id"
        >
          {{ category.categoryName }}
        </option>
      </Field>
      <ErrorMessage name="categoryId" class="error-feedback" />
    </div>

    <div class="form-group">
      <label for="content"><b>Nội dung:</b></label>
      <Field
        name="content"
        textarea
        class="form-control"
        v-model="reviewLocal.content"
      />
      <ErrorMessage name="content" class="error-feedback" />
    </div>

    <div class="form-group">
      <button class="mt-3 btn btn-primary">Lưu</button>
      <button
        v-if="reviewLocal._id"
        type="button"
        class="mt-3 ml-2 btn btn-danger"
        @click="deleteReview"
      >
        Xóa
      </button>
    </div>
  </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import CategoryService from "@/services/category.service";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  emits: ["submit:review", "delete:review"],
  props: {
    review: { type: Object, required: true },
  },
  data() {
    const reviewFormSchema = yup.object().shape({
      book: yup
        .string()
        .required("Tên sách phải có giá trị.")
        .min(2, "Tên sách phải ít nhất 2 ký tự.")
        .max(50, "Tên sách có nhiều nhất 50 ký tự."),
      author: yup
        .string()
        .required("Tên tác giả phải có giá trị.")
        .min(2, "Tên tác giả phải ít nhất 2 ký tự.")
        .max(50, "Tên tác giả có nhiều nhất 50 ký tự."),
      categoryId: yup.string().required("Phải chọn thể loại sách."),
      content: yup
        .string()
        .required("Nội dung phải có giá trị.")
        .min(2, "Nội dung ít nhất 2 ký tự.")
        .max(20000, "Nội dung có nhiều nhất 20000 ký tự."),
    });
    return {
      // Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
      // reviewLocal để liên kết với các input trên form
      reviewLocal: this.review,
      reviewFormSchema,
      categories: [],
    };
  },
  methods: {
    submitReview() {
      this.$emit("submit:review", this.reviewLocal);
    },
    deleteReview() {
      this.$emit("delete:review", this.reviewLocal.id);
    },
  },
  async mounted() {
    this.categories = await CategoryService.getAll();
  },
};
</script>

<style scoped>
@import "@/assets/form.css";
</style>
