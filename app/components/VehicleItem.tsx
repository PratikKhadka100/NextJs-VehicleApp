import { useRouter } from "next/navigation";

import { Card, Col, Row, Space, Divider } from "antd";
import { BsCalendarDate } from "react-icons/bs";
import { GiSpeedometer } from "react-icons/gi";
import { BsFuelPump } from "react-icons/bs";
import { GiPowerLightning } from "react-icons/gi";

import Link from "next/link";
import Image from "next/image";
import classes from "./VehicleItem.module.css";

function VehicleItem(props: any) {
  const { Meta } = Card;
  const router = useRouter();

  return (
    <div className={classes.cardDiv}>
      <Row gutter={16}>
        <Col span={8}>
          <Card
            style={{ width: 400 }}
            // cover={
            //   <img
            //     src={`${props.vimg[0] ? props.vimg[0] : null}`}
            //     alt=""
            //     // onClick={() => {
            //     //   imgClickHandler(props.id);
            //     // }}
            //     style={{ cursor: "pointer" }}
            //   />
            // }
            actions={[
              <button
                className={classes.deleteBtn}
                // onClick={() => deleteHandler(props.id)}
              >
                Delete
              </button>,
              <button
                className={classes.editBtn}
                // onClick={() => editHandler(props.id)}
              >
                Edit
              </button>,
            ]}
          >
            <Row>
              <Col span={24}>
                <Meta title={props.manufacturer} />
              </Col>
              <p style={{ fontSize: "22px", fontWeight: "bold" }}>
                {props.vname}
              </p>
            </Row>

            <Divider />
            <Row gutter={[50, 5]}>
              <Col span={12}>
                <Space>
                  <BsCalendarDate size={26} />
                  <span>{props.year}</span>
                </Space>
              </Col>
              <Col span={12}>
                <Space>
                  <GiSpeedometer size={26} />
                  <span>{props.kilometers} km</span>
                </Space>
              </Col>
              <Col span={12}>
                <Space>
                  <BsFuelPump size={26} />
                  <span>{props.fuel}</span>
                </Space>
              </Col>
              <Col span={12}>
                <Space>
                  <GiPowerLightning size={26} />
                  <span>{props.enginepower} bhp</span>
                </Space>
              </Col>
            </Row>
            <Divider />
            <div className={classes.viewDetails}>
              {/* <span onClick={() => imgClickHandler(props.id)}>
              View More Details
            </span> */}
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default VehicleItem;
