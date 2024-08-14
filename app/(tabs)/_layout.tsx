import { Tabs } from "expo-router";
import React from "react";

import { LogIn } from "@/lib/icons/login";
import { House } from "@/lib/icons/house";
import { useAtomValue } from "jotai";
import { sessionAtom } from "@/lib/atoms";

export default function TabLayout() {
  const session = useAtomValue(sessionAtom);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#286EE6",
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Pagrindinis",
          tabBarIcon: ({ color }) => <House className="size-6" color={color} />,
        }}
      />
      <Tabs.Screen
        name="login"
        options={{
          title: "Prisijungti",
          tabBarIcon: ({ color }) => <LogIn className="size-6" color={color} />,
          href: !session ? "/login" : null,
        }}
      />
      <Tabs.Screen
        name="logout"
        options={{
          title: "Atsijungti",
          tabBarIcon: ({ color }) => <LogIn className="size-6" color={color} />,
          href: session ? "/logout" : null,
        }}
      />
    </Tabs>
  );
}
