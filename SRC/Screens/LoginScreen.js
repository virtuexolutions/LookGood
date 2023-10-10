import React, {useState} from 'react';
import {ImageBackground, View, ScrollView} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';
import CustomImage from '../Components/CustomImage';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import ScreenBoiler from '../Components/ScreenBoiler';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from '../Components/CustomButton';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import navigationService from '../navigationService';
import { setUserToken } from '../Store/slices/auth';
import { useDispatch } from 'react-redux';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const backgroundImage = require('../Assets/Images/appLogo.png');
  return (
    <ScreenBoiler
      // showBack={true}
      showHeader={true}
      statusBarBackgroundColor={Color.black}
      statusBarContentStyle={'light-content'}>
      <LinearGradient
        start={{x: 0.0, y: 0.25}}
        end={{x: 0.5, y: 1.0}}
        colors={Color.themeGradient}
        style={styles.container}>
          <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            // paddingBottom: windowHeight * 0.15,
            // paddingTop : moderateScale(20,0.3),
            alignItems: 'center',
          }}
          style={{
            width: windowWidth,
          }}>
        <CustomText isBold style={styles.text1}>
          Sign in
        </CustomText>
        <TextInputWithTitle
          titleText={'Your Email'}
          placeholder={'Enter Your Email'}
          setText={setEmail}
          value={email}
          viewHeight={0.06}
          viewWidth={0.75}
          inputWidth={0.74}
          // border={1}
          // borderColor={'#1B5CFB45'}
          backgroundColor={'#FFFFFF'}
          marginTop={moderateScale(12, 0.3)}
          color={Color.themeColor}
          placeholderColor={Color.themeLightGray}
          borderRadius={moderateScale(1, 0.3)}
        />
        <TextInputWithTitle
          titleText={'Your Password'}
          placeholder={'Enter Your Password'}
          setText={setPassword}
          value={password}
          viewHeight={0.06}
          viewWidth={0.75}
          inputWidth={0.74}
          // border={1}
          // borderColor={'#1B5CFB45'}
          backgroundColor={'#FFFFFF'}
          marginTop={moderateScale(12, 0.3)}
          color={Color.themeColor}
          placeholderColor={Color.themeLightGray}
          borderRadius={moderateScale(1, 0.3)}
        />
        <CustomButton
          bgColor={Color.themePink}
          borderColor={'white'}
          borderWidth={1}
          textColor={Color.black}
          onPress={() => {
            dispatch(setUserToken({token : true}))
          }}
          width={windowWidth * 0.75}
          height={windowHeight * 0.06}
          text={'Sign In'}
          fontSize={moderateScale(14, 0.3)}
          // borderRadius={moderateScale(30, 0.3)}
          textTransform={'uppercase'}
          isGradient={true}
          isBold
          marginTop={moderateScale(30, 0.3)}
        />

        <CustomText
          isBold
          onPress={() => {
          // console.log('fdfds');
            navigationService.navigate('Signup');
          }}
          style={{
            color: 'rgb(227,196,136)',
            fontSize: moderateScale(13, 0.3),
            textTransform: 'uppercase',
            marginTop: moderateScale(10, 0.3),
            zIndex : 1,
          }}>
          Sign Up
        </CustomText>
        <CustomText
       
          isBold
          style={{
            color: 'rgb(227,196,136)',
            fontSize: moderateScale(10, 0.3),
            textTransform: 'uppercase',
            marginTop: moderateScale(5, 0.3),
          }}>
          forgot password?
        </CustomText>

        <View
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            // zIndex : -1,
            backgroundColor : 'transparent'
          }}>
          <CustomImage
            source={require('../Assets/Images/backgroundLogo.png')}
            // resizeMode={'stretch'}
            style={{}}
          />
        </View>
        </ScrollView>
      </LinearGradient>
    </ScreenBoiler>
  );
};

export default LoginScreen;

const styles = ScaledSheet.create({
  container: {
    paddingTop: windowHeight * 0.2,
    // justifyContent: "center",
    height: windowHeight * 0.9,
    width: windowWidth,
    alignItems: 'center',
    // backgroundColor : Color.green
  },
  bottomImage: {
    width: windowWidth * 0.4,
    alignSelf: 'center',
    // backgroundColor : 'red'
  },
  textContainer: {
    flexDirection: 'row',

    width: windowWidth * 0.7,
    height: windowWidth * 0.7,
    borderRadius: moderateScale((windowWidth * 0.7) / 2, 0.3),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.white,
  },
  LogoText: {
    fontSize: moderateScale(35, 0.3),
    fontWeight: 'bold',
  },
  text: {
    textTransform: 'uppercase',
    color: Color.white,
    fontSize: moderateScale(16, 0.3),
    // marginTop : moderateScale(10,0.3),
    // fontStyle : 'normal'
  },
  text1: {
    textTransform: 'uppercase',
    color: Color.white,
    fontSize: moderateScale(32, 0.3),
    // marginTop : moderateScale(10,0.3),
    // lineHeight: moderateScale(32, 0.3),
  },
});
