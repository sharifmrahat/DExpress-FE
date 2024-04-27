import { notifications } from "@mantine/notifications";
import { GetNotificationIcon } from "@/components/common/NotificationIcon";

export const showNotification = ({
  type = "info",
  duration = 5000,
  withBorder = true,
  ...rest
}: {
  type?: "info" | "success" | "error" | "warn";
  duration?: number;
  withBorder?: boolean;
  title: string;
  message: string;
}) => {
  const icon = GetNotificationIcon({ type });

  let color: "blue" | "green" | "red" | "yellow" = "blue";

  switch (type) {
    case "success":
      color = "green";
      break;
    case "error":
      color = "red";
      break;
    case "warn":
      color = "yellow";
      break;
    default:
      color = "blue";
  }

  notifications.show({ color, icon, autoClose: duration, withBorder, ...rest });
};
