import axios from "axios";
import { Log } from "../utils/logger";

const BASE_URL = "http://20.207.122.201/evaluation-service/notifications";

export const fetchNotifications = async (params?: any) => {
  try {
    await Log(
      "frontend",
      "info",
      "api",
      `Fetching notifications: ${JSON.stringify(params)}`
    );

    const res = await axios.get(BASE_URL, { params });

    await Log(
      "frontend",
      "info",
      "api",
      `Fetched ${res.data.notifications.length} notifications`
    );

    return res.data.notifications;
  } catch (err) {
    await Log(
      "frontend",
      "error",
      "api",
      "Error fetching notifications"
    );
    throw err;
  }
};