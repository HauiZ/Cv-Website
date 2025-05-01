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

const DashBoardChart = ({ counts }) => {
  // Data for the chart
  const data = [
    {
      name: "Overview",
      users: counts.users,
      candidates: counts.candidates,
      recruiters: counts.recruiters,
      news: counts.news,
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
          <Tooltip  />
          <Legend />

          {/* Each bar has sequential animation timing */}
          <Bar
            dataKey="users"
            name="Users"
            fill="url(#colorUsers)"
            animationDuration={1000}
            animationBegin={0}
            animationEasing="ease-out"
          />
          
          <Bar
            dataKey="candidates"
            name="Candidates"
            fill="url(#colorCandidates)"
            animationDuration={1000}
            animationBegin={300}
            animationEasing="ease-out"
          />
          
          <Bar
            dataKey="recruiters"
            name="Recruiters"
            fill="url(#colorRecruiters)"
            animationDuration={1000}
            animationBegin={600}
            animationEasing="ease-out"
          />
          
          <Bar
            dataKey="news"
            name="News"
            fill="url(#colorNews)"
            animationDuration={1000}
            animationBegin={900}
            animationEasing="ease-out"
          />

          {/* Gradient definitions */}
          <defs>
            <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.2} />
            </linearGradient>
            <linearGradient id="colorCandidates" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#fde047" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#facc15" stopOpacity={0.2} />
            </linearGradient>
            <linearGradient id="colorRecruiters" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6ee7b7" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0.2} />
            </linearGradient>
            <linearGradient id="colorNews" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#c084fc" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#a855f7" stopOpacity={0.2} />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashBoardChart;