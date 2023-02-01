import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Linking,
  ToastAndroid,
  Platform,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import CustomText from '../Components/CustomText';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import {Get, Post} from '../Axios/AxiosInterceptorFunction';
import CustomAlertModal from '../Components/CustomAlertModal';
import navigationService from '../navigationService';
import Color from '../Assets/Utilities/Color';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import ScreenBoiler from '../Components/ScreenBoiler';
import {useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import CustomButton from '../Components/CustomButton';
import LinearGradient from 'react-native-linear-gradient';

const Support = () => {
  const token = useSelector((state)=>state.authReducer.token)
  const isFocused = useIsFocused();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [supportData, setSupportData] = useState();
  const [submitLoading, setSubmitLoading] = useState(false);

  // const GetSupportData = async () => {
  //   const url = 'auth/admin/info';
  //   setLoading(true);
  //   const response = await Get(url,token);
  //   setLoading(false);
  //   if (response != undefined) {
  //     console.log(response?.data);
  //     setSupportData(response?.data?.data);
  //   }
  // };
  // useEffect(() => {
  //   GetSupportData();
  //   // setFullName('');
  //   // setPhone('');
  //   // setEmail('');
  //   // setSubject('');
  //   // setMessage('');
  // }, [isFocused]);
  // const sendQuestion = async () => {
  //   const url = 'auth/contact/submit';
  //   const body = {
  //     name: fullName,
  //     phone: phone,
  //     email: email,
  //     subject: subject,
  //     description: message,
  //   };
  //   for (let key in body) {
  //     if (body[key] === '') {
  //       return Platform.OS == 'android'
  //         ? ToastAndroid.show(`${key}  is required`, ToastAndroid.SHORT)
  //         : alert(`${key}  is required`);
  //     }
  //   }
  //   setSubmitLoading(true);

  //   const response = await Post(url, body, apiHeader(token));
  //   setSubmitLoading(false);
  //   if (response != undefined) {
  //     Platform.OS == 'android'
  //       ? ToastAndroid.show(
  //           'Sent Successfully',
  //           ToastAndroid.SHORT,
  //         )
  //       : alert('Sent Successfully');
  //     navigationService.navigate('HomeScreen');
  //   }
  // };

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
      
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: windowHeight * 0.1,
              // paddingTop : moderateScale(20,0.3),
              alignItems: 'center',
            }}
            style={{
              width: windowWidth,
            }}>
                <CustomText isBold style={styles.text1}>
           Change Password
          </CustomText>
          <TouchableOpacity
            style={[styles?.ContactInfoContainer, {marginTop : moderateScale(20,0.3)}]}
            activeOpacity={0.85}
            onPress={() => {
              Linking.openURL(`tel:${supportData?.phone}`);
            }}
          >
            <FontAwesome
              name="phone"
              color={Color.themeColor}
              style={styles.icon1}
              size={moderateScale(22, 0.6)}
            />
            <CustomText style={[styles.contactInfoText]} isRegular>
              {loading
                ? 'loading...'
                : supportData?.phone
                ? supportData?.phone
                : 'no contact added yet'}
            </CustomText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles?.ContactInfoContainer,{marginBottom: moderateScale(20,0.3)}]}
            activeOpacity={0.85}
            onPress={() => {
              Linking.openURL(`mailto: ${supportData?.official_email}`);
            }}
          >
            <Entypo
              name="mail"
              color={Color.themeColor}
              style={styles.icon1}
              size={moderateScale(22, 0.6)}
            />
            <CustomText style={[styles.contactInfoText]} isRegular>
              {loading
                ? 'loading...'
                : supportData?.official_email
                ? supportData?.official_email
                : 'not added yet'}
            </CustomText>
          </TouchableOpacity>
         
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <TextInputWithTitle
              titleText={'Your Name'}
              secureText={false}
              placeholder={'Your Name'}
              setText={setFullName}
              value={fullName}
              viewHeight={0.06}
             viewWidth={0.85}
              inputWidth={0.84}
          // border={1}
          // borderColor={'#1B5CFB45'}
          backgroundColor={'#FFFFFF'}
          marginTop={moderateScale(12, 0.3)}
          color={Color.themeColor}
          placeholderColor={Color.themeLightGray}
          borderRadius={moderateScale(1, 0.3)}
            />
            <TextInputWithTitle
              titleText={'Phone'}
              secureText={false}
              placeholder={'Phone'}
              keyboardType={'numeric'}
              setText={setPhone}
              value={phone}
              viewHeight={0.06}
              viewWidth={0.85}
              inputWidth={0.84}
              // border={1}
              // borderColor={'#1B5CFB45'}
              backgroundColor={'#FFFFFF'}
              marginTop={moderateScale(12, 0.3)}
              color={Color.themeColor}
              placeholderColor={Color.themeLightGray}
              borderRadius={moderateScale(1, 0.3)}
            />

            <TextInputWithTitle
              titleText={'Email'}
              secureText={false}
              placeholder={'Email'}
              setText={setEmail}
              value={email}
              viewHeight={0.06}
              viewWidth={0.85}
              inputWidth={0.84}
              // border={1}
              // borderColor={'#1B5CFB45'}
              backgroundColor={'#FFFFFF'}
              marginTop={moderateScale(12, 0.3)}
              color={Color.themeColor}
              placeholderColor={Color.themeLightGray}
              borderRadius={moderateScale(1, 0.3)}
            />
            <TextInputWithTitle
              titleText={'Subject'}
              secureText={false}
              placeholder={'Subject'}
              setText={setSubject}
              value={subject}
              viewHeight={0.06}
             viewWidth={0.85}
              inputWidth={0.84}
          // border={1}
          // borderColor={'#1B5CFB45'}
          backgroundColor={'#FFFFFF'}
          marginTop={moderateScale(12, 0.3)}
          color={Color.themeColor}
          placeholderColor={Color.themeLightGray}
          borderRadius={moderateScale(1, 0.3)}
            />

            <TextInputWithTitle
              titleText={'Enter Description'}
              secureText={false}
              placeholder={'Enter Description'}
              setText={setMessage}
              value={message}
              viewHeight={0.06}
             viewWidth={0.85}
              inputWidth={0.84}
          // border={1}
          // borderColor={'#1B5CFB45'}
          backgroundColor={'#FFFFFF'}
          marginTop={moderateScale(12, 0.3)}
          color={Color.themeColor}
          placeholderColor={Color.themeLightGray}
          borderRadius={moderateScale(1, 0.3)}
              multiline={true}
            />
             <CustomButton
            bgColor={Color.themeColor}
            borderColor={'white'}
            borderWidth={1}
            textColor={Color.black}
            onPress={() => {console.log('Will Update profile');}}
            width={windowWidth * 0.85}
            height={windowHeight * 0.06}
            text={'Send Question'}
            fontSize={moderateScale(14, 0.3)}
            textTransform={'uppercase'}
            isGradient={true}
            isBold
            marginTop={moderateScale(30, 0.3)}
            
          />
          </View>
       </ScrollView></LinearGradient></ScreenBoiler>
  );
};

export default Support;

const styles = ScaledSheet.create({
 
  
  icon1: {
    fontWeight: 'bold',
    marginLeft: 30,
    width: windowWidth * 0.09,
  },
  
  Txt1: {
    fontSize: moderateScale(20, 0.3),
    fontWeight: 'bold',
    color: Color.white,
    marginTop: moderateScale(40, 0.3),

    marginLeft: moderateScale(30, 0.3),
    // alignSelf: "flex-start",
  },
  contactInfoText: {
    fontSize: moderateScale(13, 0.3),color : Color.white
  },



  ContactInfoContainer: {
    width: windowWidth,
    paddingTop: moderateScale(10, 0.3),
    // marginTop: moderateScale(10, 0.3),
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    paddingTop: windowHeight * 0.03,
    // justifyContent: "center",
    height: windowHeight * 0.9,
    width: windowWidth,
    alignItems: 'center',
    // backgroundColor : Color.themeColor
  },
  text1: {
    textTransform: 'uppercase',
    color: Color.white,
    textAlign: 'center',
    fontSize: moderateScale(20, 0.3),
    // marginTop : moderateScale(10,0.3),
    // lineHeight: moderateScale(32, 0.3),
  },
});
