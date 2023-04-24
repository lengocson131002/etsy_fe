import type { FC } from 'react';
import type { RouteObject } from 'react-router';

import { lazy, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { useNavigate, useRoutes } from 'react-router-dom';

import { apiAccount } from '@/api/user.api';
import Dashboard from '@/pages/dashboard';
import LayoutPage from '@/pages/layout';
import LoginPage from '@/pages/login';
import { loadProfile } from '@/stores/user.action';
import { setUserItem } from '@/stores/user.store';
import { LocalStorageConstants } from '@/utils/constants';

import WrapperRouteComponent from './config';

const NotFound = lazy(() => import(/* webpackChunkName: "404'"*/ '@/pages/404'));
const Documentation = lazy(() => import(/* webpackChunkName: "404'"*/ '@/pages/doucumentation'));
const Guide = lazy(() => import(/* webpackChunkName: "guide'"*/ '@/pages/guide'));
const RoutePermission = lazy(() => import(/* webpackChunkName: "route-permission"*/ '@/pages/permission/route'));
const FormPage = lazy(() => import(/* webpackChunkName: "form'"*/ '@/pages/components/form'));

const ShopPage = lazy(() => import('@/pages/shop'));
const ListingPage = lazy(() => import('@/pages/listing'));
const OrderPage = lazy(() => import('@/pages/order'));
const StaffPage = lazy(() => import('@/pages/staff'));
const ShopDetail = lazy(() => import('@/pages/shop/shop-detail'));
const OrderDetailPage = lazy(() => import('@/pages/order/order-detail'));
const MessagePage = lazy(() => import('@/pages/conversation'));
const TaskPage = lazy(() => import('@/pages/task'));
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
        path: '',
        element: <Navigate to="dashboard" />,
      },
      {
        path: 'dashboard',
        element: <WrapperRouteComponent element={<Dashboard />} titleId="title.dashboard" />,
      },
      {
        path: 'documentation',
        element: <WrapperRouteComponent element={<Documentation />} titleId="title.documentation" />,
      },
      {
        path: 'shop',
        element: <WrapperRouteComponent element={<ShopPage />} titleId="title.shop" />,
      },
      {
        path: 'shop/:id',
        element: <WrapperRouteComponent element={<ShopDetail />} titleId="title.shop.detail" />,
      },
      {
        path: 'listing',
        element: <WrapperRouteComponent element={<ListingPage />} titleId="title.listings" />,
      },
      {
        path: 'order',
        element: <WrapperRouteComponent element={<OrderPage />} titleId="title.order" />,
      },
      {
        path: 'order/:id',
        element: <WrapperRouteComponent element={<OrderDetailPage />} titleId="title.order.detail" />,
      },
      {
        path: 'message',
        element: <WrapperRouteComponent element={<MessagePage />} titleId="title.message" />,
      },
      {
        path: 'staff',
        element: <WrapperRouteComponent element={<StaffPage />} titleId="title.staff" />,
      },
      {
        path: 'task',
        element: <WrapperRouteComponent element={<TaskPage />} titleId="title.task" />,
      },
      {
        path: 'profile',
        element: <WrapperRouteComponent element={<ProfilePage />} titleId="title.profile" />,
      },
      {
        path: 'permission/route',
        element: <WrapperRouteComponent element={<RoutePermission />} titleId="title.permission.route" auth />,
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

  useEffect(() => {
    if (location.pathname === '/login') {
      return;
    }

    const token = localStorage.getItem(LocalStorageConstants.ACCESS_TOKEN_KEY);
    console.log('TOKEN', token);

    if (!token) {
      navigate('/login');
      return;
    }

    const loadProfileInfo = async (token: string) => {
      const res = await dispatch(await loadProfile(token));

      if (!res) {
        navigate('/login');
      }
    };

    loadProfileInfo(token);

  }, [logged]);

  const element = useRoutes(routeList);
  return element;
};

export default RenderRouter;
