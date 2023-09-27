import { View, Text, StyleSheet, TouchableOpacity, Image,  } from "react-native"
import { COLORS, SIZES } from '../constants/theme'
import category from '../assets/images/category.png'

const Category = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Category</Text>
      <View style={styles.TextContainer}>
        <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {
              navigation.navigate('AllahsNames');
            }}
          >
            <Text style={styles.buttonText}>99 Names of Allah</Text>
      </TouchableOpacity>
      <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {
              navigation.navigate('DailyDhikr');
            }}
          >
            <Text style={styles.buttonText}>Daily Dhikrs</Text>
      </TouchableOpacity>
      <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {
              navigation.navigate('AddDhikr', { showCustomInput: true });
            }}
          >
            <Text style={styles.buttonText}>Add Dhikr</Text>
        </TouchableOpacity>
      </View>
      <Image source={category} style={styles.image}/>
    </View>
  )
}

const styles = StyleSheet.create({
   container: {
    flex: 1,
    backgroundColor: COLORS.bgMain,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginTop: 150,
    color: COLORS.secondary,
    fontSize: SIZES.xxLarge,
    fontFamily: 'PatrickHandSC',
    textAlign: 'center',
  },
  TextContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    gap: 20,
    marginTop: 50
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
    fontFamily: 'PatrickHand',
    textAlign: 'center',
  },
})
export default Category