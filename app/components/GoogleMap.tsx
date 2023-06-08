function GoogleMap() {
  const screenWidth = window.innerWidth;

  let mapWidth = "600";
  let mapHeight = "300";

  if (screenWidth <= 600) {
    mapWidth = "320";
    mapHeight = "300";
  }
  return (
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2803.07841492527!2d-75.78920482382712!3d45.367412671072536!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cce01301711d7ef%3A0x28d5b0c130c89868!2s1325%20Richmond%20Rd%2C%20Ottawa%2C%20ON%20K2B%206R7%2C%20Canada!5e0!3m2!1sen!2snp!4v1685263198275!5m2!1sen!2snp"
      width={mapWidth}
      height={mapHeight}
      style={{ border: "0" }}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  );
}

export default GoogleMap;
