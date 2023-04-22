import { StatusCountItem } from '@/interface/dashboard';
import { FC } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { Card, Empty, theme } from 'antd';
import { Tooltip } from 'recharts';
import { normalizeString } from '@/utils/string';
import { useLocale } from '@/locales';

import { Typography } from 'antd';

const { Text } = Typography;

const { useToken } = theme;

interface CustomTooltipProps {
  active: any;
  payload: any;
  label: any;
}

const CustomTooltip: FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="chart-tooltip">
        <Text className="chart-tooltip-label">{`${normalizeString(label)} : ${payload[0].value}`} shops</Text>
      </div>
    );
  }

  return null;
};

interface StatusChartProps {
  items: StatusCountItem[];
  loading: boolean;
}
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
        <ResponsiveContainer width={'100%'} height={180}>
          {items.length > 0 ? (
            <BarChart
              className="status-chart"
              data={items}
              margin={{
                left: -20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="status" />
              <YAxis />
              <Tooltip content={<CustomTooltip active={''} payload={''} label={''} />} />
              <Bar dataKey="count" barSize={40} fill={token.colorPrimary} name="Status" />
            </BarChart>
          ) : (
            <Empty style={{ margin: 'auto' }} image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default StatusChart;
