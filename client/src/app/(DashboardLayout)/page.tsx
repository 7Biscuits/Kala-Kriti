"use client";
import { Grid, Box } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
// components
import MQ2 from "@/app/(DashboardLayout)/components/dashboard/MQ2";
import Data from "@/app/(DashboardLayout)/components/dashboard/Data";
import AirQuality from "@/app/(DashboardLayout)/components/dashboard/AirQuality";
import { ApiResponse } from "./interfaces/IApiResponse";
import { useEffect, useState } from "react";

const fetchData = async (): Promise<ApiResponse[]> => {
  const response = await fetch("http://localhost:8080/api/data/");
  const data = await response.json();
  return data;
};

const Dashboard = () => {
  const [MQ2Value, setMQ2Value] = useState("0");
  const [quality, setQuality] = useState("");
  const [color, setColor] = useState("");
  const [data, setData] = useState<ApiResponse[]>([]);

  useEffect(() => {
    const fetchDataOnce = async (): Promise<void> => {
      try {
        const res = await fetchData();
        setData(res);
        const latestData = res[res.length - 1];
        setMQ2Value(latestData.mq2);
        setQuality(latestData.quality);
        console.log(latestData.mq2);
        if (parseInt(latestData.mq2) < 200) setColor("#2FAC5F");
        else if (
          parseInt(latestData.mq2) >= 200 &&
          parseInt(latestData.mq2) <= 300
        )
          setColor("#1E90FF");
        else if (parseInt(latestData.mq2) > 300) setColor("#FF0000");
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };
    fetchDataOnce();
    const fetchDataInterval = setInterval(fetchDataOnce, 3000);

    return () => clearInterval(fetchDataInterval);
  }, []);

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <MQ2 mq2={MQ2Value} />
              </Grid>
              <Grid item xs={12}>
                <AirQuality quality={quality} color={color} dataMq2={data} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={8}>
            <Data data={data} />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;