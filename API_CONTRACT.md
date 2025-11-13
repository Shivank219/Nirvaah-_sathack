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
     "id": 1,
        "name": "Dr. Vikram Kumar",
        "specialty": "General Physician",
        "clinicName": "Arogya Clinic",
        "address": "123 Village Road, Purulia, WB"

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
