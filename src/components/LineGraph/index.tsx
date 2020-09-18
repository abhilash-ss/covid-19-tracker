import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";

import { getCovidHistory } from "../../services/api";

interface Props {
  caseType?: "cases" | "deaths" | "recovered";
}

interface IHistory {
  cases: { [key: number]: number }[];
  deaths: { [key: number]: number }[];
  recovered: { [key: number]: number }[];
}

const buildChartData = (
  data: any,
  caseType: "cases" | "deaths" | "recovered" = "cases"
) => {
  const chartData = [];
  let lastDataPoint: number | undefined;
  for (let date in data.cases) {
    if (lastDataPoint) {
      const newDataPoint = {
        x: date,
        y: data[caseType][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[caseType][date];
  }
  return chartData;
};

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      raadius: 0,
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
          callbacks: {
            label: (value: any, index: any, values: any) => {
              return numeral(value).format("0a");
            },
          },
        },
      },
    ],
  },
};

const LineGraph = (props: Props) => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchCovidHistory = async () => {
      const response: IHistory = await getCovidHistory(120);
      const chartData = buildChartData(response, props.caseType || "cases");
      setData(chartData);
    };

    fetchCovidHistory();
  }, [props.caseType]);

  return (
    <div>
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
