"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import { Row, Col, Space } from "antd";

import { BsCalendarDate } from "react-icons/bs";
import { GiPaintRoller } from "react-icons/gi";
import { GiSpeedometer } from "react-icons/gi";
import { GiCarDoor } from "react-icons/gi";
import { BsFuelPump } from "react-icons/bs";
import { TbEngine } from "react-icons/tb";
import { GiPowerLightning } from "react-icons/gi";
import { GiCartwheel } from "react-icons/gi";

import MainNavigation from "../components/layout/MainNavigation";
import classes from "./page.module.css";
import VehicleDetailItem from "../components/VehicleDetailItem";
import GoogleMap from "../components/GoogleMap";

function VehicleDetail() {
  const [vname, setVName] = useState("");
  const [vin, setVin] = useState("");
  const [year, setYear] = useState(null);
  const [engineSize, setEngineSize] = useState(null);
  const [doors, setDoors] = useState(null);
  const [color, setColor] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [driveTrain, setDriveTrain] = useState("");
  const [enginePower, setEnginePower] = useState(null);
  const [length, setLength] = useState(null);
  const [height, setHeight] = useState(null);
  const [width, setWidth] = useState(null);
  const [kilometers, setKilometers] = useState(null);
  const [cylinders, setCylinders] = useState(null);
  const [manufacturer, setManufacturer] = useState("");
  const [vimg, setVimg] = useState<any>([]);

  const params = useSearchParams();

  useEffect(() => {
    const id = params.get("id");

    fetch(`http://localhost:8000/api/vehicle/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setVName(data.name);
        setVin(data.vin);
        setYear(data.year.toString());
        setEngineSize(data.engine_size);
        setDoors(data.doors);
        setColor(data.color);
        setFuelType(data.fuel_type);
        setDriveTrain(data.drivetrain);
        setEnginePower(data.engine_power);
        setLength(data.length.toLocaleString());
        setHeight(data.height.toLocaleString());
        setWidth(data.width.toLocaleString());
        setKilometers(data.kilometers.toLocaleString());
        setCylinders(data.cylinders);
        setManufacturer(data.manufacturer);
        setVimg(data.images);
      });
  }, []);

  // useEffect(() => {
  //   const id = location.state.id;
  //   const url = `http://localhost:8000/api/vehicle/${id}`;
  //   axios({
  //     method: "get",
  //     url: url,
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   }).then((response) => {
  //     setVName(response.data.name);
  //     setVin(response.data.vin);
  //     setKilometers(response.data.kilometers.toLocaleString());
  //     setYear(response.data.year);
  //     setEngineSize(response.data.engine_size);
  //     setDoors(response.data.doors);
  //     setColor(response.data.color);
  //     setFuelType(response.data.fuel_type);
  //     setDriveTrain(response.data.drivetrain);
  //     setEnginePower(response.data.engine_power);
  //     setLength(response.data.length.toLocaleString());
  //     setWidth(response.data.width.toLocaleString());
  //     setHeight(response.data.height.toLocaleString());
  //     setCylinders(response.data.cylinders);
  //     setManufacturer(response.data.manufacturer);
  //     setVimg(response.data.images);
  //   });
  // }, []);

  function handleImgClickTransition(img: any) {
    setTimeout(() => {
      setVimg([img, ...vimg.filter((image: any) => image !== img)]);
    }, 300);
  }

  return (
    <div>
      <MainNavigation />
      <div className={classes.container}>
        <div className={classes.carName}>
          <Row>
            <Col span={24}>
              <span style={{ fontSize: "20px" }}>{manufacturer}</span>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <h2>{vname}</h2>
            </Col>
          </Row>
        </div>

        <Row className={classes.rowContainer}>
          <Col xxl={12} xl={12} sm={18} xs={24}>
            <img
              src={vimg[0] ? vimg[0] : "/images/default-img.png"}
              alt=""
              className={classes.mainImg}
            />
          </Col>
          <Row
            style={{ overflowY: "scroll", height: "550px", width: "500px" }}
            gutter={[0, 20]}
          >
            {vimg.slice(1).map((img: any, index: number) => {
              return (
                <Col span={12} key={index}>
                  <img
                    src={img}
                    alt=""
                    className={classes.carImages}
                    onClick={() => {
                      handleImgClickTransition(img);
                    }}
                  />
                </Col>
              );
            })}
          </Row>
        </Row>
        <div className={classes.banner}>
          <VehicleDetailItem
            icon={BsCalendarDate}
            title="Year"
            subTitle={year}
          />
          <VehicleDetailItem
            icon={GiPaintRoller}
            title="Color"
            subTitle={color}
          />
          <VehicleDetailItem
            icon={GiSpeedometer}
            title="Kilometers"
            subTitle={`${kilometers} km`}
          />
          <VehicleDetailItem icon={GiCarDoor} title="Doors" subTitle={doors} />
          <VehicleDetailItem
            icon={BsFuelPump}
            title="Fuel Type"
            subTitle={fuelType}
          />
          <VehicleDetailItem
            icon={TbEngine}
            title="Engine Size"
            subTitle={`${engineSize} litres`}
          />
          <VehicleDetailItem
            icon={GiPowerLightning}
            title="Engine Power"
            subTitle={`${enginePower} bhp`}
          />
          <VehicleDetailItem
            icon={GiCartwheel}
            title="Drivetrain"
            subTitle={driveTrain}
          />
        </div>
      </div>
      <div className={classes.techSpec}>
        <h4 className={classes.title}>Technical Specification</h4>
        <p className={classes.subTitle}>Engine</p>
        <Row gutter={[0, 5]} className={classes.specRow}>
          <Col xl={10} xxl={10} sm={24} xs={24}>
            <Space size={30}>
              <span>Manufacturer: </span>
              <span>{manufacturer}</span>
            </Space>
          </Col>
          <Col xl={14} xxl={14} sm={24} xs={24}>
            <Space size={60}>
              <span>Engine Size: </span>
              <span>{engineSize} litres</span>
            </Space>
          </Col>
          <Col xl={10} xxl={10} sm={24} xs={24}>
            <Space size={60}>
              <span>Cylinders: </span>
              <span>{cylinders}</span>
            </Space>
          </Col>
          <Col xl={14} xxl={14} sm={24} xs={24}>
            <Space size={45}>
              <span>Engine Power: </span>
              <span>{`${enginePower} bhp`}</span>
            </Space>
          </Col>
        </Row>
        <p className={classes.subTitle}>Size</p>
        <Row gutter={[0, 5]} className={classes.specRow}>
          <Col xxl={10} xl={10}>
            <Space size={30} wrap>
              <span>Length: </span>
              <span>{length} mm</span>
            </Space>
          </Col>
          <Col xxl={10} xl={10}>
            <Space size={30} wrap>
              <span>Width: </span>
              <span>{width} mm</span>
            </Space>
          </Col>
          <Col xxl={4} xl={4}>
            <Space size={30} wrap>
              <span>Height: </span>
              <span>{height} mm</span>
            </Space>
          </Col>
        </Row>
      </div>

      <div className={classes.techSpec}>
        <h4 className={classes.title}>Location</h4>
        <Row>
          <Col xxl={12} xl={12} sm={24} xs={24}>
            <p className={classes.subTitle}>Approval Genie OTTAWA (BACKLOT)</p>
            <p className={classes.subTitle}>
              1325 Richmond Road, Ottawa, ON, K2B 6R7
            </p>
          </Col>
          <Col>
            <GoogleMap />
          </Col>
          <Col span={24}>
            <span style={{ fontSize: "15px" }}>
              <strong>VIN: </strong>
              {vin}
            </span>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default VehicleDetail;
