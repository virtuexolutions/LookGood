import React, {useState, useEffect} from 'react';
import {ImageBackground, View, ScrollView, FlatList} from 'react-native';
import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';
import CustomImage from '../Components/CustomImage';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import ScreenBoiler from '../Components/ScreenBoiler';
import LinearGradient from 'react-native-linear-gradient';
import navigationService from '../navigationService';
import moment from 'moment/moment';
import CustomTextWithMask from '../Components/CustomTextWithMask';
import BarberCard from '../Components/BarberCard';
import {useSelector} from 'react-redux';
import OrderCard from '../Components/OrderCard';
import {Get} from '../Axios/AxiosInterceptorFunction';
import NoData from '../Components/NoData';

const Homescreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [barberData, setBarberData] = useState([]);
  const [orderData, setOrderData] = useState([]);
  console.log("🚀 ~ file: Homescreen.js:23 ~ Homescreen ~ orderData:", orderData)
  const user = useSelector(state => state.commonReducer.userData);
  const token = useSelector(state => state.authReducer.token);
  console.log('🚀 ~ file: Homescreen.js:20 ~ Homescreen ~ token:', token);
  console.log('🚀 ~ file: Homescreen.js:19 ~ Homescreen ~ user:', user);
  const [index, setIndex] = useState(0);
  console.log('🚀 ~ file: Homescreen.js:18 ~ Homescreen ~ index', index);

  const BarberList = async () => {
    const url = `auth/barber/list`;
    setIsLoading(true);
    const response = await Get(url, token);
    setIsLoading(false);
    if (response != undefined) {
      console.log(
        '🚀 ~ file: AddService.js:35 ~ GetServices ~ response:333333555',
        response?.data?.users,
      );
      setBarberData(response?.data?.users);
    }
  };

  useEffect(() => {
    BarberList();
  }, []);

  const GetBarberBooking = async () => {
    const url = `auth/barber/booking/list`;
    setLoading(true);
    const response = await Get(url, token);

    setLoading(false);
    if (response != undefined) {
      setOrderData(response?.data?.barber_booking_list);
    }
  };
  // TIME GET API END

  useEffect(() => {
    GetBarberBooking();
  }, []);

  const bannerArray = [
    {
      image: require('../Assets/Images/bannerImage.png'),
      heading: 'Lorraine R. Lebrun',
      description: 'The latest trend Hair Dresser',
    },
    {
      image: require('../Assets/Images/bannerImage1.png'),
      heading: 'Kelli M. Scalf',
      description: 'The latest trend Hair Dresser',
    },
    {
      image: require('../Assets/Images/bannerImage2.png'),
      heading: 'Andrew E. Hall',
      description: 'The latest trend Hair Dresser',
    },
  ];
  const cardArray = [
    {
      image: require('../Assets/Images/barbarDummy1.png'),
      name: 'Daniel M. Bell',
    },
    {
      image: require('../Assets/Images/barbarDummy.png'),
      name: 'Ramon C. Raines',
    },
    {
      image: require('../Assets/Images/barbarDummy1.png'),
      name: 'Daniel M. Bell',
    },
    {
      image: require('../Assets/Images/barbarDummy.png'),
      name: 'Ramon C. Raines',
    },
    {
      image: require('../Assets/Images/barbarDummy1.png'),
      name: 'Daniel M. Bell',
    },
  ];
  const orderArray = [
    {
      image: require('../Assets/Images/dummyCustomer1.png'),
      name: 'Lorraine Lebrun',
      date: moment().format('ll'),
      time: moment().format('hh : mm A'),
      amount: 1000,
      address: '13th Street. 47 W 13th St, New York,',
      services: [
        'Blow dry with curling and striaght iron',
        'Blow dry',
        'Hair cut with Blow dry',
        'Mens haircut',
        'Gloss',
        'Gel Polist',
        'Meni pedi',
        'nail cutting',
        'pink and white fill',
      ],
    },
    {
      image: require('../Assets/Images/dummyCustomer2.png'),
      name: 'Benjamin Evalent',
      date: moment().format('ll'),
      time: moment().format('hh : mm A'),
      amount: 1000,
      address: '13th Street. 47 W 13th St, New York,',
      services: [
        'Blow dry with curling and striaght iron',
        'Blow dry',
        'Hair cut with Blow dry',
        'Mens haircut',
        'Gloss',
        'Gel Polist',
        'Meni pedi',
        'nail cutting',
        'pink and white fill',
      ],
    },
    {
      image: require('../Assets/Images/dummyCustomer3.png'),
      name: 'Jay cuttler',
      date: moment().format('ll'),
      time: moment().format('hh : mm A'),
      amount: 1000,
      address: '13th Street. 47 W 13th St, New York,',
      services: [
        'Blow dry with curling and striaght iron',
        'Blow dry',
        'Hair cut with Blow dry',
        'Mens haircut',
        'Gloss',
        'Gel Polist',
        'Meni pedi',
        'nail cutting',
        'pink and white fill',
      ],
    },
    {
      image: require('../Assets/Images/dummyCustomer4.png'),
      name: 'mark joe',
      date: moment().format('ll'),
      time: moment().format('hh : mm A'),
      amount: 1000,
      address: '13th Street. 47 W 13th St, New York,',
      services: [
        'Blow dry with curling and striaght iron',
        'Blow dry',
        'Hair cut with Blow dry',
        'Mens haircut',
        'Gloss',
        'Gel Polist',
        'Meni pedi',
        'nail cutting',
        'pink and white fill',
      ],
    },
    {
      image: require('../Assets/Images/dummyCustomer1.png'),
      name: 'Danjay joesph',
      date: moment().format('ll'),
      time: moment().format('hh : mm A'),
      amount: 1000,
      address: '13th Street. 47 W 13th St, New York,',
      services: [
        'Blow dry with curling and striaght iron',
        'Blow dry',
        'Hair cut with Blow dry',
        'Mens haircut',
        'Gloss',
        'Gel Polist',
        'Meni pedi',
        'nail cutting',
        'pink and white fill',
      ],
    },
  ];
  return (
    <ScreenBoiler
      showHeader={true}
      showback={true}
      showUser={true}
      statusBarBackgroundColor={Color.black}
      statusBarContentStyle={'light-content'}>
      <LinearGradient
        start={{x: 0.0, y: 0.25}}
        end={{x: 0.5, y: 1.0}}
        colors={Color.themeGradient}
        style={styles.container}>
        {user?.role == 'customer' ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: windowHeight * 0.155,
              // paddingTop : moderateScale(20,0.3),
              alignItems: 'center',
            }}
            style={{
              width: windowWidth,
            }}>
            <CustomText isBold style={styles.text1}>
              New HairStyle Trends
            </CustomText>

            <CustomTextWithMask
              data={`${moment().format('YYYY')}`}
              textStyle={styles.text1}
              isBold
              size={40}
            />
            <FlatList
              style={styles.bannerView}
              data={bannerArray}
              horizontal
              pagingEnabled
              renderItem={({item, index}) => {
                return (
                  <View
                    style={{
                      width: windowWidth * 0.85,
                      height: windowHeight * 0.46,
                    }}>
                    <CustomImage
                      source={item?.photo}
                      resizeMode={'stretch'}
                      style={{
                        width: '100%',
                        height: '100%',
                      }}
                    />
                    {/* <View style={{position : 'absolute' , bottom : 0}}> */}
                    <LinearGradient
                      start={{x: 0, y: 0}}
                      end={{x: 0, y: 1}}
                      colors={['#8A8A8A00', '#000000']}
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        borderRadius: 5,
                        justifyContent: 'flex-end',
                        shadowOffset: {height: 2, width: 0},
                        shadowOpacity: 1,
                        shadowRadius: 4,
                        width: '100%',
                        alignItems: 'center',
                        paddingBottom: moderateScale(20, 0.3),
                        paddingTop: moderateScale(60, 0.3),
                      }}>
                      <CustomTextWithMask
                        data={item?.heading}
                        textStyle={[styles.text1Absolute]}
                        isBold
                        size={20}
                      />
                      <CustomText style={styles.text1Absolute}>
                        {item?.description}
                      </CustomText>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignSelf: 'center',
                          marginTop: moderateScale(10, 0.3),
                        }}>
                        {bannerArray.map((x, index1) => {
                          return (
                            <View
                              style={{
                                width: index1 == index ? 25 : 15,
                                height: 5,
                                backgroundColor:
                                  index1 == index
                                    ? Color.themeColor
                                    : Color.white,
                                marginRight: moderateScale(5, 0.3),
                                borderRadius: moderateScale(5, 0.3),
                              }}></View>
                          );
                        })}
                      </View>
                    </LinearGradient>
                    {/* </View> */}
                  </View>
                );
              }}
              ListEmptyComponent={()=>{
                return(<View>
               <NoData />
                </View>)
              }}
            />

            <CustomText
              isBold
              style={[
                styles.text1,
                {
                  width: windowWidth * 0.85,
                  fontSize: moderateScale(16, 0.3),
                  textAlign: 'left',
                  marginTop: moderateScale(10, 0.3),
                },
              ]}>
              Recommended{' '}
            </CustomText>
            <View
              style={{
                paddingTop: moderateScale(10, 0.3),
                width: windowWidth * 0.85,
                //   backgroundColor : 'red',
                flexDirection: 'row',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                //   paddingHorizontal : moderateScale()
              }}>
              {barberData?.map((x, index) => {
                return (
                  <BarberCard
                    item={x}
                    onPress={() => {
                      navigationService.navigate('BarberServicesScreen', {
                        detail: x,
                      });
                    }}
                  />
                );
              })}
            </View>
          </ScrollView>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: windowHeight * 0.155,
              // paddingTop : moderateScale(20,0.3),
              alignItems: 'center',
            }}
            style={{
              width: windowWidth,
            }}>
            <View
              style={{
                width: windowWidth,
              }}>
              <CustomText isBold style={styles.text1}>
                Welcome
              </CustomText>

              <CustomTextWithMask
                data={user?.name}
                textStyle={[
                  styles.text1,
                  {
                    fontSize: moderateScale(30, 0.3),
                  },
                ]}
                isBold
                size={40}
              />
            </View>
            <View
              style={{
                borderBottomWidth: 1,
                borderColor: Color.themeLightGray,
                width: windowWidth,
                // marginLeft : moderateScale(10,0.3)
              }}
            />
            <View
              style={{
                marginTop: moderateScale(10, 0.3),

                flexDirection: 'row',
                // backgroundColor : 'red',
                justifyContent: 'space-between',
                width: windowWidth * 0.95,
                alignItems: 'center',
              }}>
              <CustomText
                isBold
                style={[
                  {
                    fontSize: moderateScale(15, 0.3),
                    // width: windowWidth,
                    color: Color.white,

                    // marginLeft: moderateScale(10, 0.3),
                  },
                ]}>
                Upcoming Orders
              </CustomText>
              <CustomText
                onPress={() => {
                  navigationService.navigate('UpComingScreen', {data:orderData});
                }}
                style={styles.viewAll}>
                View all
              </CustomText>
            </View>
            <FlatList
              decelerationRate={'fast'}
              showsHorizontalScrollIndicator={false}
              style={{
                marginTop: moderateScale(10, 0.3),
              }}
              contentContainerStyle={{
                paddingHorizontal: moderateScale(8, 0.3),
              }}
              data={orderData}
              horizontal
              renderItem={({item, index}) => {
                return <OrderCard item={item} />;
              }}
              ListEmptyComponent={()=>{
                return(<NoData
                  style={{
                    height: windowHeight * 0.25,
                    width: windowWidth * 0.6,
                    alignItems: 'center',
                  }}
                  text={'No Upcoming Orders'}
                />)
              }}
            />
            <CustomText
              isBold
              style={[
                {
                  fontSize: moderateScale(15, 0.3),
                  width: windowWidth,
                  marginTop: moderateScale(10, 0.3),
                  color: Color.white,

                  marginLeft: moderateScale(10, 0.3),
                },
              ]}>
              New Orders
            </CustomText>
            <FlatList
              decelerationRate={'fast'}
              showsVerticalScrollIndicator={false}
              style={{
                marginTop: moderateScale(10, 0.3),
              }}
              contentContainerStyle={{
                paddingHorizontal: moderateScale(8, 0.3),
              }}
              data={orderData}
              numColumns={2}
              renderItem={({item, index}) => {
                return <OrderCard item={item} />;
              }}
              ListEmptyComponent={()=>{
                return(<NoData
                  style={{
                    height: windowHeight * 0.25,
                    width: windowWidth * 0.6,
                    alignItems: 'center',
                  }}
                  text={'No new orders'}
                />)
              }}
            />
          </ScrollView>
        )}
      </LinearGradient>
    </ScreenBoiler>
  );
};

export default Homescreen;

const styles = ScaledSheet.create({
  container: {
    paddingTop: windowHeight * 0.03,
    // justifyContent: "center",
    height: windowHeight * 0.9,
    width: windowWidth,
    alignItems: 'center',
    // backgroundColor : Color.green
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
    // position : 'absolute',
    // bottom : moderateScale(10,0.3),
    // marginTop : moderateScale(10,0.3),
    // lineHeight: moderateScale(32, 0.3),
  },
  bannerView: {
    width: windowWidth * 0.85,
    height: windowHeight * 0.46,
    backgroundColor: 'black',
    marginTop: moderateScale(10, 0.3),
  },
  viewAll: {
    color: Color.white,
    fontSize: moderateScale(12, 0.3),
  },
});
