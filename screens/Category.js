import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import category from '../assets/images/category.png';

const Category = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Категория</Text>
      <View style={styles.TextContainer}>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            navigation.navigate('AllahsNames');
          }}
        >
          <Text style={styles.buttonText}>Алланың 99 есімі</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            navigation.navigate('DailyDhikr');
          }}
        >
          <Text style={styles.buttonText}>Зікірлер</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            navigation.navigate('MyDailyDhikr');
          }}
        >
          <Text style={styles.buttonText}>Зікірлерім</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            navigation.navigate('AddDhikr', { showCustomInput: true });
          }}
        >
          <Text style={styles.buttonText}>Зікір Қосу</Text>
        </TouchableOpacity>
      </View>
      <Image source={category} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgMain,
    paddingTop: StatusBar.currentHeight,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight,
  },
  text: {
    marginTop: 100,
    color: COLORS.secondary,
    fontSize: SIZES.xxLarge,
    fontFamily: 'MarckScript',
    textAlign: 'center',
  },
  TextContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    gap: 20,
    marginTop: 50,
  },
  buttonContainer: {
    backgroundColor: '#CA6853',
    borderRadius: 40,
    paddingVertical: 10,
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
    fontSize: SIZES.large,
    fontFamily: 'MarckScript',
    textAlign: 'center',
  },
});

export default Category;
