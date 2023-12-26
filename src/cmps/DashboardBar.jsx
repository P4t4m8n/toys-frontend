

export function DashboardBar({ }) {


    const priceData = {

        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: labels.map((label, index) => ({
            label: label,
            data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 50) + 100),
            borderColor: labelColors[label] || `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255}, 1)`,
            borderWidth: 2,
            fill: false,
        })),

    }

    return (
        <Bar data={priceData}></Bar>
    )
}