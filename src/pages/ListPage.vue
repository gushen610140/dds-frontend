<script setup lang="ts">
import { ref } from "vue";
import { router } from "../routes";
import { getDecisions } from "../api/decision.ts";
import DecisionCard from "../components/DecisionCard.vue";

const useData = () => {
  const items = ref([]);
  const total = ref(0);
  const page = ref(0);

  const load = async ({ done }) => {
    page.value++;
    const { data } = await getDecisions(page.value, 5);
    const { list, total: _total } = data;
    total.value = _total;
    items.value.push(...list);
    if (items.value.length >= total.value) {
      done("empty");
    } else {
      done("ok");
    }
  };

  return {
    items,
    load,
  };
};

const { items, load } = useData();
</script>

<template>
  <v-infinite-scroll class="h-screen gap-2" @load="load">
    <v-icon
      icon="mdi-arrow-u-left-top"
      class="ml-5 mb-2"
      @click="router.push('/')"
    ></v-icon>
    <template v-for="item in items" :key="item._id">
      <div class="w-full flex flex-col justify-center items-center">
        <DecisionCard :item="item"></DecisionCard>
      </div>
    </template>
  </v-infinite-scroll>
</template>

<style scoped></style>
