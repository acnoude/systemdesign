import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useEffect } from 'react';
import { useFleetStore } from './fleetStore';

import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Delete the default internal 'broken' paths
delete (L.Icon.Default.prototype as any)._getIconUrl;

// Merge the correct imported paths
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
});

function FleetMap() {
  const { vehicles, setVehicles } = useFleetStore();

  useEffect(() => {
    // Calling your FastAPI backend
    const refreshData = async () => {
      const res = await fetch('https://urban-space-barnacle-965j6vvrx5w3pqxq-8000.app.github.dev/api/vehicles');
      
      const data = await res.json();
      setVehicles(data);
    };
    refreshData();

    const interval = setInterval(refreshData, 3000);
    return () => clearInterval(interval);

  }, [setVehicles]);

 return (
  <div style={{ height: '100vh', width: '100%' }}> {/* Ensure parent is full height */}
    <h1>Fleet Tracker</h1>
    <MapContainer 
      center={[37.7749, -122.4194]} // Set this to San Francisco
      zoom={12} 
      style={{ height: '90vh', width: '100%' }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      
      {vehicles.map(truck => {
        if (truck.lat !== undefined && truck.long !== undefined) {
          const position = { lat: truck.lat, lng: truck.long };
          return (
            <Marker key={truck.id} position={position}>
              <Popup>
                <strong>{truck.id}</strong> <br />
                Status: {truck.status}
              </Popup>
            </Marker>
          );
        }
        return null;
      })}
    </MapContainer>
  </div>
);
}

export default FleetMap; // Or whatever you named your main component function