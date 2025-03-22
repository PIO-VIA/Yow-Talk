import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AppSetting from '../components/setting';
import { format } from 'date-fns'; // Import de date-fns pour le formatage de la date
import { useRouter } from 'expo-router';
import { useSearchParams } from 'expo-router/build/hooks';

interface Message {
  id: string;
  text: string;
  sender: 'me' | 'them';
  time: string;
}
const ChatScreen: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const name = searchParams.get('name');  // Récupérer le paramètre 'name' depuis l'URL
    

    if (!name) {
      return <Text>Nom non disponible.</Text>; // Gestion de l'erreur si le nom n'est pas passé
    }
  
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([
      { id: '1', text: 'Salut !', sender: 'me', time: '14:30' },
      { id: '2', text: 'Comment ça va ?', sender: 'them', time: '14:31' },
    ]);
  
    const handleSendMessage = () => {
      if (message.trim() !== '') {
        const newMessage: Message = {
          id: String(messages.length + 1),
          text: message,
          sender: 'me',
          time: format(new Date(), 'HH:mm'), // Formatage de l'heure actuelle
        };
        setMessages([newMessage, ...messages]);
        setMessage('');
      }
    };
  
    const renderHeader = () => (
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/chatList')}>
          <Icon name="arrow-back" size={24} color="blue" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{name}</Text>
        <TouchableOpacity>

                <AppSetting /> {/* 3 points pour ouvrir le menu */}
        </TouchableOpacity>
      </View>
    );
  
    const renderItem = ({ item }: { item: Message }) => (
      <View style={[styles.messageContainer, item.sender === 'me' ? styles.sentMessage : styles.receivedMessage]}>
        {item.sender === 'them' && (
          <Image source={require('../assets/images/profile.png')} style={styles.profileImage} />
        )}
        <View>
          <Text style={styles.messageText}>{item.text}</Text>
          <Text style={styles.messageTime}>{item.time}</Text>
        </View>
      </View>
    );
  
    const renderInput = () => (
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter a message here"
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Icon name="send" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    );
  
    return (
      <View style={styles.container}>
        {renderHeader()}
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          inverted
        />
        {renderInput()}
      </View>
    );
  };
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D8CFED",
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#4B0082',
    backgroundColor:"#40138D",
  },
  headerTitle: {

    fontSize: 20,
    color: '#7B3FD3',
    fontWeight: 'bold',
  },
  messageContainer: {
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    maxWidth: '70%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  sentMessage: {
    backgroundColor: '#AD87E4',
    alignSelf: 'flex-end',
    marginLeft: 'auto',
    flexDirection: 'row-reverse',
    borderTopRightRadius:25,
    borderBottomRightRadius:5,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 25,
  },
  receivedMessage: {
    backgroundColor: '#E000FF',
    alignSelf: 'flex-start',
    marginRight: 'auto',
    borderTopRightRadius:5,
    borderBottomRightRadius:25,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 5,
   
  },
  messageText: {
    color: '#fff',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#4B0082',
  },
  input: {
    flex: 1,
    backgroundColor: 'gray',
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 40,
    marginRight: 10,
    color: '#000',
  },
  sendButton: {
    backgroundColor: '#4B0082',
    borderRadius: 20,
    padding: 10,
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  messageTime: {
    color: '#ccc',
    fontSize: 12,
    marginTop: 2,
    alignSelf: 'flex-end',
  },
});

export default ChatScreen;
