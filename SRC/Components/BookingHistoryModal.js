import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {windowHeight, windowWidth} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import CustomText from './CustomText';
import Modal from 'react-native-modal';
import ReviewCard from './ReviewCard';
import {moderateScale} from 'react-native-size-matters';
import CompletedOrderCard from './CompletedOrderCard';
import {Get, Post} from '../Axios/AxiosInterceptorFunction';
import {useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/core';

const BookingHistoryModal = ({
  isVisible,
  setIsVisible,
  selectedItem,
  setSelectedItem,
}) => {
  const isFocused = useIsFocused();
  const [bookingResponse, setBookingResponse] = useState([]);
  console.log('🚀 ~ bookingResponse:', bookingResponse);
  const token = useSelector(state => state.authReducer.token);
  const user = useSelector(state => state.commonReducer.userData);
  // const [bookingList, setBookinglist] = useState([]);
  const [loading, setLoading] = useState(false);

  const GetBooking = async () => {
    const url = `auth/booking/list?status=all`;
    setLoading(true);
    //  return console.log("🚀 ~ GetBooking ~ url:", url)
    const response = await Get(url, token);

    setLoading(false);
    if (response != undefined) {
     
      setBookingResponse(response?.data?.data);
    }
  };

  const barberBooking = async () => {
    const url = `auth/barber/booking/list?status=all`;
    setLoading(true);
    const response = await Get(url, token);
    setLoading(false);
    if (response != undefined) {
      setBookingResponse(response?.data?.barber_booking_list);
    }
  };

  useEffect(() => {
    user?.role == 'customer' ? GetBooking() : barberBooking();
  }, [isFocused]);
  return (
    <Modal
      isVisible={isVisible}
      // swipeDirection="up"
      onBackdropPress={() => {
        setIsVisible(false);
        console.log('here i m ');
      }}>
      {/* <ScrollView contentContainerStyle={{
          paddingBottom:moderateScale(50,.6)
        }}> */}

      <View
        style={{
          backgroundColor: 'rgba(0,0,0,0.9)',
          // backgroundColor:'white',
          width: windowWidth * 0.92,
          // marginTop: moderateScale(10, 0.3),
          borderWidth: 2,
          //  paddingRights:moderateScale(20,.3),
          height: windowHeight * 0.8,
          borderColor: Color.themeColor,
          borderRadius: moderateScale(20, 0.6),
          // alignItems:"center",
          // justifyContent:'center'
        }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          // decelerationRate={'fast'}
          numColumns={1}
         
         
          contentContainerStyle={{
            width: '100%',
            alignItems: 'center',
            paddingTop: moderateScale(20, 0.6),
            // justifyContent: 'space-between',
            paddingBottom: moderateScale(100, 0.6),
            // paddingHorizontal: moderateScale(8, 0.3),
          }}
          data={bookingResponse}
          renderItem={({item, index}) => {
          return (
              <CompletedOrderCard
                item={item}
                fromModal={true}
                setSelectedItem={setSelectedItem}
                selectedItem={selectedItem}
                isVisible={isVisible}
                setIsVisible={setIsVisible}
              />
            );
          }}
        />
      </View>
      {/* </ScrollView> */}
    </Modal>
  );
};

export default BookingHistoryModal;

const styles = StyleSheet.create({});
