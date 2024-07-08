import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import QuickCrypto, { install } from 'react-native-quick-crypto';
import * as TextEncodingPolyfill from 'text-encoding';
install();

Object.assign(global, {
  TextEncoder: TextEncodingPolyfill.TextEncoder,
  TextDecoder: TextEncodingPolyfill.TextDecoder,
});

export default function App() {

  const test = async () => {
    const jose = require('jose');
    const keyPair = await QuickCrypto.subtle.generateKey({ 
      name: 'RSASSA-PKCS1-v1_5', 
      hash: 'SHA-256',
      modulusLength: 2048,
      publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
    }, true, ['sign', 'verify']);

    jose.exportPKCS8(keyPair.privateKey);
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <Button onPress={test} title="test"></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
