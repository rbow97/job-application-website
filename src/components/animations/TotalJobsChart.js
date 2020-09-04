import React from "react";
import "./TotalJobsChart.scss";
import { PieChart, Pie, Cell } from "recharts";

const TotalJobsChart = (props) => {
  console.log(props.data);
  let appliedLength = 0;
  let rejectedLength = 0;
  let interviewLength = 0;
  let pieWidth = 200;

  props.data.filter((el) => (el.status === "Applied" ? appliedLength++ : null));
  props.data.filter((el) =>
    el.status === "Rejected" ? rejectedLength++ : null
  );
  props.data.filter((el) =>
    el.status === "Interview Process" ? interviewLength++ : null
  );

  const checkSize = () => {
    if (window.screen.width < 1200) {
      pieWidth = 150;
    } else {
      pieWidth = 200;
    }
    console.log(pieWidth);
    return pieWidth;
  };

  window.onresize = checkSize;

  const data = [
    { name: "Group A", value: appliedLength },
    { name: "Group B", value: rejectedLength },
    { name: "Group C", value: interviewLength },
  ];
  const COLORS = ["#2c861e", "#de4040", "#fa8e10"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <PieChart className="pie-chart" width={300} height={200}>
      <Pie
        classname="test"
        data={data}
        // cx={300}
        // cy={200}
        labelLine={false}
        outerRadius={100}
        fill="#8884d8"
      >
        {data.map((entry, index) => (
          <Cell fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
};

export default TotalJobsChart;
