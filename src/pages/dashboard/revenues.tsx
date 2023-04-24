import type { RevenueStatisticItem } from '@/interface/dashboard';
import type { ColProps } from 'antd/es/col';
import type { FC } from 'react';

import { Badge, Card, Col, Empty, List, Radio, Row, Tag } from 'antd';
import { useEffect, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Label,
  LabelList,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { useLocale } from '@/locales';
import { randomColor } from '@/utils/color';
import { numberWithCommas } from '@/utils/number';
import { theme } from 'antd';
import { normalizeString } from '@/utils/string';

const { useToken } = theme;

type SortType = 'asc' | 'desc';

const wrapperCol: ColProps = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 12,
  xl: 12,
  xxl: 12,
};

interface CustomTooltipProps {
  active: any;
  payload: any;
  label: any;
  unit?: any;
}

interface RevenueChartItem extends RevenueStatisticItem {
  label?: string
}

const CustomTooltip: FC<CustomTooltipProps> = ({ active, payload, label, unit }) => {
  if (active && payload && payload.length) {
    return (
      <div className="chart-tooltip">
        <span className="chart-tooltip-label">{`${numberWithCommas(payload[0].value)}  ${normalizeString(
          label,
        )}`}</span>
      </div>
    );
  }

  return null;
};

const RevenueStatistic: FC<{ loading: boolean; data: RevenueStatisticItem[] }> = ({ loading, data }) => {
  const [colors, setColors] = useState<string[]>([]);
  const [revenueData, setRevenueData] = useState<RevenueChartItem[]>([]);
  const [sort, setSort] = useState<SortType>('asc');
  const { token } = useToken();

  const { formatMessage } = useLocale();

  useEffect(() => {
    const newData = data
        .map(item => ({
          ...item,
          label: `${numberWithCommas(item.value)}${item.currencySymbol}`
        }))
        .sort((val1, val2) => (sort === 'asc' ? val1.value - val2.value : val2.value - val1.value));

    setRevenueData(newData);
  }, [sort, data]);

  return (
    <Card
      className="revenue-statistic-card"
      title={formatMessage({ id: 'app.dashboard.revenueStatistic' })}
      loading={loading}
    >
      <Radio.Group defaultValue={sort} buttonStyle="solid" onChange={e => setSort(e.target.value)}>
        <Radio.Button value="asc">Ascending</Radio.Button>
        <Radio.Button value="desc">Descending</Radio.Button>
      </Radio.Group>
      <Row gutter={20} className="revenue-statistic-wrapper">
        {data.length > 0 ? (
          <>
            <Col {...wrapperCol}>
              <ResponsiveContainer height={320}>
                <BarChart
                  margin={{ top: 40, right: 20, bottom: 20, left: 40 }}
                  className="revenue-chart"
                  data={revenueData}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="currencyCode" allowDecimals={true} />
                  <YAxis />
                  <Tooltip content={<CustomTooltip active={''} payload={''} label={''} />} />
                  <Bar dataKey="value" barSize={40} fill={token.colorPrimary} name="Status">
                    <LabelList dataKey="label" position="top" style={{color: token.colorPrimary}}/>
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Col>
            <Col {...wrapperCol}>
              <List<RevenueStatisticItem>
                bordered
                dataSource={revenueData}
                renderItem={(item, index) => {
                  return (
                    <List.Item>
                      <div>
                        <Tag color="blue">{item.currencyCode}</Tag>
                        <span>
                          {numberWithCommas(item.value)} {item.currencySymbol}
                        </span>
                      </div>
                    </List.Item>
                  );
                }}
              />
            </Col>
          </>
        ) : (
          <Empty style={{ margin: 'auto' }} image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </Row>
    </Card>
  );
};

export default RevenueStatistic;
