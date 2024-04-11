import Skeleton from 'react-loading-skeleton'
import "react-loading-skeleton/dist/skeleton.css"

const SkeletonLoader = ({ cards }) => {
    return (
        Array(cards).fill(0).map((_, index) => (
            <div className="w-full p-3 border-b-2" key={index}>
                <div className='flex justify-between'>
                    <div className='w-2/3'>
                        <Skeleton />
                    </div>
                    <div className='w-1/5'>
                        <Skeleton />
                    </div>
                </div>
                <Skeleton count={2} />
            </div>
        ))
    )
}

export default SkeletonLoader