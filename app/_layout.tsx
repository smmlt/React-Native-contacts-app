import { Slot, useRootNavigationState, useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { ActivityIndicator, View, Text } from "react-native";
import { auth } from "../constants/FirebaseConfig";

export default function RootLayout() {
  // const router = useRouter();
  // const navifationState = useRootNavigationState();
  // const [isReady, setIsReady] = useState(false)

  // useEffect(() => {
  //   if (!navifationState?.key) {
  //     return;
  //   }
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (!user) {
  //       router.replace("/auth");
  //     }
  //     setIsReady(true);
  //   });
  //   return () => unsubscribe();
  // }, [navifationState?.key]);

  // if (!isReady) {
  //   return (
  //     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
  //       <ActivityIndicator size="large" color="#2196f3"/>
  //       <Text style={{ fontSize: 16, marginTop: 10 }} >Перевірка автентифікації...</Text>
  //     </View>
  //   )
  // }
  
  return <Slot />;
}
