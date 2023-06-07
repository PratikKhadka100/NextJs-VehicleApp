import { useState, useEffect } from "react";
import { Spin } from "antd";

import dayjs from "dayjs";

import classes from "./AddVehicle.module.css";
import MainNavigation from "../components/layout/MainNavigation";
import antdNotification from "@/utils/notification";
import { AntdForm } from "@/utils/AntdForm";

function EditVehicle() {
  const [vehicleName, setVehicleName] = useState("");
  const [vin, setVin] = useState("");
  const [year, setYear] = useState<any>();
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

  const [isLoading, setIsLoading] = useState(false);

  function vehicleNameHandler(e: any) {
    setVehicleName(e.target.value);
  }

  function dateHandler(_date: any, dateString: string) {
    if (dateString !== "") {
      setYear(dayjs(dateString));
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

  const disabledYear = (current: any) => {
    const year = current.year();
    return year < 1900 || year > 2023;
  };

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

  // const normFile = async (e: any) => {
  //   console.log(e);
  //   const fileList = e?.fileList;
  //   console.log(e.file.status);
  //   if (!e.file.status) {
  //     const base64 = await convertBase64(e.file);

  //     setImage([...image, {"uid": e.file.uid, "url": base64 }]);
  //   } else {
  //     const filtered = image.filter((img) => img["uid"] != e.file.uid);
  //     setImage(filtered);
  //   }

  //   return fileList;
  // };

  function hasListWithFirstElementContainingString(
    obj: any,
    searchString: string
  ) {
    for (var key in obj) {
      if (Array.isArray(obj[key]) && obj[key][0].includes(searchString)) {
        return true;
      }
    }
    return false;
  }

  function submitHandler(e: any) {
    e.preventDefault();
    setIsLoading(true);

    //   const id = location.state.id;
    //   const url = `http://localhost:8000/api/vehicle/${id}/`;

    //   var base64Img = [];

    //   image.map((e: any) => {
    //     base64Img.push(e["url"]);
    //   });

    //   const json = JSON.stringify({
    //     "name": vehicleName,
    //     "vin": vin,
    //     "kilometers": kilometers,
    //     "year": year["$y"],
    //     "engine_size": engineSize,
    //     "color": color,
    //     "doors": doors,
    //     "fuel_type": fuelType,
    //     "drivetrain": driveTrain,
    //     "engine_power": enginePower,
    //     "length": length,
    //     "width": width,
    //     "height": height,
    //     "cylinders": cylinders,
    //     "manufacturer": manufacturer,
    //     "images": base64Img,
    //   });

    //   axios({
    //     method: "put",
    //     url: url,
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     data: json,
    //   })
    //     .then((response) => {
    //       setTimeout(() => {
    //         antdNotification(
    //           "success",
    //           "",
    //           "Vehicle details updated successfully"
    //         );
    //         navigate("/home", { replace: true });
    //       }, 2000);
    //     })
    //     .catch((error) => {
    //       setIsLoading(false);
    //       if(hasListWithFirstElementContainingString(error.response.data, "This field may not") || hasListWithFirstElementContainingString(error.response.data, "This field is required.")) {
    //         antdNotification(
    //           "error",
    //           "",
    //           "All fields are required."
    //         );
    //       }
    //     });
  }

  return (
    <>
      <MainNavigation />
      <div className={classes.formContainer}>
        {isLoading ? (
          <Spin tip="Updating Vehicle" size="large">
            <div></div>
          </Spin>
        ) : (
          <div>
            <h2
              style={{
                fontWeight: "bold",
                marginBottom: "15px",
                textAlign: "center",
              }}
            >
              Update Vehicle Details
            </h2>
            <AntdForm
              submitHandler={submitHandler}
              vehicleNameHandler={vehicleNameHandler}
              vin={vin}
              vehicleName={vehicleName}
              disabledYear={disabledYear}
              isDisabled={true}
              year={year}
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
              // normFile={normFile}
              btnName="Update"
            />
          </div>
        )}
      </div>
    </>
  );
}

export default EditVehicle;
