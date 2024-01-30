import React, { useEffect, useState } from 'react'
import ReactMapGL, { Marker } from 'react-map-gl'
import { Box } from '@mui/material';
import Supercluster from 'supercluster'
import { Avatar, Paper, Tooltip } from '@mui/material';

// styles
import './cluster.css'

// Context
import { useValue } from '../../context/ContextProvider'

// Actions
import { getRooms } from '../../actions/room'

const supercluster = new Supercluster({
  radius: 75,
  maxZoom: 20,
})

const ClusterMap = () => {
  const { state: { rooms }, dispatch, mapRef } = useValue()

  const [points, setPoints] = useState([]);
  const [clusters, setClusters] = useState([]);
  const [bounds, setBounds] = useState([-180, -85, 180, 85]);
  const [zoom, setZoom] = useState(0);

  useEffect(() => {
    getRooms(dispatch)
  }, [])

  useEffect(() => {
    const points = rooms.map((room) => ({
      type: 'Feature',
      properties: {
        cluster: false,
        roomId: room._id,
        price: room.price,
        title: room.title,
        description: room.description,
        lng: room.lng,
        lat: room.lat,
        images: room.images,
        uPhoto: room.uPhoto,
        uName: room.uName,
      },
      geometry: {
        type: 'Point',
        coordinates: [parseFloat(room.lng), parseFloat(room.lat)],
      },
    }));
    setPoints(points);
    console.log(rooms);
  }, [rooms])

  useEffect(() => {
    supercluster.load(points);
    setClusters(supercluster.getClusters(bounds, zoom));
  }, [points, zoom, bounds]);

  useEffect(() => {
    if (mapRef.current) {
      setBounds(mapRef.current.getMap().getBounds().toArray().flat());
    }
  }, [mapRef?.current]);

  return (
    <>
      <Box
        sx={{
          height: 600,
          position: 'relative',
        }}
      >
        <ReactMapGL
          mapboxAccessToken={import.meta.env.VITE_REACT_APP_MAP_TOKEN}
          initialViewState={{
            longitude: 51.505,
            latitude: -0.09,
          }}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          ref={mapRef}
          onZoomEnd={(e) => setZoom(Math.round(e.viewState.zoom))}
        >
          {clusters.map((cluster) => {
            const { cluster: isCluster, point_count } = cluster.properties
            const [longitude, latitude] = cluster.geometry.coordinates

            if (isCluster) {
              return (
                <Marker
                  key={`cluster-${cluster.id}`}
                  longitude={longitude}
                  latitude={latitude}
                >
                  <div
                    className='cluster-marker'
                    style={{
                      width: `${10 + (point_count / points.length) * 20}px`,
                      height: `${10 + (point_count / points.length) * 20}px`,
                    }}
                    onClick={() => {
                      const zoom = Math.min(
                        supercluster.getClusterExpansionZoom(cluster.id),
                        20
                      );
                      mapRef.current.flyTo({
                        center: [longitude, latitude],
                        zoom,
                        speed: 1,
                      });
                    }}
                  >
                    {point_count}
                  </div>
                </Marker>
              )
            }

            return (
              <Marker
                key={`room-${cluster.properties.roomId}`}
                longitude={longitude}
                latitude={latitude}
              >
                <Tooltip title={cluster.properties.uName}>
                  <Avatar
                    src={cluster.properties.uPhoto}
                    component={Paper}
                    elevation={2}
                  />
                </Tooltip>
              </Marker>
            );
          })}
        </ReactMapGL>
      </Box>
    </>

  )
}

export default ClusterMap