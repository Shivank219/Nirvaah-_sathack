import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, ImageBackground, KeyboardAvoidingView, Platform, Image, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
// UPDATED IMPORT: We now import two functions from our ApiService
import { mockGetDiagnosis, getXAIKeywords } from '../src/services/ApiService'; 

const backgroundImage = require('../assets/chat_background.jpg');

const ChatScreen = ({ route }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef();
  const messageIdCounter = useRef(0);

  // This useEffect will run once when the screen loads to show the welcome message.
  // We have removed the image logic for now to focus on the text flow.
  useEffect(() => {
    const initialAiMessage = { 
      id: messageIdCounter.current++, 
      text: "Hello! I am Nirvaah, your AI health assistant. Please describe your symptoms.", 
      sender: 'ai' 
    };
    setMessages([initialAiMessage]);
  }, []); // Empty dependency array ensures this runs only once.

  // This is the core function for handling the chat logic
  const handleSend = async () => {
    if (inputText.trim() === '' || isLoading) return;

    const currentUserInput = inputText;
    const newUserMessage = { id: messageIdCounter.current++, text: currentUserInput, sender: 'user' };
    
    setMessages(prev => [...prev, newUserMessage]);
    setInputText('');

    // --- START OF NEW HACKATHON-READY LOGIC ---
    try {
      setIsLoading(true);

      // Step 1: Get the diagnosis from our LOCAL MOCK function first.
      const diagnosisResult = await mockGetDiagnosis({ text: currentUserInput });

      let newAiMessage;

      if (diagnosisResult.error) {
        // Handle cases where the mock function couldn't identify symptoms
        newAiMessage = {
          id: messageIdCounter.current++,
          text: diagnosisResult.error,
          sender: 'ai'
        };
      } else {
        // Step 2: If we have a diagnosis, call the REAL backend API to get keywords.
        const keywords = await getXAIKeywords(diagnosisResult.diagnosis, currentUserInput);

        // Step 3: Combine the mock diagnosis and the real API keywords into one powerful response.
        let responseText = `Based on your symptoms, this could be: ${diagnosisResult.diagnosis} (Confidence: ${Math.round(diagnosisResult.confidence * 100)}%).\n\nRecommended first steps:\n${diagnosisResult.next_steps}`;

        // This is the "Explainable AI" feature that will impress the judges!
        if (keywords.length > 0) {
          responseText += `\n\nKey symptoms I identified are: ${keywords.join(', ')}.`;
        }
        
        newAiMessage = {
          id: messageIdCounter.current++,
          text: responseText,
          sender: 'ai'
        };
      }
      
      setMessages(prev => [...prev, newAiMessage]);

    } catch (error) {
      console.error("Critical error in handleSend flow:", error);
      const errorMessage = { id: messageIdCounter.current++, text: "An unexpected error occurred. Please try again.", sender: 'ai' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false); // This will always run, ensuring the loading indicator disappears.
    }
    // --- END OF NEW LOGIC ---
  };
  
  // This useEffect ensures the chat scrolls to the bottom when new messages are added.
  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  // The JSX for rendering the screen. No changes needed here.
  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.overlay}>
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
                <ScrollView ref={scrollViewRef} style={styles.messagesList} contentContainerStyle={styles.messagesContainer}>
                  {messages.map((msg) => (
                    <View key={msg.id} style={[ styles.messageBubble, msg.sender === 'user' ? styles.userBubble : styles.aiBubble ]}>
                      {msg.type === 'image' ? (
                        <Image source={{ uri: msg.uri }} style={styles.chatImage} />
                      ) : (
                        <Text style={msg.sender === 'user' ? styles.userText : styles.aiText}>{msg.text}</Text>
                      )}
                    </View>
                  ))}
                  {isLoading && (
                    <View style={[styles.messageBubble, styles.aiBubble]}>
                      <ActivityIndicator size="small" color="#333" />
                    </View>
                  )}
                </ScrollView>
                <View style={styles.inputContainer}>
                  <TextInput 
                    style={styles.textInput} 
                    value={inputText} 
                    onChangeText={setInputText} 
                    placeholder="Describe your symptoms..." 
                    placeholderTextColor="#999"
                    editable={!isLoading}
                  />
                  <TouchableOpacity 
                    style={[styles.sendButton, isLoading && styles.sendButtonDisabled]}
                    onPress={handleSend}
                    disabled={isLoading}
                  >
                    <MaterialCommunityIcons name="send" size={24} color="white" />
                  </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' },
  container: { flex: 1 },
  messagesList: { flex: 1 },
  messagesContainer: { paddingVertical: 10, paddingHorizontal: 10 },
  messageBubble: { maxWidth: '80%', padding: 10, borderRadius: 15, marginBottom: 10 },
  userBubble: { backgroundColor: '#2E7D32', alignSelf: 'flex-end', borderBottomRightRadius: 5 },
  aiBubble: { backgroundColor: 'white', alignSelf: 'flex-start', borderBottomLeftRadius: 5 },
  userText: { color: 'white', fontSize: 16 },
  aiText: { color: '#333', fontSize: 16 },
  chatImage: { width: 200, height: 200, borderRadius: 10 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', padding: 50, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.2)', backgroundColor: 'rgba(0,0,0,0.2)' },
  textInput: { flex: 1, backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: 20, paddingHorizontal: 15, paddingVertical: 10, marginRight: 10, fontSize: 16 },
  sendButton: { backgroundColor: '#39c602ff', padding: 12, borderRadius: 25 },
  sendButtonDisabled: { backgroundColor: '#999' },
});

export default ChatScreen;