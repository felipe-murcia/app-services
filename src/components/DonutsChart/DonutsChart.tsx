import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { Svg, Circle, Path } from 'react-native-svg';
import { SofiaProLightAz } from '../../constant/fonts';
import { convertMoney } from '../../utils/convertMoney';

// Definimos el tipo para cada segmento de datos
type DonutSegment = {
  percentage: number;
  color: string;
};

// Props para el componente DonutChart
interface DonutChartProps {
  data: DonutSegment[];
  radius?: number;
  strokeWidth?: number;
  total?: number;
  title?: string;
  icon?: any;
  colorIcon?: any;
}

const DonutChart: React.FC<DonutChartProps> = ({
  data,
  radius = 100,
  strokeWidth = 20,
  total = 100,
  title = 'Total',
  icon = null,
  colorIcon = 'black'
}) => {
  const circleCircumference = 2 * Math.PI * radius;

  let cumulativePercentage = 0;
  //radius = 180

  if(data.length == 0) {
    return(
      <Text style={{ fontFamily:'FontMedium',  fontSize:22, position:'absolute', top: icon? radius+20 :radius,  textAlign:'center' }}>
         No hay datos
      </Text>
    )
  }

  return (
    <View style={styles.container}>
       
      <Svg 
        height={(radius + strokeWidth) * 2}
        width={(radius + strokeWidth) * 2}
        viewBox={`0 0 ${(radius + strokeWidth) * 2} ${(radius + strokeWidth) * 2}`}
    >
       
 
        {data.map((segment, index) => {
          const percentage = segment.percentage;
          const strokeDashoffset =
            circleCircumference -
            (circleCircumference * percentage) / 100;
          const rotation = (cumulativePercentage * 360) / 100; // Rotación acumulada
          cumulativePercentage += percentage; // Actualizar el porcentaje acumulado

          return (
            <Circle
              key={index}
              cx={(radius + strokeWidth)}
              cy={(radius + strokeWidth)}
              r={radius}
              stroke={segment.color}
              strokeWidth={strokeWidth}
              strokeLinecap="butt"
              strokeDasharray={circleCircumference}
              strokeDashoffset={strokeDashoffset}
              fill="none"
              rotation={-90 + rotation}
              //origin={`${radius}, ${radius}`}
              origin={`${radius + strokeWidth}, ${radius + strokeWidth}`}
            />
          );
        })}
      </Svg>
      {
        icon && <Image source={icon} resizeMode="contain" style={{width:40, height:40, position:'absolute', top: radius-20, tintColor:colorIcon }}/>
      }
      <Text style={{ fontFamily:'FontMedium',  fontSize:22, position:'absolute', top: icon? radius+20 :radius,  textAlign:'center' }}>
         <Text style={{fontSize:20}}>
          {title}{'\n'}
          </Text>
            {convertMoney(total)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor:'transparent',
    borderRadius:10,
    //padding:10
    justifyContent: 'center',
    alignItems: 'center', 
  },
});
 

export default DonutChart;
