import React from 'react';
import { Linking, Share, StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants/theme';
import ramadan from '../assets/images/ramadan.png';

const DevInfo = () => {
  const handleShare = async () => {
    try {
      const shareOptions = {
        title: 'Зікір Қосымшасы',
        message: 'Зікір Қосымшасын жүктеп алыңыз!',
      };
      await Share.share(shareOptions);
    } catch (error) {
      console.error('Қателік орын алды:', error);
    }
  };

  const handleRate = () => {
    const appStoreUrl = Platform.select({
      ios: 'https://apps.apple.com/app-id',
      android: 'market://details?id=com.yourapp.package',
    });

    Linking.openURL(appStoreUrl)
      .catch(error => console.error('Error opening app store:', error));
  };

  const handleFeedback = () => {
    Linking.openURL('mailto:your-email@gmail.com?subject=Feedback')
      .catch(error => console.error('Error opening email:', error));
  };

  return (
    <ImageBackground
      source={ramadan}
      style={[styles.container, styles.bg]}
    >
      <View style={styles.containers}>
        <Text style={styles.text}>Assalamu alaykum!</Text>
        <Text style={styles.text2}>Егер сізде сұрақтар немесе ұсыныстар болса, бізге хат жолдаңыз! nurkerey30@gmail.com</Text>
        <View style={styles.dots}>
          <Text style={styles.dot}>•°•°•</Text>
          <Text style={styles.dot}>•°•°•</Text>
          <Text style={styles.dot}>•°•°•</Text>
        </View>
        <View>
          <TouchableOpacity style={styles.iconContainer} onPress={handleShare}>
            <Text style={styles.paragraph}>Share</Text>
            <EvilIcons name="share-google" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer} onPress={handleRate}>
            <Text style={styles.paragraph}>Rate</Text>
            <EvilIcons name="star" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer} onPress={handleFeedback}>
            <Text style={styles.paragraph}>Feedback</Text>
            <EvilIcons name="comment" style={styles.icon} />
          </TouchableOpacity>
        </View>
        <Text style={styles.text1}>Copyright © 2023 Nurka & Amre</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgMain,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  containers: {
    backgroundColor: 'rgba(202, 124, 93, 0.9)',
    borderRadius: 30,
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  iconContainer: {
    flexDirection: 'row',
    gap: 30,
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  text: {
    color: COLORS.bgMain,
    fontSize: SIZES.large,
    fontFamily: 'MarckScript',
    textAlign: 'center',
  },
  text1: {
    fontFamily: 'Elmess',
    paddingTop: 20,
    color: COLORS.bgMain,
  },
  text2: {
    paddingVertical: 20,
    fontFamily: 'Elmess',
    color: "white"
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 30,
    paddingHorizontal: 40,
    paddingVertical: 10,
  },
  dot: {
    color: COLORS.lightWhite
  },
  icon: {
    fontSize: SIZES.xLarge,
    alignSelf: 'center',
    color: COLORS.bgMain,
    fontWeight: 'bold',
  },
  paragraph: {
    fontSize: SIZES.medium,
    fontFamily: 'Balsamiq',
    color: COLORS.bgMain,
  },
});

export default DevInfo;
