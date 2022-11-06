import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AntDesign } from '@expo/vector-icons'

import WebviewScreen from '../screens/web-view/WebViewScreen'

const Tab = createBottomTabNavigator()

export default function NavigatorTemplate() {
  return (
    <Tab.Navigator
      screenOptions={{
        header: () => null
      }}
    >
      <Tab.Screen
        name="หน้าหลัก"
        component={WebviewScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return <AntDesign name="home" size={size} color={color} />
          }
        }}
      />
      <Tab.Screen
        name="บันทึกอาหาร"
        component={WebviewScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return <AntDesign name="form" size={size} color={color} />
          }
        }}
      />
      <Tab.Screen
        name="ฉัน"
        component={WebviewScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return <AntDesign name="user" size={size} color={color} />
          }
        }}
      />
    </Tab.Navigator>
  )
}
