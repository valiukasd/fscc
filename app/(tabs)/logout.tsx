import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SESSION_TOKEN_NAME } from "@/lib/constants";
import { useRouter } from "expo-router";
import { emailAtom, sessionAtom } from "@/lib/atoms";
import { useAtom, useSetAtom } from "jotai";

export default function TabTwoScreen() {
  const [loading, setLoading] = useState<boolean>(false);
  const setSession = useSetAtom(sessionAtom);
  const [email, setEmail] = useAtom(emailAtom);

  const insets = useSafeAreaInsets();
  const router = useRouter();

  const onLogout = async () => {
    setLoading(true);

    await AsyncStorage.removeItem(SESSION_TOKEN_NAME);
    setSession(null);
    setEmail(null);

    setLoading(false);
    router.replace("/login");
  };

  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
      <View className="flex-1 justify-center items-start gap-4 mx-6">
        <Text className="text-2xl mx-auto mb-4">Paskyra</Text>
        <Text className="text-lg">
          El. paštas: <Text className="font-semibold">{email}</Text>
        </Text>
        <Button
          onPress={() => onLogout()}
          disabled={loading}
          className="w-full"
        >
          {loading ? (
            <Text className="text-background">Kraunama...</Text>
          ) : (
            <Text className="text-background">Atsijungti</Text>
          )}
        </Button>
      </View>
    </View>
  );
}
