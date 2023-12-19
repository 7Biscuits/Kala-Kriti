import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from "@mui/material/styles";
import { Stack, Typography, Avatar } from "@mui/material";
import { IconArrowDownRight } from "@tabler/icons-react";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import { ApiResponse } from "../../interfaces/IApiResponse";

const AirQuality = ({
  quality,
  color,
  dataMq2,
}: {
  quality: string;
  color: string;
  dataMq2: ApiResponse[];
}) => {
  // chart color
  const theme = useTheme();
  const secondary = theme.palette.secondary.main;
  const secondarylight = "#f5fcff";
  const errorlight = "#fdede8";

  // chart
  const optionscolumnchart = {
    chart: {
      type: "area",
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: "#adb0bb",
      toolbar: {
        show: false,
      },
      height: 60,
      sparkline: {
        enabled: true,
      },
      group: "sparklines",
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    fill: {
      colors: [secondarylight],
      type: "solid",
      opacity: 0.05,
    },
    markers: {
      size: 0,
    },
    tooltip: {
      theme: theme.palette.mode === "dark" ? "dark" : "light",
    },
  };
  const seriescolumnchart = [
    {
      name: "",
      color: secondary,
      data: dataMq2 && dataMq2.length
        ? [
            dataMq2[dataMq2.length - 1].mq2,
            dataMq2[dataMq2.length - 2].mq2,
            dataMq2[dataMq2.length - 3].mq2,
            dataMq2[dataMq2.length - 4].mq2,
            dataMq2[dataMq2.length - 5].mq2,
          ]
        : [10, 20, 30],
    },
  ];

  return (
    <DashboardCard
      title="Air Quality"
      action={
        <div
          style={{
            width: 50,
            height: 50,
            backgroundColor: color,
            borderRadius: 100,
          }}
        ></div>
      }
      footer={
        <Chart
          options={optionscolumnchart}
          series={seriescolumnchart}
          type="area"
          height="60px"
        ></Chart>
      }
    >
      <>
        <Typography variant="h1" fontWeight="700" mt="-20px">
          {quality}
        </Typography>
        <Stack direction="row" spacing={1} my={1} alignItems="center">
          <Avatar sx={{ bgcolor: errorlight, width: 27, height: 27 }}>
            <IconArrowDownRight width={20} color="#FA896B" />
          </Avatar>
        </Stack>
      </>
    </DashboardCard>
  );
};

export default AirQuality;
