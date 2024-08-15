import React from 'react'
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

const Graph= ()=>{
 return (
    <>
    <Line
      data={
        {
            labels :[1,2,3,4],
            datasets: [
                {
                         data:[1,2,3,4],
                         label:'graph',
                         borderColor: 'red'
                },
                {
                       data: [5,,6,7,8],
                       label:'graph',
                       borderColor:'green'
                }
            ]
        }
      }
    />

    </>
 )
}

export default Graph;