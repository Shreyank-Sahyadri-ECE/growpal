from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow frontend to talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # in prod: set to ["http://localhost:5173"] or actual domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health check
@app.get("/api/health")
def health():
    return {"status": "ok"}

# Simple recommendation dataset
RECOMMENDATIONS = {
    "Summer": {
        "Loamy": ["Tomato", "Corn", "Cucumber"],
        "Sandy": ["Watermelon", "Groundnut"],
        "Clay": ["Rice", "Sugarcane"]
    },
    "Winter": {
        "Loamy": ["Wheat", "Carrot", "Peas"],
        "Sandy": ["Mustard", "Barley"],
        "Clay": ["Potato", "Onion"]
    },
    "Monsoon": {
        "Loamy": ["Rice", "Maize"],
        "Sandy": ["Bajra", "Jowar"],
        "Clay": ["Paddy", "Turmeric"]
    }
}

# Recommendation API
@app.post("/api/recommend")
def recommend(payload: dict):
    season = payload.get("season")
    soil_type = payload.get("soil_type")

    crops = RECOMMENDATIONS.get(season, {}).get(soil_type, [])

    return {
        "season": season,
        "soil_type": soil_type,
        "crops": crops
    }
