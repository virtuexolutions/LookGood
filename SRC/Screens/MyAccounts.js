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
import Feather from 'react-native-vector-icons/Feather';
import HolidayModal from '../Components/HolidayModal';
import TravelModal from '../Components/TravelModal';

const MyAccounts = props => {
  const dispatch = useDispatch();

  const user = useSelector(state => state.commonReducer.userData);
  // console.log('🚀 ~ MyAccounts ~ user:', user);
  // console.log(user?.photo);
  const token = useSelector(state => state.authReducer.token);
  const [showModal, setShowModal] = useState(false);
  const [imageObject, setImageObject] = useState({});
  const [firstName, setFirstName] = useState(user?.first_name);
  const [lastName, setLastName] = useState(user?.last_name);
  const [phone, setPhone] = useState(user?.phone);
  const [email, setEmail] = useState(user?.email);
  const [country, setCountry] = useState(user?.country);
  // const [description, setDescription] = useState(user?.description);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [isTravelMode, setIsTravelMode] = useState(false);
  const [isHolidayMode, setIsHolidayMode] = useState(false);
  const [Location, setLocation] = useState('');
  const [rushService, setRushService] = useState(false);
  const [displayText, setDisplayText] = useState('');

  const imageArray =
    Object.keys(imageObject).length > 0
      ? [
          {
            uri: imageObject.uri,
          },
        ]
      : [
          {
            uri: `${user?.photo}`,
          },
        ];

  const EditProfile = async () => {
    const params = {
      first_name: firstName,
      last_name: lastName,
      phone: phone,
      email: email,
      rush_service:rushService,
      holiday_mode:isHolidayMode,
      travel_mode: isTravelMode,
      location:Location,
    };
    const formdata = new FormData();
    for (let key in params) {
      if ([undefined, '', null].includes(params[key])) {
        return Platform.OS == 'android'
          ? ToastAndroid.show(
              `${key.replace(formRegEx, formRegExReplacer)} is empty`,
              ToastAndroid.SHORT,
            )
          : Alert.alert(
              `${key.replace(formRegEx, formRegExReplacer)} is empty`,
            );
      }
      formdata.append(key, params[key]);
    }
    if (Object.keys(imageObject).length > 0) {
      formdata.append('photo', imageObject);
    }
    console.log(formdata);

    const url = 'auth/profile';
    setIsLoading(true);
    const response = await Post(url, formdata, apiHeader(token, true));
    setIsLoading(false);

    if (response !== undefined) {
      console.log('response?.data?.data?.user', response?.data);
      dispatch(setUserData(response?.data?.user_info));

      Platform.OS == 'android'
        ? ToastAndroid.show('Profile Updated Succesfully', ToastAndroid.SHORT)
        : Alert.alert('Profile Updated Succesfully');
      props.navigation.goBack();
    }
  };
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
          <View>
            {Object.keys(imageObject).length > 0 ? (
              <CustomImage
                onPress={() => {
                  setIsVisible(true);
                }}
                source={{uri: imageObject?.uri}}
                style={[styles.image]}
              />
            ) : (
              <CustomImage
                onPress={() => {
                  setIsVisible(true);
                }}
                style={[styles.image]}
                source={
                  user?.photo
                    ? {uri: `${user?.photo}`}
                    : require('../Assets/Images/user.png')
                }
              />
            )}

            <TouchableOpacity
              activeOpacity={0.9}
              style={{
                width: moderateScale(30, 0.3),
                height: moderateScale(30, 0.3),
                borderRadius: moderateScale(15, 0.3),
                backgroundColor: Color.themeColor,
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                bottom: moderateScale(8, 0.3),
                right: moderateScale(10, 0.3),
              }}
              onPress={() => setShowModal(true)}>
              <Icon
                name="pencil"
                as={FontAwesome}
                size={moderateScale(18, 0.3)}
                color={Color.white}
              />
            </TouchableOpacity>
          </View>
          <TextInputWithTitle
            iconName={'user'}
            iconType={FontAwesome}
            titleText={'First Name'}
            secureText={false}
            placeholder={'First Name'}
            setText={setFirstName}
            value={firstName}
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
            iconName={'user'}
            iconType={FontAwesome}
            titleText={'Last Name'}
            secureText={false}
            placeholder={'Last Name'}
            setText={setLastName}
            value={lastName}
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
            iconName={'phone'}
            iconType={FontAwesome}
            titleText={'Phone'}
            secureText={false}
            placeholder={'Phone'}
            setText={setPhone}
            value={phone}
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
            disable={true}
          />
          <TextInputWithTitle
            iconName={'envelope'}
            iconType={FontAwesome}
            // disable
            titleText={'Email'}
            secureText={false}
            placeholder={'Email'}
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
            disable
          />
          <TextInputWithTitle
            iconName={'globe'}
            iconType={FontAwesome}
            titleText={'Country'}
            secureText={false}
            placeholder={'Country'}
            setText={setCountry}
            value={country}
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
          {user?.role != 'customer' && (
            <>
              <View
                style={{
                  // backgroundColor:'red',
                  width: windowWidth * 0.7,
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingTop: moderateScale(15, 0.6),
                  // position:'absolute',
                  // left:10,
                  // bottom:10
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setRushService(!rushService);
                    console.log('first=======>');
                  }}
                  style={{
                    height: windowHeight * 0.016,
                    width: windowHeight * 0.016,
                    // backgroundColor:'red',
                    borderRadius: moderateScale((windowHeight * 0.016) / 2),
                    borderWidth: moderateScale(1, 0.6),
                    borderColor: Color.themeColor,
                  }}>
                  {rushService && (
                    <Icon
                      style={{
                        textAlign: 'center',
                        // backgroundColor:'red'
                      }}
                      name="check"
                      as={FontAwesome}
                      color={Color.themeColor}
                      size={11}
                    />
                  )}
                </TouchableOpacity>

                <CustomText
                  onPress={() => {
                    setRushService(!rushService);
                    console.log('text ==-==========>');
                  }}
                  isBold
                  style={{
                    marginHorizontal: moderateScale(8, 0.6),
                    color: Color.white,
                  }}>
                  rush service
                </CustomText>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  // backgroundColor:'red',
                  width: windowWidth * 0.7,
                  paddingVertical: moderateScale(10, 0.6),
                }}>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <View
                    style={{
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        if (isTravelMode == true) {
                          setIsTravelMode(prevState => !prevState);
                          setIsVisibleModal(false);
                        } else {
                          setIsVisibleModal(true);
                          setIsTravelMode(prevState => !prevState);
                        }
                        // if (isHolidayMode) {
                        //   setIsHolidayMode(false);
                        // }
                        // setIsVisibleModal(true);
                        // setIsTravelMode(prevState => !prevState);
                        // console.log('hello =====>');
                      }}
                      style={{
                        height: windowHeight * 0.016,
                        width: windowHeight * 0.016,
                        // backgroundColor:'red',
                        borderRadius: moderateScale((windowHeight * 0.016) / 2),
                        borderWidth: moderateScale(1, 0.6),
                        borderColor: Color.themeColor,
                      }}>
                      {isTravelMode && (
                        <Icon
                          style={{
                            textAlign: 'center',
                            // backgroundColor:'red'
                          }}
                          name="check"
                          as={FontAwesome}
                          color={Color.themeColor}
                          size={11}
                        />
                      )}
                    </TouchableOpacity>

                    <CustomText
                      onPress={() => {
                        if (isTravelMode == true) {
                          setIsTravelMode(prevState => !prevState);
                          setIsVisibleModal(false);
                        } else {
                          setIsVisibleModal(true);
                          setIsTravelMode(prevState => !prevState);
                        }
                        // if (isHolidayMode) {
                        //   setIsHolidayMode(false);
                        // }
                        // setIsVisibleModal(true);
                        // setIsTravelMode(prevState => !prevState);
                        // console.log('travel mode ===========>');
                      }}
                      isBold
                      style={{
                        marginHorizontal: moderateScale(8, 0.6),
                        color: Color.white,
                      }}>
                      Travel mode
                    </CustomText>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      if (isTravelMode) {
                        setIsTravelMode(false);
                      }
                      // setIsVisibleModal(true);
                      setIsHolidayMode(prevState => !prevState);
                    }}
                    style={{
                      height: windowHeight * 0.016,
                      width: windowHeight * 0.016,
                      // backgroundColor:'red',
                      borderRadius: moderateScale((windowHeight * 0.016) / 2),
                      borderWidth: moderateScale(1, 0.6),
                      borderColor: Color.themeColor,
                    }}>
                    {isHolidayMode && (
                      <Icon
                        style={{
                          textAlign: 'center',
                          // backgroundColor:'red'
                        }}
                        name="check"
                        as={FontAwesome}
                        color={Color.themeColor}
                        size={11}
                      />
                    )}
                  </TouchableOpacity>

                  <CustomText
                    onPress={() => {
                      if (isTravelMode) {
                        setIsTravelMode(false);
                      }

                      setIsHolidayMode(!isHolidayMode);
                      console.log('hello mode here ');
                    }}
                    isBold
                    style={{
                      marginHorizontal: moderateScale(8, 0.6),
                      color: Color.white,
                    }}>
                    Holiday mode
                  </CustomText>
                </View>
              </View>
              {isTravelMode && (
                <CustomText
                  style={{
                    color: Color.white,
                    // backgroundColor:'red',s/
                    width: windowWidth * 0.6,
                    // marginBottom: moderateScale(5, 0.6),
                  }}>
                  {Location}
                </CustomText>
              )}
            </>
          )}
          <CustomButton
            bgColor={Color.themeColor}
            borderColor={'white'}
            borderWidth={1}
            textColor={Color.black}
            borderRadius={moderateScale(20, 0.3)}
            onPress={() => {
              EditProfile();
            }}
            width={windowWidth * 0.75}
            height={windowHeight * 0.06}
            text={
              isLoading ? (
                <ActivityIndicator color={'black'} size={'small'} />
              ) : (
                'Update'
              )
            }
            marginTop={moderateScale(20, 0.3)}
            fontSize={moderateScale(14, 0.3)}
            textTransform={'uppercase'}
            isGradient={true}
            isBold
            // marginTop={moderateScale(10, 0.3)}
          />
        </ScrollView>
        <ImagePickerModal
          show={showModal}
          setShow={setShowModal}
          setFileObject={setImageObject}
          crop={true}
        />
        <ImageView
          images={imageArray}
          imageIndex={0}
          visible={isVisible}
          onRequestClose={() => setIsVisible(false)}
        />

        <TravelModal
          Location={Location}
          setLocation={setLocation}
          isTravelMode={isTravelMode}
          setIsTravelMode={setIsTravelMode}
          isVisibleModal={isVisibleModal}
          setIsVisibleModal={setIsVisibleModal}
          displayText={displayText}
          setDisplayText={setDisplayText}
        />
      </LinearGradient>
    </ScreenBoiler>
  );
};

const styles = ScaledSheet.create({
  image: {
    height: windowWidth * 0.35,
    width: windowWidth * 0.35,
    borderRadius: moderateScale((windowWidth * 0.35) / 2, 0.3),
    right: moderateScale(5, 0.3),
    marginTop: moderateScale(20, 0.3),
  },
  container: {
    paddingTop: windowHeight * 0.03,
    // justifyContent: "center",
    height: windowHeight * 0.9,
    width: windowWidth,
    alignItems: 'center',
    // backgroundColor : Color.themeColor
  },
});

export default MyAccounts;
