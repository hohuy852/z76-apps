import * as React from "react";
import { Button, Grid2, Stack } from "@mui/material";
import { HotTable, HotColumn } from "@handsontable/react-wrapper";
import { registerAllModules } from "handsontable/registry";
import "handsontable/styles/handsontable.css";
import "handsontable/styles/ht-theme-main.css";
import { data, headers } from "../constants";
import UploadButton from "@/components/UploadButton";
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
// register Handsontable's modules
registerAllModules();

export default function OrdersPage() {
  return (
    <Grid2 container height="100%" spacing={2}>
      <Grid2 size={12}>
        <Stack
          direction="row"
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <UploadButton content="Upload" action={() => {}} />
          <Button variant="contained">Filter</Button>
          <Button startIcon={<CloudDownloadIcon />} variant="contained">Download</Button>
         
        </Stack>
      </Grid2>
      <Grid2 size={6}>
        <HotTable
          data={data}
          autoColumnSize
          themeName="ht-theme-main-dark-auto"
          height="100%"
          width="100%"
          colHeaders={headers}
          contextMenu={[
            "cut",
            "copy",
            "---------",
            "row_above",
            "row_below",
            "remove_row",
            "---------",
            "alignment",
            "make_read_only",
            "clear_column",
          ]}
          dropdownMenu={true}
          hiddenColumns={{
            indicators: true,
          }}
          multiColumnSorting={true}
          filters={true}
          rowHeaders={true}
          headerClassName="htLeft"
          manualRowMove={true}
          autoWrapRow={true}
          autoWrapCol={true}
          manualRowResize={true}
          manualColumnResize={true}
          navigableHeaders={true}
          licenseKey="non-commercial-and-evaluation"
        >
          <HotColumn data={1} />
          <HotColumn data={3} />
          <HotColumn data={4} type="date" allowInvalid={false} />
          <HotColumn data={6} type="checkbox" className="htCenter" />
          <HotColumn data={7} type="numeric" />
          <HotColumn data={5} />
          <HotColumn data={2} />
        </HotTable>
      </Grid2>
      <Grid2 size={6}>
        <HotTable
          data={data}
          autoColumnSize
          height="100%"
          width="100%"
          colHeaders={headers}
          contextMenu={[
            "cut",
            "copy",
            "---------",
            "row_above",
            "row_below",
            "remove_row",
            "---------",
            "alignment",
            "make_read_only",
            "clear_column",
          ]}
          dropdownMenu={true}
          hiddenColumns={{
            indicators: true,
          }}
          multiColumnSorting={true}
          filters={true}
          rowHeaders={true}
          headerClassName="htLeft"
          manualRowMove={true}
          autoWrapRow={true}
          autoWrapCol={true}
          manualRowResize={true}
          manualColumnResize={true}
          navigableHeaders={true}
          licenseKey="non-commercial-and-evaluation"
          themeName="ht-theme-main-dark-auto"
        >
          <HotColumn data={1} />
          <HotColumn data={3} />
          <HotColumn data={4} type="date" allowInvalid={false} />
          <HotColumn data={6} type="checkbox" className="htCenter" />
          <HotColumn data={7} type="numeric" />
          <HotColumn data={5} />
          <HotColumn data={2} />
        </HotTable>
      </Grid2>
    </Grid2>
  );
}

OrdersPage.requireAuth = true;