import type { FC } from 'react';
import type { RouteProps } from 'react-router';

import { Button, Result } from 'antd';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';

import { useLocale } from '@/locales';

const PrivateRoute: FC<RouteProps> = props => {
  const navigate = useNavigate();
  const { formatMessage } = useLocale();
  const location = useLocation();

  return (
    <Result
      status="403"
      title="403"
      subTitle={formatMessage({ id: 'gloabal.tips.unauthorized' })}
      extra={
        <Button
          type="primary"
          onClick={() => navigate("/")}
        >
          {formatMessage({ id: 'gloabal.tips.goToHome' })}
        </Button>
      }
    />
  );
};

export default PrivateRoute;
