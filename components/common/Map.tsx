"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Leaflet ke default icons Next.js mein kabhi kabhi break ho jate hain,
// isliye ye fix lagana padta hai:
const icon = L.icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export default function MyMap() {
  const position: [number, number] = [20.5937, 78.9629]; // India coordinates

  return (
    <div className="w-full h-full absolute inset-0">
      <MapContainer
        center={position}
        zoom={5}
        scrollWheelZoom={false}
        className="w-full h-full"
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={icon}>
          <Popup>Hello! Ye India ka center hai.</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
