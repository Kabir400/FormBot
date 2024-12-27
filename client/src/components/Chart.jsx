import React from "react";
import { PieChart } from "react-minimal-pie-chart";

function Chart({ starts = 0, completed = 0 }) {
  return (
    <div style={{ width: "200px", height: "200px" }}>
      <PieChart
        data={[
          { title: "Completed", value: completed, color: "#3B82F6" }, // Blue portion
          { title: "Pending", value: starts - completed, color: "#909090" }, // Grey portion
        ]}
        lineWidth={30}
        startAngle={270}
        rounded
      />
    </div>
  );
}

export default Chart;
