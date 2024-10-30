<script setup lang="ts">
import { ref } from "vue";
import { router } from "../routes";

const useButtonList = () => {
  const buttonList = ref([
    {
      text: "发起决策",
      path: "/put",
    },
    {
      text: "决策列表",
      path: "/list",
    },
    {
      text: "登录账户",
      path: "/login",
    },
  ]);

  return {
    buttonList,
  };
};

const { buttonList } = useButtonList();
</script>

<template>
  <div class="flex flex-col justify-around items-center h-screen">
    <div class="flex flex-col items-center mt-12">
      <div class="text-4xl text-gray-800">406寝室决策系统</div>
      <div class="text-2xl text-gray-800 mt-2">
        406 Dormitory Decision System
      </div>
    </div>
    <div class="flex flex-col gap-4 w-2/3">
      <v-btn
        variant="outlined"
        v-for="button in buttonList"
        rounded
        size="large"
        @click="router.push(button.path)"
      >
        {{ button.text }}
      </v-btn>
    </div>
    <div class="text-sm w-10/12 indent-8">
      本决策系统提供的信息和建议仅供参考，不构成具体操作的法律或专业意见。用户在使用本系统时应自行承担风险，并对决策结果负责。我们承诺在提供服务时遵循公平、公正的原则，不因用户的身份、背景或其他非决策相关因素而有所偏颇。系统旨在辅助决策，最终决策权在于用户本人。
    </div>
  </div>
</template>

<style scoped></style>
