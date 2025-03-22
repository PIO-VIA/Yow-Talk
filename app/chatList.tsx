import React, { ReactNode, useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { View, Text, FlatList, Image, ImageSourcePropType, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';

interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
  avatar: ImageSourcePropType; 
  time: ReactNode;
  unreadCount: number;
}

const chats: Conversation[] = [
  { id: '1', name: 'Alice', lastMessage: 'Salut, comment ça va ?', avatar: require('../assets/images/me.jpeg'), time: '14:30', unreadCount: 3 },
  { id: '2', name: 'Bob', lastMessage: 'Tu es dispo ce soir ?', avatar: require('../assets/images/me.jpeg'), time: '12:30', unreadCount: 3 },
  { id: '3', name: 'Osca', lastMessage: 'calcio demain?', avatar: require('../assets/images/profile.png'), time: '19:30', unreadCount: 0 },
];

export default function ChatListScreen() {
  const [searchText, setSearchText] = useState('');

  // Filtrer les conversations basées sur la recherche
  const filteredConversations = chats.filter((conversation) =>
    conversation.name.toLowerCase().includes(searchText.toLowerCase())
  );

  // Fonction pour la navigation vers ChatScreen
  const handleChatNavigation = (name: string) => {
    router.push(`/chat?name=${name}`);
  };

  return (
    <View style={{ flex: 1, backgroundColor:  "#D8CFED" }}>
      {/* Barre de recherche */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={24} color="#fff" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher"
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity onPress={() => router.push('/AddContact')}>
          <Icon name="person-add" size={24} color="#fff" style={styles.addContactIcon} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredConversations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.container}>
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}
              onPress={() => handleChatNavigation(item.name)} // Utiliser la fonction externe
            >
              {/* 🔥 Photo de profil */}
              <Image source={item.avatar} style={styles.avatar} />

              {/* 🔥 Texte du chat */}
              <View style={styles.textContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.lastMessage} numberOfLines={1}>{item.lastMessage}</Text>
              </View>

              {/* 🔥 Heure et badge de message non lu */}
              <View style={styles.rightContainer}>
                <Text style={styles.time}>{item.time}</Text>
                {item.unreadCount > 0 && (
                  <View style={styles.unreadBadge}>
                    <Text style={styles.unreadText}>{item.unreadCount}</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
   // backgroundColor: '#6A0DAD',
   backgroundColor: "#D8CFFD",
    paddingTop: 20,
    paddingHorizontal: 10,
    borderBottomWidth:1,
    borderBottomColor: '#4B0082',

  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4B0082',
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
    height: 50,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  textContainer: {
    flex: 1, // ✅ Permet au texte de prendre l'espace dispo
  },
  lastMessage: {
    color: 'gray',
    maxWidth: '90%',
  },
  rightContainer: {
    alignItems: 'flex-end',
  },
  time: {
    color: 'gray',
    fontSize: 12,
    marginBottom: 5,
  },
  unreadBadge: {
    backgroundColor: '#6A0DAD',
    borderRadius: 50,
    paddingHorizontal: 8,
    paddingVertical: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginLeft: 10,
  },
  addContactIcon: {
    marginRight: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 5,
  },
  name: {
  
    fontWeight: 'bold',
    color: 'black',
  },
});
