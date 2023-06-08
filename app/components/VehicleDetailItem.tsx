import classes from "./VehicleDetailItem.module.css";

function VehicleDetailItem(props: any) {
  const IconComponent = props.icon;
  return (
    <div className={classes.contents}>
      <div>
        <IconComponent size={40} style={{ color: "#47b5fe" }} />
      </div>
      <div className={classes.descriptions}>
        <p style={{ fontSize: "12px" }}>{props.title}</p>
        <p>{props.subTitle}</p>
      </div>
    </div>
  );
}

export default VehicleDetailItem;
