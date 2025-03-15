
import { ScrollView, StyleSheet, Text, View, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Main } from "./Main"
import { useFonts } from 'expo-font';
import { Add } from './Add';
import { Report } from './Report';
import { NavBar } from '../components/NavBar/NavBar';
import { useEffect, useState } from 'react';

export const Navigation = () => {

    const [ menu, setMenu ] = useState<number>(1)
    const [ month, setMonth ] = useState<number>(new Date().getMonth() + 1); // Current month
    const [ year, setYear ] = useState<number>(new Date().getFullYear()); // Current year

    const [loaded] = useFonts({
        FontLight: require('../assets/fonts/SofiaProLightAz.otf'),
        FontMedium: require('../assets/fonts/SofiaProMediumAz.otf'),
    });
    
    if (!loaded) {
        return null;
    }

  const setDate = (date:{month:number, year:number}) => {
    setMonth(date.month);
    setYear(date.year);
  }
    
  return (
    <View style={{ backgroundColor: '#fcfcfc', flex:1}}>
        <ScrollView>
            <View style={styles.container}>
                {
                    menu == 1 ? <Main handleAdd={()=>setMenu(2)} setDate={setDate} date={{ month, year}}/> 
                    : menu == 2 ? <Add handleBack={()=>setMenu(1)} date={{ month, year}}/>
                    : menu == 3 ? <Report  date={{ month, year}} setDate={setDate} />
                    : <Text>Not avalaible</Text>
                }
            </View>
        </ScrollView>
        <NavBar onClickMenu={(value:number)=>setMenu(value)}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
