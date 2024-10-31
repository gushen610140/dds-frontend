import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const _isLogin = ref(true);

  const _name = ref("wyg");

  const login = (name: string) => {
    _name.value = name;
    _isLogin.value = true;
  };

  const name = computed(() => _name.value);
  const isLogin = computed(() => _isLogin.value);

  return {
    login,
    name,
    isLogin,
  };
});
