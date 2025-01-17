import React, { useEffect, useRef,useState } from 'react';
import { createChart, CrosshairMode } from 'lightweight-charts';
import useWebSocket from '../../hooks/useWebSocket';
import { useTheme } from '@mui/material/styles';
import { CircularProgress, Box } from '@mui/material';

const RealTimeChart = () => {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const candlestickSeriesRef = useRef(null);
  const { data } = useWebSocket();
  const theme = useTheme();
  const [lastDate, setLastDate] = useState(null); 


  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Generate initial dummy data
  const generateInitialData = () => {
    const initialData = [];
    let currentDate = new Date();
    const baseTimestamp = Math.floor(new Date().getTime() / 1000) - 10 * 60; // 10 minutes ago
    let previousClose = 150; // Arbitrary starting price

    for (let i = 0; i < 10; i++) {
      const open = previousClose;
      const high = open + Math.random() * 5;
      const low = open - Math.random() * 5;
      const close = low + Math.random() * (high - low);

      initialData.push({
        time: formatDate(currentDate), // Increment timestamp by 1 minute
        open: Number(open.toFixed(2)),
        high: Number(high.toFixed(2)),
        low: Number(low.toFixed(2)),
        close: Number(close.toFixed(2)),
      });

      previousClose = close;
      currentDate.setDate(currentDate.getDate() + 1); 
    }

    setLastDate(currentDate); // Save the last date for further increments
    return initialData;
  };

  // Initialize the chart
  useEffect(() => {
    if (!chartContainerRef.current) return;

    chartRef.current = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.offsetWidth,
      height: 400,
      layout: {
        backgroundColor: theme.palette.background.paper,
        textColor: 'black',
      },
      grid: {
        vertLines: {
          color: theme.palette.divider,
        },
        horzLines: {
          color: theme.palette.divider,
        },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },

    });

    candlestickSeriesRef.current = chartRef.current.addCandlestickSeries({
      upColor: '#4CAF50',
      downColor: '#F44336',
      borderUpColor: '#4CAF50',
      borderDownColor: '#F44336',
      wickUpColor: '#4CAF50',
      wickDownColor: '#F44336',
    });

    // Set initial dummy data
    const initialData = generateInitialData();
    candlestickSeriesRef.current.setData(initialData);

    // Fit the chart content to the data and scroll to the most recent data
    chartRef.current.timeScale().fitContent();

    return () => {
      if (chartRef.current) {
        chartRef.current.remove();
      }
    };
  }, [theme]);

  // Update chart with real-time data
  useEffect(() => {
    if (data && candlestickSeriesRef.current) {
      const newDate = new Date(lastDate);
      const newDataPoint = {
        time: data.time, // UNIX timestamp
        open: Number(data.open),
        high: Number(data.high),
        low: Number(data.low),
        close: Number(data.close),
      };

      candlestickSeriesRef.current.update(newDataPoint);
      

      // Scroll to the latest data point
      chartRef.current.timeScale().scrollToPosition(0, true);
    }
  }, [data]);

  return (
    <Box sx={{ position: 'relative', width: '100%', height: '400px' }}>
      {!data && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <CircularProgress />
        </Box>
      )}
      <div ref={chartContainerRef}></div>
    </Box>
  );
};

export default RealTimeChart;
