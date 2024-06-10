import {useState} from 'react'

const SavingsStats = ({savings, target, savingsHistory}) => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const openModal = () => setIsModalOpen(true)
    const closeModal = () => setIsModalOpen(false)

    return (
        <div>
            <div className='stats shadow w-full bg-white'>
                <div className='stat'>
                    <div className='stat-title'>Current Savings</div>
                    <div className='stat-value'>${savings}</div>
                </div>
                <div className='stat'>
                    <div className='stat-title'>Savings Target</div>
                    <div className='stat-value'>${target}</div>
                </div>
                <div className='stat-actions space-x-4 pl-4'>
                    <button className='btn btn-primary' onClick={openModal}>Edit Savings</button>
                    <button className='btn btn-secondary' onClick={openModal}>View History</button>
                </div>
            </div>

            {isModalOpen && (
                <div className='modal modal-open'>
                    <div className='modal-box'>
                        <h3 className='font-bold text-lg'>Savings History</h3>
                        <ul className='mt-4'>
                            {savingsHistory.map((entry, index) => (
                                <li key={index} className='border-b py-2'>
                                    {entry.date}: ${entry.amount} ({entry.type})
                                </li>
                            ))}
                        </ul>
                        <div className='modal-action'>
                            <button className='btn btn-primary' onClick={closeModal}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default SavingsStats