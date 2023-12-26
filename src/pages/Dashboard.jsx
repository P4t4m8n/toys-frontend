
import { useSelector } from "react-redux";
import { dashboardService } from "../services/dashboard.service";
import { loadToys } from "../store/actions/toy.actions";
import { useEffect } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement } from 'chart.js'
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement,PointElement,LineElement)


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
                text: 'Chart.js Line Chart',
            },
        },
    }

    const labelColors = {
        'On wheels': 'rgba(255, 99, 132, 1)',
        'Box game': 'rgba(75, 192, 192, 1)',
        'Art': 'rgba(255, 205, 86, 1)',
        'Baby': 'rgba(54, 162, 235, 1)',
        'Doll': 'rgba(153, 102, 255, 1)',
        'Puzzle': 'rgba(255, 159, 64, 1)',
        'Outdoor': 'rgba(201, 203, 207, 1)',
        'Battery Powered': 'rgba(255, 0, 0, 1)',
      }

    const priceData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: labels.map((label, index) => ({
            label: label,
            data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 50) + 100),
            borderColor: labelColors[label] || `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255}, 1)`,
            borderWidth: 2,
            fill: false,
        })),
    };

    // Demo data for inventory by label
    const inventoryData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: labels.map((label, index) => ({
            label: label,
            data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 50) + 200),
            backgroundColor: labelColors[label] || `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255}, 0.5)`,
            borderWidth: 1,
        })),
    };


    return (
        <section style={{ maxWidth: '60vw', margin: 'auto' }}>
            <Line options={options} data={inventoryData}></Line>
            <Bar data={priceData}></Bar>
        </section>
    )


}