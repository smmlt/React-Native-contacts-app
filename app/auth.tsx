import React, { useState } from "react";

import {
    ActivityIndicator,
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import Parse from "parse";
import { useRouter } from "expo-router";


export default function AuthScreen() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isSignUp, setIsSignUp] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleAuth = async () => {
        if (!username || !password) {
            Alert.alert("Помилка", "Будь ласка, заповніть всі поля");
            return;
        }
        
        setLoading(true);

        try {
            if (isSignUp) {
                // Реєстрація користувача
                const user = new Parse.User();
                user.set("username", username);
                user.set("password", password);
                await user.signUp();
            }
            else {
                // Авторизація користувача
                await Parse.User.logIn(username, password);
            }

            setUsername("");
            setPassword("");

            router.replace("/");    
        }
        catch (err: any) {
            Alert.alert("Помилка авторизації", err.message || "Сталася помилка. Спробуйте ще раз.");
        }
        finally {
            setLoading(false);
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
            marginVertical: 10,
            backgroundColor: "#fff",
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

            <Text style={styles.title}>
                {isSignUp ? "Створити аккаунт" : "Увійти"}
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Ім'я користувача"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Пароль"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <TouchableOpacity style={styles.button} onPress={handleAuth} disabled={loading}>
                {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>
                            {isSignUp ? "Зареєструватися" : "Увійти"}
                        </Text>
                    )}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)}>
                <Text style={styles.switchText}>
                    {isSignUp
                        ? "Вже є акаунт? Увійти"
                        : "Нема акаунту? Зареєструватися"}
                </Text>
            </TouchableOpacity>

        </View>
    );

    
}
