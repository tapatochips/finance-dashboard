const API_BASE = 'http://localhost:5000/api/transactions';

//get all transactions
export async function fetchTransactions() {
    const response = await fetch(API_BASE);
    if (!response.ok) throw new Error('failed to get all transactions');
    return response.json;
}

//add a new transaction

export async function addTransaction(transaction) {
    const response = await fetch(API_BASE, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(transaction),
    });
    if (!response.ok) throw new Error('failed to add transaction');
    return response.json;
}