import { BarChart } from "@mui/x-charts/BarChart";
import Button from "../Utils/Button.jsx";
import { useEffect, useState } from "react";
import Loader from "../Utils/Loader.jsx";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";

const chartSetting = {
  xAxis: [
    {
      label: "Number of Makes",
    },
  ],
  width: 280,
  height: 500,
};

const valueFormatter = (value) => `${value}`;

export default function MakeChart({ make, filter }) {
  function filterItems() {}

  console.log(make);
  return (
    <div>
      <Button>
        <HiAdjustmentsHorizontal />
      </Button>
      {make.length ? (
        <BarChart
          dataset={make}
          yAxis={[{ scaleType: "band", dataKey: "Make" }]}
          series={[{ dataKey: "Count", valueFormatter }]}
          layout="horizontal"
          grid={{ vertical: true }}
          {...chartSetting}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
