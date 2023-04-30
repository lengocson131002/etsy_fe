import type { FC, ReactElement } from 'react';
import type { RouteProps } from 'react-router';

import { useIntl } from 'react-intl';

import PrivateRoute from './privateRoute';
import { useSelector } from 'react-redux';
import { RoleCode } from '@/interface/permission/role.interface';

export type WrapperRouteProps = RouteProps & {
  /** document title locale id */
  titleId: string;
  /** authorization？ */
  allowedRoles?: RoleCode[];
};

const WrapperRouteComponent: FC<WrapperRouteProps> = ({ titleId, allowedRoles: allowRoles, ...props }) => {
  const { formatMessage } = useIntl();

  const { roles } = useSelector(state => state.user);

  if (titleId) {
    document.title = formatMessage({
      id: titleId,
    });
  }

  let isAuthorized = !allowRoles || allowRoles.some(role => roles.includes(role));

  return !isAuthorized ? <PrivateRoute {...props} /> : (props.element as ReactElement);
};

export default WrapperRouteComponent;
