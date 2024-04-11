import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom"
import { FaChevronLeft } from "react-icons/fa6";

// Context
import { useValue } from "../../context/ContextProvider";

// Components
import SkeletonLoader from "../SkeletonLoader";

// Key
const Key = import.meta.env.VITE_GEOAPIFY_KEY

const SidebarResults = () => {
    const navigate = useNavigate()
    const { currentLocation, setPlaces, places, markerRef, dispatch } = useValue()

    const [searchParams] = useSearchParams();

    // Get the search parameters
    const category = searchParams.get('category')
    const queryType = searchParams.get('searchType')
    const placeId = searchParams.get('city')
    const radius = searchParams.get('radius')

    const [searchResults, setSearchResults] = useState([])
    const [loading, setLoading] = useState(true)
    const [offset, setOffset] = useState(0)
    const [loadMore, setLoadMore] = useState(false)

    // Search for poi in specific city
    const searchSpecific = async () => {
        try {
            const data = await fetch(`https://api.geoapify.com/v2/places?categories=${category}&filter=place:${placeId}&limit=20&offset=${offset * 20}&apiKey=${Key}`);
            const res = await data.json()

            if (!searchResults || searchResults.length === 0) {
                setPlaces(res.features.map(place => ({ name: place.properties?.name, alt: place.properties.address_line1, coordinates: [place.properties.lat, place.properties.lon], })))
                setSearchResults(res.features.map(place => ({ ...place.properties })))
            }
            else {
                setPlaces([...places, ...res.features.map(place => ({ name: place.properties?.name, alt: place.properties.address_line1, coordinates: [place.properties.lat, place.properties.lon], }))])
                setSearchResults([...searchResults, ...res.features.map(place => ({ ...place.properties }))])
            }

            if (res) {
                setLoading(false)
                setLoadMore(false)
            }
        } catch (error) {
            console.log(error)
            setLoading(false)
            setLoadMore(false)
            return dispatch({
                type: 'UPDATE_ALERT',
                payload: { open: true, severity: 'error', message: 'Sorry Something went wrong. Please try again later' }
            })
        }
        setOffset(offset + 1)
    }

    // Search for poi near the user's location
    const searchNearby = async () => {
        try {
            const data = await fetch(`https://api.geoapify.com/v2/places?categories=${category}&filter=circle:${currentLocation[1]},${currentLocation[0]},${radius}&bias=proximity:${currentLocation[1]},${currentLocation[0]}&limit=20&offset=${offset * 20}&apiKey=${Key}`)
            const res = await data.json()

            // if loading for the first time
            if (!searchResults || searchResults.length === 0) {
                setPlaces(res.features.map(place => ({ name: place.properties?.name, alt: place.properties.address_line1, coordinates: [place.properties.lat, place.properties.lon], })))
                setSearchResults(res.features.map(place => ({ ...place.properties, distance: (place.properties.distance / 1000).toFixed(2) })))
            }
            // if loading more
            else {
                setPlaces([...places, ...res.features.map(place => ({ name: place.properties?.name, alt: place.properties.address_line1, coordinates: [place.properties.lat, place.properties.lon], }))])
                setSearchResults([...searchResults, ...res.features.map(place => ({ ...place.properties, distance: (place.properties.distance / 1000).toFixed(2) }))])
            }

            if (res) {
                setLoading(false)
                setLoadMore(false)
            }
        } catch (error) {
            console.log(error)
            setLoading(false)
            setLoadMore(false)
            navigate(-1)
            return dispatch({
                type: 'UPDATE_ALERT',
                payload: { open: true, severity: 'error', message: 'Sorry Something went wrong. Please try again later' }
            })
        }
        setOffset(offset + 1)
    }

    // Show the popup on the map
    const showPopup = (index) => {
        const marker = markerRef.current[index].current

        if (marker) {
            marker.openPopup();
        }
    }

    useEffect(() => {
        if (queryType === 'specific') {
            searchSpecific()
        } else if (queryType === 'nearme') {
            searchNearby()
        }
    }, [])

    return (
        <>
            <div className="w-full h-full overflow-y-scroll pb-14">
                {/* Back Button */}
                <div className="flex items-center pl-2 py-2 border-b-2 top-0 sticky bg-white cursor-pointer" onClick={() => { setPlaces([]); navigate(-1) }}>
                    <FaChevronLeft /> Back
                </div>

                {loading &&
                    <div className="w-full h-full items-center justify-center px-2">
                        <SkeletonLoader cards={5} />
                    </div>
                }

                {searchResults && searchResults.length > 0 &&
                    <div className="flex flex-col gap-3 px-2">
                        {searchResults.map((place, index) => (
                            <div key={index} className="p-3 border-b-2" onClick={() => showPopup(index)}>
                                <div className="flex justify-between items-center">
                                    <h1 className="text-lg font-semibold w-[70%]">{place.name || place.address_line1}</h1>
                                    <h1 className="text-sm text-slate-400">{place?.distance} Km</h1>
                                </div>
                                <p className="text-sm">{place.address_line1}, {place.address_line2}</p>
                            </div>
                        ))}
                    </div>
                }

                {!loadMore && searchResults && searchResults.length > 0 &&
                    <button
                        className="flex items-center justify-center gap-3 rounded-lg border-2 p-2 mt-3 w-full hover:bg-sky-500 hover:text-white"
                        onClick={() => {
                            setLoadMore(true);
                            if (queryType === 'specific')
                                searchSpecific();
                            else searchNearby()
                        }}
                    >
                        Load More
                    </button>
                }

                {loadMore && <SkeletonLoader cards={5} />}
            </div>
        </>
    )
}

export default SidebarResults