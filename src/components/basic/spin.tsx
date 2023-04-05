import { Spin } from "antd";
import { FC } from "react";

const BaseSpin: FC = props => {
  return <Spin {...props} />
}

const MySpin = Object.assign(Spin, BaseSpin);

export default MySpin;
