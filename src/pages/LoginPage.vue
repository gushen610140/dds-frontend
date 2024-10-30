<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "../stores/useUserStore.ts";
import { router } from "../routes";

const inputTextArea = ref(null);

const useForm = () => {
  const correctUser = ["gcy", "pzw", "zcd", "wyg"];

  const input = ref({
    name: "",
  });

  const rules = [
    (value) => {
      if (correctUser.includes(value)) return true;
      return "用户不存在";
    },
  ];

  const submit = () => {
    if (!correctUser.includes(input.value.name)) {
      message.value = `${input.value.name} 用户不存在`;
      snackbar.value = true;
      return;
    }
    inputTextArea.value?.blur();
    message.value = `欢迎您 ${input.value.name}, 三秒后为您跳转至首页`;
    snackbar.value = true;
    useUserStore().login(input.value.name);
    setTimeout(() => {
      router.push("/");
    }, 2000);
  };

  const snackbar = ref(false);
  const message = ref("");

  return {
    input,
    rules,
    submit,
    snackbar,
    message,
  };
};

const { input, rules, submit, snackbar, message } = useForm();
</script>

<template>
  <div class="flex flex-col justify-around items-center h-screen">
    <div class="grow"></div>
    <div>
      <div class="text-3xl mb-2">登录您的账户以进行决策</div>
      <div class="text-xl">Login to Decide</div>
    </div>
    <v-form class="w-10/12 mt-10 mb-20" @submit.prevent="submit" fast-fail>
      <v-text-field
        v-model="input.name"
        block
        label="请输入您的名称缩写"
        :rules="rules"
        ref="inputTextArea"
      ></v-text-field>
      <v-btn variant="outlined" type="submit" block class="mt-2">
        确认登录
      </v-btn>
      <v-btn variant="outlined" block class="mt-4" @click="router.push('/')">
        取消
      </v-btn>
    </v-form>
    <div class="grow"></div>
  </div>
  <v-snackbar v-model="snackbar" timeout="2000">
    {{ message }}
    <template v-slot:actions>
      <v-btn variant="text" @click="snackbar = false"> 关闭 </v-btn>
    </template>
  </v-snackbar>
</template>

<style scoped></style>
