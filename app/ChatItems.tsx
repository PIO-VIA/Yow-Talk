import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AppSetting from "../components/setting";
import {format} from 'date-fns';
import { ThemeText } from '@/components/ThemeText';

// Interface d'un message
interface Message {
  id: string;
  text: string;
  sender: "me" | "other";
  time:string;
}

// Écran de la conversation
export default function ChatRoom() {
  const router = useRouter();
  const { name, avatar } = useLocalSearchParams<{ name: string; avatar: string }>(); // Récupérer les paramètres de navigation
  
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", text: "Salut ! Comment ça va ?", sender: "other",time:'12h30' },
    { id: "2", text: "Hey ! Ça va bien et toi ?", sender: "me", time:'12h35' },
  ]);

  const [newMessage, setNewMessage] = useState("");

  // Envoyer un message
  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, { id: Date.now().toString(), text: newMessage, sender: "me",time:format(new Date(),'HH:mm') }]);
      setNewMessage("");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/home')}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <ThemeText style={styles.headerText}>{name}</ThemeText>
        <Ionicons name="call" size={24} color="white" style={styles.icon} />
        <AppSetting/>
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.messageContainer, item.sender === "me" ? styles.myMessage : styles.otherMessage]}>
            <ThemeText style={styles.messageText}>{item.text}</ThemeText>
            <ThemeText style= {styles.Time}>{item.time}</ThemeText>
          </View>
        )}
        contentContainerStyle={styles.chatBody}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Écrire un message..."
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <TouchableOpacity onPress={sendMessage}>
          <Ionicons name="send" size={24} color="#7B52AB" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#F3F3F3" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#7B52AB",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  headerText: { fontSize: 18, color: "white", fontWeight: "bold", flex: 1 },
  icon: { marginHorizontal: 10 },
  chatBody: { padding: 15, flexGrow: 1 },
  messageContainer: {
    maxWidth: "70%",
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  myMessage: {
    backgroundColor: "#DCF8C6",
    alignSelf: "flex-end",
  },
  otherMessage: {
    backgroundColor: "#EAEAEA",
    alignSelf: "flex-start",
  },
  messageText: { fontSize: 16 },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#DDD",
  },
  Time:{
    color:"#423838",
    fontSize:12,
    alignSelf:"flex-end"
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: "#F3F3F3",
    borderRadius: 20,
    marginRight: 10,
  },
});
