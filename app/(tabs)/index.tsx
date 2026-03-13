import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, RefreshControl, TouchableOpacity } from "react-native";
import { db, auth } from "../../constants/FirebaseConfig";

import { collection, query, where, getDocs, deleteDoc, doc, orderBy } from "firebase/firestore";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, Stack } from "expo-router";


export default function ContactsScreen() {
    const [contacts, setContacts] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const fetchContacts = async () => {
        if (!auth.currentUser) return;
        setLoading(true);
        try {
            const q = query(
                collection(db, "contacts"),
                where("userId", "==", auth.currentUser.uid),
                orderBy("name", "asc")
            );
            const querySnapshot = await getDocs(q);
            setContacts(querySnapshot.docs.map(d => ({
                id: d.id,
                ...d.data()
            })));
            console.log(contacts);
        }
        catch (err) {
            console.error("Error fetching contacts:", err);
        }
        finally {
            setLoading(false);
        }
    };

    const handleDelete = (id: string) => {
        if (confirm("Ви впевнені, що хочете видалити цей контакт?")) {
            deleteDoc(doc(db, "contacts", id))
            setContacts(prev => prev.filter(c => c.id !== id));
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    const styles = StyleSheet.create({
        container: {
            flex: 1, 
            backgroundColor: "#f5f5f5",
            paddingLeft: 10,
        },

        itemStyle: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 20,
            backgroundColor: "#fff",
            marginVertical: 1,
        },

        name: {
            fontSize: 18,
            fontWeight: "bold",

        },

        phone: {
            color: "#666",

        }


    });


    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    title: "Контакти",
                    headerRight: () => (
                         <TouchableOpacity onPress={() => router.push("../edit-contact")}>
                            <Ionicons name="add-circle" size={30} color="#2196f3" />
                        </TouchableOpacity>
                    )
                }}
            />

            <FlatList
                data={contacts}
                refreshControl={
                    <RefreshControl refreshing={loading} onRefresh={fetchContacts} />
                }
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.itemStyle}
                        onPress={() => {
                            router.push({
                                pathname: "../edit",
                                params: { id: item.id }
                            })
                        }}
                    >
                        <View>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.phone}>{item.city}</Text>
                            <Text style={styles.phone}>{item.email}</Text>
                            <Text style={styles.phone}>{item.phone}</Text>
                        </View>
                        <TouchableOpacity onPress={() => handleDelete(item.id)}>
                            <Ionicons name="trash-outline" size={22} color="red" />
                        </TouchableOpacity>
                    </TouchableOpacity>
                )}
            />
            
            <Text>Список контактів</Text>
        </View>
    )
}
