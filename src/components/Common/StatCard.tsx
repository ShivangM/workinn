import { Stat } from '@/interfaces/typing'

type Props = {
    stat: Stat
}

const StatCard = ({ stat }: Props) => {
    const { Icon, name, value } = stat

    return (
        <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 bg-gray-100">
            <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-secondary">
                <Icon className="h-6 w-6" />
            </div>
            <div className="flex flex-col justify-center align-middle">
                <p className="text-2xl font-semibold leadi">{value}</p>
                <p className="capitalize">{name}</p>
            </div>
        </div>
    )
}

export default StatCard