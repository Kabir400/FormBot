import React from "react";
import { PieChart } from "react-minimal-pie-chart";

function Chart() {
  return (
    <div style={{ width: "200px", height: "200px" }}>
      <PieChart
        data={[
          { title: "Completed", value: 250, color: "#3B82F6" }, // Blue portion
          { title: "Pending", value: 65, color: "#909090" }, // Grey portion
        ]}
        lineWidth={30}
        startAngle={270}
        rounded
      />
    </div>
  );
}

export default Chart;
