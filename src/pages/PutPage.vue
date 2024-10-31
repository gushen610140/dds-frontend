<script setup lang="ts">
import { ref } from "vue";
import { router } from "../routes";
import { addDecision } from "../api/decision";

const useForm = () => {
  const content = ref("");
  const intro = ref("");

  const submit = async () => {
    if (!content.value || !intro.value) {
      message.value = "请填写完整的决策信息";
      snackbar.value = true;
      return;
    }
    message.value = "正在提交中, 请耐心等待";
    snackbar.value = true;
    await addDecision(content.value, intro.value);
    message.value = "提交完毕, 将于3秒后返回主页";
    snackbar.value = true;
    setTimeout(() => {
      router.push("/");
    }, 2000);
  };

  const snackbar = ref(false);
  const message = ref("");

  return {
    content,
    intro,
    submit,
    snackbar,
    message,
  };
};

const { content, intro, submit, snackbar, message } = useForm();
</script>

<template>
  <div class="flex flex-col justify-center items-center h-screen">
    <div class="text-2xl mb-8">发起决策</div>
    <v-form class="w-10/12 mb-14" @submit.prevent="submit">
      <v-text-field label="主要内容" v-model="content"> </v-text-field>
      <v-text-field label="详细说明" v-model="intro"> </v-text-field>
      <v-btn block variant="outlined" type="submit">提交</v-btn>
      <v-btn block variant="outlined" class="mt-4" @click="router.push('/')"
        >取消</v-btn
      >
    </v-form>
  </div>
  <v-snackbar v-model="snackbar" timeout="2000">
    {{ message }}
    <template v-slot:actions>
      <v-btn variant="text" @click="snackbar = false"> 关闭 </v-btn>
    </template>
  </v-snackbar>
</template>

<style scoped></style>
