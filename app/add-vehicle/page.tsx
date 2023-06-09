"use client";

import { useState } from "react";

import { Spin } from "antd";

import antdNotification from "@/utils/notification";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

import { AntdForm } from "@/utils/AntdForm";
import MainNavigation from "../components/layout/MainNavigation";
import classes from "./page.module.css";

function AddVehicle() {
  const [vehicleName, setVehicleName] = useState("");
  const [vin, setVin] = useState("");
  const [year, setYear] = useState("");
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
  const [image, setImage] = useState();
  const [base64List, setBase64List] = useState<any>([]);

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  function vehicleNameHandler(e: any) {
    setVehicleName(e.target.value);
  }

  function vinHandler(e: any) {
    setVin(e.target.value);
  }

  // _data : because it is not used
  function dateHandler(_date: Date, dateString: string) {
    // var d = new Date(dateString)
    if (dateString !== "") {
      setYear(dateString);
    } else {
      setYear("");
    }
  }

  function engineSizeHandler(value: any) {
    setEngineSize(value);
  }

  function doorsHandler(value: any) {
    setDoors(value);
  }

  function colorHandler(e: any) {
    setColor(e.target.value);
  }

  function fuelTypeHandler(value: any) {
    setFuelType(value);
  }

  function driveTrainHandler(e: any) {
    setDriveTrain(e.target.value);
  }

  function enginePowerHandler(value: any) {
    setEnginePower(value);
  }

  function lengthHandler(value: any) {
    setLength(value);
  }

  function heightHandler(value: any) {
    setHeight(value);
  }

  function widthHandler(value: any) {
    setWidth(value);
  }

  function kilometersHandler(value: any) {
    setKilometers(value);
  }

  function cylindersHandler(value: any) {
    setCylinders(value);
  }

  function manufacturerHandler(e: any) {
    setManufacturer(e.target.value);
  }

  const convertBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const normFile = async (e: any) => {
    const fileList = e?.fileList;
    if (!e.file.status) {
      const base64: any = await convertBase64(e.file);
      const imgData = {
        id: e.file.uid,
        img: base64,
      };
      setBase64List([...base64List, imgData]);
    } else {
      const filtered = base64List.filter((img: any) => img["id"] != e.file.uid);
      setBase64List(filtered);
    }

    return fileList;
  };

  function hasListWithFirstElementContainingString(
    obj: any,
    searchString: any
  ) {
    for (var key in obj) {
      if (Array.isArray(obj[key]) && obj[key][0].includes(searchString)) {
        return true;
      }
    }
    return false;
  }

  async function submitHandler(e: any) {
    e.preventDefault();
    setIsLoading(true);
    var base64Img: any = [];

    base64List.map((e: any) => {
      base64Img.push(e["img"]);
    });
    const addVehicleURl = "http://localhost:8000/api/vehicle/";

    const json = JSON.stringify({
      name: vehicleName,
      vin: vin,
      kilometers: kilometers,
      year: parseInt(year),
      engine_size: engineSize,
      color: color,
      doors: doors,
      fuel_type: fuelType,
      drivetrain: driveTrain,
      engine_power: enginePower,
      length: length,
      width: width,
      height: height,
      cylinders: cylinders,
      manufacturer: manufacturer,
      images: base64Img,
    });

    console.log(json);

    const res = await fetch(addVehicleURl, {
      method: "POST",
      body: json,
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      setTimeout(() => {
        router.replace("/home");
        antdNotification("success", "", "Vehicle added successfully");
      }, 2000);
    } else {
      const response = await res.json();

      if (
        hasListWithFirstElementContainingString(
          response,
          "This field may not"
        ) ||
        hasListWithFirstElementContainingString(
          response,
          "This field is required."
        )
      ) {
        setIsLoading(false);
        antdNotification("error", "", "All fields are required.");
      }

      if (response.vin) {
        setIsLoading(false);
        if (response.vin[0] === "vehicle with this vin already exists.") {
          antdNotification(
            "error",
            "",
            "Vehicle with this VIN already exists."
          );
        }
      }
    }
  }

  const disabledYear = (current: any) => {
    const year = current.year();
    return year < 1900 || year > 2023;
  };

  return (
    <>
      <MainNavigation />
      <div className={classes.formContainer}>
        {isLoading ? (
          <Spin tip="Adding Vehicle" size="large">
            <div></div>
          </Spin>
        ) : (
          <div>
            <h2
              style={{
                fontWeight: "bold",
                marginBottom: "20px",
                textAlign: "center",
              }}
            >
              Provide Vehicle details below
            </h2>
            <AntdForm
              submitHandler={submitHandler}
              vehicleNameHandler={vehicleNameHandler}
              vehicleName={vehicleName}
              vinHandler={vinHandler}
              vin={vin}
              disabledYear={disabledYear}
              year={year ? dayjs(year) : ""}
              dateHandler={dateHandler}
              engineSizeHandler={engineSizeHandler}
              engineSize={engineSize}
              doorsHandler={doorsHandler}
              doors={doors}
              colorHandler={colorHandler}
              color={color}
              fuelTypeHandler={fuelTypeHandler}
              fuelType={fuelType}
              driveTrainHandler={driveTrainHandler}
              driveTrain={driveTrain}
              enginePowerHandler={enginePowerHandler}
              enginePower={enginePower}
              lengthHandler={lengthHandler}
              length={length}
              heightHandler={heightHandler}
              height={height}
              widthHandler={widthHandler}
              width={width}
              kilometersHandler={kilometersHandler}
              kilometers={kilometers}
              cylindersHandler={cylindersHandler}
              cylinders={cylinders}
              manufacturerHandler={manufacturerHandler}
              manufacturer={manufacturer}
              image={image}
              normFile={normFile}
              btnName="Submit"
            />
          </div>
        )}
      </div>
    </>
  );
}

export default AddVehicle;
