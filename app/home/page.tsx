"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import MainNavigation from "../components/layout/MainNavigation";
import VehicleList from "../components/VehicleList";

// const fetchVehicle = async () => {
//   const res = await fetch("http://localhost:8000/api/vehicle/");
//   return res.json();
// };

function Home() {
  // const [user, setUser] = useState(() =>
  //   typeof window !== "undefined"
  //     ? window.localStorage.getItem("name")
  //       ? window.localStorage.getItem("name")
  //       : null
  //     : null
  // );

  const router = useRouter();

  // useEffect(() => {
  //   if (!user) {
  //     console.log("no user");
  //     router.replace("/");
  //   } else {
  //     console.log("user found");
  //   }
  // }, []);

  const [isValidating, setIsValidating] = useState(true);
  const [vehicleList, setVehicleList] = useState([]);

  useEffect(() => {
    // console.log("useEffect()");
    const user = localStorage.getItem("name");
    if (user === null || user === undefined) {
      router.replace("/");
    } else {
      fetch("http://localhost:8000/api/vehicle/")
        .then((response) => response.json())
        .then((data) => {
          setVehicleList(data);
        });
    }
    setTimeout(() => {
      setIsValidating(false);
    }, 5000);
  }, []);

  // const fetchedVehicles = await fetchVehicle();
  return (
    <div>
      {isValidating ? (
        <p>Validating user please wait...</p>
      ) : (
        <div>
          <MainNavigation />
          {vehicleList.length === 0 ? (
            <div
              style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p>No Vehicles added yet!</p>
              <p>Click on Add Vehicle to get started {":)"}</p>
            </div>
          ) : (
            <VehicleList vehicles={vehicleList} />
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
