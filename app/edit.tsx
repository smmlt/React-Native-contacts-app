import React, { useState, useEffect } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { collection, addDoc, doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../constants/FirebaseConfig";


export default function EditContactsScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    useEffect(() => {
        if (id) {
            getDoc(doc(db, "contacts", id)).then((snap) => {
                if (snap.exists()) {
                    setName(snap.data().name);
                    setCity(snap.data().city);
                    setEmail(snap.data().email);
                    setPhone(snap.data().phone);
                }
            });
        };
    }, [id]);

    const save = async () => {
        if (!name || !city || !email || !phone) {
            alert("Будь ласка, заповніть всі поля");
            return;
        }
        setLoading(true);

        try {
            const data = {
                name,
                city,
                email,
                phone,
                updatedAt: serverTimestamp()
            };

            if (id) {
                await updateDoc(doc(db, "contacts", id), data);
            } else {
                await addDoc(collection(db, "contacts"), {
                    ...data,
                    userId: auth.currentUser?.uid,
                    createdAt: serverTimestamp()
                });
            }
            router.replace("/(tabs)");
        }
        catch (err: any) {
            alert(`Помилка при збереженні контакту: ${err.message}`);
        }
        finally {
            setLoading(false);
        }
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 25,
            paddingTop: 60
        },

        label: {
            fontSize: 22,
            fontWeight: "bold",
            marginBottom: 20
        },

        input: {
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 10,
            padding: 15,
            marginBottom: 20,
            fontSize: 18
        },

        Button: {
            backgroundColor: "#2196f3",
            padding: 15,
            borderRadius: 10,
            alignItems: "center"
        },

        ButtonText: {
            color: "#fff",
            fontSize: 18,
            fontWeight: "bold"
        }
    });

    return (
            <View style={styles.container}>
                <Text style={styles.label}>
                    {id ? "Редагувати контакт" : "Додати новий контакт"}
                </Text>

                <TextInput
                    style={styles.input}
                    placeholder="Ім'я контакту"
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Місто"
                    value={city}
                    onChangeText={setCity}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Телефон"
                    value={phone}
                    onChangeText={setPhone}
                />
                <TouchableOpacity style={styles.Button} onPress={save} disabled={loading}>
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.ButtonText}>Зберегти</Text>
                    )}
                </TouchableOpacity>
            </View>
        )
}