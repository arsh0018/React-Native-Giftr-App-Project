import React, {useState, useEffect, useCallback} from "react";
import { StyleSheet, View } from "react-native";
import AppNavigator from "./AppNavigator";
import { PeopleProvider } from "./PeopleContext"; 
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
      } catch (e) {
      } finally {
        setAppIsReady(!appIsReady);
      }
    })();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {

    return null;
  }

  return (
    <PeopleProvider>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <AppNavigator />
      </View>
    </PeopleProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
