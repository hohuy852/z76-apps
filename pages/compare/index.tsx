import * as React from "react";
import { Button, Grid2, Stack } from "@mui/material";
import { HotTable, HotColumn } from "@handsontable/react-wrapper";
import { registerAllModules } from "handsontable/registry";
import "handsontable/styles/handsontable.css";
import "handsontable/styles/ht-theme-main.css";
import * as XLSX from "xlsx";
import data from "../../data/data.json";
import UploadButton from "@/components/UploadButton";

// register Handsontable's modules
registerAllModules();

interface SampleData {
  booleanField: boolean;
  companyName: string;
  country: string;
  productName: string;
  date: string;
  contactNumber: string;
  anotherBooleanField: boolean;
  value1: number;
  value2: number;
  value3: number;
}

interface DataProps {
  data: (boolean | string | number)[][];
  headers: string[];
}

const convertExcelToSampleData = (file: File): Promise<(string | number)[][]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target!.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json<any[]>(worksheet, { header: 1 });

      const formattedData = jsonData.slice(7).map((row) => {
        return row.slice(0, 8);
      });
      resolve(formattedData);
    };
    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
};

export default function OrdersPage() {
  const [dataA, setDataA] = React.useState<(boolean | string | number)[][]>([]);
  const [dataB, setDataB] = React.useState<(boolean | string | number)[][]>([]);

  const handleUploadA = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const formattedData = await convertExcelToSampleData(file);
        setDataA(formattedData);
      } catch (error) {
        console.error("Error uploading file A:", error);
      }
    }
  };
  const handleUploadB = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const formattedData = await convertExcelToSampleData(file);
        setDataB(formattedData);
      } catch (error) {
        console.error("Error uploading file A:", error);
      }
    }
  };
  // Use useEffect to log the updated state of dataA
  React.useEffect(() => {
    console.log(dataA);
  }, [dataA]);

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
          <UploadButton content="Upload A" action={handleUploadA} />
          <Button variant="contained">Compare</Button>
          <UploadButton content="Upload B" action={handleUploadB} />
        </Stack>
      </Grid2>
      <Grid2 size={6}>
        <HotTable
          data={dataA}
          colWidths={[203, 289, 150, 150, 150, 150, 150,150]}
          autoColumnSize
          height="100%"
          width="100%"
          colHeaders={data.headers2}
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
          className="ht-theme-main-dark-auto" // Apply theme class here
        >
          <HotColumn data={0} />
          <HotColumn data={1} />
          <HotColumn data={2} />
          <HotColumn data={3} />
          <HotColumn data={4} />
          <HotColumn data={5} />
          <HotColumn data={6} />
          <HotColumn data={7} />
        </HotTable>
      </Grid2>
      <Grid2 size={6}>
        <HotTable
          data={dataB}
          colWidths={[203, 289, 150, 150, 150, 150, 150,150]}
          height="100%"
          width="100%"
          colHeaders={data.headers2}
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
          className="ht-theme-main-dark-auto" // Apply theme class here
        >
         <HotColumn data={0} />
          <HotColumn data={1} />
          <HotColumn data={2} />
          <HotColumn data={3} />
          <HotColumn data={4} />
          <HotColumn data={5} />
          <HotColumn data={6} />
          <HotColumn data={7} />
        </HotTable>
      </Grid2>
    </Grid2>
  );
}

OrdersPage.requireAuth = true;
