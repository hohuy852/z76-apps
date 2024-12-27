import * as React from "react";
import { Grid2 } from "@mui/material";
import Handsontable from "handsontable/base";
import { registerAllModules } from "handsontable/registry";

import "handsontable/styles/handsontable.min.css";
import "handsontable/styles/ht-theme-main.min.css";
registerAllModules();
import { HotTable } from "@handsontable/react-wrapper";

export default function OrdersPage() {
  return (
    <Grid2 container spacing={2}>
      <Grid2 size={12}></Grid2>
      <Grid2 size={6}>
        <HotTable
          data={[
            ["", "Tesla", "Volvo", "Toyota", "Ford"],
            ["2019", 10, 11, 12, 13],
            ["2020", 20, 11, 14, 13],
            ["2021", 30, 15, 12, 13],
          ]}
          rowHeaders={true}
          colHeaders={true}
          height="auto"
          autoWrapRow={true}
          autoWrapCol={true}
          licenseKey="non-commercial-and-evaluation" // for non-commercial use only
        />
      </Grid2>
      <Grid2 size={6}>
        <HotTable
          data={[
            ["", "Tesla", "Volvo", "Toyota", "Ford"],
            ["2019", 10, 11, 12, 13],
            ["2020", 20, 11, 14, 13],
            ["2021", 30, 15, 12, 13],
          ]}
          rowHeaders={true}
          colHeaders={true}
          height="auto"
          autoWrapRow={true}
          autoWrapCol={true}
          licenseKey="non-commercial-and-evaluation" // for non-commercial use only
        />
      </Grid2>
    </Grid2>
  );
}

OrdersPage.requireAuth = true;
