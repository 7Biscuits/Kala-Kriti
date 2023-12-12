"use client";
import { Grid, Box } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
// components
import YearlyBreakup from "@/app/(DashboardLayout)/components/dashboard/YearlyBreakup";
import ProductPerformance from "@/app/(DashboardLayout)/components/dashboard/ProductPerformance";
import MonthlyEarnings from "@/app/(DashboardLayout)/components/dashboard/MonthlyEarnings";
import { useEffect, useState } from "react";

interface ApiResponse {
  mq2: string;
  quality: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

const fetchData = async (): Promise<ApiResponse> => {
  const response = await fetch("http://localhost:8080/api/data/latest");
  const data = await response.json();
  console.log(data);
  return data;
};

const Dashboard = () => {
  const [MQ2Value, setMQ2Value] = useState("0");
  const [quality, setQuality] = useState("");
  const [color, setColor] = useState("");

  useEffect(() => {
    const fetchDataInterval = setInterval(async () => {
      try {
        const data = await fetchData();
        setMQ2Value(data.mq2);
        setQuality(data.quality);
        console.log(data.mq2);
        if (parseInt(data.mq2) < 400) setColor("#2FAC5F");
        else if (parseInt(data.mq2) >= 400 && parseInt(data.mq2) <= 500)
          setColor("#1E90FF");
        else if (parseInt(data.mq2) > 500) setColor("#FF0000");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }, 5000);

    return () => clearInterval(fetchDataInterval);
  }, []);

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <YearlyBreakup mq2={MQ2Value} />
              </Grid>
              <Grid item xs={12}>
                <MonthlyEarnings quality={quality} color={color} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={8}>
            <ProductPerformance />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;