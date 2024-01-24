import { MapContainer, TileLayer, useMap, useMapEvent } from 'react-leaflet';
import React, { useState, useEffect, ChangeEvent } from 'react';
import 'leaflet/dist/leaflet.css';

interface Item {
  name: string;
  status: string;
  location: {
    lat: number;
    lng: number;
  };
}

const CornellCampus: React.FC = () => {
  const [item, setItem] = useState<Item>({
    name: "",
    status: "", //user should input either 'found' or 'lost'/
    location: { lat: 42.449, lng: -76.480 }
  });

  const ItemFound = () => {
    useMapEvent('click', (e) => {
      setItem(prev => ({ ...prev, location: { lat: e.latlng.lat, lng: e.latlng.lng } }));
    });
    return null;
  };
  const UserInput = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setItem(prev => ({ ...prev, [name]: value }));
    return null;

  };

  const center = { lat: 42.449, lng: 76.480 };
  return (
    <div>
      <MapContainer center={center} zoom={9} style={{ height: '200px' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <ItemFound />
      </MapContainer>
      <form>
        <label>
          Item Type:
          <input
            type="text"
            name="itemType"
            value={item.name}
            onChange={UserInput}
          />
        </label>
        <label>
          Status:
          <select name="status" value={item.status} onChange={UserInput}>
            <option value="">Select...</option>
            <option value="found">Found</option>
            <option value="lost">Lost</option>
          </select>
        </label>
        <p>Location: {item.location.lat}, {item.location.lng}</p>
      </form>
    </div>
  );

};
export default CornellCampus;

