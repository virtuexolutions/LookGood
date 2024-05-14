import React, {useEffect, useRef, useState} from 'react';
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
  PermissionsAndroid,
} from 'react-native';
import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';
import CustomImage from '../Components/CustomImage';
import {
  apiHeader,
  requestCameraPermission,
  windowHeight,
  windowWidth,
} from '../Utillity/utils';
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
import {Get, Post} from '../Axios/AxiosInterceptorFunction';
import {useSelector} from 'react-redux';
import ReviewCard from '../Components/ReviewCard';
import ShowReview from '../Components/ShowReview';
import Entypo from 'react-native-vector-icons/Entypo';
import ImagePickerModal from '../Components/ImagePickerModal';
import Video from 'react-native-video';
import {launchCamera} from 'react-native-image-picker';
import { err } from 'react-native-svg/lib/typescript/xml';

const BarberServicesScreen = props => {
  const userData = useSelector(state => state.commonReducer.userData);
  const userWallet = useSelector(state => state.commonReducer.userWallet);
  // console.log('🚀 ~ WalletScreen ~ userWallet:', userWallet);
  const token = useSelector(state => state.authReducer.token);
  const [selectedService, setSelectedService] = useState([]);
  const [barberDetails, setBarberDetails] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [video, setVideo] = useState({});
  console.log('🚀 ~ BarberServicesScreen ~ video:', video);
  const [videos, setVideos] = useState([]);
  const [modal, setModal] = useState(false);
  const [totalPrice, settotalPrice] = useState(0);
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [fileObject, setFileObject] = useState();
  const detail = props?.route?.params?.detail;
  console.log('🚀 ~ BarberServicesScreen ~ detail:', detail);
  const fromConsultationVideo = props?.route?.params?.fromConsultationVideo;
  console.log(
    '🚀 ~ BarberServicesScreen ~ fromConsultationVideo:',
    fromConsultationVideo,
  );
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

  // useEffect(() => {
  //   if (selectedService?.length > 0) {
  //     let t_Price = 0;
  //     selectedService?.map((item, index) => (t_Price += item?.price));
  //     console.log(t_Price, userWallet?.amount);
  //     settotalPrice(t_Price);
  //     if (t_Price > userWallet?.amount) {
  //       Alert.alert('Insufficient credits', 'please buy some and try again', [
  //         {
  //           text: 'Cancel',
  //           style: 'cancel',
  //         },
  //         {
  //           text: 'Buy coins',
  //           onPress: () => {
  //             navigationService.navigate('Purchase');
  //           },
  //         },
  //       ]);
  //     }
  //   }
  // }, [selectedService]);

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

  const openCamera = async () => {
    let options = {
      mediaType: 'video',
      maxWidth: 500,
      maxHeight: 500,
      quailty: 0.9,
      saveToPhotos: true,
    };
    if (Platform.OS === 'android') {
      if (PermissionsAndroid.PERMISSIONS.CAMERA) {
      } else {
        await requestCameraPermission();
      }
    }
    launchCamera(options, response => {
      // console.log('Response from camera =====>', response);
      // // console.log('URI: ', response.uri);
      try{

      
  
          if (Platform.OS == 'ios') {
            setShow(false);
          } else if (response?.assets && response?.assets[0]?.duration > 15) {
            alert('Video is too long you can post  maximum video of 15 seconds');
          }
          // if (response.didCancel) {
          // } else if (response.error) {
          // }
          // else if (response.customButton) {
          //   Alert.alert(response.customButton);
          // }
          else {
            if (response == undefined) {
              console.log('repose undefined');
            } else {
              if (response == undefined) {
                console.log('response is undefiend');
              } else {
                consultancyVideo({
                  uri: response?.assets[0]?.uri,
                  type: response?.assets[0]?.type,
                  name: response?.assets[0]?.fileName,
                });
              }
            }
          }
        
      }catch (error){
        console.log('response is undefined=================>' ,error)

      }
    });
  };





  // const consultancyVideo = async (videoObject) => {
  //   const formData = new FormData();
  //   const url = 'auth/video';
  //   setLoading(true);
  //   const body ={
  //     video :videoObject,
  //     berber_id :detail?.id
  //   }
  //  ]
  //   console.log("🚀 ~ consultancyVideo ~ body:", body)
  //   formData.append('body',body);
  //   console.log("🚀 ~ consultancyVideo ~ formData:", formData)
  //   const response = await Post(url,  formData ,apiHeader(token));
  //   // console.log("🚀 ~ consultancyVideo ~ formData:", )
  //   setLoading(false);
  //   if (response != undefined) {
  //     console.log('🚀 ~ consultancyVideo ~ response:', JSON.stringify(response?.data,null,2));
  //   }
  // };

  const consultancyVideo = async videoObject => {
    const formData = new FormData();
    const url = 'auth/video';
    setLoading(true);
    const body = {
      video: videoObject,
      barber_id: detail?.id,
    };
    formData.append('video', body.video);
    formData.append('barber_id', String(body.barber_id));
    const response = await Post(url, formData, apiHeader(token));
    setLoading(false);
    if (response != undefined) {
      console.log(
        '🚀  consultancyVideo  response:',
        JSON.stringify(response?.data, null, 2),
      );
    }
  };

  // useEffect(() => {
  //   if (Object.keys(video).length > 0) {
  //     setVideos(prev => [...prev, video]);
  //     setVideo({});
  //   }
  // }, [video]);

  useEffect(() => {
    // consultancyVideo()
  }, []);

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
                startingValue={
                  detail?.reviews_avg_rating ? detail?.reviews_avg_rating : 0
                }
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
            data={barberDetails?.questions_ans}
            style={{
              width: windowWidth * 0.95,
            }}
            contentContainerStyle={{
              padding: moderateScale(10, 0.6),
            }}
            renderItem={({item, index}) => {
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
                    {item?.name.split('Do u have ')}
                    {/* {barberDetails?.questions_ans[0]?.answer?.answer.toLowerCase() ==
                    'yes'
                      ? `${'i have'} ${item}`
                      : `${'i have no'} ${item}`} */}
                  </CustomText>
                  <Icon
                    as={Entypo}
                    name={
                      item?.answer?.answer.toLowerCase() == 'yes'
                        ? 'check'
                        : 'cross'
                    }
                    size={15}
                    color={
                      item?.answer?.answer.toLowerCase() == 'yes'
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
                  {fromConsultationVideo != true && (
                    <CustomButton
                      textColor={Color.black}
                      onPress={() => {
                        openCamera();
                      }}
                      width={windowWidth * 0.75}
                      height={windowHeight * 0.06}
                      text={'Get your consultancy'}
                      fontSize={moderateScale(14, 0.3)}
                      textTransform={'uppercase'}
                      isGradient={true}
                      isBold
                      marginTop={moderateScale(30, 0.3)}
                      borderRadius={moderateScale(35, 0.6)}
                      // disabled={totalPrice > userWallet?.amount}
                    />
                  )}
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
                    marginTop={moderateScale(10, 0.3)}
                    borderRadius={moderateScale(35, 0.6)}
                    disabled={totalPrice > userWallet?.amount}
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
                    disabled={totalPrice > userWallet?.amount}
                  />
                </>
              );
            }}
          />
        )}
        {/* <VideoRecorderModal 
        /> */}
        <ImagePickerModal
          show={showModal}
          setShow={setShowModal}
          setFileObject={setVideo}
          type={'video'}
        />

        <ShowReview
          barberDetails={barberDetails?.review}
          modal={modal}
          setModal={setModal}
        />
      </LinearGradient>
    </ScreenBoiler>
  );
};

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

export default BarberServicesScreen;

const VideoComponent = ({item, videos, setVideos}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <View style={styles.image}>
      <TouchableOpacity
        style={{
          position: 'absolute',
          right: 2,
          top: 2,
          zIndex: 2,
          // backgroundColor: 'green',
        }}
        onPress={() => {
          setVideos(videos.filter(data => data?.uri != item?.uri));
        }}>
        <Icon
          name={'cross'}
          color={Color.black}
          as={Entypo}
          onPress={() => {
            setVideos(videos.filter(data => data?.uri != item?.uri));
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setIsPlaying(!isPlaying);
        }}
        style={{
          position: 'absolute',
          zIndex: 1,
          // backgroundColor:'red',
          width: windowWidth * 0.12,
          height: windowWidth * 0.12,
          justifyContent: 'center',
          alignItems: 'center',
          // backgroundColor: 'green',
          alignSelf: 'center',
        }}>
        {!isPlaying && (
          <Icon
            onPress={() => {
              setIsPlaying(!isPlaying);
            }}
            name={'controller-play'}
            as={Entypo}
            size={10}
            color={'rgba(255,255,255,.9)'}
          />
        )}
      </TouchableOpacity>
      <Video
        // muted
        paused={!isPlaying}
        repeat={true}
        // controls={true}
        source={{uri: item?.uri}}
        // ref={videoRef}
        // onProgress={x => {
        //   console.log(
        //     '🚀 ~ file: VideoController.js:46 ~ VideoController ~ x:',
        //     x,
        //   );
        //   setProgress(x);
        // }}
        // onBuffer={() => console.log('buffering video')}
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: Color.white,
        }}
      />
    </View>
  );
};
