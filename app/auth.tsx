import React, { useState } from "react";

import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { auth } from "@/constants/FirebaseConfig";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

import { useRouter } from "expo-router";


export default function AuthScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleAuth = async (type: "login" | "signup") => {
        try{
            if (type === "login") {
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
            }
            router.replace("/(tabs)");
        }
        catch (err: any) {
            alert("Помилка авторизації: ${err.message}");
        }
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 20,
            backgroundColor: "#f5f5f5",
        },

        title: {
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 20,
            marginTop: -10,
        },

        input: {
            width: "100%",
            height: 50,
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            paddingHorizontal: 10,
            paddingRight: 45,
            marginVertical: 10,
            backgroundColor: "#fff",
        },

        passwordContainer: {
            width: "100%",
            justifyContent: "center",
        },

        eye: {
            position: "absolute",
            right: 15,
        },

        button: {
        width: "100%",
        height: 50,
        backgroundColor: "#4a90e2",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        marginTop: 10,
        },

        buttonText: {
            color: "#fff",
            fontSize: 18,
            fontWeight: "bold",
        },

        switchText: {
            color: "#4a90e2",
            marginTop: 15,
            fontSize: 16,
            textAlign: "center",
        },
    });

    return (
        <View style={styles.container}>

            <Text style={styles.title}>Авторизація</Text>

            <TextInput
                style={styles.input}
                placeholder="Ваш email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
            />
            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Пароль"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                />

                <TouchableOpacity
                    style={styles.eye}
                    onPress={() => setShowPassword(prev => !prev)}
                >
                    <Text>👁</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.button} onPress={() => handleAuth("login")}>
                <Text style={styles.buttonText}>Увійти</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{margin: 20}} onPress={() => handleAuth("signup")}>
                <Text style={styles.switchText}>Створити аккаунт</Text>
            </TouchableOpacity>

        </View>
    );

    
}
