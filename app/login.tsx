import { View, Text, TextInput, Button, StyleSheet,Image, TouchableOpacity, ImageBackground } from "react-native";
import React, { useState } from "react";
import { Link, useRouter } from "expo-router";
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const router = useRouter();
  
  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };
  
  const handleLogin = () => {
    if (!username || !password || !email) {
      alert("Veuillez remplir tous les champs.");
      return;
    }
    if (!validateEmail(email)) {
      alert("Veuillez entrer une adresse email valide.");
      return;
    }
    router.push("/home");
  };
  

  return (
    <View style={styles.background}>
     <View style={styles.container}>
    <Image source={require("../assets/images/logo.png")} style={styles.logo} />

    <View style={styles.content}>
      <Icon name="login" size={20} color="#fff" />
      <Text style={styles.title}>Connexion</Text>
    </View>
      
      <TextInput
        style={styles.input}
        placeholder="Nom d'utilisateur"
        value={username}
        onChangeText={setUsername}
      />
        <TextInput
        style={styles.input}
        placeholder="Email"
        value={email} 
        onChangeText={setEmail}
        keyboardType="email-address"
        
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
      <Text style={styles.buttonText} > se connecter</Text>
    </TouchableOpacity>
    <Link href="../signup" style={styles.linkText}>
        Vous n'avez pas de compte ? Inscrivez-vous
      </Link>
     </View>
     </View>
  );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: "#7B52AB",
        resizeMode: "cover",
        justifyContent: "center",
        alignItems: "center",
      },

  container: {
    width: "90%",
    backgroundColor: "rgba(255, 255, 255, 0.9)", 
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center', 
    padding: 10,
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
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    borderRadius: 5,
  },
  button:{
    borderRadius: 60,
    backgroundColor:"#7B52AB",
    margin: 10,
    padding: 10
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  linkText: {
    marginTop: 10,
    color: "#7B52AB",
    fontWeight: "bold",
    fontSize: 14,
  },
});
