import { useEffect, useState } from "react"
import { MapContainer, TileLayer } from "react-leaflet"
import { FaChevronRight } from "react-icons/fa"
import { Outlet, Route, Routes } from "react-router-dom"

// Context
import { useValue } from "../../context/ContextProvider"

// Components
import PoiNavbar from "../../components/PointsOfInterest/PoiNavbar"
import Login from "../../components/user/Login"
import SidebarSearch from "../../components/PointsOfInterest/SidebarSearch"
import Notification from "../../components/Notification"
import MyLocationMarker from "../../components/PointsOfInterest/MyLoactionMarker"

// Styles
import "leaflet/dist/leaflet.css";
import './PointsOfInterest.css'

const PointsOfInterest = () => {
    const [sidebarprops, setSidebarProps] = useState({ width: '0%', deg: '0deg' })

    const { setCurrentLocation } = useValue()

    // To handle the sidebar toggle
    const handleSideToggle = () => {
        if (sidebarprops.width === '30%') {
            setSidebarProps({ width: '0%', deg: '0deg' })
        } else {
            setSidebarProps({ width: '30%', deg: '180deg' })
        }
    }

    // To give the map container full width and get current location of the user
    useEffect(() => {
        setSidebarProps({ width: '30%', deg: '180deg' })

        // Get the current location of the user
        navigator.geolocation.getCurrentPosition((position) => {
            setCurrentLocation([position.coords.latitude, position.coords.longitude])
        })
    }, [])

    return (
        <div className='h-screen overflow-hidden'>
            <Notification />
            <Login />
            <PoiNavbar />
            <div className='flex h-full'>

                {/* Sidebar Component */}
                <div
                    style={{ width: sidebarprops.width, transition: 'width 0.15s ease-in-out' }}
                    className="relative"
                >
                    {/* Side bar for different Url */}
                    <Routes>
                        <Route index element={<SidebarSearch />} />
                        {/* <Route path="search" element={<SidebarResults />} /> */}
                    </Routes>

                    <div
                        className="trapezium absolute bottom-1/2 z-50"
                        onClick={handleSideToggle}
                    >
                        <FaChevronRight
                            style={{ transform: `rotateY(${sidebarprops.deg})`, translate: '-1.2rem' }}
                            className="absolute m-auto inset-0"
                        />
                    </div>
                </div>

                {/* Map Component */}
                <div className="w-full z-0 h-full">
                    <MapContainer
                        center={[0, 0]}
                        zoom={2}
                        style={{ height: "91.3%", width: '100%' }}
                    >
                        <TileLayer
                            attribution='&copy; Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | © OpenStreetMap <a href="https://www.openstreetmap.org/copyright" target="_blank">contributors</a>'
                            // url={geoapifyUrl}
                            // url={mapboxUrl}
                            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                        />

                        <MyLocationMarker />
                        {/* <PoiMarkers places={places} /> */}
                    </MapContainer>
                </div>
            </div>
        </div>
    )
}

export default PointsOfInterest