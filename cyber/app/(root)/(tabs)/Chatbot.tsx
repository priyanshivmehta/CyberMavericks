import React, { useState, useCallback, useEffect, useRef } from 'react';
import { GiftedChat, Bubble, IMessage } from 'react-native-gifted-chat';
import uuid from 'react-native-uuid';
import OpenAI from "openai";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import * as Speech from "expo-speech"; // Import Text-to-Speech

const openai = new OpenAI({
  apiKey: "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",
  dangerouslyAllowBrowser: true,
});

export function ChatScreen() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const lastTap = useRef(0);
  const [isSpeaking, setIsSpeaking] = useState(false); // Track if speech is active

  // 🔥 Function to Handle Text-to-Speech
  const speakMessage = (message: string) => {
    Speech.speak(message, { rate: 1.0, pitch: 1.0 });
    setIsSpeaking(true);
  };

  const stopSpeech = () => {
    Speech.stop();
    setIsSpeaking(false);
  };

  // 🔥 Detect Double Tap to Start/Stop Speech
  const handleTextToSpeech = () => {
    const now = Date.now();
    if (now - lastTap.current < 300) {
      if (isSpeaking) {
        stopSpeech();
      } else {
        const lastBotMessage = messages.find(msg => msg.user._id === 2);
        if (lastBotMessage) {
          speakMessage(lastBotMessage.text);
        }
      }
    }
    lastTap.current = now;
  };

  const test = async (userMessage: string) => {
    try {
      setIsTyping(true);
      const completion = await openai.chat.completions.create({
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: userMessage }
        ],
        model: "gpt-4o-mini",
      });

      if (completion.choices && completion.choices[0] && completion.choices[0].message.content) {
        const botMessage = {
          _id: uuid.v4().toString(),
          text: completion.choices[0].message.content,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'Iris',
            avatar: 'https://cdn-icons-png.flaticon.com/512/4712/4712035.png',
          },
        };

        setMessages(previousMessages => GiftedChat.append(previousMessages, [botMessage]));

        // 🔊 Speak AI-generated message automatically
        speakMessage(botMessage.text);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsTyping(false);
    }
  };

  const onSend = useCallback((messages: IMessage[]) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
    test(messages[0].text);
  }, []);

  useEffect(() => {
    const welcomeMessage = {
      _id: uuid.v4(),
      text: "Hi there! Welcome to our Vital Track. My name is Iris, your Health Buddy. How may I help you today?",
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'Iris',
        avatar: 'https://cdn-icons-png.flaticon.com/512/4712/4712035.png',
      },
    };

    setMessages([welcomeMessage]);

    // 🔊 Speak the welcome message automatically
    speakMessage(welcomeMessage.text);
  }, []);

  const renderBubble = (props: any) => (
    <Bubble
      {...props}
      wrapperStyle={{
        right: { backgroundColor: "#3867a1" },
        left: { backgroundColor: "#E5E5EA" },
      }}
      textStyle={{
        right: { color: "white" },
        left: { color: "black" },
      }}
    />
  );

  return (
    <TouchableWithoutFeedback onPress={handleTextToSpeech}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Iris - Your Health Buddy 💊</Text>
        </View>
        <GiftedChat
          messages={messages}
          onSend={messages => onSend(messages)}
          user={{ _id: 1 }}
          renderBubble={renderBubble}
          isTyping={isTyping}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#e6f7ff", marginBottom: 70 },
  header: {
    backgroundColor: "#3867a1",
    padding: 23,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000",
  },
  headerText: { fontSize: 20, fontWeight: "bold", color: "white" },
});

export default ChatScreen;
