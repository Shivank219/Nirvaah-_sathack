# Symptom Text Model Information (`symptom_model.tflite`)

        This document provides all necessary details for integrating the text diagnosis model.

        ## 1. Input Tensor Details

        *   **Shape:** `[1, 128]`
            *   `1`: The batch size. Always send one sentence at a time.
            *   `128`: The sequence length. Every input text must be converted into a sequence of exactly 128 numbers.
        *   **Data Type:** `float32`
        *   **Preprocessing Steps:**
            1.  Take the raw user text (e.g., "I have a fever and cough").
            2.  Convert to lowercase.
            3.  Tokenize the text into a sequence of integers using our vocabulary file (`vocab.json`).
            4.  Pad the sequence with `0`s at the end, or truncate it, so the final length is **exactly 128**.

        ## 2. Output Tensor Details

        *   **Shape:** `[1, 15]`
            *   `1`: The batch size.
            *   `15`: The number of possible diseases. The output is an array of 15 probabilities.
        *   **Data Type:** `float32`
        *   **Output Index Mapping:** To find the diagnosis, find the index of the highest value in the output array and map it to this list:
            *   `0`: Acne
            *   `1`: Infected wound
            *   `2`: Joint pain
            *   `3`: Knee pain
            *   `4`: Shoulder pain
            *   `5`: Common Cold
            *   `6`: Migraine
            *   `7`: Gastritis
            *   `8`: Food Poisoning
            *   `9`: Hypertension
            *   `10`: Diabetes
            *   `11`: Allergies
            *   `12`: Asthma
            *   `13`: Bronchitis
            *   `14`: Dehydration