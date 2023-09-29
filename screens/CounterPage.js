import React, { useState, useEffect } from 'react';
import { View, ImageBackground, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import counter from '../assets/images/counter.png';
import { EvilIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CongratulationsModal from '../components/CongratulationsModal';
import { useNavigation } from '@react-navigation/native';

const CounterPage = ({ route }) => {
  const navigation = useNavigation();

  const [target, setTarget] = useState(0);
  const [count, setCount] = useState(0);
  const [days, setDays] = useState(0);
  const [showCongratulationsModal, setShowCongratulationsModal] = useState(false);
  const [title, setTitle] = useState(route.params?.title || '');
  const [customDhikr, setCustomDhikr] = useState(route.params?.customDhikr || '');
  const [dhikr, setDhikr] = useState(route.params?.dhikr || ''); 
  const [benefit, setBenefit] = useState(route.params?.benefit || '');

  useEffect(() => {
    const loadSavedDays = async () => {
      try {
        const savedDays = await AsyncStorage.getItem('savedDays');
        if (savedDays !== null) {
          setDays(Number(savedDays));
        }
      } catch (error) {
        console.error('Error loading saved days:', error);
      }
    };

    loadSavedDays();
  }, []);

  const incrementDays = () => {
    setDays(days + 1);
  };

  const decrementDays = () => {
    if (days > 0) {
      setDays(days - 1);
    }
  };

  useEffect(() => {
    const saveDays = async () => {
      try {
        await AsyncStorage.setItem('savedDays', days.toString());
      } catch (error) {
        console.error('Error saving days:', error);
      }
    };

    saveDays();
  }, [days]);

  useEffect(() => {
    if (route.params && route.params.newTarget) {
      setTarget(route.params.newTarget);
    }
    if (route.params && route.params.title) {
      setTitle(route.params.title);
    }
    if (route.params && route.params.customDhikr) {
      setCustomDhikr(route.params.customDhikr);
    }
    if (route.params && route.params.dhikr) {
      setDhikr(route.params.dhikr);
    }
  }, [route.params]);

  const resetCount = () => {
    setCount(0);
  };

  const resetDhikrAndTitle = () => {
  setTitle('');
  setDhikr('');
  setCustomDhikr('')
  setBenefit('')
};

const saveDhikrToMyDailyDhikr = async () => {
  try {
    const dhikrCard = `${title}`;
    const savedDhikrCards = await AsyncStorage.getItem('dhikrCards');

    if (savedDhikrCards !== null) {
      const updatedDhikrCards = JSON.parse(savedDhikrCards);
      updatedDhikrCards.push(dhikrCard);
      await AsyncStorage.setItem('dhikrCards', JSON.stringify(updatedDhikrCards));
    } else {
      const initialDhikrCards = [dhikrCard];
      await AsyncStorage.setItem('dhikrCards', JSON.stringify(initialDhikrCards));
    }

    resetDhikrAndTitle(); // Call reset function before navigating
    navigation.navigate('MyDailyDhikr');
  } catch (error) {
    console.error('Error saving dhikr card:', error);
  }
};

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageBackground source={counter} style={styles.image} />
      </View>
      <Text style={styles.text}>{title}</Text>
      <View style={styles.card}>
        <Text style={styles.cardText}>
          {customDhikr}
          {dhikr}    
        </Text>
      </View>

      <KeyboardAvoidingView
        style={styles.btnContainer}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
        <View style={styles.btns}>
          <Text style={styles.label}>Мақсат</Text>
          <TextInput
            placeholder="0"
            style={styles.input}
            value={target.toString()}
            onChangeText={(text) => setTarget(text)}
          />
          <EvilIcons
            name="pencil"
            style={styles.icon}
            onPress={() => {
              navigation.navigate('AddDhikr');
            }}
          />
        </View>

        <View style={styles.btns}>
          <Text style={styles.label}>Орындалды</Text>
          <TextInput
            style={styles.input}
            value={count.toString()}
            editable={false}
          />
          <EvilIcons name="refresh" style={styles.icon} onPress={resetCount} />
        </View>

        <View style={styles.btns}>
          <Text style={styles.label}>Күндер</Text>
          <TextInput style={styles.input} value={days.toString()} />
          <View style={styles.minplus}>
            <EvilIcons name="minus" style={styles.icon} onPress={decrementDays} />
            <EvilIcons name="plus" style={styles.icon} onPress={incrementDays} />
          </View>
        </View>
      </KeyboardAvoidingView>
      <View style={styles.divider} />
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          if (count < target) {
            setCount(count + 1);
          } else {
            setShowCongratulationsModal(true);
            saveDhikrToMyDailyDhikr();
          }
        }}
      >
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', position: 'relative', justifyContent: 'center' }}>
        <TouchableOpacity
          style={styles.buttonContainer2}
          onPress={() => {
            resetDhikrAndTitle();
            navigation.navigate('MyDailyDhikr', {
              title: title,
              dhikr: dhikr,
              customDhikr: customDhikr
            });
          }}
        >
          <Text style={styles.buttonText2}>Орындалды</Text>
        </TouchableOpacity>
      </View>
      <CongratulationsModal
        visible={showCongratulationsModal}
        onClose={() => setShowCongratulationsModal(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgMain,
    paddingTop: 60
  },
  imageContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  image: {
    width: 400,
    height: 200,
  },
  text: {
    color: COLORS.primary,
    fontSize: SIZES.large,
    fontFamily: 'Caveat',
    textAlign: 'center',
    paddingHorizontal: 10
  },
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.secondary,
    borderRadius: 20,
    paddingHorizontal: 20,
    marginHorizontal: 40,
    paddingVertical: 20,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  cardText: {
    color: "#fff",
    fontSize: SIZES.medium,
    fontFamily: "Elmess"
  },
  label: {
    color: COLORS.tertiary,
    fontSize: SIZES.small,
    alignSelf: 'flex-start',
    fontFamily: 'Elmess',
    marginBottom: 5
  },
  btnContainer: {
    flexDirection: "row",
    paddingHorizontal: 30,
    gap: 50,
    paddingTop: 40,
    justifyContent: "center",
    alignItems: "center"
  },
  input: {
    backgroundColor: COLORS.secondary,
    borderRadius: 20,
    color: '#fff',
    paddingLeft: 10,
    paddingVertical: 3,
    fontSize: SIZES.large,
    width: 80,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  icon: {
    fontSize: SIZES.xLarge,
    marginTop: 4,
    alignSelf: "center",
    color: COLORS.tertiary,
  },
  minplus: {
    flexDirection: 'row',
    justifyContent: "space-evenly"
  },
  divider: {
    borderBottomColor: COLORS.secondary,
    borderBottomWidth: 1,
    marginHorizontal: 30,
    marginBottom: 30,
    marginTop: 5
  },
  buttonContainer2: {
    backgroundColor: "#CA6853",
    borderRadius: 40,
    paddingVertical: 4,
    marginTop: 60,
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
  buttonText2: {
    color: COLORS.white,
    fontSize: SIZES.xLarge,
    fontFamily: 'MarckScript',
    textAlign: 'center',
  },
  buttonContainer: {
    backgroundColor: COLORS.secondary,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 100,
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
    fontSize: SIZES.xxLarge,
    fontFamily: 'PatrickHand',
    textAlign: 'center',
  },
  icons1: {
    fontSize: SIZES.xLarge,
    position: "absolute",
    color: COLORS.tertiary,
    left: 20,
    top: 70,
  },
  icons2: {
    fontSize: SIZES.xLarge,
    position: "absolute",
    color: COLORS.tertiary,
    right: 20,
    top: 70,
  },
});

export default CounterPage;
