import { useEffect, useState } from "react";
import { Log } from "../utils/logger";

export const useViewedNotifications = () => {
  const [viewed, setViewed] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("viewed");
    if (stored) setViewed(JSON.parse(stored));
  }, []);

  const markAsViewed = (id: string) => {
    setViewed((prev) => {
      if (prev.includes(id)) return prev;

      const updated = [...prev, id];
      localStorage.setItem("viewed", JSON.stringify(updated));

      Log(
        "frontend",
        "info",
        "state",
        `Marked notification ${id} as viewed`
      );

      return updated;
    });
  };

  return { viewed, markAsViewed };
};