import { Image } from "antd";
import { FC } from "react";
import Logo from '@/assets/logo/logo.png';
import './index.less'

const HomePage: FC = () => {
  return <div className="home-logo-wrapper">
    <Image className="home-logo" width={"30%"} src={Logo} preview={false}/>
  </div>
}

export default HomePage;
