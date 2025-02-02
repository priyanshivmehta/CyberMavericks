from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from typing import List

# Initialize FastAPI app
app = FastAPI()

# Allowing CORS for development (can be restricted later)
origins = [
    "http://localhost:3000",  # React Native development server URL
    "http://localhost:8000",  # FastAPI server URL (for local development)
    "*",  # Allows all origins (for testing)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Pydantic model to validate the incoming data
class SymptomsRequest(BaseModel):
    symptoms: List[str]

# Dummy disease data for possible diagnosis
diseases_data = {
    "Chest Pain": [{"disease": "Heart Attack", "cure": "Immediate medical attention required."}],
    "Dizziness": [{"disease": "Vertigo", "cure": "Vestibular rehabilitation therapy."}],
    "Headache": [{"disease": "Migraine", "cure": "Pain relievers and hydration."}],
    "Vomiting": [{"disease": "Gastroenteritis", "cure": "Rest and hydration."}],
    "Sudden Loss of Weight": [{"disease": "Hyperthyroidism", "cure": "Thyroid medication."}],
    "Blurred Vision": [{"disease": "Glaucoma", "cure": "Eye pressure-lowering medications."}],
}

# Define the POST endpoint for symptom check
@app.post("/check_symptoms")
async def check_symptoms(request: SymptomsRequest):
    symptoms = request.symptoms
    diagnosis_info = []

    # Loop through the selected symptoms and add possible diagnosis to the response
    for symptom in symptoms:
        if symptom in diseases_data:
            diagnosis_info.extend(diseases_data[symptom])

    # If no diagnosis information is found, return a default message
    if not diagnosis_info:
        diagnosis_info.append({"disease": "Unknown Condition", "cure": "Consult a doctor for further examination."})

    return diagnosis_info

# Optional root endpoint for testing
@app.get("/")
async def root():
    return {"message": "FastAPI is running!"}
