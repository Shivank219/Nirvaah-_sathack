# API Contract for Nirvaah (Version 2.1)

This document is the single source of truth for all data and communication between the frontend and backend.

**Base URL:** TBD (To be deployed on Render)

---

### **Endpoint: `/allData`**
**Method:** GET
**Description:** Returns a single JSON object containing all necessary application data: doctors, PHCs, and XAI keywords. This allows the app to download all data in one go for offline use.

**Response Body (Single JSON Object):**
```json
{
  "doctors": [
    {
      "id": 1,
      "name": "Dr. Priya Sharma",
      "specialty": "General Physician",
      "clinicName": "Sharma Health Clinic",
      "address": "123 Village Road, Rampur, Uttar Pradesh"
    }
  ],
  "phcs": [
    {
      "id": 101,
      "name": "Rampur Community Health Center (CHC)",
      "address": "Government Hospital Complex, Rampur, Uttar Pradesh"
    }
  ],
  "xai_keywords": {
    "Common Cold": [
      "fever",
      "cough",
      "sore throat",
      "runny nose",
      "sneeze"
    ],
    "Gastritis": [
      "stomach",
      "burning",
      "nausea",
      "vomit",
      "acidic"
    ],
    "Skin Allergy": [
      "rash",
      "itch",
      "redness",
      "hives"
    ]
  }
}
