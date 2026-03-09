import {Mapcontainer, TileLayer, Marker, Popup} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';
import { useFleetStore } from './fleetStore';

function FleetMap(){
    const {vehicles, setVehicles} = useFleetStore();

    useEffect(()=>{
        const refreshData = async() =>{
            try{
                const response = await  fetch("http://localhost:8000/api/vehicles");
                const res = response.json();
                setVehicles(res);
            }catch(err){
                console.error("Error fetching vehicle data:", err);
            }
        };
        refreshData();
    },[])

    return(
        <Mapcontainer center={[37.7749, -122.4194]} zoom={12} style={{height: "100vh", width: "100%"}}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            { vehicles.map(truck => (
                <Marker key={truck.id} position={[truck.lat, truck.long]}>
                    <Popup>
                        <strong>Vehicle ID:</strong> {truck.id}<br/>
                        <strong>Status:</strong> {truck.status}
                    </Popup>
                </Marker>
            ))} 
            </Mapcontainer>    
    )
}