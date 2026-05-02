import type { Notification } from "../types/notification";

const weightMap: Record<Notification["Type"], number> = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

export const getTopNotifications = (data: Notification[], n: number) => {
  return data
    .map((item) => ({
      ...item,
      score:
        weightMap[item.Type] * 1e12 +
        new Date(item.Timestamp).getTime(),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, n);
};