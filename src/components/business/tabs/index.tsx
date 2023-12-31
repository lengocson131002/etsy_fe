import type { TabPaneProps, TabsProps } from 'antd';
import type { FC } from 'react';

import { css } from '@emotion/react';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

export interface MyTabsOption extends Omit<TabPaneProps, 'tab' | 'key'> {
  label: string;
  value: string;
}

export interface MyTabsProps extends TabsProps {
  options: MyTabsOption[];
}

const BaseTabs: FC<MyTabsProps> = props => {
  const { options, children, ...rest } = props;

  return (
    <Tabs
      {...rest}
      css={styles}
      items={options.map(option => ({
        key: option.value,
        label: option.label,
        children: option.children,
      }))}
    />
  );
};

const MyTabs = Object.assign(BaseTabs, Tabs);

export default MyTabs;

const styles = css`
  // padding: 0 20px;
  height: 62px;
  .ant-tabs-nav {
    margin: 0;
    // box-shadow: 0 10px 10px -10px rgb(0 0 0 / 10%);
  }
  .ant-tabs-tab {
    padding: 20px 0;
    & + .ant-tabs-tab {
      margin: 0 0 0 42px;
    }
  }

  .ant-tabs-content {
    padding: 10px 0;
  }
`;
