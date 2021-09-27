import { HomePage } from './pages/HomePage';
import { StayDetails } from './pages/StayDetails';
import { StayList } from './pages/StayList';

const routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path:'/stay',
    component:StayList
  },
  {
    path:'/stay/:stayId',
    component:StayDetails
  }
];

export default routes;
