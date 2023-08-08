import type { StatusCountItem } from '@/interface/dashboard';
import { FC } from 'react';

import { Card, Col, ColProps, Empty, List, Row, Tag, theme } from 'antd';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

import { useLocale } from '@/locales';
import { normalizeString } from '@/utils/string';
import { getProfileStatusColor, randomColor } from '@/utils/color';
import { ProfileStatus } from '@/components/core/table-column/type';
import { numberWithCommas } from '@/utils/number';

const { useToken } = theme;

interface ProfileChartItem {
  status: string;
  count: number;
  label?: string;
}

const wrapperCol: ColProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 12,
  xxl: 12,
};

interface ProfileStatusChart {
  items: ProfileChartItem[];
  loading: boolean;
}

const ProfileStatusChart: FC<ProfileStatusChart> = ({ items, loading }) => {
  items = items.sort((s1, s2) => s2.count - s1.count)
  const { token } = useToken();
  const { formatMessage } = useLocale();
  return (
    <div>
      <Card loading={loading} className="status-chart-card" title={'Profile status'}>
        {items.length > 0 ? (
          <Row align={'middle'}>
            <Col {...wrapperCol} style={{
              display: 'flex',
              alignItems: 'center'
            }}>
              <ResponsiveContainer height={250}>
                <PieChart>
                  <Tooltip
                    content={({ active, payload }: any) => {
                      if (active) {
                        const { status, count } = payload[0].payload;
                        const total = items.map(d => d.count).reduce((a, b) => a + b);
                        const percent = total !== 0 ? ((count / total) * 100).toFixed(2) + '%' : 0;

                        return (
                          <span className="customTooltip">
                            {normalizeString(status)}: {count} | {percent}
                          </span>
                        );
                      }

                      return null;
                    }}
                  />
                  <Pie
                    strokeOpacity={1}
                    data={items}
                    innerRadius={0}
                    outerRadius={100}
                    paddingAngle={0}
                    dataKey="count"
                    // label={({ index }) => `${normalizeString(items[index].status)}: ${items[index].count}`}
                  >
                    {items.map((_, index) => (
                      <>
                        <Cell key={`cell-${index}`} fill={getProfileStatusColor(_.status)} />
                      </>
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </Col>
            <Col {...wrapperCol}>
              <List<ProfileChartItem>
                bordered
                dataSource={items}
                renderItem={(item, index) => {
                  const { status, count } = item;
                  const total = items.map(d => d.count).reduce((a, b) => a + b);
                  const percent = total !== 0 ? ((count / total) * 100).toFixed(2) + '%' : 0;

                  return (
                    <List.Item key={status}>
                      <div style={{ width: 100 }}>
                        <Tag color={getProfileStatusColor(status)}>{normalizeString(status)}</Tag>
                      </div>
                      <div>{numberWithCommas(count)}</div>
                      <div>{percent}</div>
                    </List.Item>
                  );
                }}
              />
            </Col>
          </Row>
        ) : (
          <Empty style={{ margin: 'auto' }} image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </Card>
    </div>
  );
};

export default ProfileStatusChart;
