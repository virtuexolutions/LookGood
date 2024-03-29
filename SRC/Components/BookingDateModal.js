// import { View, Text } from 'react-native'
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  ToastAndroid,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Switch,
  Platform,
} from 'react-native';
import CustomText from './CustomText';
import SelectDropdown from 'react-native-select-dropdown';
import CustomButton from './CustomButton';
import TextInputWithTitle from './TextInputWithTitle';

import {Icon} from 'native-base';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale} from 'react-native-size-matters';
import DropDownSingleSelect from './DropDownSingleSelect';
import Color from '../Assets/Utilities/Color';
import RNCalendarEvents from 'react-native-calendar-events';
import moment, {locale} from 'moment';

const BookingDateModal = ({
  modalIsVisible,
  setModalIsVisible,
  data,
  bookingDate,
  bookingStartTime,
  endingTime,
}) => {
  function CloseModal() {
    setModalIsVisible(false);
  }
  const eventResourceArray = [];
  const [timeType, setTimeType] = useState('start time');
  const [timePickerModalVisible, setTimePickerModalVisible] = useState(false);
  const [calendarsInDevice, setCalendarsInDevice] = useState(null);
  const [startTime, setStartTime] = useState(null);
  console.log('🚀 ~ startTime:', startTime);
  console.log(
    '🚀 ~ startTime:',
    `${new Date(startTime).toISOString()}`,
    new Date(bookingDate),
  );
  const [endTime, setEndTime] = useState(null);
  console.log('🚀 ~ endTime:', `${new Date(endTime).toISOString()}`);
  const [eventName, setEventName] = useState('');

  const checkCalendarPermission = async () => {
    const result = await RNCalendarEvents.checkPermissions((readOnly = false));
    if (result != 'authorized') {
      const askPermission = await RNCalendarEvents.requestPermissions(
        (readOnly = false),
      );
      console.log(
        '🚀 ~ checkCalendarPermission ~ askPermission:',
        askPermission,
      );
      if (askPermission == 'authorized') {
        Platform.OS == 'android'
          ? ToastAndroid.show('Calander access granted', ToastAndroid.SHORT)
          : alert('Calander access granted');
        const CalendersAvailble = await RNCalendarEvents.findCalendars();
        console.log(
          '🚀 ~ checkCalendarPermission ~ CalendersAvailble:',
          CalendersAvailble,
        );
        setCalendarsInDevice(CalendersAvailble);
      }
    } else {
      const CalendersAvailble = await RNCalendarEvents.findCalendars();
      // console.log("🚀 ~ checkCalendarPermission ~ CalendersAvailble:", CalendersAvailble)
      setCalendarsInDevice(CalendersAvailble);
    }
  };

  const saveEvent = async () => {
    try {
      const body = {
        eventName: eventName,
        startTime: startTime,
        endTime: endTime,
      };
      for (let key in body) {
        if ([null, undefined, ''].includes(body[key])) {
          return Platform.OS == 'android'
            ? ToastAndroid.show('Required field is empty', ToastAndroid.SHORT)
            : alert('Required field is empty');
        }
      }

      const response = await RNCalendarEvents.saveEvent(eventName, {
        // calendarId: '4',
        startDate: `${new Date(startTime).toISOString()}`,
        endDate: `${new Date(endTime).toISOString()}`,
        // startDate : '2024-04-25T10:26:00.000Z',
        // endDate :   '2024-04-25T13:29:00.000Z'
      });
      if (response != undefined) {
        console.log('🚀 ~ saveEvent ~ response:', response);
        Platform.OS == 'android'
          ? ToastAndroid.show(
              'Event Saved in device calendar',
              ToastAndroid.SHORT,
            )
          : alert('Event Saved in device calendar');
      }
    } catch (error) {
      console.log('🚀 ~ saveEvent ~ error:', error);
    }
  };
  // const fetchEvent = async()=>{
  //   try {
  //     const result = await RNCalendarEvents.findEventById('197');
  //     console.log("🚀 ~ fetchEvent ~ result:", result)
  //   } catch (error) {
  //     console.log("🚀 ~ fetchEvent ~ error:", error)

  //   }
  // }

  useEffect(() => {
    checkCalendarPermission();
  }, []);

  return (
    <>
      <Modal
        isVisible={modalIsVisible}
        hasBackdrop={true}
        onBackdropPress={CloseModal}>
        <View style={styles.modal}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={CloseModal}>
              <Icon name="arrowleft" size={28} as={AntDesign} />
            </TouchableOpacity>
            <View
              style={{
                width: windowWidth * 0.65,
              }}>
              <CustomText
                style={{
                  color: Color.white,
                  fontSize: moderateScale(16, 0.2),
                  textAlign: 'center',
                  // fontWeight: 'bold',
                }}>
                Add New Event
              </CustomText>
            </View>
          </View>
          <View style={styles.eventInfo}>
            <CustomText isBold>information Event</CustomText>
            <View style={styles.eventForm}>
              <TextInputWithTitle
                viewHeight={0.055}
                viewWidth={0.8}
                inputWidth={0.8}
                placeholder="Event Name"
                placeholderColor={'grey'}
                border={1}
                setText={setEventName}
                value={eventName}
                borderColor={'#A7A7A7'}
                backgroundColor={'#FFFFFF'}
              />
              <View
                style={{
                  marginTop: moderateScale(11, 0.2),
                  width: windowWidth * 0.8,
                  height: windowHeight * 0.055,
                  borderColor: 'grey',
                  borderWidth: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: moderateScale(12, 0.2),
                  justifyContent: 'space-between',
                  borderRadius: moderateScale(9, 0.3),
                }}>
                <CustomText>
                  {bookingDate ? bookingDate.toString() : 'Date'}
                </CustomText>
                <Icon
                  as={MaterialCommunityIcons}
                  name="calendar"
                  size={moderateScale(24, 0.3)}
                />
              </View>

              <View style={styles.dateContainer}>
                <TouchableOpacity
                  onPress={() => {
                    setTimeType('start time');
                    setTimePickerModalVisible(true);
                  }}
                  style={{
                    // marginTop: moderateScale(, 0.2),
                    width: windowWidth * 0.38,
                    height: windowHeight * 0.05,
                    borderColor: 'grey',
                    borderWidth: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginRight: moderateScale(11, 0.2),
                    paddingHorizontal: moderateScale(12, 0.2),
                    justifyContent: 'space-between',
                    borderRadius: moderateScale(9, 0.3),
                  }}>
                  <CustomText>
                    {moment(startTime).format('hh:mm:ss a')}
                  </CustomText>

                  <Icon
                    as={MaterialCommunityIcons}
                    name="clock"
                    size={moderateScale(24, 0.3)}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setTimeType('end time');
                    setTimePickerModalVisible(true);
                  }}
                  style={{
                    // marginTop: moderateScale(, 0.2),
                    width: windowWidth * 0.38,
                    height: windowHeight * 0.05,
                    borderColor: 'grey',
                    borderWidth: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: moderateScale(12, 0.2),
                    justifyContent: 'space-between',
                    borderRadius: moderateScale(9, 0.3),
                  }}>
                  <CustomText>
                    {moment(endTime).format('hh:mm:ss a')}
                  </CustomText>

                  <Icon
                    as={MaterialCommunityIcons}
                    name="clock"
                    size={moderateScale(24, 0.3)}
                  />
                </TouchableOpacity>
              </View>
              {/* <View style={styles.dropdownContainer}>
                <DropDownSingleSelect
                  array={eventResourceArray}
                  width={windowWidth * 0.8}
                  extreme={true}
                  placeholder={'Select Calendar to post event'}
                />
              </View> */}

              <TextInputWithTitle
                viewHeight={0.12}
                viewWidth={0.8}
                inputWidth={0.8}
                placeholder="Type Your Notes Here....."
                placeholderColor={'grey'}
                border={1}
                setText={() => {}}
                rightIcon={true}
                numberOfLines={3}
                iconName={'clock'}
                iconType={Entypo}
                multiline
                marginTop={moderateScale(20, 0.4)}
                borderColor={'#A7A7A7'}
                backgroundColor={'#FFFFFF'}
              />

              <CustomButton
                bgColor={Color.themeColor}
                text="Create EVent"
                width={windowWidth * 0.7}
                height={windowHeight * 0.06}
                textColor="white"
                borderRadius={moderateScale(12, 0.1)}
                marginTop={moderateScale(12, 0.2)}
                onPress={() => {
                  saveEvent();
                }}
              />
              {/* <CustomButton
                bgColor={Color.themeColor}
                text="fetch EVent"
                width={windowWidth * 0.7}
                height={windowHeight * 0.06}
                textColor="white"
                borderRadius={moderateScale(12, 0.1)}
                marginTop={moderateScale(12, 0.2)}
                onPress={() => {
                  fetchEvent()
                }}
              /> */}
            </View>
          </View>
        </View>
      </Modal>

      <DateTimePickerModal
        date={new Date(bookingDate)}
        timeZoneName="short"
        isVisible={timePickerModalVisible}
        mode="time"
        onConfirm={time => {
          console.log('🚀 ~ time:', time);
          setTimePickerModalVisible(false);
          timeType == 'start time' ? setStartTime(time) : setEndTime(time);
        }}
        onCancel={() => {
          setTimePickerModalVisible(false);
        }}
      />
    </>
  );
};

export default BookingDateModal;

const styles = StyleSheet.create({
  modal: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.8,
    backgroundColor: 'white',
    overflow: 'hidden',
    borderRadius: moderateScale(20, 0.5),
  },
  modalHeader: {
    backgroundColor: 'white',
    borderBottomColor: 'grey',
    borderBottomWidth: 0.9,
    height: windowHeight * 0.08,
    // justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(19, 0.8),
  },
  eventForm: {
    width: windowWidth * 0.88,
    height: windowHeight * 0.8,
    paddingHorizontal: moderateScale(12, 0.3),
    paddingVertical: moderateScale(12, 0.3),
  },

  eventInfo: {
    paddingHorizontal: moderateScale(11, 0.2),
    paddingTop: moderateScale(12, 0.2),
  },

  dropdownContainer: {
    flexDirection: 'row',
  },
  dropdownButtonStyle: {
    width: windowWidth * 0.38,
    height: windowHeight * 0.06,
    backgroundColor: 'white',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 7,
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    // flex: 1,
    fontSize: moderateScale(15, 0.4),
    // fontWeight: '500',
    color: '#151E26',
  },
  dropdownButtonArrowStyle: {
    textAlign: 'center',
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: 'white',
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    height: windowHeight * 0.08,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownItemTxtStyle: {
    fontSize: 18,
    color: 'black',
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },

  dateContainer: {
    width: windowWidth * 0.77,
    // height: windowHeight * 0.,

    flexDirection: 'row',
    marginVertical: moderateScale(11, 0.4),
    gap: moderateScale(12, 0.3),
  },
  dropdownOverlay: {
    borderColor: 'grey',
    borderWidth: 0.6,
    borderRadius: moderateScale(9, 0.2),
    height: windowHeight * 0.05,
  },
});
