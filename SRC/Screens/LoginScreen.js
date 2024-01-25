import React, {useState} from 'react';
import {ImageBackground, View, ScrollView} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';
import CustomImage from '../Components/CustomImage';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import ScreenBoiler from '../Components/ScreenBoiler';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from '../Components/CustomButton';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import navigationService from '../navigationService';
import {setUserToken} from '../Store/slices/auth';
import {useDispatch, useSelector} from 'react-redux';
import {Post} from '../Axios/AxiosInterceptorFunction';
import {Platform} from 'react-native';
import {ToastAndroid} from 'react-native';
import {Alert} from 'native-base';
import {ActivityIndicator} from 'react-native';
import {setUserData} from '../Store/slices/common';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.authReducer.token);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const login = async () => {
    const url = 'login';
    const body = {email: email, password: password};

    for (let key in body) {
      if (body[key] == '') {
        return Platform.OS == 'android'
          ? ToastAndroid.show(`${key} is required`, ToastAndroid.SHORT)
          : Alert.alert(`${key} is required`);
      }
    }

    setLoading(true);
    const response = await Post(url, body, apiHeader(token));
    setLoading(false);
    if (response != undefined) {
    console.log("🚀 ~ file: LoginScreen.js:46 ~ login ~ response:", response?.data)
    
      dispatch(setUserToken({token: response?.data?.token}));
      dispatch(setUserData(response?.data?.user_info));
    }
  };

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
            zIndex : 1,
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
          borderRadius={moderateScale(30, 0.4)}
        />
        <TextInputWithTitle
          secureText
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
          borderRadius={moderateScale(30, 0.4)}

        />
        <CustomButton
          bgColor={Color.themePink}
          borderColor={'white'}
          borderWidth={1}
          textColor={Color.black}
          onPress={() => {
            login();

            // dispatch(setUserToken({token: 'skjfhkjhfdjjsdfjlkjlkfj;kdf;l'}));
          }}
          width={windowWidth * 0.75}
          height={windowHeight * 0.06}
          text={
            loading ? (
              <ActivityIndicator size={'small'} color={'black'} />
            ) : (
              'Sign In'
            )
          }
          fontSize={moderateScale(14, 0.3)}
          borderRadius={moderateScale(30, 0.4)}
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
            zIndex: 1,
          }}>
          Sign Up
        </CustomText>
        <CustomText
          onPress={() => {
            console.log('fdfds');
            navigationService.navigate('EnterPhone');
          }}
          isBold
          style={{
            zIndex: 1,
            color: 'rgb(227,196,136)',
            fontSize: moderateScale(10, 0.3),
            textTransform: 'uppercase',
            marginTop: moderateScale(5, 0.3),
          }}>
          forgot password?
        </CustomText>

        </ScrollView>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            // backgroundColor: 'red',
          }}>
          <CustomImage
            source={require('../Assets/Images/backgroundLogo.png')}
            // resizeMode={'stretch'}
            style={{}}
          />
        </View>
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
