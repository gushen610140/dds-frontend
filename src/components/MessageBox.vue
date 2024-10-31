<script setup lang="ts">
import { defineOptions, defineProps, withDefaults } from 'vue';

defineOptions({
  name: "MessageBox"
})

const {title, message} = withDefaults(defineProps<{
  title: string,
  message: string
}>(), {
  title: "标题",
  message: "内容"
})
</script>

<template>
  <div class="MessageBox">
      <h3>{{ title }}</h3>
      <p>{{ message }}</p>
  </div>
</template>

<style scoped></style>
