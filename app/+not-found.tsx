import { Link, Stack } from "expo-router";
import { Fragment } from "react";
import { View, Text } from "react-native";

export default function NotFoundScreen() {
  return (
    <Fragment>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View className="flex-1 items-center justify-center p-10">
        <Text>This screen doesn't exist.</Text>
        <Link href="/" className="mt-8 py-8">
          <Text>Go to home screen!</Text>
        </Link>
      </View>
    </Fragment>
  );
}
