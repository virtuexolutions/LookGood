import React, {useState} from 'react';
import {ImageBackground, View, ScrollView, FlatList} from 'react-native';
import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import ScreenBoiler from '../Components/ScreenBoiler';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment/moment';
import OrderCard from '../Components/OrderCard';
import CustomImage from '../Components/CustomImage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import numeral from 'numeral';
import {Icon} from 'native-base';
import CustomButton from '../Components/CustomButton';

const OrderDetails = props => {
  const item = props?.route?.params?.item;
  console.log('🚀 ~ file: OrderDetails.js:19 ~ OrderDetails ~ item:', item);

  const calculateTotalAmount = () => {
    console.log('Booking Details:', item?.booking_detail);

    const totalAmount = item?.booking_detail?.reduce((sum, booking) => {
      const bookingTotal =
        booking?.service_info?.price !== undefined
          ? parseFloat(booking?.service_info?.price)
          : 0;

      return sum + bookingTotal;
    }, 0);

    console.log('Total Amount:', totalAmount);

    return numeral(totalAmount).format('$0,0.0');
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
        <CustomText isBold style={styles.text1}>
          Orders Details
        </CustomText>
        <View style={styles.containerCard}>
          <CustomImage
            source={{
              uri: item?.barber_info?.photo
                ? item?.barber_info?.photo
                : item?.member_info?.photo,
            }}
            style={styles.image}
          />
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
            <CustomText isBold numberOfLines={1} style={styles.name}>
              {item?.barber_info?.first_name
                ? item?.barber_info?.first_name
                : item?.member_info?.first_name}
            </CustomText>
            <View style={[styles.eachRow, {marginTop: moderateScale(30, 0.3)}]}>
              <CustomText
                isBold
                style={{
                  // width: windowWidth * 0.16,
                  fontSize: moderateScale(14, 0.3),
                  // backgroundColor : 'red'
                }}>
                Date :{' '}
              </CustomText>
              <CustomText style={styles.heading}>
                {item?.booking_date}
              </CustomText>
            </View>
            <View style={styles.eachRow}>
              <CustomText
                isBold
                style={{
                  // width: windowWidth * 0.16,
                  fontSize: moderateScale(14, 0.3),
                }}>
                time :{' '}
              </CustomText>
              <CustomText style={styles.heading}>
                {item?.booking_time}
              </CustomText>
            </View>
            <View style={styles.eachRow}>
              <CustomText
                isBold
                style={{
                  // width: windowWidth * 0.16,
                  fontSize: moderateScale(14, 0.3),
                }}>
                Amount :{' '}
              </CustomText>
              <CustomText style={styles.heading}>
                {numeral(calculateTotalAmount()).format('$0,0.0')}
              </CustomText>
            </View>

            <CustomText
              isBold
              style={{
                marginTop: moderateScale(20, 0.3),
                width: windowWidth * 0.7,
                // width: windowWidth * 0.16,
                fontSize: moderateScale(14, 0.3),
              }}>
              Services Chose :{' '}
            </CustomText>
            {Array.isArray(item?.booking_detail) &&
            item.booking_detail.length > 0 ? (
              item.booking_detail.map(booking => {
                console.log('Booking Details:', booking);
                return (
                  <View
                    key={booking.id}
                    style={{
                      width: windowWidth * 0.7,
                      flexDirection: 'row',
                      paddingVertical: moderateScale(5, 0.3),
                      alignItems: 'center',
                    }}>
                    <Icon
                      name="dot-circle-o"
                      as={FontAwesome}
                      size={moderateScale(14, 0.3)}
                      color={Color.themeColor}
                    />
                    {booking.service_info && (
                      <CustomText
                        style={{
                          marginLeft: moderateScale(5, 0.3),
                          color: Color.black,
                        }}>
                        {booking.service_info.name}
                      </CustomText>
                    )}
                  </View>
                );
              })
            ) : (
              <CustomText style={{color: 'red'}}>No services chosen</CustomText>
            )}
            <CustomImage
              source={require('../Assets/Images/map.png')}
              style={styles.mapView}
            />
            <CustomButton
              bgColor={Color.themeColor}
              borderColor={'white'}
              borderWidth={1}
              textColor={Color.black}
              onPress={() => {
                console.log('Sign up will happen');
              }}
              width={windowWidth * 0.75}
              height={windowHeight * 0.06}
              text={'Accept'}
              fontSize={moderateScale(14, 0.3)}
              textTransform={'uppercase'}
              isGradient={true}
              isBold
              marginTop={moderateScale(30, 0.3)}
            />
            <CustomButton
              bgColor={Color.themeColor}
              borderColor={'white'}
              borderWidth={1}
              textColor={Color.black}
              onPress={() => {
                console.log('Will reject Appointment');
              }}
              width={windowWidth * 0.75}
              height={windowHeight * 0.06}
              text={'Reject'}
              fontSize={moderateScale(14, 0.3)}
              textTransform={'uppercase'}
              isGradient={true}
              isBold
              marginTop={moderateScale(10, 0.3)}
            />
          </ScrollView>
        </View>
      </LinearGradient>
    </ScreenBoiler>
  );
};

export default OrderDetails;

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
  containerCard: {
    marginTop: windowHeight * 0.08,
    width: windowWidth * 0.9,
    height: windowHeight * 0.73,
    backgroundColor: Color.white,
    borderRadius: moderateScale(20, 0.3),
    alignItems: 'center',
  },
  image: {
    width: moderateScale(100, 0.3),
    height: moderateScale(100, 0.3),
    borderRadius: moderateScale(50, 0.3),
    overflow: 'hidden',
    marginTop: moderateScale(-50, 0.3),
  },
  name: {
    marginTop: moderateScale(5, 0.3),
    fontSize: moderateScale(20, 0.3),
    // marginLeft: moderateScale(3, 0.3),
    // width: '70%',
    // backgroundColor : 'red',
  },
  eachRow: {
    flexDirection: 'row',
    width: '70%',
    // backgroundColor : 'red',
    // marginTop : moderateScale(5,0.3),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heading: {
    fontSize: moderateScale(13, 0.3),
    // marginLeft: moderateScale(5, 0.3),
    // fontStyle : 'normal'
  },
  mapView: {
    width: windowWidth * 0.7,
    height: windowHeight * 0.2,
  },
});
