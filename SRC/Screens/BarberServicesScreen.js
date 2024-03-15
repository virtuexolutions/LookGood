import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  View,
  ScrollView,
  FlatList,
  Platform,
  ToastAndroid,
  Alert,
  ActivityIndicator,
  Modal,
} from 'react-native';
import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';
import CustomImage from '../Components/CustomImage';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import ScreenBoiler from '../Components/ScreenBoiler';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from '../Components/CustomButton';
import CustomTextWithMask from '../Components/CustomTextWithMask';
import {Rating, AirbnbRating} from 'react-native-ratings';
import {Icon} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity} from 'react-native';
import navigationService from '../navigationService';
import numeral from 'numeral';
import {Get} from '../Axios/AxiosInterceptorFunction';
import {useSelector} from 'react-redux';
import ReviewCard from '../Components/ReviewCard';
import ShowReview from '../Components/ShowReview';
import Entypo from 'react-native-vector-icons/Entypo';

const BarberServicesScreen = props => {
  const userData = useSelector(state => state.commonReducer.userData);

  const token = useSelector(state => state.authReducer.token);
  const [selectedService, setSelectedService] = useState([]);
  const [barberDetails, setBarberDetails] = useState([]);
  console.log(
    '🚀 ~ BarberServicesScreen ~ barberDetails:',
    // JSON.stringify(barberDetails?.questions_ans, null, 2),
    // barberDetails?.questions_ans[0]?.answer?.answer,
    // barberDetails?.questions_ans[0]?.answer?.answer
  );
  const [Loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [totalPrice, settotalPrice] = useState(0);
  const detail = props?.route?.params?.detail;

  const BarberDetals = async () => {
    const url = `auth/barber/detail/${detail?.id}`;
    setLoading(true);
    const response = await Get(url, token);
    setLoading(false);
    if (response != undefined) {
      // console.log('🚀 ~ BarberDetals ~ response:', response?.data);
      setBarberDetails(response?.data?.user_detail);
    }
  };

  useEffect(() => {
    BarberDetals();
  }, []);

  useEffect(() => {
    if (selectedService?.length > 0) {
      let t_Price = 0;
      selectedService?.map((item, index) => (t_Price += item?.price));
      console.log(t_Price, userData?.wallet?.amount);
      settotalPrice(t_Price);
      if (t_Price > userData?.wallet?.amount) {
        Alert.alert('Insufficient credits', 'please buy some and try again', [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Buy coins',
            onPress: () => {
              navigationService.navigate('Purchase');
            },
          },
        ]);
      }
    }
  }, [selectedService]);

  const serviceArray = [
    {
      name: 'Blow dry',
      price: 15.5,
      quantity: 1,
    },
    {
      name: 'Blow dry with curling and striaght iron',
      price: 18.5,
      quantity: 1,
    },
    {
      name: 'Hair cut with Blow dry',
      price: 12.5,
      quantity: 1,
    },
    {
      name: 'Mens haircut',
      price: 22.5,
      quantity: 1,
    },
    {
      name: 'Gloss',
      price: 19.5,
      quantity: 1,
    },
    {
      name: 'Gel Polist',
      price: 32.5,
      quantity: 1,
    },
    {
      name: 'Meni pedi',
      price: 21.5,
      quantity: 1,
    },
    {
      name: 'nail cutting',
      price: 52.5,
      quantity: 1,
    },
    {
      name: 'pink and white fill',
      price: 22.5,
      quantity: 1,
    },
    {
      name: 'Polish change',
      price: 32.5,
      quantity: 1,
    },
    {
      name: 'Acrylic fill',
      price: 72.5,
      quantity: 1,
    },
    {
      name: 'partial highlight',
      price: 72.5,
      quantity: 1,
    },
  ];

  const question = [
    'car parking area ',
    ' cafeteria',
    ' airconditional waiting area',
    ' security surveillance',
  ];

  return (
    <ScreenBoiler
      showHeader={true}
      showBack={true}
      showUser={true}
      statusBarBackgroundColor={Color.black}
      statusBarContentStyle={'light-content'}>
      <LinearGradient
        start={{x: 0.0, y: 0.25}}
        end={{x: 0.5, y: 1.0}}
        colors={Color.themeGradient}
        style={styles.container}>
        <View
          style={{
            width: windowWidth,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <CustomImage style={styles.image} source={{uri: detail?.photo}} />
          <View style={{marginLeft: moderateScale(10, 0.3)}}>
            <CustomTextWithMask
              data={`${detail?.first_name} ${detail?.last_name}`}
              isBold
              size={moderateScale(20, 0.3)}
              textStyle={{
                textTransform: 'uppercase',
              }}
            />
            <TouchableOpacity
              onPress={() => {
                setModal(true);
              }}
              style={{
                width: windowWidth * 0.25,
              }}>
              <Rating
                type="custom"
                readonly
                startingValue={3}
                ratingCount={5}
                imageSize={moderateScale(18, 0.3)}
                style={{
                  width: windowWidth * 0.24,
                }}
                ratingBackgroundColor={'transparent'}
              />
            </TouchableOpacity>

            <CustomText
              style={{
                color: Color.themeLightGray,
                fontSize: moderateScale(10, 0.3),
              }}>
              {barberDetails?.review?.length} Review
            </CustomText>
          </View>
        </View>
        <View
          style={{
            // backgroundColor : 'red',
            width: windowWidth,
            // marginTop :moderateScale(10,.6),
            marginHorizontal: moderateScale(10, 0.6),
          }}>
          <CustomText
            isBold
            // size={moderateScale(30, 0.3)}
            style={{
              color: Color.themeColor,
              fontSize: moderateScale(18, 0.3),
            }}>
            Ambiance
          </CustomText>

          <FlatList
            showsVerticalScrollIndicator={false}
            data={question}
            style={{
              width: windowWidth * 0.95,
            }}
            contentContainerStyle={{
              padding: moderateScale(10, 0.6),
            }}
            renderItem={({item, index}) => {
              console.log(
                '🚀 ~ BarberServicesScreen ~ item=============>pro here:',
                item,
                // barberDetails?.questions_ans[0]?.answer?.answer
              );
              return (
                <View
                  activeOpacity={0.9}
                  style={{
                    width: windowWidth,
                    paddingVertical: moderateScale(5, 0.6),
                    flexDirection: 'row',
                  }}>
                  <CustomText
                    isBold
                    style={{
                      fontSize: moderateScale(13, 0.3),
                      width: windowWidth * 0.8,
                      // backgroundColor: 'red',
                      color: Color.white,
                    }}>
                    {barberDetails?.questions_ans[0]?.answer?.answer.toLowerCase() ==
                    'yes'
                      ? `${'i have'} ${item}`
                      : `${'i have no'} ${item}`}
                  </CustomText>
                  <Icon
                    as={Entypo}
                    name={
                      barberDetails?.questions_ans[0]?.answer?.answer.toLowerCase() ==
                      'yes'
                        ? 'check'
                        : 'cross'
                    }
                    size={15}
                    color={
                      barberDetails?.questions_ans[0]?.answer?.answer.toLowerCase() ==
                      'yes'
                        ? Color.green
                        : Color.themePink
                    }
                  />
                </View>
              );
            }}
          />
        </View>

        <CustomTextWithMask
          data={'All Services'}
          isBold
          size={moderateScale(30, 0.3)}
          textStyle={{
            fontSize: moderateScale(18, 0.3),
          }}
          containerStyle={{
            marginTop: moderateScale(20, 0.3),
          }}
        />

        {Loading ? (
          <View
            style={{
              alignItems: 'center',
              height: windowHeight * 0.4,
              justifyContent: 'center',
            }}>
            <ActivityIndicator
              size={moderateScale(30, 0.6)}
              color={Color.themeColor}
            />
          </View>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={barberDetails?.services}
            style={{
              width: windowWidth,
              // backgroundColor : 'red',
              flexGrow: 0,
            }}
            contentContainerStyle={{
              paddingBottom: moderateScale(80, 0.3),
              paddingTop: moderateScale(20, 0.3),
            }}
            ListEmptyComponent={() => {
              return (
                <View
                  style={{
                    height: windowHeight * 0.1,
                    justifyContent: 'center',
                  }}>
                  <CustomText
                    style={{
                      fontSize: moderateScale(15, 0.6),
                      color: Color.white,
                      textAlign: 'center',
                    }}
                    isBold>
                    No services found
                  </CustomText>
                </View>
              );
            }}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => {
                    if (
                      selectedService?.some(data => data?.name == item?.name)
                    ) {
                      setSelectedService(
                        selectedService?.filter(
                          data => data?.name != item?.name,
                        ),
                      );
                    } else {
                      setSelectedService(prev => [...prev, item]);
                    }

                    // let data = [];
                    // let index1 = 0;
                    // !selectedService.some(data => {
                    //   return data.name == item?.name;
                    // })
                    //   ? setSelectedService(prev => [...prev, item])
                    //   : ((data = [...selectedService]),
                    //     (index1 = data.findIndex(x => x?.name == item?.name)),
                    //     console.log(
                    //       '🚀 ~ file: BarberServicesScreen.js:157 ~ BarberServicesScreen ~ data',
                    //       index1,
                    //     ),
                    //     data.splice(index1, 1),
                    //     setSelectedService(data));
                  }}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: moderateScale(10, 0.3),
                    width: windowWidth,
                    paddingRight: moderateScale(20, 0.3),
                    alignItems: 'center',
                  }}>
                  <Icon
                    name={
                      selectedService.some(data => {
                        return data.name == item?.name;
                      })
                        ? 'check-circle-o'
                        : 'circle-o'
                    }
                    as={FontAwesome}
                    color={
                      selectedService.some(data => {
                        return data.name == item?.name;
                      })
                        ? Color.themeColor
                        : Color.white
                    }
                    size={moderateScale(17, 0.3)}
                    style={{}}
                  />
                  <CustomText
                    isBold
                    style={{
                      fontSize: moderateScale(14, 0.3),
                      width: windowWidth * 0.45,
                      color: Color.white,
                      position: 'absolute',
                      left: moderateScale(40, 0.3),
                    }}>
                    {item?.name}
                  </CustomText>
                  <CustomText
                    isBold
                    style={{
                      fontSize: moderateScale(14, 0.3),
                      color: Color.white,
                    }}>
                    {numeral(item?.price).format('$0,0.0')}
                  </CustomText>
                </TouchableOpacity>
              );
            }}
            ListFooterComponent={() => {
              return (
                <>
                  <CustomButton
                    // bgColor={Color.themePink}
                    // borderColor={'white'}
                    // borderWidth={1}
                    textColor={Color.black}
                    onPress={() => {
                      if (selectedService.length > 0) {
                        navigationService.navigate('ImageUpload', {
                          data: selectedService,
                          barber: barberDetails,
                        });
                      } else {
                        Platform.OS == 'android'
                          ? ToastAndroid.show(
                              'Please select any service',
                              ToastAndroid.SHORT,
                            )
                          : alert('Please select any service');
                      }
                    }}
                    width={windowWidth * 0.75}
                    height={windowHeight * 0.06}
                    text={'customize your trimming'}
                    fontSize={moderateScale(14, 0.3)}
                    textTransform={'uppercase'}
                    isGradient={true}
                    isBold
                    marginTop={moderateScale(30, 0.3)}
                    borderRadius={moderateScale(35, 0.6)}
                    disabled={totalPrice > userData?.wallet?.amount}
                  />
                  <CustomButton
                    // bgColor={Color.themePink}
                    // borderColor={'white'}
                    // borderWidth={1}
                    textColor={Color.black}
                    onPress={() => {
                      if (selectedService.length > 0) {
                        navigationService.navigate('ChooseDate', {
                          data: selectedService,
                          barber: barberDetails,
                        });
                      } else {
                        Platform.OS == 'android'
                          ? ToastAndroid.show(
                              'Choose any service first to proceed',
                              ToastAndroid.SHORT,
                            )
                          : Alert.alert('Choose any service first to proceed');
                      }
                    }}
                    width={windowWidth * 0.75}
                    height={windowHeight * 0.06}
                    text={'Book Now'}
                    fontSize={moderateScale(14, 0.3)}
                    textTransform={'uppercase'}
                    isGradient={true}
                    isBold
                    marginTop={moderateScale(10, 0.3)}
                    borderRadius={moderateScale(35, 0.6)}
                    disabled={totalPrice > userData?.wallet?.amount}
                  />
                </>
              );
            }}
          />
        )}

        <ShowReview
          barberDetails={barberDetails?.review}
          modal={modal}
          setModal={setModal}
        />
      </LinearGradient>
    </ScreenBoiler>
  );
};

export default BarberServicesScreen;

const styles = ScaledSheet.create({
  container: {
    paddingTop: windowHeight * 0.06,
    // justifyContent: "center",
    height: windowHeight * 0.9,
    width: windowWidth,
    alignItems: 'center',
    paddingLeft: moderateScale(20, 0.3),
  },
  text1: {
    textTransform: 'uppercase',
    color: Color.white,
    textAlign: 'center',
    fontSize: moderateScale(20, 0.3),
  },
  text1Absolute: {
    textTransform: 'uppercase',
    color: Color.white,
    textAlign: 'center',
    fontSize: moderateScale(16, 0.3),
  },
  bannerView: {
    width: windowWidth * 0.85,
    height: windowHeight * 0.36,
    backgroundColor: 'red',
    marginTop: moderateScale(20, 0.3),
  },
  image: {
    width: moderateScale(140, 0.3),
    height: moderateScale(140, 0.3),
    borderRadius: moderateScale(70, 0.3),
    marginLeft: moderateScale(2.5, 0.3),
    marginTop: moderateScale(2.5, 0.3),
  },
});
