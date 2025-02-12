import * as React from "react";
import { Button, Grid2, Stack } from "@mui/material";
import { HotTable, HotColumn, HotTableRef } from "@handsontable/react-wrapper";
import { registerAllModules } from "handsontable/registry";
import "handsontable/styles/handsontable.css";
import "handsontable/styles/ht-theme-main.css";
import * as XLSX from "xlsx";
import UploadButton from "@/components/UploadButton";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import data from "../../data/data.json";
import Head from "next/head";

// register Handsontable's modules
registerAllModules();

export default function FiltersPage() {
  const FilterData = (file: File): Promise<(string | number)[][]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target!.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json<any[]>(worksheet, {
          header: 1,
        });

        // Columns to keep: A, B, C, D, J, K, Q, R, S, T, V, W, X, AA, AB
        const columnsToKeep = [
          0, // A
          1, // B
          2, // C
          3, // D
          9, // J
          10, // K
          16, // Q
          17, // R
          18, // S
          19, // T
          21, // V
          22, // W
          23, // X
          26, // AA
          27, // AB
        ];

        // Format data: Only keep the specified columns, filter rows where column AA (index 26) has a value,
        // and exclude rows where column A is '2' or column AB contains 'huỷ'
        const formattedData = jsonData
          .slice(1)
          .filter((row) => {
            // Keep rows where column AA (index 26) has a value and not empty or null
            const isColumnAAValid = row[26] != null && row[26] !== "";
            // Exclude rows where column A is '2' or column AB contains 'huỷ'
            const isValidRow = !(
              row[0] === 2 || row[27] === "Hóa đơn đã bị hủy"
            );
            return isColumnAAValid && isValidRow;
          })
          .map((row) => columnsToKeep.map((colIndex) => row[colIndex]));

        resolve(formattedData);
      };
      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file);
    });
  };

  const [dataA, setDataA] = React.useState<(boolean | string | number)[][]>([]);
  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const formattedData = await FilterData(file);
        setDataA(formattedData);
      } catch (error) {
        console.error("Error uploading file A:", error);
      }
    }
  };

  const handleTemplate = () => {
    const updatedData = dataA.map((item) => item.slice(0, -2));
    console.log(updatedData);
  };
  return (
    <>
      <Head>
        <title>Bảng kê hoàn thuế</title>
        <meta
          name="description"
          content="Compare and analyze orders efficiently"
        />
      </Head>
      <Grid2 container height="100%" spacing={2}>
        <Grid2 size={12}>
          <Stack
            direction="row"
            sx={{
              alignItems: "center",
            }}
          >
            <UploadButton
              startIcon={<FilterAltIcon />}
              content="Xử lý dữ liệu"
              action={handleUpload}
            />
            <Button
              style={{ margin: "0 0 0 20px" }}
              onClick={handleTemplate}
              startIcon={<CloudDownloadIcon />}
              variant="contained"
            >
              Nhập vào template
            </Button>
          </Stack>
        </Grid2>
        <Grid2 size={12}>
          <HotTable
            data={dataA}
            autoColumnSize
            className="ht-theme-main"
            height="100%"
            width="100%"
            colHeaders={data.header3}
            colWidths={[
              181, 132, 165, 135, 174, 600, 158, 600, 125, 125, 125, 197, 197,
              121, 193,
            ]}
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
            <HotColumn data={14} />
            <HotColumn data={0} />
            <HotColumn data={1} />
            <HotColumn data={2} />
            <HotColumn data={3} />
            <HotColumn data={4} />
            <HotColumn data={5} />
            <HotColumn data={6} />
            <HotColumn data={7} />
            <HotColumn data={8} />
            <HotColumn data={9} />
            <HotColumn data={10} />
            <HotColumn data={11} />
            <HotColumn data={12} />
            <HotColumn data={13} />
          </HotTable>
        </Grid2>
      </Grid2>
    </>
  );
}

FiltersPage.requireAuth = true;
