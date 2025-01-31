import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat, Bubble, InputToolbar, Send, IMessage } from 'react-native-gifted-chat';
import uuid from 'react-native-uuid';
import OpenAI from "openai";
import { View, Text, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const openai = new OpenAI({ 
  apiKey: "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", 
  dangerouslyAllowBrowser: true
});

export function ChatScreen() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  // Predefined Q&A
  const predefinedResponses: { [key: string]: string } = {
    "how are you?": "I'm fine! What about you?",
    "hello": "Hello! How can I assist you today?",
    "who are you?": "I'm your AI assistant, here to help you.",
    "what can you do?": "I can answer your questions, provide recommendations, and assist you with general information.",
  };

  // Function to process user messages
  const test = async (userMessage: string) => {
    try {
      setIsTyping(true);
      const lowerCaseMessage = userMessage.toLowerCase();
      
      if (predefinedResponses[lowerCaseMessage as keyof typeof predefinedResponses]) {
        const predefinedReply = predefinedResponses[lowerCaseMessage as keyof typeof predefinedResponses];

        const botMessage = {
          _id: uuid.v4().toString(),
          text: predefinedReply,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'Maverick',
            avatar: 'https://placeimg.com/140/140/tech',
          },
        };

        setMessages(previousMessages => GiftedChat.append(previousMessages, [botMessage as IMessage]));
        setIsTyping(false);
        return;
      }

      const completion = await openai.chat.completions.create({
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: userMessage }
        ],
        model: "gpt-4o-mini",
      });

      const aiMessage = completion.choices[0].message.content;

      const newMessage = {
        _id: uuid.v4().toString(),
        text: aiMessage,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Maverick',
          avatar: 'https://placeimg.com/140/140/tech',
        },
      };

      setMessages(previousMessages => GiftedChat.append(previousMessages, [newMessage as IMessage]));
    } catch (error) {
      console.error(error);
    } finally {
      setIsTyping(false);
    }
  };

  const onSend = useCallback((messages: IMessage[]) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
    const userMessage = messages[0].text;
    test(userMessage);
  }, []);

  useEffect(() => {
    const welcomeMessage = {
      _id: uuid.v4(),
      text: "Hi there! Welcome to our app. How may I help you today?",
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'Maverick',
        avatar: 'https://placeimg.com/140/140/tech',
      },
    };

    setMessages([welcomeMessage]);
  }, []);

  // Custom Bubble Styling (Blue & White Theme)
  const renderBubble = (props: any) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: { backgroundColor: "#007AFF", marginVertical: 10 }, // User messages (blue)
          left: { backgroundColor: "#E5E5EA", marginVertical: 10 }, // AI messages (gray)
        }}
        textStyle={{
          right: { color: "white", fontSize: 16 },
          left: { color: "black", fontSize: 16 },
        }}
      />
    );
  };

  // Custom Input Toolbar Styling
  const renderInputToolbar = (props: any) => (
    <InputToolbar
      {...props}
      containerStyle={{
        backgroundColor: "black",
        borderTopColor: "#007AFF",
        color:"white",
        borderTopWidth: 1,
      }}
    />
  );

  // Custom Send Button
  const renderSend = (props: any) => (
    <Send {...props}>
      <View style={{ marginRight: 10, marginBottom: 5 }}>
        <Ionicons name="send" size={24} color="#007AFF" />
      </View>
    </Send>
  );

  // Custom Message Component (Adding AI Icon)
  const renderMessage = (props: any) => {
    const { currentMessage } = props;

    if (currentMessage.user._id === 2) {
      // AI Message - Add Icon
      return (
        <View style={styles.aiMessageContainer}>
          <Image 
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/4712/4712035.png' }} // AI Icon
            style={styles.aiIcon}
          />
          <View style={{ flex: 1 }}>
            <Bubble {...props} />
          </View>
        </View>
      );
    }

    // User Message - Normal display
    return (
      <View style={{ marginVertical: 10 }}>
        <Bubble {...props} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Maverick, your guide for the app</Text>
        <Text style={styles.emoji}>😉</Text>
      </View>

      {/* Chat UI */}
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{ _id: 1 }}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        renderSend={renderSend}
        renderMessage={renderMessage} // AI Icon beside messages
        isTyping={isTyping}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    marginBottom: 70,
  },
  header: {
    backgroundColor: "#007AFF",  // Blue header
    padding: 15,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  emoji: {
    fontSize: 18,
    marginLeft: 5,
  },
  aiMessageContainer: {
    flexDirection: "row", 
    alignItems: "center", 
    marginLeft: 10,
    marginBottom:10,
  },
  aiIcon: {
    width: 24,
    height: 24,
    marginRight: 5,
  },
});

export default ChatScreen;
