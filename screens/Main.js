import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import {StyleSheet,Text,View,ImageBackground,Image,TouchableOpacity} from 'react-native';
import { COLORS, SIZES} from '../constants/theme'
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import kid from '../assets/images/kid.png';
import masjid from '../assets/images/masjid.png';
import { useEffect, useCallback } from 'react';

const Stack = createStackNavigator();

export default function Main({navigation}) {
  const [fontsLoaded] = useFonts({
    'PatrickHand': require('../assets/fonts/PatrickHand-Regular.ttf'),
    'PatrickHandSC': require('../assets/fonts/PatrickHandSC-Regular.ttf'),
    'BalsamiqSans': require('../assets/fonts/BalsamiqSans-Regular.ttf'),
    'Caveat': require('../assets/fonts/Caveat-VariableFont_wght.ttf'),
    'CormorantGaramond': require('../assets/fonts/CormorantGaramond-Regular.ttf'),
    'ElMessiri': require('../assets/fonts/ElMessiri-VariableFont_wght.ttf'),
    'MarckScript': require('../assets/fonts/MarckScript-Regular.ttf'),
    'Pacifico': require('../assets/fonts/Pacifico-Regular.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const onLayout = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
      <ImageBackground
        source={masjid}
        style={[styles.container, styles.bg]}
        onLayout={onLayout}
      >
        <View>
          <Text style={styles.text}>Dhikr Counter</Text>
          <Image source={kid} style={styles.image} />
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {
              navigation.navigate('Category');
            }}
          >
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgMain,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: COLORS.secondary,
    fontSize: SIZES.xxLarge,
    fontFamily: 'BalsamiqSans',
    textAlign: 'center',
  },
  image: {
    marginTop: 80,
  },
    buttonContainer: {
    backgroundColor: "#CA6853",
    borderRadius: 40,
    paddingVertical: 6,
    paddingHorizontal: 50, // Add spacing to separate from the image
     alignSelf: 'center',
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 4,
      },
      android: {
        elevation: 6,
      },
    }), // Center the button horizontally
  },
  buttonText: {
    color: COLORS.white,
    fontSize: SIZES.xLarge,
    fontFamily: 'PatrickHand',
    textAlign: 'center',
  },
});
