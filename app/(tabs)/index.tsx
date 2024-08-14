import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "@/components/ui/button";
import { sessionAtom } from "@/lib/atoms";
import { useAtomValue } from "jotai";

export default function TabTwoScreen() {
  const session = useAtomValue(sessionAtom);

  const insets = useSafeAreaInsets();

  return (
    // Since we are not using expo themes, we have to wrap each page to set a white background
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
      <View className="flex-1 justify-center items-center gap-4">
        <Text className="text-xl text-center">Jūs esate:</Text>
        {session ? (
          <Text className="text-green-500 text-lg">Prisijungęs</Text>
        ) : (
          <Text className="text-muted-foreground text-lg">Neprisijungęs</Text>
        )}
      </View>
    </View>
  );
}
