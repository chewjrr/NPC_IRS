import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

function Charts() {
  const [chartData, setChartData] = useState([]);

  const fetchJoinedData = useCallback(async () => {
    try {
      const residentsResponse = await axios.get('http://localhost:3000/residents/all');
      const addressesResponse = await axios.get('http://localhost:3000/addresses');

      const residents = residentsResponse.data;
      const addresses = addressesResponse.data;

      const joinedData = residents.map(resident => {
        const address = addresses.find(address => address.id === resident.address_id);
        return {
          ...resident,
          street: address?.street,
          district: address?.district,
        };
      });

      const districtDebtMap = joinedData.reduce((acc, resident) => {
        const { district, debt } = resident;
        if (!acc[district]) {
          acc[district] = 0;
        }
        acc[district] += parseFloat(debt);
        return acc;
      }, {});

      const formattedData = Object.entries(districtDebtMap).map(([district, debt]) => ({
        district,
        debt,
      }));

      setChartData(formattedData);
    } catch (error) {
      console.error('Error fetching joined data:', error);
    }
  }, []);

  useEffect(() => {
    fetchJoinedData();
  }, [fetchJoinedData]);

  useEffect(() => {
    let root = am5.Root.new('chartdiv');

    root.setThemes([
      am5themes_Animated.new(root)
    ]);

    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: 'panX',
        wheelY: 'zoomX',
        pinchZoomX: true
      })
    );

    let cursor = chart.set('cursor', am5xy.XYCursor.new(root, {
      behavior: 'zoomX'
    }));
    cursor.lineY.set('visible', false);

    let xRenderer = am5xy.AxisRendererX.new(root, {});
    xRenderer.grid.template.setAll({
      location: 0.5
    });

    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: 'district',
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {})
      })
    );

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {})
      })
    );

    let series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: 'Debt',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'debt',
        categoryXField: 'district',
        tooltip: am5.Tooltip.new(root, {
          labelText: '{valueY}'
        })
      })
    );

    xAxis.data.setAll(chartData);
    series.data.setAll(chartData);

    series.columns.template.setAll({
      tooltipText: '{categoryX}: {valueY}',
      width: am5.percent(90),
      tooltipY: 0
    });

    series.appear();
    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, [chartData]);

  return <div id="chartdiv" style={{ width: '90%', height: '500px' , margin: '80px 0px 0px 30px', backgroundColor: '#A5A5A5', borderRadius: '5px' }}></div>;
}

export default Charts;
