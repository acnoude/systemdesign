from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import random

app = FastAPI()

class Vehicle(BaseModel):
    id:str
    lat:float
    long:float
    status:str # "Active", "Maintenance Required", "Idle"

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], # Your React URL
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/vehicles")
async def get_vehicles():
    return [
        {
            "id": "V001",
            "lat": 37.7749 + random.uniform(-0.01, 0.01),
            "long": -122.4194 + random.uniform(-0.01, 0.01),
            "status": random.choice(["Active", "Maintenance Required", "Idle"])
        },

        {
            "id": "V002",
            "lat": 34.0522 + random.uniform(-0.01, 0.01),
            "long": -118.2437 + random.uniform(-0.01, 0.01),
            "status": random.choice(["Active", "Maintenance Required", "Idle"])
        }
    ]
