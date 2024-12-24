const ctx = document.getElementById("chart").getContext("2d");
const chart = new Chart(ctx, {
    type: "bar",
    data: {
        labels: ["Income", "Expenses"],
        datasets: [
            {
                label: "Budget Overview",
                data: [0, 0],
                backgroundColor: ["#4caf50", "#f44336"],
            },
        ],
    },
});

let transactions = [];

document.getElementById("transaction-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const description = document.getElementById("description").value;
    const amount = parseFloat(document.getElementById("amount").value);
    const type = document.getElementById("type").value;

    if (!description || isNaN(amount)) {
        alert("Please fill out all fields.");
        return;
    }

    const transaction = { description, amount, type };
    transactions.push(transaction);

    updateUI();
    this.reset();
});

function updateUI() {
    // Calculate income, expenses, and balance
    const income = transactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);
    const expenses = transactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);
    const balance = income - expenses;

    document.getElementById("income").textContent = `$${income.toFixed(2)}`;
    document.getElementById("expenses").textContent = `$${expenses.toFixed(2)}`;
    document.getElementById("balance").textContent = `$${balance.toFixed(2)}`;

    // Update the chart
    chart.data.datasets[0].data = [income, expenses];
    chart.update();

    // Update transaction list
    const transactionsList = document.getElementById("transactions");
    transactionsList.innerHTML = "";
    transactions.forEach((t, index) => {
        const li = document.createElement("li");
        li.textContent = `${t.description}: $${t.amount.toFixed(2)} (${t.type})`;
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", () => removeTransaction(index));
        li.appendChild(removeButton);
        transactionsList.appendChild(li);
    });
}

function removeTransaction(index) {
    transactions.splice(index, 1);
    updateUI();
}
