import React, {useState, useEffect} from 'react';
import {
  ImageBackground,
  View,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import ScreenBoiler from '../Components/ScreenBoiler';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment/moment';
import OrderCard from '../Components/OrderCard';
import DropDownSingleSelect from '../Components/DropDownSingleSelect';
import {Get} from '../Axios/AxiosInterceptorFunction';
import {useSelector} from 'react-redux';
import NoData from '../Components/NoData';

const MyBookings = () => {
  const user =useSelector(state => state.commonReducer.userData)
  console.log("🚀 ~ `fil`e: MyBookings.js:24 ~ MyBookings ~ user:", user)
  const [item, setItem] = useState('');
  // console.log("🚀 ~ file: MyBookings.js:24 ~ MyBookings ~ item:", item)
  const [Loading, setLoading] = useState(false);
  const [bookingResponse, setBookingResponse] = useState([]);
  console.log(
    '🚀 ~ file: MyBookings.js:19 ~ MyBookings ~ bookingResponse:',
    bookingResponse,
  );

  const token = useSelector(state => state.authReducer.token);

  // Booking GET API START
  const GetBooking = async () => {
    
    const url = `auth/booking/list`;
    setLoading(true);
    const response = await Get(url, token);

    setLoading(false);
    if (response != undefined) {
      console.log(
        '🚀 ~ file: AddService.js:35 ~ GetServices ~ response:3333330000PARTY',
        response?.data,
      );
      setBookingResponse(response?.data?.data);
    }
  };

  const barberBooking =async () => {
const url ='auth/barber/booking/list'
setLoading(true)
const response=await Get(url,token)
setLoading(false)
if(response!=undefined){
setBookingResponse(response?.data?.data)
  }
}

  useEffect(() => {
  user?.role == 'customer' ?  GetBooking() : barberBooking()
  
    
  }, []);

  // const orderArray = [
  //   {
  //     image: require('../Assets/Images/dummyCustomer1.png'),
  //     name: 'Lorraine Lebrun',
  //     date: moment().format('ll'),
  //     time: moment().format('hh : mm A'),
  //     amount: 1000,
  //     address: '13th Street. 47 W 13th St, New York,',
  //     services: [
  //       'Blow dry with curling and striaght iron',
  //       'Blow dry',
  //       'Hair cut with Blow dry',
  //       'Mens haircut',
  //       'Gloss',
  //       'Gel Polist',
  //       'Meni pedi',
  //       'nail cutting',
  //       'pink and white fill',
  //     ],
  //   },
  //   {
  //     image: require('../Assets/Images/dummyCustomer2.png'),
  //     name: 'Benjamin Evalent',
  //     date: moment().format('ll'),
  //     time: moment().format('hh : mm A'),
  //     amount: 1000,
  //     address: '13th Street. 47 W 13th St, New York,',
  //     services: [
  //       'Blow dry with curling and striaght iron',
  //       'Blow dry',
  //       'Hair cut with Blow dry',
  //       'Mens haircut',
  //       'Gloss',
  //       'Gel Polist',
  //       'Meni pedi',
  //       'nail cutting',
  //       'pink and white fill',
  //     ],
  //   },
  //   {
  //     image: require('../Assets/Images/dummyCustomer3.png'),
  //     name: 'Jay cuttler',
  //     date: moment().format('ll'),
  //     time: moment().format('hh : mm A'),
  //     amount: 1000,
  //     address: '13th Street. 47 W 13th St, New York,',
  //     services: [
  //       'Blow dry with curling and striaght iron',
  //       'Blow dry',
  //       'Hair cut with Blow dry',
  //       'Mens haircut',
  //       'Gloss',
  //       'Gel Polist',
  //       'Meni pedi',
  //       'nail cutting',
  //       'pink and white fill',
  //     ],
  //   },
  //   {
  //     image: require('../Assets/Images/dummyCustomer4.png'),
  //     name: 'mark joe',
  //     date: moment().format('ll'),
  //     time: moment().format('hh : mm A'),
  //     amount: 1000,
  //     address: '13th Street. 47 W 13th St, New York,',
  //     services: [
  //       'Blow dry with curling and striaght iron',
  //       'Blow dry',
  //       'Hair cut with Blow dry',
  //       'Mens haircut',
  //       'Gloss',
  //       'Gel Polist',
  //       'Meni pedi',
  //       'nail cutting',
  //       'pink and white fill',
  //     ],
  //   },
  //   {
  //     image: require('../Assets/Images/dummyCustomer1.png'),
  //     name: 'Danjay joesph',
  //     date: moment().format('ll'),
  //     time: moment().format('hh : mm A'),
  //     amount: 1000,
  //     address: '13th Street. 47 W 13th St, New York,',
  //     services: [
  //       'Blow dry with curling and striaght iron',
  //       'Blow dry',
  //       'Hair cut with Blow dry',
  //       'Mens haircut',
  //       'Gloss',
  //       'Gel Polist',
  //       'Meni pedi',
  //       'nail cutting',
  //       'pink and white fill',
  //     ],
  //   },
  // ];
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
        <CustomText isBold style={styles.text1}>
          My Bookings
        </CustomText>

        <DropDownSingleSelect
          array={['Completed', 'Upcoming', 'Pending']}
          backgroundColor={Color.white}
          item={item}
          setItem={setItem}
          placeholder={'Choose any category'}
          width={windowWidth * 0.95}
          dropdownStyle={{
            // backgroundColor : 'red',
            width: windowWidth * 0.95,
            borderBottomWidth: 0,
            marginTop: moderateScale(30, 0.3),
          }}
        />

        {Loading ? (
          <View
            style={{
              width: windowWidth * 0.8,
              height: windowHeight * 0.7,
              justifyContent: 'center',
            }}>
            <ActivityIndicator size={'large'} color={Color.themeColor} />
          </View>
        ) : (
          <FlatList
            decelerationRate={'fast'}
            showsVerticalScrollIndicator={false}
            style={{
              marginTop: moderateScale(10, 0.3),
            }}
            contentContainerStyle={{
              paddingHorizontal: moderateScale(8, 0.3),
              paddingBottom: moderateScale(30, 0.3),
            }}
            data={bookingResponse}
            numColumns={2}
            ListEmptyComponent={()=>{
              return(<NoData
                style={{
                  height: windowHeight * 0.25,
                  width: windowWidth * 0.6,
                  alignItems: 'center',
                  // backgroundColor:'red'
                }}
                text={'No Booking yet'}
              />)
            }}
            renderItem={({item, index}) => {
              return <OrderCard item={item} />;
            }}
          />
        )}
      </LinearGradient>
    </ScreenBoiler>
  );
};

export default MyBookings;

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
