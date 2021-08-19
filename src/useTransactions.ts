import { useExpenseTracker } from "./context/context";
import { incomeCategories, expenseCategories, resetCategories } from "./constants/categories";

const useTransactions = (title: string) => {
    resetCategories()
    const { transactions } = useExpenseTracker()
    const rightTransactions = transactions.filter((t: { type: string; }) => t.type === title)
    const total = rightTransactions.reduce((acc: any, currVal: { amount: any; }) => acc += currVal.amount, 0)
    const categories = title === "Income" ? incomeCategories : expenseCategories

    rightTransactions.forEach((t: { category: string; amount: number; }) => {
        const category = categories.find(c => c.type === t.category)
        if (category) category.amount += t.amount
    })

    const filteredCat = categories.filter((sc) => sc.amount > 0);

    const chartData = {
        datasets: [{
            data: filteredCat.map((c) => c.amount),
            backgroundColor: filteredCat.map((c) => c.color),
        }],
        labels: filteredCat.map((c) => c.type)
    }

    return {
        total,
        chartData
    }
}

export default useTransactions

