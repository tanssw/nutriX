import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useFonts } from 'expo-font'

import LandingScreen from './screens/landing/LandingScreen'
import WebViewScreen from './screens/web-view/WebViewScreen'

const Stack = createNativeStackNavigator()

export default function App() {
  // Load fonts
  const [fontsLoaded] = useFonts({
    'SukhumvitSet-Text': require('./assets/fonts/SukhumvitSet-Text.ttf'),
    'SukhumvitSet-Bold': require('./assets/fonts/SukhumvitSet-Bold.ttf'),
  })
  if (!fontsLoaded) return null
  // Render app
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          header: () => null
        }}
      >
        <Stack.Screen name="Intro" component={LandingScreen} />
        <Stack.Screen name="SignUp" component={WebViewScreen} />
        <Stack.Screen name="Main" component={WebViewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
