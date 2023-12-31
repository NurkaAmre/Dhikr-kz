import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import kid from '../assets/images/kid.png';
import masjid from '../assets/images/masjid.png';
import { useEffect, useCallback } from 'react';
import { EvilIcons } from '@expo/vector-icons';

const Stack = createStackNavigator();

export default function Main({ navigation }) {
  const [fontsLoaded] = useFonts({
    PatrickHand: require('../assets/fonts/PatrickHand-Regular.ttf'),
    PatrickHandSC: require('../assets/fonts/PatrickHandSC-Regular.ttf'),
    Caveat: require('../assets/fonts/Caveat-VariableFont_wght.ttf'),
    Balsamiq: require('../assets/fonts/BalsamiqSans-Regular.ttf'),
    Cormorant: require('../assets/fonts/CormorantGaramond-Regular.ttf'),
    Elmess: require('../assets/fonts/ElMessiri-VariableFont_wght.ttf'),
    MarckScript: require('../assets/fonts/MarckScript-Regular.ttf'),
    Pacifico: require('../assets/fonts/Pacifico-Regular.ttf'),
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
        <Text style={styles.text}>Зікір ету</Text>
        <Image source={kid} style={styles.image} />

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            navigation.navigate('Category');
          }}
        >
          <Text style={styles.buttonText}>Бастау</Text>
        </TouchableOpacity>
        <EvilIcons
          name="exclamation"
          style={styles.icon}
          onPress={() => {
            navigation.navigate('DevInfo');
          }}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgMain,
    alignItems: 'center',
    paddingTop: StatusBar.currentHeight,
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight,
  },
  text: {
    color: COLORS.secondary,
    fontSize: SIZES.xxLarge,
    fontFamily: 'MarckScript',
    textAlign: 'center',
    paddingTop: 30,
  },
  image: {
    marginTop: 60,
  },
  icon: {
    fontSize: SIZES.xLarge,
    marginTop: 10,
    marginLeft: 350,
    alignSelf: 'center',
    color: COLORS.tertiary,
  },
  buttonContainer: {
    backgroundColor: '#CA6853',
    borderRadius: 40,
    paddingVertical: 6,
    paddingHorizontal: 50,
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
    }),
  },
  buttonText: {
    color: COLORS.white,
    fontSize: SIZES.xLarge,
    fontFamily: 'MarckScript',
    textAlign: 'center',
  },
});
