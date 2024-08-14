import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Text, View } from "react-native";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useSetAtom } from "jotai";
import { emailAtom, sessionAtom } from "@/lib/atoms";
import { useRouter } from "expo-router";
import { SESSION_TOKEN_NAME } from "@/lib/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const loginPageSchema = z.object({
  email: z
    .string()
    .min(1, { message: "El. paštas yra privalomas!" })
    .email({ message: "Neteisingas El. pašto adresas!" }),
  password: z
    .string()
    .min(1, { message: "Slaptažodis yra privalomas!" })
    .min(6, { message: "Slaptažodis privalo būti ilgesnis nei 6 simboliai!" }),
  // Add more rules as needed here
});

export default function TabTwoScreen() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const setSession = useSetAtom(sessionAtom);
  const setEmail = useSetAtom(emailAtom);

  const form = useForm({
    resolver: zodResolver(loginPageSchema),
    values: { email: "", password: "" },
  });

  const insets = useSafeAreaInsets();

  const router = useRouter();

  const onLogin = async (formData: z.infer<typeof loginPageSchema>) => {
    // The data is already client-side validated
    setLoading(true);
    setError(false);

    //We might implement a better querying solution with, for example React Query
    const res = await fetch(
      "https://66bca4db24da2de7ff6b5a05.mockapi.io/auth",
      {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(formData),
      }
    );

    if (!res.ok) {
      return setError(true);
    }

    const data = await res.json();

    // Might also store it in SecureStore
    await AsyncStorage.setItem(SESSION_TOKEN_NAME, data.token);

    setSession(data.token);
    setEmail(data.email);

    form.reset();

    setLoading(false);

    router.push("/logout");
  };
  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
      <View className="flex-1 justify-center items-center gap-4 mx-6">
        <Text className="text-xl text-center">Prisijungimas</Text>
        {error && (
          <Text className="text-destructive">
            Ištiko nenumatyta klaida, bandykite dar kartą!
          </Text>
        )}
        <View className="w-full">
          <Label>El. paštas</Label>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <View className="flex gap-2">
                <Input
                  {...field}
                  onChangeText={field.onChange}
                  inputMode="email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect={false}
                />
                {fieldState.error && (
                  <Text className="text-destructive">
                    {fieldState.error.message}
                  </Text>
                )}
              </View>
            )}
          />
        </View>
        {/* Can move this into a reusable form component with a label */}
        <View className="w-full">
          <Label>Slaptažodis</Label>
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <View className="flex gap-2">
                <Input {...field} onChangeText={field.onChange} secure />
                {fieldState.error && (
                  <Text className="text-destructive">
                    {fieldState.error.message}
                  </Text>
                )}
              </View>
            )}
          />
        </View>
        <Button
          onPress={form.handleSubmit(onLogin)}
          disabled={loading}
          className="w-full"
        >
          {loading ? (
            // We could make the button style the text automatically
            <Text className="text-background">Kraunama...</Text>
          ) : (
            <Text className="text-background">Prisijungti</Text>
          )}
        </Button>
      </View>
    </View>
  );
}
