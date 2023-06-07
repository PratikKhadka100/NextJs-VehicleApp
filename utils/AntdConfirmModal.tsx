import { ExclamationCircleFilled } from "@ant-design/icons";
import { Modal } from "antd";

const { confirm } = Modal;

const AntdConfirmModal = (
  title: string,
  content: string,
  deleteFunction: any
) => {
  confirm({
    title: title,
    icon: <ExclamationCircleFilled />,
    content: content,
    centered: true,
    okText: "Yes",
    okType: "danger",
    cancelText: "No",

    onOk() {
      deleteFunction();
    },
    onCancel() {
      console.log("Cancel");
    },

    okButtonProps: {
      ghost: true,
    },
    cancelButtonProps: {
      style: {
        background: "none",
        borderColor: "#d9d9d9",
      },
    },
  });
};

export default AntdConfirmModal;
