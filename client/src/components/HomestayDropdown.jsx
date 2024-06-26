import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const HomestayDropdown = ({ homestays, selectedHomestay, setSelectedHomestay, isDark }) => {
    const [open, setOpen] = useState(false);

    console.log(isDark);

    return (
        <>
            <div id="dropdown-container" className="relative w-1/2">
                {/* select bar */}
                <div
                    onClick={() => setOpen(prev => !prev)}
                    className={`border-2 rounded-lg px-2 py-1 flex items-center justify-between cursor-pointer select-none ${open && 'rounded-b-none '}`}
                >
                    <div className="flex items-center gap-4">
                        {selectedHomestay?.images[0] &&
                            < img src={selectedHomestay?.images[0]} alt="homestay" className="w-10 h-10 rounded-full" />
                        }
                        <h1 className="text-xl font-semibold">{selectedHomestay?.title || 'No homestays Found'}</h1>
                    </div>
                    {open ? <FaChevronUp /> : <FaChevronDown />}
                </div>

                {/* options dropdown */}
                <div className={`absolute w-full px-2 border-2 border-t-0 py-2 h-auto max-h-56 flex flex-col gap-3 overflow-y-scroll select-none rounded-b-lg z-10 ${!open && 'hidden'} ${isDark ? 'bg-[#272727]' : 'bg-white'}`}>
                    {homestays.map((homestay) => (
                        <div
                            key={homestay._id}
                            className={`flex items-center gap-4 p-2 rounded-lg cursor-pointer ${isDark ? 'hover:bg-[#3a3a3a]' : 'hover:bg-gray-100'}`}
                            onClick={() => { setSelectedHomestay(homestay); setOpen(false) }}
                        >
                            <img src={homestay.images[0]} alt="homestay" className="w-10 h-10 rounded-full" />
                            <h1 className="text-xl font-semibold">{homestay.title}</h1>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default HomestayDropdown