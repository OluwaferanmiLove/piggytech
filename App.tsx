import '@assets/global.css';
import { useCallback } from 'react';
import {
  useFonts,
  Inter_700Bold,
  Inter_300Light,
  Inter_600SemiBold,
  Inter_500Medium,
  Inter_400Regular,
  Inter_800ExtraBold,
} from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
import BaseApp from '@navigation/app-navigation';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from 'src/redux/store';

SplashScreen.preventAutoHideAsync();

function App() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_700Bold,
    Inter_300Light,
    Inter_600SemiBold,
    Inter_500Medium,
    Inter_400Regular,
    Inter_800ExtraBold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BaseApp onReady={onLayoutRootView} />
      </PersistGate>
    </Provider>
  );
}

export default App;
