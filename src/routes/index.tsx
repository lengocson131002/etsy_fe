import type { FC } from 'react';
import type { RouteObject } from 'react-router';

import { lazy, useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { useLocation, useNavigate, useParams, useRoutes } from 'react-router-dom';

import { apiAccount } from '@/api/user.api';
import Dashboard from '@/pages/dashboard';
import LayoutPage from '@/pages/layout';
import LoginPage from '@/pages/login';
import { loadProfile } from '@/stores/user.action';
import { LocalStorageConstants } from '@/utils/constants';

import WrapperRouteComponent from './config';
import ShopDetailPage from '@/pages/shop/shop-detail';
import HomePage from '@/pages/home';
import OrderDetailPage from '@/pages/order/order-detail';
import TeamDetailForm from '@/pages/components/team-form/team-detail-form';
import StaffDetailForm from '@/pages/staff/staff-form/staff-detail';
import ProfileDetailForm from '@/pages/profile/profile-detail';
import { Pathnames } from '@/utils/paths';
import { historyNavigation } from '@/utils/historyNavigation';

const NotFound = lazy(() => import(/* webpackChunkName: "404'"*/ '@/pages/404'));
const Documentation = lazy(() => import(/* webpackChunkName: "404'"*/ '@/pages/doucumentation'));
const Guide = lazy(() => import(/* webpackChunkName: "guide'"*/ '@/pages/guide'));
const RoutePermission = lazy(() => import(/* webpackChunkName: "route-permission"*/ '@/pages/permission/route'));
const FormPage = lazy(() => import(/* webpackChunkName: "form'"*/ '@/pages/components/form'));

const ShopPage = lazy(() => import('@/pages/shop'));
const ListingPage = lazy(() => import('@/pages/listing'));
const OrderPage = lazy(() => import('@/pages/order'));
const StaffPage = lazy(() => import('@/pages/staff'));
const MessagePage = lazy(() => import('@/pages/conversation'));
const TeamPage = lazy(() => import('@/pages/team'));
const ProfilePage = lazy(() => import('@/pages/profile'));

const routeList: RouteObject[] = [
  {
    path: '/login',
    element: <WrapperRouteComponent element={<LoginPage />} titleId="title.login" />,
  },
  {
    path: '/',
    element: <WrapperRouteComponent element={<LayoutPage />} titleId="" />,
    children: [
      {
        path: 'home',
        element: <Navigate to={'/'} />,
      },
      {
        path: '',
        element: <WrapperRouteComponent element={<HomePage />} titleId="title.home" />,
      },
      {
        path: 'dashboard',
        element: (
          <WrapperRouteComponent allowedRoles={['ROLE_ADMIN']} element={<Dashboard />} titleId="title.dashboard" />
        ),
      },
      {
        path: 'teams',
        element: <WrapperRouteComponent allowedRoles={['ROLE_ADMIN']} element={<TeamPage />} titleId="title.team" />,
      },
      {
        path: 'teams/:id',
        element: <WrapperRouteComponent allowedRoles={['ROLE_ADMIN']} element={<TeamDetailForm />} titleId="title.team" />,
      },
      {
        path: 'staffs',
        element: <WrapperRouteComponent allowedRoles={['ROLE_ADMIN']} element={<StaffPage />} titleId="title.staff" />,
      },
      {
        path: 'staffs/:id',
        element: <WrapperRouteComponent allowedRoles={['ROLE_ADMIN']} element={<StaffDetailForm />} titleId="title.staff" />,
      },
      {
        path: 'profiles',
        element: (
          <WrapperRouteComponent
            allowedRoles={['ROLE_ADMIN', 'ROLE_LEADER', 'ROLE_SELLER']}
            element={<ProfilePage />}
            titleId="title.profile"
          />
        ),
      },
      {
        path: 'profiles/:id',
        element: (
          <WrapperRouteComponent
            allowedRoles={['ROLE_ADMIN', 'ROLE_LEADER', 'ROLE_SELLER']}
            element={<ProfileDetailForm />}
            titleId="title.profile"
          />
        ),
      },
      {
        path: 'shops',
        element: (
          <WrapperRouteComponent
            allowedRoles={['ROLE_ADMIN', 'ROLE_LEADER', 'ROLE_SELLER']}
            element={<ShopPage />}
            titleId="title.shop"
          />
        ),
      },
      {
        path: 'shops/:id',
        element: (
          <WrapperRouteComponent
            allowedRoles={['ROLE_ADMIN', 'ROLE_LEADER', 'ROLE_SELLER']}
            element={<ShopDetailPage />}
            titleId="title.shop"
          />
        ),
      },
      {
        path: 'listings',
        element: (
          <WrapperRouteComponent
            allowedRoles={['ROLE_ADMIN', 'ROLE_LEADER', 'ROLE_SELLER']}
            element={<ListingPage />}
            titleId="title.listings"
          />
        ),
      },
      {
        path: 'orders',
        element: (
          <WrapperRouteComponent
            allowedRoles={['ROLE_ADMIN', 'ROLE_LEADER', 'ROLE_SELLER', 'ROLE_CS']}
            element={<OrderPage />}
            titleId="title.order"
          />
        ),
      },
      {
        path: 'orders/:id',
        element: (
          <WrapperRouteComponent
            allowedRoles={['ROLE_ADMIN', 'ROLE_LEADER', 'ROLE_SELLER', 'ROLE_CS']}
            element={<OrderDetailPage />}
            titleId="title.order.detail"
          />
        ),
      },
      {
        path: 'messages',
        element: (
          <WrapperRouteComponent
            allowedRoles={['ROLE_ADMIN', 'ROLE_LEADER', 'ROLE_SELLER', 'ROLE_CS']}
            element={<MessagePage />}
            titleId="title.message"
          />
        ),
      },
      {
        path: 'messages/:id',
        element: (
          <WrapperRouteComponent
            allowedRoles={['ROLE_ADMIN', 'ROLE_LEADER', 'ROLE_SELLER', 'ROLE_CS']}
            element={<MessagePage />}
            titleId="title.message"
          />
        ),
      },
      {
        path: 'permission/route',
        element: (
          <WrapperRouteComponent allowedRoles={[]} element={<RoutePermission />} titleId="title.permission.route" />
        ),
      },
      {
        path: '*',
        element: <WrapperRouteComponent element={<NotFound />} titleId="title.notFount" />,
      },
      {
        path: 'notfound',
        element: <WrapperRouteComponent element={<NotFound />} titleId="title.notFount" />,
      },
    ],
  },
];

const RenderRouter: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { logged } = useSelector(state => state.user);

  historyNavigation.navigate = useNavigate();
  historyNavigation.location = useLocation();

  useEffect(() => {
    if (location.pathname === Pathnames.LOGIN) {
      return;
    }

    const token = localStorage.getItem(LocalStorageConstants.ACCESS_TOKEN_KEY);

    if (!token) {
      navigate(Pathnames.LOGIN);
      return;
    }

    const loadProfileInfo = async (token: string) => {
      const res = await dispatch(await loadProfile(token));

      if (!res) {
        navigate(Pathnames.LOGIN);
      }
    };

    loadProfileInfo(token);
  }, [logged]);

  const element = useRoutes(routeList);
  return element;
};

export default RenderRouter;
