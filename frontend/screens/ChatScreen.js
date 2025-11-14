import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, ImageBackground, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import mockData from '../assets/mock_data.json';

const backgroundImage = require('../assets/chat_background.jpg');

const ChatScreen = ({ route }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const scrollViewRef = useRef();
  const messageIdCounter = useRef(0);

  useEffect(() => {
    const imageUri = route.params?.imageUri;
    const initialAiMessage = { id: messageIdCounter.current++, text: "Hello! I am Nirvaah, your AI health assistant. Please describe your symptoms.", sender: 'ai' };

    if (imageUri) {
      const userImageMessage = { id: messageIdCounter.current++, type: 'image', uri: imageUri, sender: 'user' };
      const aiAnalysisMessage = { id: messageIdCounter.current++, text: "Thank you for the image. I am analyzing it now...", sender: 'ai' };
      setMessages([initialAiMessage, userImageMessage, aiAnalysisMessage]);
    } else {
      setMessages([initialAiMessage]);
    }
  }, [route.params?.imageUri]);

  const getAiResponse = async (userInput, hasImage) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (hasImage) {
      return `Based on the image, this appears to be a form of skin irritation, possibly an allergic reaction. \n\n${mockData.first_aid['Skin Allergy']}\n\nCan you describe any other symptoms you are feeling?`;
    }
    const lowerCaseInput = userInput.toLowerCase();
    if (lowerCaseInput.includes("fever") || lowerCaseInput.includes("cough")) { return `Based on your symptoms, it sounds like a **Common Cold**.\n\n${mockData.first_aid['Common Cold']}`; }
    if (lowerCaseInput.includes("stomach") || lowerCaseInput.includes("vomit")) { return `Your symptoms point towards potential **Gastritis**.\n\n${mockData.first_aid['Gastritis']}`; }
    return "I see. Could you please provide more details?";
  };

  const handleSend = async () => {
    if (inputText.trim() === '') return;
    const currentUserInput = inputText;
    const newUserMessage = { id: messageIdCounter.current++, text: currentUserInput, sender: 'user' };
    setMessages(prev => [...prev, newUserMessage]);
    setInputText('');
    const aiResponseText = await getAiResponse(currentUserInput, false);
    const newAiMessage = { id: messageIdCounter.current++, text: aiResponseText, sender: 'ai' };
    setMessages(prev => [...prev, newAiMessage]);
  };
  
  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.overlay}>
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS === "android" ? "height" : "padding"} style={{ flex: 1 }}>
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
                </ScrollView>
                <View style={styles.inputContainer}>
                  <TextInput style={styles.textInput} value={inputText} onChangeText={setInputText} placeholder="Describe your symptoms..." placeholderTextColor="#999"/>
                  <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
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
  container: { flex: 1 ,},
  messagesList: { flex: 1 },
  messagesContainer: { paddingVertical: 10, paddingHorizontal: 10 },
  messageBubble: { maxWidth: '80%', padding: 10, borderRadius: 15, marginBottom: 10 },
  userBubble: { backgroundColor: '#2E7D32', alignSelf: 'flex-end', borderBottomRightRadius: 5 },
  aiBubble: { backgroundColor: 'white', alignSelf: 'flex-start', borderBottomLeftRadius: 5 },
  userText: { color: 'white', fontSize: 20 },
  aiText: { color: '#333', fontSize: 20 },
  chatImage: { width: 200, height: 200, borderRadius: 10 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', padding: 50, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.2)', backgroundColor: 'rgba(0,0,0,0.2)' },
  textInput: { flex: 1, backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: 20, paddingHorizontal: 15, paddingVertical: 50, marginRight: 10, fontSize: 16, padding:10,paddingBottom:60 },
  sendButton: { backgroundColor: '#007bff', padding: 12, borderRadius: 25 },
});

export default ChatScreen;