import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import CustomImage from './CustomImage';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale} from 'react-native-size-matters';
import CustomText from './CustomText';
import Color from '../Assets/Utilities/Color';
import {Icon} from 'native-base';
import FontAwesone5 from 'react-native-vector-icons/FontAwesome5';
import CustomButton from './CustomButton';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import navigationService from '../navigationService';

const CompletedOrderCard = ({
  item,
  fromModal,
  selectedItem,
  setSelectedItem,
  setIsVisible,
  isVisible,
  fromSupportScreen,
}) => {
  const navigationService = useNavigation();
  const user = useSelector(state => state.commonReducer.userData);

  const amount = () => {
    let totalAmount = 0;
    item?.booking_detail?.map(data => {
      totalAmount += data?.service_info?.price;
    });
    // console.log('Total======>>>>>>>>>', totalAmount);
    return totalAmount;
  };

  const calculateTotalAmount = () => {
    const bookingDetail = item?.booking_detail;
    // const amount = item?.booking_detail.reduce((a,b)=> a+b)

    if (!Array.isArray(bookingDetail) || bookingDetail.length === 0) {
      return 0;
    }

    const serviceNames = bookingDetail
      .map(service => service?.service_info?.name)
      .filter(Boolean);

    return serviceNames.join(', ');
  };
  const servicesText = calculateTotalAmount();

  return (
    <TouchableOpacity
      onPress={() => {
        // fromSupportScreen == true &&
        setSelectedItem(item);
        setIsVisible(false);
      }}
      disabled={fromModal == true ? false : true}
      style={styles.mainContainer}>
     {  fromModal == true &&
      <View
        style={[
          styles.statusView,
          {
            backgroundColor:
              item?.status.toLowerCase() == 'reject'
                ? 'rgba(255,0,0,0.6)'
                : item?.status.toLowerCase() == 'accept'
                ? 'rgba(0,255,0,0.6)'
                : item?.status.toLowerCase() == 'complete'
                ? 'rgba(0,255,255,0.6)'
                : 'rgba(233,255,0,0.6)',
          },
        ]}>
        <CustomText isBold style={styles.status}>
          {item?.status}
        </CustomText>
      </View>}
      <View style={styles.imageView}>
        <CustomImage
          onPress={() => {
            // fromSupportScreen == true &&
            setSelectedItem(item);
            setIsVisible(false);
          }}
          style={{
            height: '100%',
            width: '100%',
          }}
          source={require('../Assets/Images/dummyCustomer1.png')}
        />
      </View>
      <View>
        <CustomText isBold style={styles.heading1}>
          {selectedItem?.barber_info?.first_name
            ? selectedItem?.barber_info?.first_name
            : item?.barber_info?.first_name}
        </CustomText>
        <View style={styles.row}>
          <CustomText isBold style={styles.heading}>
            Date :
          </CustomText>
          <CustomText style={styles.Text}>
            {selectedItem?.booking_date
              ? selectedItem?.booking_date
              : item?.booking_date}
            {/* aug 12,2023 */}
          </CustomText>
        </View>
        <View style={styles.row}>
          <CustomText isBold style={styles.heading}>
            Time :
          </CustomText>
          <CustomText style={styles.Text}>
            {selectedItem?.booking_time
              ? selectedItem?.booking_time
              : item?.booking_time}
          </CustomText>
        </View>
        <View style={styles.row}>
          <CustomText isBold style={styles.heading}>
            total Amount :
          </CustomText>
          <CustomText style={styles.Text}>
            {/* 5000 */}
            {amount()}
          </CustomText>
        </View>
        <View style={styles.row}>
          <View style={styles.iconView}>
            <Icon
              style={{
                textAlign: 'center',
              }}
              name="map-marker-alt"
              as={FontAwesone5}
              color={Color.black}
              size={17}
            />
          </View>
          <CustomText
            // isBold
            style={{
              color: Color.white,
              fontSize: moderateScale(12, 0.6),
              paddingHorizontal: moderateScale(5, 0.6),
            }}>
            {selectedItem?.custom_location
              ? selectedItem?.custom_location
              : item?.custom_location}
          </CustomText>
        </View>
      </View>
      <CustomButton
        textColor={Color.white}
        borderWidth={1}
        borderRadius={moderateScale(15, 0.6)}
        borderColor={Color.white}
        width={windowWidth * 0.2}
        height={windowHeight * 0.04}
        text={'details'}
        fontSize={moderateScale(13, 0.3)}
        // onPress={navigationService.navigate('OrderDetails', {item: item})}
        isBold
        marginHorizontal={moderateScale(20, 0.3)}
        marginTop={moderateScale(5, 0.3)}
      />
    </TouchableOpacity>
  );
};

export default CompletedOrderCard;

const styles = StyleSheet.create({
  mainContainer: {
    borderBottomWidth: moderateScale(1, 0.6),
    borderColor: Color.white,
    flexDirection: 'row',
    width: windowWidth * 0.85,
    paddingBottom: moderateScale(10, 0.6),
    marginBottom: moderateScale(15, 0.3),
  },
  row: {
    flexDirection: 'row',
    padding: moderateScale(1, 0.6),
    paddingHorizontal: moderateScale(8, 0.6),
  },
  statusView: {
    position: 'absolute',
    right: 2,
    top: 2,
    paddingHorizontal: moderateScale(6, 0.6),
    paddingVertical: moderateScale(2, 0.6),
    borderRadius: moderateScale(10, 0.6),
  },
  status: {
    textAlign: 'center',
    color: Color.white,
    fontSize: moderateScale(9, 0.6),
  },
  Text: {
    // backgroundColor:'orange',
    marginHorizontal: moderateScale(10, 0.3),
    color: Color.white,
    fontSize: moderateScale(13, 0.6),
    paddingRight: moderateScale(25, 0.6),
  },
  heading: {
    fontSize: moderateScale(12, 0.6),
    color: Color.white,
  },
  heading1: {
    color: Color.white,
    // backgroundColor:'red',
    width: windowWidth * 0.45,
    paddingHorizontal: moderateScale(8, 0.6),
    fontSize: moderateScale(15, 0.6),
  },
  imageView: {
    height: windowHeight * 0.08,
    width: windowHeight * 0.08,
    borderRadius: moderateScale((windowHeight * 0.08) / 2),
    overflow: 'hidden',
    marginVertical: moderateScale(25, 0.3),
  },
  iconView: {
    backgroundColor: Color.white,
    width: windowHeight * 0.03,
    height: windowHeight * 0.03,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale((windowHeight * 0.03) / 2),
    marginHorizontal: moderateScale(5, 0.6),
    // marginTop:moderateScale(1,.6)
  },
});
