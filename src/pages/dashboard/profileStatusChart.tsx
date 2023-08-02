import type { StatusCountItem } from '@/interface/dashboard';
import { FC} from 'react';

import { Card, Empty, theme } from 'antd';
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

import { useLocale } from '@/locales';
import { normalizeString } from '@/utils/string';
import { randomColor } from '@/utils/color';

const { useToken } = theme;

interface ProfileChartItem {
  status: string,
  count: number,
  label?: string;
}

interface ProfileStatusChart {
  items: ProfileChartItem[];
  loading: boolean;
}

const ProfileStatusChart: FC<ProfileStatusChart> = ({ items, loading }) => {
  const { token } = useToken();
  const { formatMessage } = useLocale();

  return (
    <div>
      <Card
        loading={loading}
        className="status-chart-card"
        title={"Profile status"}
      >
        <ResponsiveContainer height={210}>
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
                outerRadius={80}
                paddingAngle={0}
                dataKey="count"
                label={({ index }) => `${normalizeString(items[index].status)}: ${items[index].count}`}
              >
                {items.map((_, index) => (
                  <>
                    <Cell key={`cell-${index}`} fill={randomColor()} />
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

export default ProfileStatusChart;
