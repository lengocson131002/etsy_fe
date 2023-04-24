import type { FC } from 'react';

import { Spin } from 'antd';

const BaseSpin: FC = props => {
  return <Spin {...props} />;
};

const MySpin = Object.assign(Spin, BaseSpin);

export default MySpin;
