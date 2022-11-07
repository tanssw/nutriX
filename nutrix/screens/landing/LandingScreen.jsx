import { SafeAreaView, View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native'

export default function LandingScreen({ navigation }) {
  return (
    <SafeAreaView style={style.container}>
      <View style={style.imageContainer}>
        <Image
          source={require('../../assets/images/nutrix-white.png')}
          style={style.logo}
        />
      </View>
      <View style={style.buttonContainer}>
        <TouchableOpacity
          style={style.button}
          onPress={() => navigation.navigate('Main', { uri: 'http://192.168.2.1:8080/' })}
        >
          <Text style={style.buttonText}>Let's start !!</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#23A485',
    padding: 20,
  },
  imageContainer: {
    flex: 0.6,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  buttonContainer: {
    flex: 0.4,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  logo: {
    width: 256,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 256,
    padding: 20,
    width: 256,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#23A485',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  }
})