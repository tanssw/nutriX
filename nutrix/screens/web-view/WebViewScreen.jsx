import { SafeAreaView, StyleSheet } from 'react-native'
import { WebView } from 'react-native-webview'

export default function WebViewScreen({ route }) {
  const { uri } = route.params
  return (
    <SafeAreaView style={styles.container}>
      <WebView source={{ uri }} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})