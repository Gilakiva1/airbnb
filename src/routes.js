import { HomePage } from './pages/HomePage';
import { TripPage } from './pages/TripPage';
import { StayDetails } from './pages/StayDetails';
import { StayList } from './pages/StayList';

const routes = [
  {
    path: '/stay/:stayId',
    component: StayDetails
  },
  {
    path: '/stay',
    component: StayList
  },
  {
    path: '/trip',
    component: TripPage
  },

  {
    path: '/',
    component: HomePage,
  },


];

export default routes;
