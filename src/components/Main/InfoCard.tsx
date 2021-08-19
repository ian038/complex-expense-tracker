import React from 'react'

const isIncome: number = Math.round(Math.random())

const InfoCard: React.FC = () => {
    return (
        <div style={{ textAlign: 'center', padding: '0 10%' }}>
            Try saying: <br />
            Add {isIncome ? 'Income ' : 'Expense '}
            for {isIncome ? '$100 ' : '$50 '}
            in Category {isIncome ? 'Business ' : 'Phone '}
            for {isIncome ? 'Monday' : 'Tuesday'}
        </div>
    )
}

export default InfoCard
