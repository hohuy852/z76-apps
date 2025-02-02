import React from "react";
import dynamic from "next/dynamic";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ApexOptions } from "apexcharts";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });
const StyledCard = styled(Card)(({ theme }) => ({
  width: "100%",
  margin: "0 auto", // Center the card horizontally
  boxShadow: theme.shadows[3],
}));

const CardHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const ChartWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const CustomChart: React.FC = () => {
  // Correctly type the options using ApexOptions
  const chartOptions: ApexOptions = {
    chart: {
      type: "line", // Must match one of the allowed types in ApexOptions
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    },
    stroke: {
      curve: "smooth",
    },
    colors: ["#1976d2"], // Primary color for the line
  };

  const chartSeries = [
    {
      name: "Sales",
      data: [10, 40, 35, 50, 49, 60],
    },
  ];

  return (
    <StyledCard>
      <CardHeader>
        <Typography variant="h6">Biểu đồ cập nhật dữ liệu theo tháng</Typography>
        <Typography variant="body2" color="text.secondary">
         Đã cập nhật 5 phút trước
        </Typography>
      </CardHeader>
      <CardContent>
        <ChartWrapper>
          <ReactApexChart
            options={chartOptions}
            series={chartSeries}
            type="line"
            height="300"
          />
        </ChartWrapper>
      </CardContent>
    </StyledCard>
  );
};

export default CustomChart;
