import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { fetchNotifications } from "../api/notifications";
import { getTopNotifications } from "../utils/priority";
import NotificationCard from "../components/NotificationCard";
import { useViewedNotifications } from "../hooks/useViewedNotifications";
import { Log } from "../utils/logger";
import type { Notification } from "../types/notification";

const PriorityNotifications = () => {
  const [top, setTop] = useState<Notification[]>([]);
  const { viewed, markAsViewed } = useViewedNotifications();

  useEffect(() => {
    const load = async () => {
      Log("frontend", "info", "page", "Opened Priority page");

      const data = await fetchNotifications();
      const topN = getTopNotifications(data, 10);

      setTop(topN);
    };

    load();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Priority Notifications
      </Typography>

      {top.map((n) => (
        <NotificationCard
          key={n.ID}
          data={n}
          isNew={!viewed.includes(n.ID)}
          onClick={() => markAsViewed(n.ID)}
        />
      ))}
    </Box>
  );
};

export default PriorityNotifications;