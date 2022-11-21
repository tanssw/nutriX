import { useState, useRef } from 'react'
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { WebView } from 'react-native-webview'

export default function WebViewScreen({ route }) {
  
  const { uri } = route.params
  const webViewRef = useRef(null)

  const [isExternal, setIsExternal] = useState(false)
  const [isWhite, setIsWhite] = useState(false)
  const [isGreen, setIsGreen] = useState(false)

  const onMessage = (payload) => {
    console.log(payload.nativeEvent.data)
  }

  const onNavigationStateChange = (state) => {
    let url = state.url
    console.log(url)
    setIsExternal(!url.includes('nutrix-bac97.web.app') && !url.includes('localhost'))
    setIsWhite(url.includes('#/record'))
    setIsGreen(url.includes('?drawer=true'))
  }

  const goBackHomepage = () => {
    webViewRef.current.goBack()
  }

  return (
    <>
      <SafeAreaView style={styles.background} />
      <SafeAreaView style={[
        styles.container,
        { backgroundColor: isGreen ? '#23A485' : isWhite ? '#fff' : '#CFEBE4' }
      ]}>
        <WebView
          ref={webViewRef}
          source={{ uri }}
          onMessage={onMessage}
          onNavigationStateChange={onNavigationStateChange}
        />
        {isExternal && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={goBackHomepage} style={styles.button}>
              <Text style={styles.buttonText}>กลับหน้าหลัก</Text>
            </TouchableOpacity>
          </View>
        )}
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
  },
  buttonContainer: {
    padding: 8,
    alignItems: 'center'
  },
  button: {
    paddingHorizontal: 48,
    paddingVertical: 12,
    borderRadius: 256,
    backgroundColor: '#23A485'
  },
  buttonText: {
    color: '#fff',
  }
})