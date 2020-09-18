import React, { useEffect, useState } from "react";
import { Line, ChartData } from "react-chartjs-2";
import numeral from "numeral";

import { getCovidHistory } from "../../services/api";

interface Props {
  className?: string;
  casesType: "cases" | "deaths" | "recovered";
}

interface IHistory {
  cases: { [key: number]: number }[];
  deaths: { [key: number]: number }[];
  recovered: { [key: number]: number }[];
}

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: (tooltipItem: any, data: any) => {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          callback: (value: any, index: any, values: any) => {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

const buildChartData = (
  data: any,
  casesType: "cases" | "deaths" | "recovered" = "cases"
) => {
  const chartData = [];
  let lastDataPoint: number | undefined;
  for (let date in data.cases) {
    if (lastDataPoint) {
      const newDataPoint = {
        x: date,
        y: data[casesType][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[casesType][date];
  }
  return chartData;
};

const LineGraph = (props: Props) => {
  const [data, setData] = useState<ChartData<any>>([]);

  useEffect(() => {
    const fetchCovidHistory = async () => {
      const response: IHistory = await getCovidHistory(120);
      const chartData = buildChartData(response, props.casesType);
      setData(chartData);
    };

    fetchCovidHistory();
  }, [props.casesType]);

  return (
    <div className={props.className}>
      {data?.length && (
        <Line
          data={{
            datasets: [
              {
                backgroundColor: "rgba(204,16,52,0.5)",
                borderColor: "#CC1034",
                data: data,
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
  );
};

export default LineGraph;

// TODO: Fix type issues
