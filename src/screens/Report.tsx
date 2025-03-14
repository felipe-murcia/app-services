//import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
} from "react-native";
//import { registerForPushNotificationsAsync } from '../configs/token';
import { useEffect, useState } from "react";
import { FinanceService } from "../services/financeService";
import {
  colorExpense,
  colorExpenseChart,
  colorGrayLight,
  colorIncome,
  colorIncomeChart,
  colorSaving,
  colorSavingChart,
} from "../constant/styles";
const width2 = Dimensions.get("screen").width;
const iconSizeButton = 30;
import Svg, { Path, Circle } from "react-native-svg";
import DonutsChart from "../components/DonutsChart/DonutsChart";
import { IDate } from "../interface/IDate";
import { convertMoney, getItemService, getNameService } from "../utils/convertMoney";
import { colorBlack } from '../constant/styles';
import { useSQLite } from "../hooks/useSQLite";
import { IService } from "../interface/IService";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { ButtonCalendar } from "../components/IconButton/ButtonCalendar/ButtonCalendar";


const width = Dimensions.get("screen").width;


interface Props{
  date: IDate;
}

export const Report = ({date}:Props) => {

  const { data } = useSQLite({ month: date?.month, year: date?.year }); 

  const [isShowCalendar, setIsShowCalendar] = useState(false);
  const [dataCharts, setDataCharts] = useState([]);
  const [ totalService, setTotalService ] = useState(0);

  const [ itemSelected, setItemSelected ] = useState<any>({});

  const [ dataPercentage, setDataPercentage ] = useState([]);

  const dataPercentag2e = [
    { percentage: 50, color: colorIncomeChart },
    { percentage: 20, color: colorSavingChart },
    { percentage: 30, color: colorExpenseChart },
  ];

  useEffect(() => {
    getServiceChart();
  }, [data]);
 

  const getServiceChart = async () => {
    const total = data
      .reduce((sum: any, item: { amount: any; }) => sum + item.amount, 0);

    setTotalService(total);

    const newData:any = [];

    data.map((item:IService)=>{
      const percentage = (item.amount / total) * 100;
      let detailsService = getItemService(item.service);
      newData.push({
        label: item.name,
        value: item.amount,
        percentage: percentage,
        color: detailsService?.color,
        amount: item.amount,
        icon: detailsService?.icon,
      }); 
    })
 
    setDataCharts(newData);
  };


  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: width2 - 40,
          backgroundColor: "transparent",
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        <Text style={styles.titleMonth}>Dashboard </Text> 
        <ButtonCalendar
          onPress={() => setIsShowCalendar(!isShowCalendar)} />
      </View>

      <View style={{backgroundColor:'transparent', alignItems:'center'}}>

        <DonutsChart data={dataCharts} radius={120} strokeWidth={25} total={itemSelected?.amount? itemSelected?.amount : totalService} title={itemSelected?.label} icon={itemSelected?.icon}/>

        <View>
        {
          dataCharts.map((item:any)=>{
            return(
              <TouchableOpacity onPress={()=>setItemSelected(item)} key={item.label}>
                <View style={{flexDirection:'row', margin:10, alignItems:'center', width: width2-80, justifyContent:'space-between'}}>

                  <View style={{flexDirection:'row', alignItems:'center'}}>
                    <View style={{backgroundColor:item.color, borderRadius:50, width:16, height: 16  }} />
                    <Text style={styles.subtitles}>{item.label}</Text>
                  </View>
              
                  <Text style={[styles.number,{ color: item.color}]}>{item.percentage?.toFixed(1)}%</Text>

                </View>
              </TouchableOpacity>
            )
          })
        }
        </View>
        <View style={{height:20}}/>
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    //justifyContent: 'center',
  },
  container2: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  titleMonth: {
    fontFamily: "FontMedium",
    fontSize: 26,
    color: colorBlack,
    marginBottom: 10,
  },
  subtitles:{
    fontFamily:'FontLight',
    fontSize:20,
    color:colorGrayLight,
    paddingLeft:10
  },
  number:{
    fontFamily:'FontMedium',
    fontSize:20,
    color:colorBlack
  },
});
