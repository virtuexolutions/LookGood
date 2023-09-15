import React, {useState} from 'react';
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import Color from '../Assets/Utilities/Color';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import ImageView from "react-native-image-viewing";
import ScreenBoiler from '../Components/ScreenBoiler';
import {Icon} from 'native-base';
import CustomImage from '../Components/CustomImage';
import {setUserData} from '../Store/slices/common';
import {Patch, Post} from '../Axios/AxiosInterceptorFunction';
import ImagePickerModal from '../Components/ImagePickerModal';
import {formRegEx, formRegExReplacer, imageUrl} from '../Config';
import CustomButton from '../Components/CustomButton';
import LinearGradient from 'react-native-linear-gradient';
import CustomText from '../Components/CustomText';

const TermsAndConditions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [termsData, setTermsData] = useState('');

  // const parser = new DOMParser.DOMParser();

  // const GetSupportData = async () => {
  //   const url = 'term/conditions';
  //   setIsLoading(true);
  //   const response = await Get(url);
  //   setIsLoading(false);
  //   if (response != undefined) {
  //     console.log('dasdsadsa =>', response?.data?.data);
  //     setTermsData(response?.data?.data);
  //   }
  // };

  // useEffect(() => {
  //   GetSupportData();
  // }, []);

  // useEffect(() => {
  //   console.log(termsData);
  //   // let a = parser?.parseFromString(
  //   //   "<p>Hello world <b>world</b> <i>foo</i> abc</p>",
  //   //   "text/html"
  //   // );

    
  //   const parsed = parser.parseFromString(termsData?.description, 'text/html');
  //   console.log('here is the data =>',  parsed);
  // }, [termsData]);

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
            paddingBottom: windowHeight * 0.15,
            // paddingTop : moderateScale(20,0.3),
            alignItems: 'center',
          }}
          style={{
            width: windowWidth,
          }}>
              <CustomText isBold style={styles.text1}>
         Terms And Conditions
        </CustomText>
          
            <CustomText
              style={[
                {
                  // backgroundColor: 'red',
                  color: 'white',
                  textAlign: 'left',
                  marginTop: moderateScale(20, 0.3),
                  lineHeight: moderateScale(20, 0.3),
                  fontSize: moderateScale(15, 0.3),
                },
              ]}>
{'Lorem Ipsum Lorem IpsumLorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum '}
            </CustomText>
    </ScrollView></LinearGradient></ScreenBoiler>
  );
};

const styles = ScaledSheet.create({
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

export default TermsAndConditions;
