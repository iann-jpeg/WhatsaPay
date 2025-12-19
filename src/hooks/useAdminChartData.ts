import { useState, useEffect } from "react";

export function useAdminChartData() {
  const [userGrowth, setUserGrowth] = useState([
    { date: "Dec 13", users: 12000 },
    { date: "Dec 14", users: 12100 },
    { date: "Dec 15", users: 12250 },
    { date: "Dec 16", users: 12300 },
    { date: "Dec 17", users: 12400 },
    { date: "Dec 18", users: 12480 },
    { date: "Dec 19", users: 12500 },
  ]);
  const [liquidityTrend, setLiquidityTrend] = useState([
    { date: "Dec 13", kes: 11000000 },
    { date: "Dec 14", kes: 11200000 },
    { date: "Dec 15", kes: 11500000 },
    { date: "Dec 16", kes: 11700000 },
    { date: "Dec 17", kes: 11800000 },
    { date: "Dec 18", kes: 11900000 },
    { date: "Dec 19", kes: 12000000 },
  ]);
  return { userGrowth, liquidityTrend };
}
