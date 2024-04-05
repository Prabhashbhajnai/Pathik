import {
    BottomNavigation,
    BottomNavigationAction,
    Box,
    Paper,
    IconButton
  } from '@mui/material';
  import { AddLocationAlt, Bed, LocationOn } from '@mui/icons-material';
  import { useEffect, useRef, useState } from 'react';
  import ClusterMap from './map/ClusterMap';
  import Rooms from './rooms/Rooms';
  import AddRoom from './addRoom/AddRoom';
import Protected from './protected/Protected';
import { useValue } from '../context/ContextProvider';
import { FaPlaceOfWorship } from "react-icons/fa"
import { useNavigate } from 'react-router-dom'
  
  const BottomNav = () => {
   const {state:{section}, dispatch}= useValue()
    const ref = useRef();
    useEffect(() => {
      ref.current.ownerDocument.body.scrollTop = 0;
    }, [section]);

    const navigate = useNavigate()

    return (
      <Box ref={ref}>
        {
          {
            0: <ClusterMap />,
            1: <Rooms />,
            2: <Protected><AddRoom /></Protected>,
          }[section]
        }
        <Paper
          elevation={3}
          sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 2 }}
        >
          <BottomNavigation
            showLabels
            value={section}
            onChange={(e, newValue) => dispatch({type:'UPDATE_SECTION',payload:newValue})}
          >
            <BottomNavigationAction label="Map" icon={<LocationOn />} />
            <BottomNavigationAction label="Rooms" icon={<Bed />} />
            <BottomNavigationAction label="Add" icon={<AddLocationAlt />} />
            <BottomNavigationAction 
              label="Points of Interest" 
              icon={<FaPlaceOfWorship className='h-6 w-6 text-[#666666]' />} 
              onClick={() => navigate('/placestovisit')}
            />
            {/* <div label='Points of Interest' size='large' onClick={() => navigate('/placestovisit')} className='flex flex-col justify-center items-center'>
                <FaPlaceOfWorship className='h-6 w-6 text-[#666666]' />
                <p className='text-xs text-[#666666]'>Points of Interest</p>
            </div> */}
          </BottomNavigation>
        </Paper>
      </Box>
    );
  };
  
  export default BottomNav;