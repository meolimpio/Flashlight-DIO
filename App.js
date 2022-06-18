import React, {useState, useEffect} from "react";
import Torch from "react-native-torch";
import RNShake from 'react-native-shake';
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";

import ecoLight from './assets/icons/eco-light.png';
import ecoLightOff from './assets/icons/eco-light-off.png';
import logoDioWhite from './assets/icons/logo-dio-white.png';
import logoDio from './assets/icons/logo-dio.png';

const App = () => {
  const [toggle, setToggle] = useState(false)
  const handleChangeToggle = () => setToggle(oldToggle => !oldToggle);

  useEffect(() => {
    // Liga Flash do celular
    Torch.switchState(toggle);
  }, [toggle]);

  useEffect(() => {
    // Quando o telefone chacoalhar, mudaremos o toggle
    const subscription = RNShake.addListener(() => {
      setToggle(oldToggle => !oldToggle);
    });

    // Essa funcão vai ser chamada quando o componente for desmontado
    return () => subscription.remove();
  }, []);

  return (
    <View style = {toggle ? style.containerLight : style.container} >
      <TouchableOpacity onPress = {handleChangeToggle}>
        <Image style = { toggle ? style.lightingOn : style.lightingOff }
        source = { toggle ? ecoLight : ecoLightOff }
        />
        <Image style = { style.dioLogo }
        source = { toggle ? logoDio : logoDioWhite }
        />
      </TouchableOpacity>
    </View>
  ); 
};

export default App;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLight: {
    flex: 1,
    backgroundColor: 'white',
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
    tintColor: 'white',
    width: 150,
    height: 150,
  },
  dioLogo: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 250,
    height: 250,
  },
});