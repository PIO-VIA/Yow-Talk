import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput,Image, TouchableOpacity, StyleSheet,Alert } from 'react-native';
import { useRouter } from "expo-router";

export default function AddContactScreen ()  {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleAddContact = () => {
   
    if (!email) {
      Alert.alert("Erreur", "Veuillez entrer une adresse email.");
      return;
    }
    Alert.alert(
      "Confirmation",
      `Voulez-vous ajouter ${email} ?`,
      [
        { text: "Annuler", style: "cancel" },
        { text: "OK", onPress: () => router.push("/chat") }
      ]
    );
  
  };
  
  return (
        <View style={styles.background}>
          <View style={styles.container}>
                <View style={styles.header}>
                    <Image source={require("../assets/images/logo.png")} style={styles.logo} />
                  </View>
            <Text style={styles.title}>Ajouter Personne</Text>
            <TextInput
              style={styles.input}
              placeholder="leonel.azangue@facscience-uy1.cm"
              value={email}
              onChangeText={setEmail}
            />
            <TouchableOpacity style={styles.button} onPress={handleAddContact}>
              <Text style={styles.buttonText}>Ajouter</Text>
            </TouchableOpacity>
          </View>
         </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#7B52AB",
    // resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
     height:"50%",
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    width: "90%",
  },
  header: {
    width: "90%",
    backgroundColor: "rgba(255, 255, 255, 0.9)", 
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
 logo: {
    width: 120,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginLeft: 8,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor:'#ddd'
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#6A0DAD',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
