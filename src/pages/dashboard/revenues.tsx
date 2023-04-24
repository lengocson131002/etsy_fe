import type { RevenueStatisticItem } from '@/interface/dashboard';
import type { ColProps } from 'antd/es/col';
import type { FC } from 'react';

import { Badge, Card, Col, Empty, List, Radio, Row } from 'antd';
import { useEffect, useState } from 'react';
import { Cell, Label, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

import { useLocale } from '@/locales';
import { randomColor } from '@/utils/color';
import { numberWithCommas } from '@/utils/number';

type SortType = 'asc' | 'desc';

interface Values {
  name: {
    zh_CN: string;
    en_US: string;
  };
  value: number;
}

const wrapperCol: ColProps = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 12,
  xl: 12,
  xxl: 12,
};

const RevenueStatistic: FC<{ loading: boolean; data: RevenueStatisticItem[] }> = ({ loading, data }) => {
  const [colors, setColors] = useState<string[]>([]);
  const [revenueData, setRevenueData] = useState<RevenueStatisticItem[]>(data);
  const [sort, setSort] = useState<SortType>('asc');

  const { formatMessage } = useLocale();

  useEffect(() => {
    const colors = Array(revenueData.length)
      .fill(undefined)
      .map(_ => randomColor());
    const newData = data.sort((val1, val2) => (sort === 'asc' ? val1.value - val2.value : val2.value - val1.value));

    setColors(colors);
    setRevenueData(newData);
  }, [sort, data]);

  return (
    <Card className="salePercent" title={formatMessage({ id: 'app.dashboard.revenueStatistic' })} loading={loading}>
      <Radio.Group defaultValue={sort} buttonStyle="solid" onChange={e => setSort(e.target.value)}>
        <Radio.Button value="asc">Ascending</Radio.Button>
        <Radio.Button value="desc">Descending</Radio.Button>
      </Radio.Group>
      <Row gutter={20} className="revenue-statistic-wrapper">
        {data.length > 0 ? (
          <>
            <Col {...wrapperCol}>
              <ResponsiveContainer height={250}>
                <PieChart>
                  <Tooltip
                    content={({ active, payload }: any) => {
                      if (active) {
                        const { currency, currencySymbol, value } = payload[0].payload;
                        const total = revenueData.map(d => d.value).reduce((a, b) => a + b);
                        const percent = ((value / total) * 100).toFixed(2) + '%';

                        return (
                          <span className="customTooltip">
                            {currency}: {numberWithCommas(value)} {currencySymbol} | {percent}
                          </span>
                        );
                      }

                      return null;
                    }}
                  />
                  <Pie
                    strokeOpacity={1}
                    data={revenueData}
                    innerRadius={0}
                    outerRadius={100}
                    paddingAngle={0}
                    dataKey="value"
                    label
                  >
                    {revenueData.map((_, index) => (
                      <>
                        <Cell key={`cell-${index}`} fill={colors[index]} />
                      </>
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </Col>
            <Col {...wrapperCol}>
              <List<RevenueStatisticItem>
                bordered
                dataSource={revenueData}
                renderItem={(item, index) => {
                  const total = revenueData.map(d => d.value).reduce((a, b) => a + b);
                  const percent = ((item.value / total) * 100).toFixed(2) + '%';

                  return (
                    <List.Item>
                      <Badge color={colors[index]} />
                      <span>{item.currencyCode}</span> |{' '}
                      <span>
                        {numberWithCommas(item.value)} {item.currencySymbol} |
                      </span>{' '}
                      <span>{percent}</span>
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
