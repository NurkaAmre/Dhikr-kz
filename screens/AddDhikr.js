import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, Platform, ImageBackground } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import adddhikr from '../assets/images/adddhikr.png';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddDhikr = ({ navigation}) => {
  const route = useRoute();
  const [newTarget, setNewTarget] = useState('');
  const [title, setTitle] = useState(route.params?.title || 'Зікір');
   const [showCustomDhikr, setShowCustomDhikr] = useState(route.params?.showCustomDhikr || false);
  const [customDhikr, setCustomDhikr] = useState('');

   const nameData = {
    dhikr: route.params?.dhikr || '',
    benefit: route.params?.benefit || '',
  };

  useEffect(() => {
    loadCustomDhikrData();
  }, []);

  const loadCustomDhikrData = async () => {
    try {
      const customDhikrData = await AsyncStorage.getItem('user_custom_dhikr');
      if (customDhikrData !== null) {
        const parsedData = JSON.parse(customDhikrData);
      }
    } catch (error) {
      console.error('Error loading custom Dhikr data:', error);
    }
  };

  const saveCustomDhikr = async () => {
    if (customDhikr.trim() === '') {
      return;
    }

    try {
      const existingData = await AsyncStorage.getItem('user_custom_dhikr');
      const existingDhikrs = existingData ? JSON.parse(existingData) : [];
      const newDhikr = {
        title: title,
        dhikr: customDhikr,
      };
      existingDhikrs.push(newDhikr);
      await AsyncStorage.setItem('user_custom_dhikr', JSON.stringify(existingDhikrs));
      setCustomDhikr('');

      navigation.navigate('CounterPage', {
        newTarget: newTarget,
        title: title, 
        customDhikr: customDhikr,
        dhikr: nameData.dhikr,
        benefit: nameData.benefit,
      });
    } catch (error) {
      console.error('Кешіріңіз қателік орын алды:', error);
    }
  };

const { showCustomInput } = route.params || {};

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      style={styles.container}
    >
      <Text style={styles.text}>Зікір Қосу</Text>
      <View style={styles.imageContainer}>
        <ImageBackground source={adddhikr} style={styles.image} />
      </View>
     <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        {showCustomInput && (
    <View>
      <Text style={styles.label}>Зікір қосу</Text>
      <TextInput
        placeholder='Зікір еңгізіңіз'
        style={styles.input1}
        value={customDhikr}
        onChangeText={(text) => {
        setCustomDhikr(text);
        setTitle(text);
      }}
      />
    </View>
        )}
        <View>
          <Text style={styles.label}>Мақсатты белгілеңіз</Text>
          <TextInput
            placeholder='0'
            style={styles.input}
            keyboardType='numeric'
            value={newTarget}
            onChangeText={(text) => setNewTarget(text)}
          />
        </View>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            saveCustomDhikr();
            navigation.navigate('CounterPage', {
              newTarget: newTarget,
              title: title,
              dhikr: nameData.dhikr,
              benefit: nameData.benefit,
              customDhikr: customDhikr,
            });
          }}
        >
          <Text style={styles.buttonText}>Сақтау</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgMain,
    alignItems: 'center',
    paddingTop: 100,
    // justifyContent: 'center',
  },
  text: {
    color: COLORS.secondary,
    fontSize: SIZES.xxLarge,
    fontFamily: 'Caveat',
    textAlign: 'center',
    marginBottom: 80
  },
  textContainer: {
    backgroundColor: 'rgba(159, 121, 121, 0.22)',
    borderRadius: 30,
    paddingHorizontal: 50,
    justifyContent: "center",
    alignItems: 'center',
    paddingVertical: 40,
  },
  title: {
    color: COLORS.tertiary,
    fontSize: SIZES.large,
    fontFamily: 'MarckScript',
    paddingBottom: 20,
  },
  label: {
    color: COLORS.primary,
    fontSize: SIZES.small,
    alignSelf: 'flex-start',
    fontFamily: 'Balsamiq',
    marginBottom: 5,
  },
  input: {
    backgroundColor: COLORS.secondary,
    width: 250,
    borderRadius: 20,
    height: 50,
    fontSize: SIZES.large,
    paddingLeft: 10,
    color: "#fff",
    marginBottom: 40,
  },
  input1: {
    fontSize: SIZES.medium,
      backgroundColor: COLORS.secondary,
    width: 250,
    borderRadius: 20,
    height: 50,
    paddingLeft: 10,
    color: "#fff",
    marginBottom: 40,
  }, 
  buttonContainer: {
    backgroundColor: "#CA6853",
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
    imageContainer: {
    position: 'absolute',
    bottom: -100,
    left: 0,
  },
  image: {
    width: 400,
    height: 400,
  },
});

export default AddDhikr;
