import type { StatusCountItem } from '@/interface/dashboard';
import { FC, useEffect, useState } from 'react';

import { Card, Empty, theme, Typography } from 'antd';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Label,
  LabelList,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { useLocale } from '@/locales';
import { normalizeString } from '@/utils/string';
import { randomColor } from '@/utils/color';

const { Text } = Typography;

const { useToken } = theme;

interface StatusChartItem extends StatusCountItem {
  label?: string;
}

interface StatusChartProps {
  items: StatusChartItem[];
  loading: boolean;
}
const getStatusColor = (status: string): string => {
  if (status === 'active') {
    return '#37b24d';
  } else if (status === 'vacation') {
    return '#fcc419';
  } else if (status === 'suspended') {
    return '#e03131';
  } else {
    return randomColor();
  }
};

const StatusChart: FC<StatusChartProps> = ({ items, loading }) => {
  const { token } = useToken();
  const { formatMessage } = useLocale();

  return (
    <div>
      <Card
        loading={loading}
        className="status-chart-card"
        title={formatMessage({ id: 'app.dashboard.statusStatistic' })}
      >
        <ResponsiveContainer height={180}>
          {items.length > 0 ? (
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
                outerRadius={70}
                paddingAngle={0}
                dataKey="count"
                label={({ index }) => `${normalizeString(items[index].status)}: ${items[index].count}`}
              >
                {items.map((_, index) => (
                  <>
                    <Cell key={`cell-${index}`} fill={getStatusColor(items[index].status)} />
                  </>
                ))}
              </Pie>
            </PieChart>
          ) : (
            <Empty style={{ margin: 'auto' }} image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default StatusChart;
