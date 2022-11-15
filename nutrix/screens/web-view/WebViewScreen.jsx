import { SafeAreaView, StyleSheet } from 'react-native'
import { WebView } from 'react-native-webview'

export default function WebViewScreen({ route }) {
  
  const { uri } = route.params

  const onMessage = (payload) => {
    console.log(payload.nativeEvent.data)
  }

  return (
    <>
      <SafeAreaView style={styles.background} />
      <SafeAreaView style={styles.container}>
        <WebView
          source={{ uri }}
          onMessage={onMessage}
        />
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 0,
    backgroundColor: '#23A485'
  },
  container: {
    flex: 1,
    backgroundColor: '#CFEBE4'
  }
})