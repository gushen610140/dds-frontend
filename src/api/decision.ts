import { useUserStore } from "../stores/useUserStore";
import http from "../utils/http";

export const getDecisions = async (current: number, size: number) => {
  const { data } = await http({
    url: "/decision/list",
    method: "GET",
    params: {
      current,
      size,
    },
  });
  return data;
};

export const addDecision = async (title: string, description: string) => {
  const { data } = await http({
    url: "/decision/add",
    method: "POST",
    data: {
      title,
      description,
      creator: useUserStore().name,
    },
  });
  return data;
};

export const updateDecision = async (decision_id: string, action: string) => {
  const { data } = await http({
    url: "/decision/update",
    method: "PUT",
    data: {
      decision_id,
      action,
      voter: useUserStore().name,
    },
  });
  return data;
};
