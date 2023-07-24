import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomText from '../Components/CustomText';
import CustomImage from '../Components/CustomImage';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import ScreenBoiler from '../Components/ScreenBoiler';
import LinearGradient from 'react-native-linear-gradient';
import Color from '../Assets/Utilities/Color';
import CustomButton from '../Components/CustomButton';

const ImageScreen = () => {
  return (
    <ScreenBoiler
      showHeader={true}
      showBack={true}
      statusBarBackgroundColor={Color.black}
      statusBarContentStyle={'light-content'}>
      <LinearGradient
        start={{x: 0.0, y: 0.25}}
        end={{x: 0.5, y: 1.0}}
        colors={Color.themeGradient}
        style={styles.container}>
        <CustomText isBold style={styles.text}>
          Image
        </CustomText>

        <View
          style={{
            width: windowWidth * 0.8,
            height: windowHeight * 0.4,
            alignSelf: 'center',
            borderRadius: moderateScale(20, 0.6),
            overflow: 'hidden',
            marginTop: moderateScale(30, 0.3),
          }}>
          <CustomImage
            source={require('../Assets/Images/barber.png')}
            resizeMode={'cover'}
            style={{height: '100%', width: '100%'}}
          />
        </View>

        <CustomButton
          bgColor={Color.themeColor}
          borderColor={'white'}
          borderWidth={1}
          textColor={Color.black}
          width={windowWidth * 0.8}
          height={windowHeight * 0.06}
          text={'Hair'}
          fontSize={moderateScale(14, 0.3)}
          isGradient={true}
          isBold
          marginTop={moderateScale(30, 0.3)}
        />

        <CustomButton
          bgColor={Color.themeColor}
          borderColor={'white'}
          borderWidth={1}
          textColor={Color.black}
          width={windowWidth * 0.8}
          height={windowHeight * 0.06}
          text={'Beard'}
          fontSize={moderateScale(14, 0.3)}
          isGradient={true}
          isBold
          marginTop={moderateScale(10, 0.3)}
        />

        <CustomButton
          bgColor={Color.themeColor}
          borderColor={'white'}
          borderWidth={1}
          textColor={Color.black}
          width={windowWidth * 0.8}
          height={windowHeight * 0.06}
          text={'Mustaches'}
          fontSize={moderateScale(14, 0.3)}
          isGradient={true}
          isBold
          marginTop={moderateScale(10, 0.3)}
        />

        <View
          style={{
            position: 'absolute',
            bottom: 30,
            right: 0,
          }}>
          <CustomImage
            source={require('../Assets/Images/backgroundLogo.png')}
            resizeMode={'stretch'}
          />
        </View>
      </LinearGradient>
    </ScreenBoiler>
  );
};

export default ImageScreen;

const styles = StyleSheet.create({
  container: {
    height: windowHeight,
    width: windowWidth,
  },

  text: {
    textTransform: 'uppercase',
    color: Color.white,
    textAlign: 'center',
    fontSize: moderateScale(21, 0.3),
  },
});
