from fastapi import APIRouter
from pydantic import BaseModel
router = APIRouter(prefix="/plan")  # Explicit prefix

class PlanRequest(BaseModel):
    season: str
    soil_type: str

crop_recommendations = {
    "summer": {
        "sandy": ["Watermelon", "Groundnut", "Cucumber"],
        "clay": ["Maize", "Sunflower", "Millets"],
        "loamy": ["Tomato", "Okra", "Chili"]
    },
    "winter": {
        "sandy": ["Carrot", "Onion", "Cabbage"],
        "clay": ["Wheat", "Mustard", "Barley"],
        "loamy": ["Peas", "Spinach", "Cauliflower"]
    },
    "rainy": {
        "sandy": ["Castor", "Green Gram", "Cowpea"],
        "clay": ["Rice", "Sugarcane", "Jute"],
        "loamy": ["Soybean", "Pigeon Pea", "Sesame"]
    }
}

@router.post("/plan")
def recommend_plan(request: PlanRequest):
    season = request.season.lower().strip()
    soil = request.soil_type.lower().strip()
    crops = crop_recommendations.get(season, {}).get(soil)

    if crops:
        return {"season": season, "soil_type": soil, "recommendations": crops}
    return {"season": season, "soil_type": soil, "recommendations": ["Data not available for this combination"]}