"use client";
import { useRouter } from "next/navigation";

import { Card, Col, Divider, Row, Space } from "antd";
import { BsCalendarDate, BsFuelPump } from "react-icons/bs";
import { GiPowerLightning, GiSpeedometer } from "react-icons/gi";

import classes from "./VehicleItem.module.css";
import AntdConfirmModal from "@/utils/AntdConfirmModal";

function VehicleItem(props: any) {
  const { Meta } = Card;
  const router = useRouter();

  const deleteVehicle = async (vehicleId: number) => {
    const deleteVehicleUrl = `http://localhost:8000/api/vehicle/${vehicleId}/`;

    const res = await fetch(deleteVehicleUrl, {
      method: "delete",
      headers: { "content-type": "application/json" },
    });

    if (res.ok) {
      router.refresh();
    } else {
      console.log(res);
      console.log("failed");
    }
  };

  function deleteHandler() {
    AntdConfirmModal("Are you sure, delete this vehicle?", "", () =>
      deleteVehicle(props.id)
    );
  }

  function editHandler(id: number) {}

  return (
    <div className={classes.cardDiv}>
      <Row gutter={16}>
        <Col span={8}>
          <Card
            style={{ width: 400 }}
            cover={
              <img
                src={`${
                  props.vimg[0] ? props.vimg[0] : "/images/default-img.png"
                }`}
                alt=""
                // onClick={() => {
                //   imgClickHandler(props.id);
                // }}
                style={{ cursor: "pointer" }}
              />
            }
            actions={[
              <button className={classes.deleteBtn} onClick={deleteHandler}>
                Delete
              </button>,
              <button
                className={classes.editBtn}
                onClick={() => editHandler(props.id)}
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
              <span>View More Details</span>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default VehicleItem;
