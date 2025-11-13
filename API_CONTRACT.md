# API Contract for Nirvaah

This document is the single source of truth for communication between the frontend and backend.

**Base URL:** TBD (To be deployed on Render)

---

### **Endpoint: `/doctors`**
**Method:** GET
**Description:** Returns a list of available doctors.
**Response Body (JSON Array):**
```json
[
  {
    "id": "doc_001",
    "name": "Dr. Priya Sharma",
    "specialty": "General Physician",
    "location": "Arogya Clinic, Sector 5",
    "phone": "9876543210"
  }
]
---

### **Endpoint: `/phcs`**
**Method:** GET
**Description:** Returns a list of Primary Health Centers.
**Response Body (JSON Array):**
```json
[
  {
    "id": "phc_101",
    "name": "Patiala Primary Health Center",
    "address": "123 Health St, Patiala, Punjab",
    "timings": "9 AM - 5 PM",
    "services": ["General Checkup", "Vaccinations", "Maternal Care"]
  }
]
### **Endpoint: `/explain`**
**Method:** POST
**Description:** Takes user input and a diagnosis, and returns an explanation.
**Request Body (JSON):**
```json
{
  "inputText": "I have a high fever and a sore throat",
  "diagnosis": "Common Cold"
}
{
  "explanation": "The diagnosis was influenced by the keywords: 'fever', 'sore throat'."
}
