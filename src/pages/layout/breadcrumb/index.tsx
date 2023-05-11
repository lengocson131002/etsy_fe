import { FC } from 'react';
import './index.less';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Breadcrumb, Button, Card, Divider } from 'antd';
import BreadcrumbItem from 'antd/es/breadcrumb/BreadcrumbItem';
import { normalizeString } from '@/utils/string';
import { AiOutlineHome, AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

const BreadCrumbsComponent: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { pathname } = location;
  const pathnames = pathname.split('/').filter(item => item);

  const onBack = () => {
    navigate(-1);
  };

  const onForward = () => {
    navigate(1);
  };

  return (
    <div>
      <>
        <Card className="breadcrumb-wrapper-card" bordered={false}>
          <div className="breadcrumb-wrapper">
            <span className="back-button-icon" onClick={onBack}>
              <AiOutlineLeft />
            </span>
            <Breadcrumb className="breadcrumb">
              <Breadcrumb.Item>
                <Link to={'/'}>Home</Link>
              </Breadcrumb.Item>
              {pathnames.map((item, index) => {
                const route = `/${pathnames.slice(0, index + 1).join('/')}`;
                const isLast = index === pathname.length - 1;

                return isLast ? (
                  <Breadcrumb.Item>{normalizeString(item)}</Breadcrumb.Item>
                ) : (
                  <Breadcrumb.Item>
                    <Link to={route}>{normalizeString(item)}</Link>
                  </Breadcrumb.Item>
                );
              })}
            </Breadcrumb>
            <span className="back-button-icon" onClick={onForward}>
              <AiOutlineRight />
            </span>
          </div>
        </Card>
      </>
    </div>
  );
};

export default BreadCrumbsComponent;
