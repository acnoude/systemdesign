import {create} from 'zustand';


interface FleetStore{
    vehicles: any[];
    setVehicles: (data: any[]) => void;
}

export const useFleetStore = create<FleetStore>((set) => ({
    vehicles:[],
    setVehicles: (data) => set({vehicles:data}),
}));