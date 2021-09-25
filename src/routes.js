import { HomePage } from './pages/HomePage';
import { StayList } from './pages/StayList';

const routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path:'/stay',
    component:StayList
  }
];

export default routes;
