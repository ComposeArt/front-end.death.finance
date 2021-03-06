import React from "react";
import _ from "lodash";
import {
  useColorModeValue,
  Text,
  Box,
} from "@chakra-ui/react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const PowerDistribution = (props: any) => {
  const chartColor = useColorModeValue('#718096', 'rgba(255, 255, 255, 0.16)');
  const chartSoftColor = useColorModeValue('#A0AEC0', 'rgba(255, 255, 255, 0.08)');
  const chartBrightColor = useColorModeValue('#1A202C', 'white');

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    events: [],
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        }
      },
      y: {
        stacked: true,
        reverse: !!props.invert,
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          display: false,
        }
      },
    },
    plugins: {
      legend: {
        display: false,
        position: 'top' as const,
      }
    }
  };

  const seasonGroupedPower: any = {};

  let lessPower = 0;
  let morePower = 0;

  _.forEach(props.season.power_levels, (v, k) => {
    const key = _.floor(parseInt(k, 10) / 5) * 5;
    if (!seasonGroupedPower[key]) {
      seasonGroupedPower[key] = 0;
    }

    seasonGroupedPower[key] += v;

    if (props.fighter && key <= props.fighter.power) {
      lessPower++;
    }

    if (props.fighter && key > props.fighter.power) {
      morePower++;
    }
  });

  const collectionGroupedPower: any = {};

  if (props.isCollection) {
    _.forEach(props.collection.power_levels, (v, k) => {
      const key = _.floor(parseInt(k, 10) / 5) * 5;
      if (!collectionGroupedPower[key]) {
        collectionGroupedPower[key] = 0;
      }

      collectionGroupedPower[key] += v;
    });
  }

  const maxCollection = _.max(_.map(collectionGroupedPower, (p: any) => p));
  const maxSeason = _.max(_.map(seasonGroupedPower, (p: any) => p));

  const groupPower: any = {};
  const cGroupedPower: any = {};

  _.forEach(seasonGroupedPower, (v, k) => {
    groupPower[k] = v / maxSeason;
    cGroupedPower[k] = (collectionGroupedPower[k] || 0) / maxCollection;
  });

  const datasets = [];

  if (props.isCollection) {
    datasets.push({
      data: _.values(cGroupedPower),
      backgroundColor: _.chain(cGroupedPower).keys().map((p: any) => props.fighter && props.fighter.power >= parseInt(p, 10) ? chartBrightColor : chartColor).value(),
      borderRadius: {topLeft: 100, topRight: 100, bottomLeft: 100, bottomRight: 100},
    });
  } else {
    datasets.push(    {
      data: _.values(groupPower),
      backgroundColor: _.chain(groupPower).keys().map((p: any) => props.fighter && props.fighter.power >= parseInt(p, 10) ? chartBrightColor : chartColor).value(),
      borderRadius: {topLeft: 100, topRight: 100, bottomLeft: 100, bottomRight: 100},
    });
  }

  const chartData = {
    labels: _.keys(groupPower),
    datasets,
  };

  const percentile = lessPower / (morePower + lessPower) * 100;

  return (
    <>
      <Box textAlign="center" height="100px" marginTop={8} marginBottom={4}>
        <Bar
          options={chartOptions}
          data={chartData}
        />
      </Box>
      { props.fighter && (
        <Text fontSize={10} opacity={0.5}>
          {_.round(percentile, 2)} percentile
        </Text>
      )}
    </>
  );
};
