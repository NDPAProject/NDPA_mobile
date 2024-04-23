import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {bicycle, bus, car, walk} from '../constants/images';

const screenWidth = Dimensions.get('window').width;

const CircleView = ({color, bgcolor}) => (
  <View
    style={[styles.circleView, {borderColor: color, backgroundColor: bgcolor}]}
  />
);

const VerticalLine = ({color}) => (
  <View style={[styles.verticalLine, {borderColor: color}]} />
);

const AddressText = ({children, style}) => (
  <Text style={[styles.addressText, style]}>{children}</Text>
);

const AddressView = ({title, subtitle}) => (
  <View style={styles.addressView}>
    <AddressText style={styles.addressTitle}>{title}</AddressText>
    <AddressText style={styles.addressSubtitle}>{subtitle}</AddressText>
  </View>
);

const DistanceCard = ({result_dur_dis, setModefunc, allinfo}) => {
  const navigation = useNavigation();
  const route = useRoute();
  const [selectedIndex, setSelectedIndex] = useState(null);
  const modes = [
    {name: 'Car', value: 'driving', icon: car},
    {name: 'Walking', value: 'walking', icon: walk},
    {name: 'Bus', value: 'transit', icon: bus},
    {name: 'Bicycle', value: 'bicycling', icon: bicycle},
  ];
  return (
    <View style={styles.centeredView}>
      <View style={{}}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {modes.map((mode, index) => {
            const duration =
              allinfo.find(item => item.mode === mode.value)?.duration || 'N/A';
            return (
              <TouchableOpacity
                key={index}
                style={{
                  backgroundColor:
                    selectedIndex === index ? '#F0808080' : 'white',
                  padding: 10,
                  borderRadius: 20,
                  marginHorizontal: 10,
                }}
                onPress={() => {
                  setModefunc(mode.value);
                  setSelectedIndex(index); // Set the selected index on press
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 4,
                  }}>
                  <Image source={mode.icon} style={{width: 24, height: 24}} />
                  <Text
                    style={{
                      color: '#000',
                      fontSize: 14,
                      fontWeight: '400',
                      lineHeight: 19,
                      textAlign: 'center',
                    }}>
                    {duration}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      <Text style={styles.sheetText}>
        {`${result_dur_dis.duration} min`}{' '}
        <Text
          style={styles.distanceText}>{`(${result_dur_dis.distance} km)`}</Text>
      </Text>
      <View style={styles.mainRow}>
        <View style={styles.iconColumn}>
          <CircleView color="#F08080" bgcolor={'#FFFFFF'} />
          <VerticalLine color="#F08080" />
          <CircleView color="#F08080" bgcolor={'#F08080'} />
        </View>
        <View style={styles.addressColumn}>
          <AddressView
            title="Home"
            subtitle="Eastbourne Terrace, London W2, UK"
          />
          <AddressView
            title={route.params.locationaddress.location}
            subtitle={route.params.locationaddress.address}
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          // if (route.name.includes('Tutorial'))
          navigation.navigate(
            route.name.includes('Tutorial') ? 'RouteviewTutorial' : 'Routeview',
            {
              locationaddress: route.params.locationaddress,
            },
          );
        }}>
        <View style={styles.routebuttonstyle}>
          <Text style={styles.button_textStyle}>Start Route</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    padding: 16,
    position: 'absolute',
    bottom: 100,
    backgroundColor: '#FFFFFF',
    width: screenWidth - 32,
    gap: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sheetText: {
    fontSize: 20,
    lineHeight: 27.24,
    color: '#1E1D20',
  },
  distanceText: {
    fontSize: 20,
    color: '#1E1D2080',
  },
  mainRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 20,
  },
  iconColumn: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  circleView: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
  },
  verticalLine: {
    width: 0,
    height: 84,
    borderLeftWidth: 2,
    borderStyle: 'dashed',
  },
  addressColumn: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    gap: 20,
  },
  addressView: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  addressText: {
    fontSize: 18,
    lineHeight: 24.51,
    fontWeight: '500',
    color: '#1E1D20',
    fontFamily: 'OpenSans-Regular',
  },
  addressTitle: {
    fontSize: 18,
    lineHeight: 24.51,
  },
  addressSubtitle: {
    fontSize: 16,
    lineHeight: 21.79,
    color: '#1E1D2080',
  },
  routebuttonstyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 45,
    borderRadius: 45,
    backgroundColor: '#F08080',
  },
  button_textStyle: {
    fontSize: 21,
    lineHeight: 28.6,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'OpenSans-Regular',
  },
});
export default DistanceCard;
