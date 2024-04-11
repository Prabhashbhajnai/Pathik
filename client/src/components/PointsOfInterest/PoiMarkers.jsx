import { createRef, useEffect, useState } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';

// Context
import { useValue } from '../../context/ContextProvider';

const PoiMarkers = () => {
    const { markerRef, places } = useValue()

    const [markers, setMarkers] = useState([]);

    useEffect(() => {
        if (!places || places.length === 0) {
            setMarkers([]);
            // markerRef.current = []
            return
        }

        setMarkers(places);
        markerRef.current = places.map(() => createRef())
    }, [places]);

    const map = useMap();

    useEffect(() => {
        if (markers.length === 0) return;

        map.flyTo(markers[0].coordinates, 13);
    }, [markers, map]);

    if (!markers || markers.length === 0) return null;

    return (
        markers.map((place, index) => (
            <Marker key={index} position={place.coordinates} ref={markerRef.current[index]}>
                <Popup>
                    {place.name ? place.name : place.alt}
                </Popup>
            </Marker>
        ))
    );
};

export default PoiMarkers;
