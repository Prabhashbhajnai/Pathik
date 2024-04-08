import { useMap, Marker, Popup, Circle } from 'react-leaflet'
import L from 'leaflet';
import { useEffect, useState } from "react";

// Custom Icon
import blueDot from '../../assets/BlueDot.png'

// Context
import { useValue } from '../../context/ContextProvider';

const customIcon = new L.Icon({
    iconUrl: blueDot,
    iconSize: [35, 35], // You can adjust the size as needed
    popupAnchor: [0, -16] // Adjust the popup position if needed
})

const MyLocationMarker = () => {
    const { currentLocation, places } = useValue()

    const map = useMap()
    if (currentLocation === null) return null;

    if (currentLocation && places && !places.length)
        map.flyTo(currentLocation, 17)

    return (
        <>
            <Marker position={currentLocation} icon={customIcon} >
                <Popup>
                    You are here
                </Popup>
            </Marker>
            <Circle center={currentLocation} radius={100} fillColor="#ADD8E6" fillOpacity={0.6} color="transparent" />
        </>
    )
}

export default MyLocationMarker