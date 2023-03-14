import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    ArcElement,
} from 'chart.js';

import { Bar, Line,Doughnut } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement

);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Chart.js Line Chart',
        },
    },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', "August", "September", "October", "November", "December"];
const data = {
    labels: labels,
    datasets: [{
        label: 'PADC LLC',
        data: [65, 59, 80, 81, 56, 55, 40, 10, 55, 33, 87, 40],
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(201, 190, 210, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(201, 150, 244, 0.2)',
            'rgba(201, 162, 235, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            
        ],
        borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)',
            'rgba(201, 203, 210)',
            'rgba(201, 203, 250)',
            'rgba(201, 203, 244)',
            'rgba(201, 203, 233)',
            'rgba(201, 203, 230)'
        ],
        borderWidth: 1
    },

    {
        label: 'PADC LLC',
        data: [40,5,64,17,33,88,42,19,92,70,16,34],
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)',
            'rgba(201, 190, 210, 0.2)',
            'rgba(201, 190, 250, 0.2)',
            'rgba(201, 150, 244, 0.2)',
            'rgba(201, 162, 235, 0.2)',
            'rgba(201, 174, 230, 0.1)',
            
        ],
        borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)',
            'rgba(201, 203, 210)',
            'rgba(201, 203, 250)',
            'rgba(201, 203, 244)',
            'rgba(201, 203, 233)',
            'rgba(201, 203, 230)'
        ],
        borderWidth: 1
    },

    ]
};
export const ChartBar: React.FC = () => {

    return (
        <div style={{ width: "55%",boxShadow:" 0px 2px 16px 2px grey",borderRadius: "30px" }}>
            <Bar data={data} />
        </div>
    )
}

export const LineBar: React.FC = () => {
    return (
        <div style={{ width: "40%",display:"flex",justifyContent:"center",boxShadow:" 0px 2px 16px 2px grey",borderRadius: "30px" }}>
            <Line options={options} data={data} />
        </div>
    );
}

export const DoughnutBar:React.FC =() => {
    return (
        <div style={{width:"25%",display:"flex",alignItems:"center",boxShadow: "-2px 2px 16px -3px grey",borderRadius: "30px"}}>
            <Doughnut data={data} />;
        </div>
    )
}