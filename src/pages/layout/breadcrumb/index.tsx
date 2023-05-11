import { FC } from 'react';
import './index.less';
import { Link, useLocation } from 'react-router-dom';
import { Breadcrumb, Card, Divider } from 'antd';
import BreadcrumbItem from 'antd/es/breadcrumb/BreadcrumbItem';
import { normalizeString } from '@/utils/string';
import { AiOutlineHome } from 'react-icons/ai';

const BreadCrumbsComponent: FC = () => {
  const location = useLocation();

  const { pathname } = location;
  const pathnames = pathname.split('/').filter(item => item);

  return (
    <div>
      {pathnames?.length > 0 && (
        <>
          <Card className="breadcrumb-wrapper" bordered={false}>
            <Breadcrumb>
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
          </Card>
        </>
      )}
    </div>
  );
};

export default BreadCrumbsComponent;
