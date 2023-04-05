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
    Colors
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
    ArcElement,
    Colors

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
        borderWidth: 1
    },

    {
        label: 'PADC LLC',
        data: [40,5,64,17,33,88,42,19,92,70,16,34],
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
            <Doughnut data={data} />
        </div>
    )
}