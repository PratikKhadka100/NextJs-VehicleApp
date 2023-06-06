import VehicleItem from "./VehicleItem";
import classes from "./VehicleList.module.css";

function VehicleList(props: any) {
  return (
    <div className={classes.container}>
      <section className={classes.content}>
        {props.vehicles.map((e: any) => {
          return (
            <VehicleItem
              vimg={e.images}
              vname={e.name}
              vin={e.vin}
              id={e.id}
              year={e.year}
              kilometers={e.kilometers.toLocaleString()}
              fuel={e.fuel_type}
              enginepower={e.engine_power}
              manufacturer={e.manufacturer}
            />
          );
        })}
      </section>
    </div>
  );
}

export default VehicleList;
