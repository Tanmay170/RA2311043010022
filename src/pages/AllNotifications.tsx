import {
  Box,
  Select,
  MenuItem,
  Pagination,
  Skeleton,
  Alert,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { fetchNotifications } from "../api/notifications";
import NotificationCard from "../components/NotificationCard";
import { useViewedNotifications } from "../hooks/useViewedNotifications";
import { Log } from "../utils/logger";
import type { Notification } from "../types/notification";

const AllNotifications = () => {
  const [data, setData] = useState<Notification[]>([]);
  const [page, setPage] = useState(1);
  const [type, setType] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { viewed, markAsViewed } = useViewedNotifications();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError("");

        Log(
          "frontend",
          "info",
          "page",
          `Loading notifications page=${page}, type=${type}`
        );

        const res = await fetchNotifications({
          page,
          limit: 10,
          notification_type: type || undefined,
        });

        setData(res);
      } catch {
        setError("Failed to load notifications");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [page, type]);

  return (
    <Box sx={{ p: 3 }}>
      {/* Filter */}
      <Select
        value={type || ""}
        onChange={(e) => setType(e.target.value || null)}
        sx={{ mb: 2 }}
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="Event">Event</MenuItem>
        <MenuItem value="Result">Result</MenuItem>
        <MenuItem value="Placement">Placement</MenuItem>
      </Select>

      {/* Error */}
      {error && <Alert severity="error">{error}</Alert>}

      {/* Loading */}
      {loading && <Skeleton height={100} />}

      {/* Data */}
      {!loading &&
        data.map((n) => (
          <NotificationCard
            key={n.ID}
            data={n}
            isNew={!viewed.includes(n.ID)}
            onClick={() => markAsViewed(n.ID)}
          />
        ))}

      {/* Empty */}
      {!loading && data.length === 0 && (
        <Typography>No notifications found</Typography>
      )}

      {/* Pagination */}
      <Pagination
        count={10}
        page={page}
        onChange={(_, value) => setPage(value)}
        sx={{ mt: 2 }}
      />
    </Box>
  );
};

export default AllNotifications;