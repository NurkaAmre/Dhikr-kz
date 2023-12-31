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
import bg from '../assets/images/9.png';
import AllahsNames99 from '../assets/json/allahs_99_names.json';

const AllahsNames = ({ navigation }) => {
  const [nameAllah, setNameAllah] = useState([]);

  useEffect(() => {
    setNameAllah(AllahsNames99);
  }, []);

  return (
    <ScrollView style={styles.container}>
      {nameAllah.map((nameData, index) => (
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
              <Text style={styles.paragraph1}>
                {nameData.title} - {nameData.dhikr}
              </Text>
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
  text: {
    color: COLORS.tertiary,
    fontSize: SIZES.xLarge,
    fontFamily: 'MarckScript',
    alignSelf: 'center',
    paddingTop: 50,
  },
  // Add a scrollContainer style for the ScrollView
  scrollContainer: {
    flexDirection: 'column',
    paddingHorizontal: 10,
    marginVertical: 30,
    justifyContent: 'space-around',
    gap: 20,
  },
  mainText: {
    justifyContent: 'space-between',
    fontFamily: 'Cormorant',
    gap: 10,
    paddingHorizontal: 30,
    paddingTop: 40,
  },
  title: {
    color: COLORS.primary,
    fontSize: SIZES.large,
    fontFamily: 'Caveat',
  },
  benefitScrollView: {
    flex: 1,
    maxHeight: 400,
    backgroundColor: 'rgba(159, 121, 111, 0.72)',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  arabic: {
    color: COLORS.primary,
    fontSize: SIZES.large,
  },
  paragraph1: {
    color: COLORS.secondary,
    fontSize: SIZES.medium,
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
    paddingHorizontal: 30,
    alignSelf: 'center',
    marginBottom: 100,
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
    fontSize: SIZES.category,
    fontFamily: 'MarckScript',
    textAlign: 'center',
  },
});

export default AllahsNames;
