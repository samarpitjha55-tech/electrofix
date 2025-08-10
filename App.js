// import React from "react";
// import AppNavigator from "./src/AppNavigator";
// import { AuthProvider } from "./src/context/AuthContext";
// import { View, Text } from "react-native";

// export default function App() {
//   return (
//     // <AuthProvider>
//     //   <AppNavigator />
//     // </AuthProvider>
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text style={{ fontSize: 24, fontWeight: "bold" }}>
//         Welcome to the App
//       </Text>
//       <Text>This is a placeholder for the main application content.</Text>
//     </View>
//   );
// }

import React from "react";
import { View, Text } from "react-native";
import AppNavigator from "./src/AppNavigator";
import { AuthProvider } from "./src/context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
