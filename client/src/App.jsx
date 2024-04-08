import { BrowserRouter, Route, Routes } from "react-router-dom"

// Components
import Notification from './components/Notification'
import Loading from './components/Loading'
import Room from './components/rooms/Room';

// Pages
import Dashboard from "./pages/dashboard/Dashboard";
import Home from "./pages/Home";
import PointsOfInterest from "./pages/PointsOfInterest/PointsOfInterest";

const App = () => {
    return (
        <>
            <Loading />
            <Notification />
            <BrowserRouter>
                <Routes>
                    <Route path='dashboard/*' element={<Dashboard />} />
                    <Route path='*' element={<Home />} />
                    <Route path="placestovisit/*" element={<PointsOfInterest />} />
                </Routes>
            </BrowserRouter>
            <Room />
        </>
    );
};

export default App;