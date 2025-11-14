import json
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel # IMPORTANT: New import for defining the request structure
from typing import List, Dict, Any

# --- NEW: Define the structure of the incoming XAI request ---
# This tells FastAPI what kind of JSON to expect for the XAI endpoint.
class XAIRequest(BaseModel):
    diagnosis: str
    text: str

# --- All this code is the same as before ---
try:
    with open("mock_data.json", "r") as f:
        data = json.load(f)
except FileNotFoundError:
    print("WARNING: mock_data.json not found. Using empty data.")
    data = {"doctors": [], "phcs": [], "xai_keywords": {}}

app = FastAPI(title="NIRVAAH API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/healthcheck")
def health_check():
    return {"status": "ok"}

@app.get("/doctors")
def get_doctors():
    return data.get("doctors", [])

@app.get("/phcs")
def get_phcs():
    return data.get("phcs", [])

# --- THIS IS THE NEW XAI ENDPOINT YOU ARE ADDING ---
@app.post("/xai-keywords")
def get_xai_keywords(request: XAIRequest) -> Dict[str, List[str]]:
    """
    Receives a diagnosis and user text, returns keywords found in the text.
    """
    # Get the list of keywords for the given diagnosis from our mock data
    # Example: diagnosis = "Common Cold" -> keywords_to_check = ["fever", "cough", ...]
    keywords_to_check = data.get("xai_keywords", {}).get(request.diagnosis, [])
    found_keywords = []

    # Loop through each keyword and check if it exists in the user's text
    # We convert both to lowercase to make the check case-insensitive
    for keyword in keywords_to_check:
        if keyword.lower() in request.text.lower():
            found_keywords.append(keyword)

    return {"keywords": found_keywords}