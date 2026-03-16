import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "#2196f3",
                tabBarInactiveTintColor: "#888",
                tabBarStyle: {
                    borderTopWidth: 1,
                    borderTopColor: "#eee",
                    height: 55,
                },
                headerStyle: {
                    backgroundColor: "#fff",
                },
                headerTitleStyle: {
                    fontWeight: "bold",
                    fontSize: 20,
                },
                headerShadowVisible: false,

            }}
        >
            {/** Вкладинка "Контакти" (./(tabs)/index.tsx) */}
            <Tabs.Screen
            name="index"
            options={{
                title: "Контакти",
                tabBarLabel: "Список",
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="people-outline" size={size} color={color} />
                )
            }}
            />
            {/** Вкладинка "Профіль" (./(tabs)/two.tsx) */}
            <Tabs.Screen
            name="two"
            options={{
                title: "Профіль",
                tabBarLabel: "Профіль",
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="person-circle-outline" size={size} color={color} />
                )
            }}
            />

        </Tabs>
    )
}