import tensorflow as tf
import numpy as np

print(f"Using TensorFlow version: {tf.__version__}")

# Model Architecture

INPUT_SHAPE = (128,)
NUM_CLASSES = 15

# model creation
model = tf.keras.Sequential([
    tf.keras.layers.Input(shape=INPUT_SHAPE),
    tf.keras.layers.Embedding(input_dim=10000, output_dim=16),
    tf.keras.layers.GlobalAveragePooling1D(),
    tf.keras.layers.Dense(32, activation='relu'),
    tf.keras.layers.Dense(NUM_CLASSES, activation='softmax')
])

# Summary
model.summary()

# Save Untrained model
keras_model_path = "symptom_model.h5"
model.save(keras_model_path)
print(f"\n[SUCCESS] Untrained Keras model saved to: {keras_model_path}")

# Convert the keras model to tflite
print("\nStarting TFLite conversion...")
converter = tf.lite.TFLiteConverter.from_keras_model(model)
converter.optimizations = [tf.lite.Optimize.DEFAULT] # This makes the file smaller.
tflite_model = converter.convert()
print("[SUCCESS] Model converted to TFLite format.")


# Save the TFLite model
tflite_model_path = "symptom_model.tflite"
with open(tflite_model_path, 'wb') as f:
    f.write(tflite_model)
print(f"[SUCCESS] TFLite model saved to: {tflite_model_path}")

# Verify the TFLite model
print("\nVerifying the TFLite model...")
interpreter = tf.lite.Interpreter(model_path=tflite_model_path)
interpreter.allocate_tensors()

input_details = interpreter.get_input_details()[0]
output_details = interpreter.get_output_details()[0]

print(f"Input Shape Expected: {input_details['shape']}")
print(f"Input Type Expected: {input_details['dtype']}")
print(f"Output Shape Produced: {output_details['shape']}")
print(f"Output Type Produced: {output_details['dtype']}")


test_input = np.random.randint(0,1000, size=(1,128)).astype(np.float32)

interpreter.set_tensor(input_details['index'], test_input)
interpreter.invoke()

output_data = interpreter.get_tensor(output_details['index'])
print("\nTest run successful. Model produced output of shape:", output_data.shape)


