import React, {useState} from 'react';
import {
  ImageBackground,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import ScreenBoiler from '../Components/ScreenBoiler';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from '../Components/CustomButton';
import moment from 'moment/moment';
import CustomTextWithMask from '../Components/CustomTextWithMask';
import {Calendar} from 'react-native-calendars';
import navigationService from '../navigationService';
import DropDownSingleSelect from '../Components/DropDownSingleSelect';
const ChooseDate = props => {
  const selectedServices = props?.route.params?.data;
  console.log("🚀 ~ file: ChooseDate.js:24 ~ ChooseDate ~ selectedServices:", selectedServices)
  const image = props?.route?.params?.image
  console.log("🚀 ~ file: ChooseDate.js:25 ~ ChooseDate ~ image:", image)
  const [date, setDate] = useState('');
  const [selectedTiming, setSelectedTiming] = useState('9:00');

  const timingArray = ['9:00', '1:00', '11:00', '12:00', '13:00'];
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
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: windowHeight * 0.1,
            // paddingTop : moderateScale(20,0.3),
            alignItems: 'center',
          }}
          style={{
            width: windowWidth,
          }}>
          <CustomText isBold style={styles.text1}>
            schedule barber
          </CustomText>

          <CustomTextWithMask
            data={`${moment().format('MMMM YYYY')}`}
            textStyle={styles.text1}
            isBold
            size={40}
          />
          <Calendar
            style={{
              width: windowWidth * 0.9,
            }}
            minDate={moment().format()}
            markingType={'period'}
            onDayPress={day => {
              setDate(day?.dateString);
            }}
            theme={{
              calendarBackground: 'transparent',
              textSectionTitleColor: Color.themeColor,
              textSectionTitleDisabledColor: '#d9e1e8',
              selectedDayBackgroundColor: Color.themeColor,
              selectedDayTextColor: Color.themeColor,
              todayTextColor: Color.themeColor,
              dayTextColor: 'rgba(255, 255, 255, 1)',
              textDisabledColor: '#d9e1e8',
              arrowColor: Color.themeColor,
              disabledArrowColor: '#d9e1e8',
              monthTextColor: Color.themeColor,
              indicatorColor: Color.themeColor,
              textMonthFontWeight: 'bold',
              textDayHeaderFontWeight: 'bold',
              textDayFontSize: moderateScale(16, 0.3),
              textMonthFontSize: moderateScale(16, 0.3),
              textDayHeaderFontSize: moderateScale(16, 0.3),
            
            }}
            markedDates={{
              ...{
                [date]: {
                  selected: true,
                  color: Color.themeColor,
                  textColor: '#000000',
                  marked: true,
                },
              },
            }}
          />
          
          <CustomTextWithMask
            data={`Time`}
            textStyle={{
              fontSize: moderateScale(13, 0.3),
              marginTop: moderateScale(10, 0.3),
              marginLeft: windowWidth * 0.1,
            }}
            isBold
            size={30}
          />

          <View style={styles.timingView}>
            {timingArray.map((item, index) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => {
                    setSelectedTiming(item);
                  }}>
                  <LinearGradient
                    style={{
                      flexDirection: 'row',
                      width: windowWidth * 0.35,
                      height: windowHeight * 0.07,
                      alignItems: 'center',
                      justifyContent: 'center',
                      //   marginRight: index % 2 == 0 ? moderateScale(0,0.3) : moderateScale(20, 0.3),
                      marginBottom: moderateScale(10, 0.3),
                      borderRadius: moderateScale(5, 0.3),
                      // borderRadius: moderateScale(30, 0.3),
                    }}
                    start={{x: 0.2, y: 0.6}}
                    end={{x: 1, y: 0}}
                    colors={
                      item == selectedTiming
                        ? Color.btnColor
                        : ['#000', 'rgba(41, 44, 53, 1)', '#000']
                    }>
                    <CustomText
                      isBold
                      style={{
                        fontSize: moderateScale(11, 0.3),
                        color:
                          item == selectedTiming ? Color.black : Color.white,
                      }}>
                      {item}
                    </CustomText>
                  </LinearGradient>
                </TouchableOpacity>
              );
            })}
          </View>
          <CustomButton
            // borderColor={'white'}
            // borderWidth={1}
            textColor={Color.black}
            onPress={() => {
              if (date.length > 0 && selectedTiming != '') {
                navigationService.navigate('CheckoutScreen', {
                    finalData :{
                    services: selectedServices,
                    date: date,
                    time : selectedTiming,
                    }
                });
              } else {
                Platform.OS == 'android'
                  ? ToastAndroid.show(
                      'Please Select any schedule first',
                      ToastAndroid.SHORT,
                    )
                  : alert('Please Select any schedule first');
              }
            }}
            width={windowWidth * 0.8}
            height={windowHeight * 0.06}
            text={'Next'}
            fontSize={moderateScale(14, 0.3)}
            // borderRadius={moderateScale(30, 0.3)}
            textTransform={'uppercase'}
            isGradient={true}
            isBold
            marginTop={moderateScale(30, 0.3)}
          />
        </ScrollView>
      </LinearGradient>
    </ScreenBoiler>
  );
};

export default ChooseDate;

const styles = ScaledSheet.create({
  container: {
    paddingTop: windowHeight * 0.06,
    // justifyContent: "center",
    height: windowHeight * 0.9,
    width: windowWidth,
    alignItems: 'center',
    // paddingLeft: moderateScale(20, 0.3),
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
  timingView: {
    width: windowWidth * 0.8,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: moderateScale(10, 0.3),
    // backgroundColor : 'red'
  },

});
