import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const OverViewChart = ({ counts }) => {
  const data = [
    {
      name: "Overview",
      recruitmentNews: counts.recruitmentNews,
      recruitmentNewsPosted: counts.recruitmentNewsPosted,
      numberApplicant: counts.numberApplicant,
    },
  ];

  return (
    <div className="w-full h-96">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
          barCategoryGap={30}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />

          <Bar
            dataKey="recruitmentNews"
            name="Tổng tin tuyển dụng"
            fill="#60a5fa"
            animationDuration={1000}
            animationBegin={0}
            animationEasing="ease-out"
          />
          <Bar
            dataKey="recruitmentNewsPosted"
            name="Đã đăng tuyển"
            fill="#34d399"
            animationDuration={1000}
            animationBegin={0}
            animationEasing="ease-out"
          />
          <Bar
            dataKey="numberApplicant"
            name="Ứng viên ứng tuyển"
            fill="#facc15"
            animationDuration={1000}
            animationBegin={0}
            animationEasing="ease-out"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OverViewChart;
