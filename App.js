import React, {useState, useEffect} from 'react';
import { StyleSheet, Image, View, TouchableOpacity, Alert } from 'react-native';
import Torch from 'react-native-torch';
import RNShake from 'react-native-shake';

export default function App() {
  const [toggle, setToggle] = useState(false);

  const handleChangeToggle = () => {
    setToggle((oldToggle) => {
      return !oldToggle
    })
  }

  useEffect(() => {
    // Liga flash do celular
    Torch.switchState(toggle);
  }, [toggle]);

  useEffect(() => {
    const subscription = RNShake.addListener(() => {
      setToggle(oldToggle => !oldToggle)
    })

    return () => subscription.remove()
  }, [])

  return (
    <View style={toggle ? styles.containerLight : styles.container}>
      <TouchableOpacity onPress={handleChangeToggle}>
        <Image
          style={toggle ? styles.lightingOn : styles.lightingOff}
          source={toggle ? require('./assets/icons/eco-light.png') : require('./assets/icons/eco-light-off.png')}
        />

        <Image
          style={styles.dioLogo}
          source={toggle ? require('./assets/icons/logo-dio.png') : require('./assets/icons/logo-dio-white.png')}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },

  containerLight: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  lightingOn: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 150,
    height: 150,
  },

  lightingOff: {
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: '#FFFFFF',
    width: 150,
    height: 150,
  },

  dioLogo: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 150,
    height: 150,
  }
});
