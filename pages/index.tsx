import * as React from "react";
import { HotTable, HotColumn } from "@handsontable/react-wrapper";
import { registerAllModules } from "handsontable/registry";
import "handsontable/styles/handsontable.css";
import "handsontable/styles/ht-theme-main.css";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
// register Handsontable's modules
registerAllModules();
import data from "../data/data.json";
import { Grid2 } from "@mui/material";
import CustomCard from "@/components/Card";
import CustomChart from "@/components/Chart";
import Head from "next/head";

export default function HomePage() {
  return (
    <div>
      <Head>
        <title>Tổng quan</title>
      </Head>
      <Grid2 container width="100%" spacing={2}>
        <Grid2 size={3}>
          <CustomCard
            subtitle="Hồ sơ đã duyệt"
            value={100}
            title=""
            additionalInfo="7 ngày qua"
            IconComponent={AssignmentTurnedInIcon}
          ></CustomCard>
        </Grid2>
        <Grid2 size={3}>
          <CustomCard
            subtitle="Hồ sơ chờ duyệt"
            value={100}
            title=""
            additionalInfo="7 ngày qua"
            IconComponent={HourglassBottomIcon}
          ></CustomCard>
        </Grid2>
        <Grid2 size={3}>
          <CustomCard
            subtitle="Hồ sơ đã duyệt"
            value={100}
            title=""
            additionalInfo="7 ngày qua"
            IconComponent={AssignmentTurnedInIcon}
          ></CustomCard>
        </Grid2>
        <Grid2 size={3}>
          <CustomCard
            subtitle="Hồ sơ đã duyệt"
            value={100}
            title=""
            additionalInfo="7 ngày qua"
            IconComponent={AssignmentTurnedInIcon}
          ></CustomCard>
        </Grid2>
      </Grid2>
      <Grid2 container width="100%" marginTop={3} size={12}>
        <CustomChart></CustomChart>
      </Grid2>
      <Grid2 container width="100%" marginTop={3} size={12}>
        <Grid2 size={6}>

        </Grid2>
        <Grid2 size={6}>
          
        </Grid2>
      </Grid2>
    </div>
  );
}

HomePage.requireAuth = true;
