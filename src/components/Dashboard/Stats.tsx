import { Stat } from '@/interfaces/typing'
import React from 'react'
import StatCard from '../Common/StatCard'

type Props = {
    stats: Stat[]
}

const Stats = ({ stats }: Props) => {
    return (
        <div className="grid grid-cols-3 gap-6 w-full">
            {
                stats.map((stat, idx) => <StatCard key={idx} stat={stat} />)
            }
        </div>
    )
}

export default Stats