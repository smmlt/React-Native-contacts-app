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
            })))
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

    return (
        <View>
            <Text>Список контактів</Text>
        </View>
    )
}
