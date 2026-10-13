
import React from "react";
import { motion } from "motion/react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function AreaGraphCard({ title, data, count, color, index }) {
  const chartData = (data || []).map((item, i) => ({
    name: item.skill || item.name || `Interview ${i + 1}`,
    score: Math.min(100, Math.max(0, Number(item.score) || 0)),
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5"
    >
      <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
      <p className="mt-1 text-xs text-gray-500">
        Interview score progress
      </p>

      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart
            data={chartData}
            margin={{ top: 15, right: 10, left: -20, bottom: 5 }}
          >
            <defs>
              <linearGradient id={`gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.35} />
                <stop offset="95%" stopColor={color} stopOpacity={0.02} />
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke="#eeeeee"
              strokeDasharray="4 4"
              vertical={false}
            />

            <XAxis
              dataKey="name"
              tick={{ fill: "#6b7280", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              domain={[0, 100]}
              tick={{ fill: "#6b7280", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              formatter={(value) => [`${value}%`, "Score"]}
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
                fontSize: "12px",
              }}
            />

            <Area
              type="monotone"
              dataKey="score"
              stroke={color}
              strokeWidth={2.5}
              fill={`url(#gradient-${index})`}
              activeDot={{ r: 5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex h-[250px] items-center justify-center rounded-lg bg-gray-50">
          <p className="text-sm text-gray-400">
            No interview data available yet
          </p>
        </div>
      )}

      <div className="mt-3 border-t border-gray-100 pt-3 text-xs text-gray-500">
        Total interviews:{" "}
        <span className="font-semibold text-gray-900">
          {count ?? 0}
        </span>
      </div>
    </motion.div>
  );
}

function InterviewGraph({
  technicalData,
  hrData,
  technicalCount,
  hrCount,
}) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <AreaGraphCard
        title="Technical Interviews"
        data={technicalData}
        count={technicalCount}
        color="#111827"
        index={0}
      />

      <AreaGraphCard
        title="HR Interviews"
        data={hrData}
        count={hrCount}
        color="#ab2552"
        index={1}
      />
    </div>
  );
}

export default InterviewGraph;
