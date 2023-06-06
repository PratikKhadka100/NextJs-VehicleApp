import { notification } from "antd";

type NotificationType = "success" | "info" | "warning" | "error";

const antdNotification = (
  type: NotificationType,
  title: string,
  description: string
) => {
  notification[type]({
    message: title,
    description: description,
  });
};

export default antdNotification;
