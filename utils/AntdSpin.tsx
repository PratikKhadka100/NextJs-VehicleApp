import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);

const AntdSpin = (color: string) => (
  <Spin indicator={antIcon} style={{ color: color }} />
);

export default AntdSpin;
