"use client";

import MainNavigation from "../components/layout/MainNavigation";
import VehicleList from "../components/VehicleList";

const fetchVehicle = async () => {
  const res = await fetch("http://localhost:8000/api/vehicle/");
  return res.json();
};

async function Home() {
  const fetchedVehicles = await fetchVehicle();
  // console.log(fetchedVehicles);
  return (
    <div>
      <MainNavigation />
      {fetchedVehicles.length === 0 ? (
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
        <VehicleList vehicles={fetchedVehicles} />
        // fetchedVehicles.map((e: any) =>
        //   <div style={{ marginTop: "140px" }}>
        //     <h1 >{e.name}</h1>
        //     <h3>{e.vin}</h3>

        //   </div>
        // )
      )}
    </div>
  );
}

export default Home;
