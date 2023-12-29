
import { useSelector } from "react-redux";
import { dashboardService } from "../services/dashboard.service";
import { loadToys } from "../store/actions/toy.actions";
import { useEffect } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, } from 'chart.js'

import { Bar, Line } from "react-chartjs-2"

import React from 'react'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
)



export function Dashboard() {
    const labels = useSelector(storeState => storeState.appMoudle.labels)
    const toys = useSelector(storeState => storeState.toyMoudle.toys)
    const filterSortBy = useSelector(storeState => storeState.appMoudle.filterSortBy)


    useEffect(() => {
        loadToys(filterSortBy)
            .catch((err) => {
                console.log('err:', err)
            })
    }, [])



    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July']

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
               
            },
        },
    }

    const labelColors = [
        'rgba(255, 99, 132, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(255, 205, 86, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(201, 203, 207, 1)',
        'rgba(255, 0, 0, 1)',
    ]

    const priceData = {
        labels: labels,
        datasets: [{
            label: 'Average price by label',
            data: dashboardService.getPricePerLabel(labels, toys),
            backgroundColor: labelColors.map(label => label) || `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255}, 1)`,
            borderWidth: 1,
            fill: false,
        }],
    };

    const inventoryData = {
        labels: labels,
        datasets:
            [
                {
                    label: 'Inventory by label',
                    data: dashboardService.getInvByLabel(labels, toys),
                    backgroundColor: labelColors.map(label => label) || `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255}, 0.5)`,
                    borderWidth: 1,
                }
            ],
    }


    return (
        <section className="dashboard"  >
            <Line options={options} data={inventoryData}  ></Line>
            <Bar options={options} data={priceData}  ></Bar>
        </section>
    )


}