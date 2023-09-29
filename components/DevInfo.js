import React from 'react';
import { Linking, Share, StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants/theme';
import ramadan from '../assets/images/ramadan.png';

const DevInfo = () => {
  const handleShare = async () => {
    try {
      const shareOptions = {
        title: 'Share Title',
        message: 'Message to be shared...',
      };
      await Share.share(shareOptions);
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleRate = () => {
    const appStoreUrl = Platform.select({
      ios: 'https://apps.apple.com/app-id', // Replace 'app-id' with your iOS app's ID
      android: 'market://details?id=com.yourapp.package', // Replace with your Android app's package name
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
        <Text style={styles.text}>Assalamu alaykum! 🕌</Text>
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
    backgroundColor: 'rgba(209, 131, 111, 0.40)',
    borderRadius: 30,
    paddingHorizontal: 40,
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
    color: COLORS.white,
    fontSize: SIZES.large,
    fontFamily: 'MarckScript',
    textAlign: 'center',
  },
  text1: {
    fontFamily: 'Elmess',
    paddingTop: 20,
    color: COLORS.primary,
  },
  icon: {
    fontSize: SIZES.xLarge,
    alignSelf: 'center',
    color: COLORS.tertiary,
    fontWeight: 'bold',
  },
  paragraph: {
    fontSize: SIZES.medium,
    fontFamily: 'Balsamiq',
    color: COLORS.tertiary,
  },
});

export default DevInfo;
