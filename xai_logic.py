# ==============================================================================
#                      XAI Keyword Extraction Blueprint
# This script defines and tests the logic for the Explainable AI feature.
# ==============================================================================

def extract_keywords(input_text, diagnosis):
    """
    Finds and returns symptom keywords from the input text based on the given diagnosis.

    Args:
      input_text (str): The raw sentence from the user (e.g., "I have a high fever and a sore throat").
      diagnosis (str): The diagnosis provided by the AI model (e.g., "Common Cold").

    Returns:
      list: A list of keyword strings found in the input text.
    """
    # Convert input to lowercase to make matching case-insensitive
    input_text = input_text.lower()
    keywords_to_highlight = []

    # --- This is the "brain" of the XAI ---
    # We map each diagnosis to a list of its most common symptom keywords.
    symptom_map = {
        "Common Cold": ["fever", "cough", "sore throat", "runny nose", "sneezing", "headache"],
        "Gastritis": ["stomach pain", "nausea", "bloating", "vomiting", "indigestion", "burning"],
        "Eczema": ["rash", "itchy", "dry skin", "redness", "inflammation"],
        "Dehydration": ["dizzy", "dizziness", "dry mouth", "fatigue", "dark urine", "thirsty"],
        "Minor Burn": ["burn", "blister", "red skin", "pain"]
    }

    # Check if the given diagnosis is in our map
    if diagnosis in symptom_map:
        # Loop through each keyword for that diagnosis
        for keyword in symptom_map[diagnosis]:
            # If the keyword is present in the user's text, add it to our list
            if keyword in input_text:
                keywords_to_highlight.append(keyword)

    return keywords_to_highlight

# ==============================================================================
#                              --- TESTING ---
#  We will now test the function with some example inputs to ensure it works.
# ==============================================================================

print("--- Testing the XAI Keyword Extraction Function ---\n")

# Test Case 1: A typical cold
user_input_1 = "I have a high fever and a really bad sore throat."
diagnosis_1 = "Common Cold"
extracted_keywords_1 = extract_keywords(user_input_1, diagnosis_1)
print(f"Input: '{user_input_1}'")
print(f"Diagnosis: '{diagnosis_1}'")
print(f"Extracted Keywords: {extracted_keywords_1}") # Expected output: ['fever', 'sore throat']
print("-" * 20)


# Test Case 2: A stomach issue
user_input_2 = "Feeling a lot of stomach pain and some nausea after eating."
diagnosis_2 = "Gastritis"
extracted_keywords_2 = extract_keywords(user_input_2, diagnosis_2)
print(f"Input: '{user_input_2}'")
print(f"Diagnosis: '{diagnosis_2}'")
print(f"Extracted Keywords: {extracted_keywords_2}") # Expected output: ['stomach pain', 'nausea']
print("-" * 20)


# Test Case 3: A case where the diagnosis is not in our map
user_input_3 = "My leg hurts."
diagnosis_3 = "Leg Pain"
extracted_keywords_3 = extract_keywords(user_input_3, diagnosis_3)
print(f"Input: '{user_input_3}'")
print(f"Diagnosis: '{diagnosis_3}'")
print(f"Extracted Keywords: {extracted_keywords_3}") # Expected output: []
print("-" * 20)