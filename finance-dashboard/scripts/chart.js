import Chart from 'chart.js/auto';

//render spend chart
export function renderChart(transactions) {
    const ctx = document.getElementById('spending-Chart').getContext('2d');
    const data = fetchTransactions.reduce(
        (acc, { type, amount }) => {
            acc[type] += amount;
            return acc;
        },
        { income: 0, expense: 0 }
    );

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Income', 'Expenses'],
            datasets: [
                {
                    data: [data.income, data.expenses],
                    backgroundColor: ['green', 'red'],
                    hoverBackgroundColor: ['#28a745', '#dc3545'],
                },
            ],
        },
    });
}