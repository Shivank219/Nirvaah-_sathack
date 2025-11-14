// src/services/ApiService.js

const API_BASE_URL = 'http://10.212.156.180:8000'; // Your correct IP and port

/**
 * MOCK DIAGNOSIS FUNCTION
 * This function simulates the AI diagnosis locally on the phone.
 * This is a temporary solution for the hackathon.
 * @param {object} data - An object containing { text: 'symptoms' }.
 * @returns {Promise<object>} A promise that resolves to a simulated diagnosis object.
 */
export const mockGetDiagnosis = async (data) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500)); 
  
  const text = data.text.toLowerCase();

  if (text.includes('fever') || text.includes('cough') || text.includes('cold')) {
    return {
      diagnosis: 'Common Cold',
      confidence: 0.85,
      next_steps: '1. Rest and stay hydrated.\n2. Use over-the-counter pain relievers.\n3. See a doctor if symptoms worsen after 3 days.'
    };
  } if (text.includes('stomach') || text.includes('vomiting') || text.includes('nausea')) {
    return {
      diagnosis: 'Food Poisoning',
      confidence: 0.89,
      next_steps: '1. Rest and stay hydrated.\n2. Eat Bland/Easily digestible food.\n3. See a doctor if symptoms worsen after 3 days.'
    };
  } if (text.includes('Cough') || text.includes('bloody mucus') || text.includes('chest pain') || text.includes('shortness of breath')) {
    return {
      diagnosis: 'Pneumonia',
      confidence: 0.65,
      next_steps: '1. Rest and stay hydrated.\n2. Avoid Smoking.\n3. See a doctor if symptoms worsen after 3 days.'
    };
  }
  if (text.includes('rash') || text.includes('itchy')) {
      return {
          diagnosis: 'Skin Allergy',
          confidence: 0.78,
          next_steps: '1. Avoid scratching the area.\n2. Apply a cold compress.\n3. Consider an over-the-counter antihistamine.'
      };
  }

  // If no keywords match, return a generic response
  return { error: "I'm sorry, I couldn't identify the condition from your description. Could you please provide more details?" };
};


/**
 * REAL API CALL to your backend.
 * Calls the /xai-keywords endpoint to get keywords for a given diagnosis.
 * @param {string} diagnosis - The diagnosis string (e.g., "Common Cold").
 * @param {string} userText - The original text input from the user.
 * @returns {Promise<Array<string>>} A promise that resolves to an array of keywords.
 */
export const getXAIKeywords = async (diagnosis, userText) => {
  const requestBody = {
    diagnosis: diagnosis,
    text: userText,
  };

  try {
    const response = await fetch(`${API_BASE_URL}/xai-keywords`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      console.error('API Error fetching XAI keywords:', response.status);
      return []; // Return an empty array on error
    }

    const data = await response.json();
    // Your server sends back { keywords: ["fever", "cough"] }
    return data.keywords || [];
  } catch (error) {
    console.error('Network error fetching XAI keywords:', error);
    return []; // Return an empty array on error
  }
};