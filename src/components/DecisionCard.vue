<script setup lang="ts">
import { defineProps, ref, onMounted } from "vue";
import { ECharts, EChartsOption, init } from "echarts";
import { updateDecision } from "../api/decision";

const { item } = defineProps(["item"]);

const chart = ref(null);
let buildChart = null;

const option = ref({
  series: [
    {
      type: "pie",
      data: [
        {
          name: "未投票",
          value: item.pending,
        },
        {
          name: "赞成",
          value: item.agree,
        },
        {
          name: "弃权",
          value: item.waive,
        },
        {
          name: "反对",
          value: item.reject,
        },
      ],
      label: {
        show: true,
        formatter: "{b} : {c}",
      },
    },
  ],
});

const initChart = (): void => {
  buildChart = init(chart.value);
  buildChart.setOption(option.value);
};

// TODO: 投票响应式
const vote = (action) => {
  updateDecision(item.id, action);
  switch (action) {
    case "agree":
      item.agree++;
      option.value.series[0].data[1].value++;
      break;
    case "reject":
      item.reject++;
      option.value.series[0].data[2].value++;
      break;
    case "waive":
      item.waive++;
      option.value.series[0].data[3].value++;
      break;
  }
};

onMounted(() => {
  initChart();
});
</script>

<template>
  <v-card
    variant="outlined"
    :title="item.title"
    :text="item.description"
    class="w-11/12"
  >
    <div class="w-full flex justify-center h-[160px]">
      <div ref="chart" class="h-[160px] w-11/12"></div>
    </div>
    <v-card-actions class="flex justify-end">
      <v-dialog
        v-for="property in [
          { color: 'red', action: 'reject', text: '反对' },
          { color: 'black', action: 'waive', text: '弃权' },
          { color: 'blue', action: 'agree', text: '赞成' },
        ]"
      >
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn
            variant="outlined"
            :color="property.color"
            @click="vote(property.action)"
            v-bind="activatorProps"
            >{{ property.text }}</v-btn
          >
        </template>
        <template v-slot:default="{ isActive }">
          <v-card title="提示">
            <v-card-text> {{ property.text }}成功 </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text="确认" @click="isActive.value = false"></v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </v-card-actions>
  </v-card>
</template>

<style scoped></style>
