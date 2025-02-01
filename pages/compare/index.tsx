import * as React from "react";
import { Button, Grid2, Stack } from "@mui/material";
import { HotTable, HotColumn, HotTableRef } from "@handsontable/react-wrapper";
import { registerAllModules } from "handsontable/registry";
import "handsontable/styles/handsontable.css";
import "handsontable/styles/ht-theme-main.css";
import * as XLSX from "xlsx";
import data from "../../data/data.json";
import UploadButton from "@/components/UploadButton";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import "./style.css";
// register Handsontable's modules
registerAllModules();

const convertExcelToSampleData = (
  file: File
): Promise<(string | number)[][]> => {
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
  const [hideIdenticalRows, setHideIdenticalRows] =
    React.useState<boolean>(false);
  const resetTable = (tableRef: React.RefObject<HotTableRef>) => {
    if (tableRef.current) {
      const table = tableRef.current.hotInstance;
      if (table) {
        table.clear(); // Xóa tất cả dữ liệu
        table.updateSettings({
          hiddenRows: {
            rows: [],
            indicators: false,
          },
        });

        // Xóa tất cả các class đánh dấu sự khác biệt
        table.getCellsMeta().forEach((cell) => {
          table.setCellMeta(cell.row, cell.col, "className", "");
        });

        table.render();
      }
    }
  };

  const handleUploadA = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        resetTable(hotTableRef1); // Reset bảng trước khi nhập dữ liệu mới
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
        resetTable(hotTableRef2); // Reset bảng trước khi nhập dữ liệu mới
        const formattedData = await convertExcelToSampleData(file);
        setDataB(formattedData);
      } catch (error) {
        console.error("Error uploading file B:", error);
      }
    }
  };

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHideIdenticalRows(event.target.checked);
  };
  const hotTableRef1 = React.useRef<HotTableRef>(null);
  const hotTableRef2 = React.useRef<HotTableRef>(null);

  React.useEffect(() => {
    const table1Container =
      hotTableRef1.current?.hotInstance?.rootElement?.querySelector(
        ".ht_master .wtHolder"
      );
    const table2Container =
      hotTableRef2.current?.hotInstance?.rootElement?.querySelector(
        ".ht_master .wtHolder"
      );

    if (table1Container && table2Container) {
      const syncScroll = (sourceTable: Element, targetTable: Element) => {
        sourceTable.addEventListener("scroll", () => {
          targetTable.scrollTop = sourceTable.scrollTop;
          targetTable.scrollLeft = sourceTable.scrollLeft;
        });
      };

      syncScroll(table1Container, table2Container);
      syncScroll(table2Container, table1Container);
    }
  }, [hotTableRef1, hotTableRef2]);

  const compareData = () => {
    if (hotTableRef1.current && hotTableRef2.current) {
      const table1 = hotTableRef1.current.hotInstance;
      const table2 = hotTableRef2.current.hotInstance;

      if (!table1 || !table2) return;

      const data1 = table1.getData(); // Lấy toàn bộ dữ liệu từ bảng 1
      const data2 = table2.getData(); // Lấy toàn bộ dữ liệu từ bảng 2
      const maxRows = Math.max(data1.length, data2.length);
      const maxCols = Math.max(data1[0].length, data2[0].length);

      const differences: number[] = []; // Mảng để lưu các chỉ mục có sự khác biệt

      for (let row = 0; row < maxRows; row++) {
        for (let col = 0; col < maxCols; col++) {
          const value1 = data1[row] ? data1[row][col] : null;
          const value2 = data2[row] ? data2[row][col] : null;

          // Nếu có sự khác biệt, đánh dấu cả hai bảng
          if (value1 !== value2) {
            table1.setCellMeta(row, col, "className", "htCellDifference");
            table2.setCellMeta(row, col, "className", "htCellDifference");

            // Lưu vị trí của sự khác biệt vào mảng
            if (!differences.includes(row)) {
              differences.push(row);
            }
          } else {
            table1.setCellMeta(row, col, "className", "");
            table2.setCellMeta(row, col, "className", "");
          }
        }
      }

      table1.render();
      table2.render();
    }
  };
  React.useEffect(() => {
    if (hotTableRef1.current && hotTableRef2.current) {
      const table1 = hotTableRef1.current.hotInstance;
      const table2 = hotTableRef2.current.hotInstance;

      if (!table1 || !table2) return;

      const data1 = table1.getData();
      const data2 = table2.getData();
      const maxRows = Math.max(data1.length, data2.length);

      const differences: number[] = [];
      for (let row = 0; row < maxRows; row++) {
        for (let col = 0; col < data1[0].length; col++) {
          const value1 = data1[row] ? data1[row][col] : null;
          const value2 = data2[row] ? data2[row][col] : null;

          if (value1 !== value2) {
            if (!differences.includes(row)) {
              differences.push(row);
            }
          }
        }
      }

      if (hideIdenticalRows) {
        table1.updateSettings({
          hiddenRows: {
            rows: Array.from({ length: data1.length }, (_, i) => i).filter(
              (i) => !differences.includes(i)
            ),
            indicators: false,
          },
        });

        table2.updateSettings({
          hiddenRows: {
            rows: Array.from({ length: data2.length }, (_, i) => i).filter(
              (i) => !differences.includes(i)
            ),
            indicators: false,
          },
        });
      } else {
        table1.updateSettings({
          hiddenRows: {
            rows: [],
            indicators: false,
          },
        });

        table2.updateSettings({
          hiddenRows: {
            rows: [],
            indicators: false,
          },
        });
      }
    }
  }, [hideIdenticalRows, dataA, dataB]);
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
          <UploadButton content="Kho A" action={handleUploadA} />
          <Button
            startIcon={<CompareArrowsIcon />}
            onClick={compareData}
            variant="contained"
          >
            Đối chiếu
          </Button>
          <UploadButton content="Kho B" action={handleUploadB} />
        </Stack>
      </Grid2>
      <Grid2 size={12}>
        <FormGroup style={{width: "fit-content"}}>
          <FormControlLabel
            control={
              <Switch
                checked={hideIdenticalRows}
                onChange={handleSwitchChange}
              />
            }
            label="Ẩn các hàng giống nhau"
          />
        </FormGroup>
      </Grid2>
      <Grid2 container size={12}>
        <Grid2 size="grow">
          <HotTable
            data={dataA}
            colWidths={[203, 289, 150, 150, 150, 150, 150, 150]}
            autoColumnSize
            height="100%"
            ref={hotTableRef1}
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
            className="ht-theme-main" // Apply theme class here
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
        <Grid2 size="grow">
          <HotTable
            data={dataB}
            ref={hotTableRef2}
            colWidths={[203, 289, 150, 150, 150, 150, 150, 150]}
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
            className="ht-theme-main" // Apply theme class here
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
    </Grid2>
  );
}

OrdersPage.requireAuth = true;
