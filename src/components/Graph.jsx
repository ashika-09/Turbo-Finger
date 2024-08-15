import React from 'react'
import { useTheme } from '../context/ThemeContext';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'
import { Line } from 'react-chartjs-2';

ChartJS.register(
   CategoryScale,
   LinearScale,
   PointElement,
   LineElement,
   Title,
   Tooltip,
   Legend,
);

const Graph= ({graphdata})=>{
    const {theme}=useTheme();
 return (
    <>
    <Line
      data={
        {
            labels :graphdata.map(i=>i[0]),
            datasets: [
                {
                         data:graphdata.map(i=>i[1]),
                         label:'wpm',
                         borderColor: theme.textColor
                },
               
            ]
        }
      }
    />

    </>
 )
}

export default Graph;