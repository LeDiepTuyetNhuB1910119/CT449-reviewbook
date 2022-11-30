<script>
export default {
  props: {
    modelValue: { type: String, default: "" },
  },
  emits: ["submit", "update:modelValue"],
  methods: {
    updateModelValue(e) {
      this.$emit("update:modelValue", e.target.value);
    },
    submit() {
      this.$emit("submit");
    },
  },
};
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">Ứng dụng Review Sách</a>
    </div>
  </nav>
</template>
