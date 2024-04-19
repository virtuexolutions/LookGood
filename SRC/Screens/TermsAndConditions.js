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
import ImageView from 'react-native-image-viewing';
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
import TermsComponent from '../Components/TermsComponent';

const TermsAndConditions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [termsData, setTermsData] = useState('');

  const termsAndConditions = [
    {
      id: 'tc1',
      heading: 'Definitions',
      text: 'The words "Client," "You," and "Your" refer to the individual who accesses this application. The person agrees to the Company\'s terms and conditions. "The Company," "Ourselves," "We," "Our," and "Us" refer to the company that created this application. "Party," "Parties," and "Us" refer to both the customer and the company.',
    },
    {
      id: 'tc2',
      heading: 'License',
      text: 'Look Clean and its agents reserve all intellectual property rights for its items.  Access to Look Clean is for personal use only subject to the terms and conditions set out below.',
    },
    {
      id: 'tc3',
      heading: 'User Accounts',
      text: 'You are responsible for maintaining the secrecy of your password and account, as well as any activity carried out using your account. Look Clean is not responsible for any loss or harm by your failure to safeguard your password or account.',
    },
    {
      id: 'tc4',
      heading: 'User Generated Content',
      text: 'Certain portions of this application allow users to submit their thoughts and information. Before the publish, we do not review, edit, publish, or explain user-generated content. Such content does not reflect the views of Look Clean, or its associates. But rather those of the individuals who post it.t',
    },
    {
      id: 'tc5',
      heading: 'Looking to our content',
      text: 'The following entities may link to our application without previous written consent:',
      list: [
        ' Government agencies',
        ' Search engines',
        '	News organizations',
        '	Online directory distributors can connect to our application as they do to the websites of other listed businesses.',
      ],
    },
    {
      id: 'tc6',
      heading:'Frames',
      text: 'Frames that alter the visual presentation or appearance of our application in any way are not authorized without pre-written approval.',
    },
    {
      id: 'tc7',
      heading: 'Content Liability',
      text: 'We are not responsible for the material shown on your application. By using our application, you agree to cover and defend us against any claims based on its content. Links on the application must not be interpreted as offensive, vulgar, or illegal, nor may they violate third-party rights.',
    },
    {
      id: 'tc8',
      heading: 'Your Privacy',
      text: 'Please go through our Privacy Policy for details on how we manage your data.',
    },
    {
      id: 'tc9',
      heading: 'Reservation of Rights',
      text: 'We retain the right to seek the removal of any connections to our application. You agree to swiftly delete any connections to our application upon our request.',
    },
    {
      id: 'tc10',
      heading: 'Link removal from our application',
      text: 'If you see any objectionable links on our application, please notify us at any time. We will examine requests to remove links, but we are not bound to do so or to respond directly.',
    },
    {
      id: 'tc11',
      heading: 'Disclaimer',
      text: 'To the maximum extent permissible by applicable law, we make no representations, warranties, or conditions about our application or its usage.',
    },
  ];

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
            paddingHorizontal:moderateScale(5,0.1),
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
                textAlign: 'justify',
                marginTop: moderateScale(20, 0.3),
                lineHeight: moderateScale(20, 0.3),
                fontSize: moderateScale(15, 0.3),
              },
            ]}>
            By using this application, you understand and agree with the
            accompanying terms and conditions. If you do not agree to these
            terms and conditions described on this page, please do not use Look
            Clean.
          </CustomText>
          {termsAndConditions.map((item, index) => {
            return (
             <TermsComponent item={item} index={index}/>
            );
          })}
        </ScrollView>
      </LinearGradient>
    </ScreenBoiler>
  );
};

const styles = ScaledSheet.create({
  container: {
    paddingTop: windowHeight * 0.03,
    // justifyContent: "center",
    height: windowHeight,
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
