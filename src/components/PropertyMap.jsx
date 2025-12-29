import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const PropertyMap = ({ lat, lng }) => {
  if (!lat || !lng) return <p>Location not available</p>;

  return (
    <MapContainer
      center={[lat, lng]}
      zoom={15}
      style={{ height: "350px", width: "100%", borderRadius: "12px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors"
      />
      <Marker position={[lat, lng]}>
        <Popup>Property Location</Popup>
      </Marker>
    </MapContainer>
  );
};

export default PropertyMap;
