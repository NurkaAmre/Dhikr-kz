import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Platform,
  ScrollView,
  StatusBar,
} from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import bg from '../assets/images/10.png';
import Dhikrs from '../assets/json/dhikrs.json';

const DailyDhikr = ({ navigation }) => {
  const [dhikr, setDhikr] = useState([]);

  useEffect(() => {
    setDhikr(Dhikrs);
  }, []);

  return (
    <ScrollView style={styles.container}>
      {dhikr.map((nameData, index) => (
        <ImageBackground key={index} source={bg} style={styles.image}>
          <Text style={styles.text}>
            {nameData.title.length > 15
              ? nameData.title.substring(0, 15) + '...'
              : nameData.title}
          </Text>
          {/* Wrap your content inside a ScrollView */}
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.mainText}>
              <Text style={styles.arabic}>{nameData.name}</Text>
              <Text style={styles.paragraph1}>{nameData.title}</Text>
              <Text style={styles.paragraph1}>{nameData.dhikr}</Text>
              <Text style={styles.title}>Сауап:</Text>
              <ScrollView
                contentContainerStyle={styles.benefitScrollView}
                nestedScrollEnabled={true} // Enable nested scrolling
              >
                <Text style={styles.paragraph}>{nameData.benefit}</Text>
              </ScrollView>
            </View>
          </ScrollView>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {
              navigation.navigate('AddDhikr', {
                title: nameData.title,
                dhikr: nameData.dhikr,
                benefit: nameData.benefit,
              });
            }}
          >
            <Text style={styles.buttonText}>Зікір қосу</Text>
          </TouchableOpacity>
        </ImageBackground>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgMain,
    paddingTop: StatusBar.currentHeight,
  },
  image: {
    // width: 400,
    // height: 850,
  },
  text: {
    color: COLORS.secondary,
    fontSize: SIZES.xLarge,
    fontFamily: 'MarckScript',
    alignSelf: 'center',
    paddingTop: 20,
  },
  // Add a scrollContainer style for the ScrollView
  scrollContainer: {
    flexDirection: 'column',
    paddingHorizontal: 20,
    marginVertical: 30,
    justifyContent: 'space-around',
    gap: 20,
  },
  mainText: {
    justifyContent: 'space-between',
    gap: 10,
    paddingHorizontal: 30,
    paddingTop: 20,
  },
  title: {
    color: COLORS.primary,
    fontSize: SIZES.large,
    fontFamily: 'Caveat',
  },
  benefitScrollView: {
    flex: 1,
    maxHeight: 400,
    backgroundColor: 'rgba(159, 141, 131, 0.72)',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  arabic: {
    color: COLORS.primary,
    fontSize: SIZES.medium,
  },
  paragraph1: {
    color: COLORS.tertiary,
    fontSize: SIZES.small,
    fontFamily: 'Elmess',
  },
  paragraph: {
    color: '#fff',
    fontSize: SIZES.medium,
    fontFamily: 'Cormorant',
  },
  buttonContainer: {
    backgroundColor: 'rgba(202, 100, 90, 0.72)',
    borderRadius: 40,
    paddingVertical: 3,
    marginTop: 20,
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginBottom: 50,
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
    fontSize: SIZES.large,
    fontFamily: 'MarckScript',
    textAlign: 'center',
  },
});

export default DailyDhikr;
