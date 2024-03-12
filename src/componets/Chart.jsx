import React from 'react';
import ReactApexChart from 'react-apexcharts';

export const Chart = ({ series, title }) => {

  const options = {
    chart: {
      height: 390,
      type: 'rangeBar',
      zoom: {
        enabled: false
      },
    },
    colors: ['#EC7D31', '#36BDCB'],
    plotOptions: {
      bar: {
        horizontal: true,
        isDumbbell: true,
        dumbbellColors: [['#EC7D31', '#36BDCB']]
      }
    },
    title: {
      text: `${title}`,
      align: 'center',
      margin: 20,
      style: {
        fontSize: '20px',
        color: '#222831'
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        gradientToColors: ['#36BDCB'],
        inverseColors: false,
        stops: [0, 100]
      }
    },
    grid: {
      borderColor: '#222831',
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: false
        }
      }
    //Cambiarle el color a la barra del eje Y
    

    },
  };
  return (
    <div>
      <div id="chart">
        <ReactApexChart options={options} series={series} type="rangeBar" height={390} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};
