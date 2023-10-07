import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import mydhikr from '../assets/images/mydhikr.png';
import { EvilIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';

const MyDailyDhikr = ({ navigation, route }) => {
  const [dhikrCards, setDhikrCards] = useState([]);
  const [underlinedCards, setUnderlinedCards] = useState([]);
  const [dhikr, setDhikr] = useState(route.params?.dhikr || '');
  const [title, setTitle] = useState(route.params?.title || '');
  const [customDhikr, setCustomDhikr] = useState(
    route.params?.customDhikr || ''
  );

  useEffect(() => {
    const loadDhikrCards = async () => {
      try {
        const storedDhikrCards = await AsyncStorage.getItem('dhikrCards');
        if (storedDhikrCards) {
          setDhikrCards(JSON.parse(storedDhikrCards));
        }
      } catch (error) {
        console.error('Error loading dhikr cards:', error);
      }
    };

    loadDhikrCards();
  }, []);

  const handleCheckDhikr = (index) => {
    // Toggle the underlined state for the clicked card
    const updatedUnderlinedCards = [...underlinedCards];
    updatedUnderlinedCards[index] = !updatedUnderlinedCards[index];
    setUnderlinedCards(updatedUnderlinedCards);
  };

  const handleDeleteDhikr = (index) => {
    const updatedDhikrCards = [...dhikrCards];
    updatedDhikrCards.splice(index, 1);
    setDhikrCards(updatedDhikrCards);

    // Save updated dhikr cards to AsyncStorage
    saveDhikrCards(updatedDhikrCards);
  };

  const saveDhikrCards = async (updatedDhikrCards) => {
    try {
      await AsyncStorage.setItem(
        'dhikrCards',
        JSON.stringify(updatedDhikrCards)
      );
    } catch (error) {
      console.error('Error saving dhikr cards:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageBackground source={mydhikr} style={styles.image} />
      </View>
      <Text style={styles.text}>Күнделікті Зікірлер</Text>

      {dhikrCards.map((dhikr, index) => (
        <TouchableOpacity
          style={styles.card}
          key={index}
          onPress={() => {
            navigation.navigate('CounterPage', {
              dhikr: dhikr,
              title: title,
              customDhikr: customDhikr,
            });
          }}
        >
          {/* Wrap the dhikr text in a <Text> component */}
          <Text
            style={[
              styles.cardText,
              underlinedCards[index] && styles.underlinedText,
            ]}
          >
            {dhikr.length > 15 ? dhikr.substring(0, 15) + '...' : dhikr}
          </Text>
          <View style={styles.cardContainer}>
            <EvilIcons
              name="check"
              style={styles.cardIcon1}
              onPress={() => {
                handleCheckDhikr(index); // Call the new handler
              }}
            />
            <View style={styles.verticalLine}></View>
            <EvilIcons
              name="trash"
              style={styles.cardIcon2}
              onPress={() => {
                handleDeleteDhikr(index);
              }}
            />
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgMain,
    paddingTop: StatusBar.currentHeight,
    paddingHorizontal: 10,
  },
  imageContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  image: {
    width: 350,
    height: 350,
  },
  text: {
    color: COLORS.secondary,
    fontSize: SIZES.xLarge,
    fontFamily: 'Caveat',
    paddingTop: 100,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    color: COLORS.white,
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: SIZES.large,
  },
  addButton: {
    backgroundColor: COLORS.secondary,
    borderRadius: 30,
    marginLeft: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  addButtonLabel: {
    color: COLORS.white,
    fontSize: SIZES.large,
    fontFamily: 'PatrickHand',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: 'rgba(202, 100, 80, 0.72)',
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 20,
    gap: 20,
    justifyContent: 'space-between',
  },
  cardText: {
    color: COLORS.white,
    fontSize: SIZES.large,
    fontFamily: 'MarckScript',
  },
  cardContainer: {
    flexDirection: 'row',
  },
  verticalLine: {
    width: 2,
    height: 35,
    backgroundColor: COLORS.secondary,
    marginHorizontal: 6,
  },
  cardIcon1: {
    fontSize: SIZES.xLarge,
    paddingTop: 6,
    color: '#fff',
  },
  cardIcon2: {
    fontSize: SIZES.xLarge,
    paddingTop: 6,
    color: '#fff',
  },
  underlinedText: {
    textDecorationLine: 'line-through',
    opacity: 0.7,
  },
});

export default MyDailyDhikr;
