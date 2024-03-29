import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert,
  ToastAndroid,
  ActivityIndicator,
  FlatList,
  TextInput,
} from 'react-native';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Color from '../Assets/Utilities/Color';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import ScreenBoiler from '../Components/ScreenBoiler';
import {Icon} from 'native-base';
import CustomButton from '../Components/CustomButton';
import LinearGradient from 'react-native-linear-gradient';
import DropDownSingleSelect from '../Components/DropDownSingleSelect';
import CustomText from '../Components/CustomText';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ServiceComponent from '../Components/ServiceComponent';
import {useDispatch, useSelector} from 'react-redux';
import {Get, Post} from '../Axios/AxiosInterceptorFunction';
import {useNavigation} from '@react-navigation/native';
import NoData from '../Components/NoData';
import SelectedServicesModal from '../Components/SelectdServicesModal';
import { setUserData } from '../Store/slices/common';
// import SelectedService from '../Components/selectdService';
// import { setbarberServices } from '../Store/slices/common';

const AddService = props => {
  const fromSettings = props?.route?.params?.fromSettings;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userData = useSelector(state => state.commonReducer.userData);
  // console.log("🚀 ~ AddService ~ userData:", userData)
  const token = useSelector(state => state.authReducer.token);
  // console.log("🚀 ~ AddService ~ token:", token)
  const [isVisiable, setIsVisiable] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [isSelected, setIsSelected] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [service, setService] = useState([]);
  console.log("🚀 ~ AddService ~ service:", service)
  const [serviceArray, setServiceArray] = useState([]);

  // const serviceArray = [
  //   {id: 1, name: 'Blow dry'},
  //   {id: 2, name: 'Blow dry with curling and striaght iron'},
  //   {id: 3, name: 'Hair cut with Blow dry'},
  //   {id: 4, name: 'Mens haircut'},
  //   {id: 5, name: 'Gloss'},
  //   {id: 6, name: 'Gel Polist'},
  //   {id: 7, name: 'Meni pedi'},
  //   {id: 8, name: 'nail cutting'},
  //   {id: 9, name: 'pink and white fill'},
  //   {id: 10, name: 'Polish change'},
  //   {id: 11, name: 'Acrylic fill'},
  //   {id: 12, name: 'partial highlight'},
  // ];

  const GetServices = async () => {
    const url = `auth/barber/service `;
    setLoading(true);
    const response = await Get(url, token);

    setLoading(false);
    if (response != undefined) {
      console.log(response?.data?.data);
      setIsSelected(response?.data?.data?.find(item => item.main_service == 1));
      setService(response?.data?.data);
    }
  };

  const GetServicesList = async () => {
    const url = `auth/service`;
    setLoading(true);
    const response = await Get(url, token);

    setLoading(false);
    if (response != undefined) {
      setServiceArray(response?.data?.data);
    }
  };

  useEffect(() => {
    GetServicesList();
    fromSettings && GetServices();
  }, []);

  // POST API START
  const Services = async () => {
    if (service.some(item => item?.price == '')) {
      return Platform.OS == 'android'
        ? ToastAndroid.show(
            'Please add price for all the services',
            ToastAndroid.SHORT,
          )
        : Alert.alert('Please add price for all the services');
    }
    const body = {
      service_name: serviceArray
        ?.filter((item, index) => {
          return service?.some(item1 => item?.name == item1?.name);
        })
        ?.map(item => ({
          service_id: item?.id,
          price: service?.find(x => x.name == item.name)?.price,
          main_service: isSelected?.id == item?.id ? 1 : 0,
        })),
    };
   console.log("🚀 ~ Services ~ body:", body)
    // for (let key in body) {
    //   if (service.length == 0) {
    //     return Platform.OS == 'android'
    //       ? ToastAndroid.show(`${key} field is empty`, ToastAndroid.SHORT)
    //       : Alert.alert(`${key} field is empty`);
    //   }
    // }

    const url = 'auth/barber/service';
    setIsLoading(true);
    const response = await Post(url, body, apiHeader(token));
    setIsLoading(false);

    if (response != undefined) {
  console.log("🚀 ~ Services ~ response:", response?.data)
      Platform.OS === 'android'
        ? ToastAndroid.show('Servicess Add', ToastAndroid.SHORT)
        : Alert.alert('Servicess Add');
        if(fromSettings){
          dispatch(setUserData(response?.data?.data));
          // navigation.goBack();

        }
        else{

          dispatch(setUserData(response?.data?.data));
        }
     
    }
  };

  // useEffect(() => {
  //   console.log('changed');
  // }, [service]);

  return (
    <ScreenBoiler
      showHeader={true}
      showBack={fromSettings ? true :false}
      statusBarBackgroundColor={Color.black}
      statusBarContentStyle={'light-content'}>
      <LinearGradient
        start={{x: 0.0, y: 0.25}}
        end={{x: 0.5, y: 1.0}}
        colors={Color.themeGradient}
        style={styles.container}>
        {service?.length > 0 && (
          <View
            style={{
              position: 'absolute',
              zIndex: 1,
              right: 0,
              bottom: 35,
              left: 0,
              justifyContent: 'center',
              alignItems: 'center',
              // backgroundColor:'white'
            }}>
            <CustomButton
              onPress={() => {
                if (Object.keys(isSelected).length == 0) {
                  Platform.OS == 'android'
                    ? ToastAndroid.show(
                        'select your expertise',
                        ToastAndroid.SHORT,
                      )
                    : Alert.alert('select your expertise');
                  setIsVisiable(true);
                } else {
                  Services();
                }
              }}
              text={
                isLoading ? (
                  <ActivityIndicator
                    size={moderateScale(30, 0.6)}
                    color={'white'}
                  />
                ) : (
                  'Save'
                )
              }
              textColor={Color.white}
              width={windowWidth * 0.7}
              height={windowHeight * 0.07}
              marginTop={moderateScale(50, 0.3)}
              bgColor={Color.themeColor}
              borderRadius={moderateScale(25, 0.3)}
              // isGradient
            />
          </View>
        )}
        <View
          style={{
            width: windowWidth * 0.95,
            paddingVertical: moderateScale(10, 0.6),
            // backgroundColor: '#fff',
            alignSelf: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: moderateScale(10, 0.6),
          }}>
          <CustomText isBold style={styles.AddService}>
            Add Services
          </CustomText>

          <TouchableOpacity
            onPress={() => {
               setService(prev => [...prev, {name: '', price: ''}]);
            }}
            activeOpacity={0.7}
            style={{
              width: windowWidth * 0.06,
              height: windowWidth * 0.06,
              borderRadius: (windowWidth * 0.06) / 2,
              backgroundColor: Color.themeColor,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon
              name="plus"
              as={AntDesign}
              size={moderateScale(18, 0.3)}
              color={Color.white}
            />
          </TouchableOpacity>
        </View>

        {Loading ? (
          <View
            style={{alignSelf: 'center', marginTop: moderateScale(150, 0.3)}}>
            <ActivityIndicator size={moderateScale(40, 0.6)} color={'white'} />
          </View>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={service}
            ListEmptyComponent={() => {
              return (
                <NoData
                  style={{
                    height: windowHeight * 0.25,
                    width: windowWidth * 0.6,
                    alignItems: 'center',
                    // backgroundColor:'red'
                  }}
                  text={'No Services Added Yet'}
                />
              );
            }}
            renderItem={({item, index}) => {
              return (
                <ServiceComponent
                  service={service}
                  setService={setService}
                  item={item}
                  serviceArray={serviceArray}
                />
              );
            }}
          />
        )}

        <SelectedServicesModal
          item={serviceArray?.filter((item, index) => {
            return service?.some(item1 => item?.name == item1?.name);
          })}
          isVisiable={isVisiable}
          setIsVisiable={setIsVisiable}
          isSelected={isSelected}
          setIsSelected={setIsSelected}
        />
      </LinearGradient>
    </ScreenBoiler>
  );
};

const styles = ScaledSheet.create({
  container: {
    paddingTop: windowHeight * 0.02,
    height: windowHeight * 0.9,
    width: windowWidth,
    // alignItems: 'center',
  },
  AddService: {
    fontSize: moderateScale(16, 0.6),
    color: Color.white,
  },

  icon: {
    marginVertical: 10,
    marginLeft: 60,
  },
});

export default AddService;
