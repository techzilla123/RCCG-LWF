import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function UsersChart() {
  return (
    <div style={{ padding: '16px', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #d1d5db', maxWidth: '600px' }}>
      
      {/* Header and Legend */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        {/* Title */}
        <div>
          <div style={{ fontSize: '16px', fontWeight: '600', color: '#000' }}>Users</div>
          <div style={{ fontSize: '12px', color: '#6b7280' }}>Over the past week</div>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '8px', height: '8px', backgroundColor: '#1e3a8a', borderRadius: '50%' }}></span>
              <span style={{ fontSize: '12px', color: '#6b7280' }}>Peak</span>
            </div>
            <div style={{ fontSize: '12px', fontWeight: '600', color: '#000' }}>902,020</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '8px', height: '8px', backgroundColor: '#4b5563', borderRadius: '50%' }}></span>
              <span style={{ fontSize: '12px', color: '#6b7280' }}>Average</span>
            </div>
            <div style={{ fontSize: '12px', fontWeight: '600', color: '#000' }}>760,200</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '8px', height: '8px', backgroundColor: '#10b981', borderRadius: '50%' }}></span>
              <span style={{ fontSize: '12px', color: '#6b7280' }}>Active</span>
            </div>
            <div style={{ fontSize: '12px', fontWeight: '600', color: '#000' }}>800,000</div>
          </div>
        </div>
      </div>

      {/* Bar Chart */}
      <BarChart
        xAxis={[{ scaleType: 'band', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] }]}
        series={[{
          data: [800, 900, 600, 750, 600, 850, 800],
          label: 'Active Users',
          color: '#10b981',  // Set the color to green
        }]}
        width={500}
        height={300}
      />
    </div>
  );
}
