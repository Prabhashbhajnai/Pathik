import { useEffect, useState, useRef } from "react"
import { MdOutlineMyLocation } from "react-icons/md"
import { useNavigate } from "react-router-dom"

// Context
import { useValue } from "../../context/ContextProvider"

// Geoapify API Key
const Key = import.meta.env.VITE_GEOAPIFY_KEY

const SidebarSearch = () => {
    const options = [
        {
            id: 1,
            name: 'Airport',
            value: 'airport'
        },
        {
            id: 2,
            name: 'Healthcare',
            value: 'healthcare'
        },
        {
            id: 3,
            name: 'Hotels',
            value: 'accommodation.hotel'
        },
        {
            id: 4,
            name: 'Tourism',
            value: 'tourism'
        },
        {
            id: 5,
            name: 'Public Transport',
            value: 'public_transport'
        },
        {
            id: 6,
            name: 'Restaurants',
            value: 'catering.restaurant'
        },
        {
            id: 7,
            name: 'Shopping Malls',
            value: 'commercial.shopping_mall'
        }
    ]

    const { dispatch, currentLocation } = useValue()

    const [searchPlace, setSearchPlace] = useState('')
    const [city, setCity] = useState([])

    // To check if the search bar is in focus
    const [searchSelected, setSearchSelected] = useState(false)
    const [radius, setRadius] = useState(0)

    const typeRef = useRef(null)
    const radiusRef = useRef(null)

    const navigate = useNavigate()

    // update the input value when the user types
    const handleChange = (event) => {
        let value = event.target.value
        value = value.replace(/\s/g, '%');
        setSearchPlace(value)
    }

    // Fetch the data from the API after every 500ms till the user stops typing
    useEffect(() => {
        const timer = setTimeout(async () => {
            try {
                const data = await fetch(`https://api.geoapify.com/v1/geocode/search?text=${searchPlace}&apiKey=${Key}`);
                const res = await data.json();
                if (!res.error)
                    setCity(res.features);
                else
                    setCity([]);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [searchPlace])

    // Search for the places in the selected city
    const searchPlaces = async (placeId) => {
        if (!typeRef.current.value) {
            return dispatch({
                type: 'UPDATE_ALERT',
                payload: { open: true, severity: 'error', message: 'Please select a category' }
            })
        }
        
        navigate(`/placestovisit/search?category=${typeRef.current.value}&searchType=specific&city=${placeId}`)
    }

    // Search for the places round the user's location
    const searchNearby = async () => {
        // Check if the user has enabled location services
        if (!currentLocation || currentLocation.length === 0) {
            return dispatch({
                type: 'UPDATE_ALERT',
                payload: { open: true, severity: 'error', message: 'Please enable location services by relading the page' }
            })
        }

        // Check if the user has selected a category
        if (!typeRef.current.value) {
            return dispatch({
                type: 'UPDATE_ALERT',
                payload: { open: true, severity: 'error', message: 'Please select a category' }
            })
        }

        // Check if the user has selected a radius
        if (!radius || radius === 0) {
            return dispatch({
                type: 'UPDATE_ALERT',
                payload: { open: true, severity: 'error', message: 'Please select or enter a radius' }
            })
        }

        const selectedRadius = parseInt(radius) * 1000
        navigate(`/placestovisit/search?category=${typeRef.current.value}&searchType=nearme&radius=${selectedRadius}`)
    }

    return (
        <>
            <div className="bg-white flex flex-col gap-3 overflow-hidden w-full h-full relative p-5" >

                {/* Type of Search */}
                <h1>What are you looking for</h1>
                <select className="rounded-lg border-2 p-2" defaultValue={""} ref={typeRef}>
                    <option value="" disabled>Select an option</option>
                    {options.map(option => (
                        <option key={option.id} value={option.value}>{option.name}</option>
                    ))}
                </select>

                {/* Place Selection */}
                <h1>Where are you looking for</h1>
                <div className="relative">
                    <input
                        type="text"
                        className={`rounded-t-lg border-2 p-2 w-full ${!city || city.length === 0 || (!searchSelected && city.length !== 0) ? `rounded-b-lg` : `rounded-b-0`}`}
                        placeholder="Enter a place"
                        onChange={handleChange}
                        onFocus={() => setSearchSelected(true)}
                        onBlur={() => setTimeout(() => setSearchSelected(false), 500)}
                    />
                    <div className={`absolute w-full bg-white border-2 rounded-b-lg border-t-0 mt-0 overflow-y-scroll ${!city || city.length === 0 || !searchSelected ? `hidden` : `flex flex-col max-h-36`}`}>
                        {city && city.length !== 0 && city.map((city, index) => (
                            <div key={index} className="p-2 border-b-2 cursor-pointer" onClick={() => searchPlaces(city.properties.place_id)}>{city.properties.formatted}</div>
                        ))}
                    </div>
                </div>

                <div className="flex w-full items-center gap-3">
                    <hr className="w-full" />
                    <span className="text-center">OR</span>
                    <hr className="w-full" />
                </div>

                {/* Radius Selection */}
                <h1>Select a Radius</h1>
                <div className="flex flex-col gap-3">
                    <div className="flex gap-3">
                        <button className={`rounded-lg border-2 p-2 w-1/3 hover:bg-sky-500 hover:text-white ${radius === 5 && `bg-sky-500 text-white`}`} onClick={() => { if (radius !== 5) setRadius(5); else setRadius(0) }}>5 km</button>
                        <button className={`rounded-lg border-2 p-2 w-1/3 hover:bg-sky-500 hover:text-white ${radius === 10 && `bg-sky-500 text-white`}`} onClick={() => { if (radius !== 10) setRadius(10); else setRadius(0) }}>10 km</button>
                        <button className={`rounded-lg border-2 p-2 w-1/3 hover:bg-sky-500 hover:text-white ${radius === 20 && `bg-sky-500 text-white`}`} onClick={() => { if (radius !== 20) setRadius(20); else setRadius(0) }}>20 km</button>
                    </div>
                    <h1>Enter a Custom Radius</h1>
                    <input
                        ref={radiusRef}
                        type="text"
                        className={`rounded-t-lg border-2 p-2 w-full ${!city || city.length === 0 || (!searchSelected && city.length !== 0) ? `rounded-b-lg` : `rounded-b-0`}`}
                        placeholder="Enter radius in km"
                        onFocus={() => setRadius(0)}
                        onKeyDown={(e) => e.key === 'Enter' && searchNearby(radiusRef.current.value)}
                    />
                    <button
                        className="flex items-center justify-center gap-3 rounded-lg border-2 p-2 w-full hover:bg-sky-500 hover:text-white"
                        onClick={searchNearby}
                    >
                        <MdOutlineMyLocation /> Search</button>
                </div >
            </div>
        </>
    )
}

export default SidebarSearch