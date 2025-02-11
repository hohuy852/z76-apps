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
import Head from "next/head";

import "./style.css";
// register Handsontable's modules
registerAllModules();

const convertExcelToSampleData_EFFECT = (
  file: File
): Promise<(string | number)[][]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target!.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      console.log("workbook", workbook);
      const sheetName = workbook.SheetNames[0];
      console.log("sheetName", sheetName);
      
      const worksheet = workbook.Sheets[sheetName];
      
      const jsonData = XLSX.utils.sheet_to_json<any[]>(worksheet, {
        header: 1,
      });
      console.log(jsonData);
      const formattedData = jsonData.slice(7).map((row) => {
        return row.slice(0, 7);
      });
      console.log(formattedData);
      
      resolve(formattedData);
    };
    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
};

const convertExcelToSampleData_ERP = (
  file: File
): Promise<(string | number)[][]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target!.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      console.log("workbook", workbook);
      
      const sheetName = workbook.SheetNames[1];
      console.log("sheetName", sheetName);
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json<any[]>(worksheet, {
        header: 1,
      });

      const formattedData = jsonData.slice(7).map((row) => {
        return row.slice(1, 8);
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
        const formattedData = await convertExcelToSampleData_EFFECT(file);
        setDataA(formattedData);
        console.log(formattedData);
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
        const formattedData = await convertExcelToSampleData_ERP(file);
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

      let effectData = table1.getData();
      let erpData = table2.getData();

      const EffectmergedMap = new Map<string, any>();
      effectData.forEach(row => {
          const key = row[0];

          if (EffectmergedMap.has(key)) {
              let existing = EffectmergedMap.get(key);

              // Sum numeric values (index 3 to 6)
              for (let i = 3; i <= 6; i++) {
                  existing[i] += row[i];
              }
          } else {
              // Clone the row to avoid modifying the original input
              let newRow = [...row];

              // Replace "table{khoX}" with "table"
              if (typeof newRow[1] === "string") {
                  newRow[1] = newRow[1].split("{")[0];
              }

              EffectmergedMap.set(key, newRow);
          }
      });

      // Convert Map back to an array
      const data1 = Array.from(EffectmergedMap.values());

      const ERPmergedMap = new Map<string, any>();
      erpData.forEach(row => {
        const key = row[0];

        if (ERPmergedMap.has(key)) {
            let existing = ERPmergedMap.get(key);

            // Sum numeric values (index 3 to 6)
            for (let i = 3; i <= 6; i++) {
                existing[i] += row[i];
            }
        } else {
            // Clone the row to avoid modifying the original input
            let newRow = [...row];

            // Replace "table{khoX}" with "table"
            if (typeof newRow[1] === "string") {
                newRow[1] = newRow[1].split("{")[0];
            }

            ERPmergedMap.set(key, newRow);
        }
      });

      // Convert Map back to an array
      const data2 = Array.from(ERPmergedMap.values());


      const mapA = new Map(data1.map((row) => [row[0], row]));
      const mapB = new Map(data2.map((row) => [row[0], row]));

      // Lấy danh sách mã hàng duy nhất từ cả hai bảng
      const allCodes = [...new Set([...mapA.keys(), ...mapB.keys()])].sort();

      const newData1: any[] = [];
      const newData2: any[] = [];

      allCodes.forEach((code) => {
        if (mapA.has(code) && mapB.has(code)) {
          newData1.push(mapA.get(code));
          newData2.push(mapB.get(code));
        } else if (mapA.has(code)) {
          newData1.push(mapA.get(code));
          newData2.push(Array(data1[0].length).fill(null)); // Thêm hàng trống vào bảng B
        } else {
          newData1.push(Array(data2[0].length).fill(null)); // Thêm hàng trống vào bảng A
          newData2.push(mapB.get(code));
        }
      });

      // Cập nhật lại dữ liệu của bảng
      table1.loadData(newData1);
      table2.loadData(newData2);

      // Bôi đỏ toàn bộ dòng trong bảng A khi không có trong bảng B
      newData1.forEach((row, rowIndex) => {
        if (row.every((cell: any) => cell === null)) {
          for (let col = 0; col < row.length; col++) {
            table1.setCellMeta(rowIndex, col, "className", "htRowMissing");
          }

          // Lấy chiều cao của dòng có dữ liệu từ bảng còn lại (bảng B)
          const rowHeight = table2.getRowHeight(rowIndex);
          const rowHeights =
            (table1.getSettings().rowHeights as number[]) || []; // Chuyển đổi rowHeights thành number[]

          rowHeights[rowIndex] = rowHeight; // Đặt chiều cao cho dòng trống trong bảng A

          // Cập nhật lại chiều cao cho bảng A
          table1.updateSettings({
            rowHeights: rowHeights,
          });
        }
      });

      // Bôi đỏ toàn bộ dòng trong bảng B khi không có trong bảng A
      newData2.forEach((row, rowIndex) => {
        if (row.every((cell: any) => cell === null)) {
          for (let col = 0; col < row.length; col++) {
            table2.setCellMeta(rowIndex, col, "className", "htRowMissing");
          }

          // Lấy chiều cao của dòng có dữ liệu từ bảng còn lại (bảng A)
          const rowHeight = table1.getRowHeight(rowIndex);
          const rowHeights =
            (table2.getSettings().rowHeights as number[]) || []; // Chuyển đổi rowHeights thành number[]

          rowHeights[rowIndex] = rowHeight; // Đặt chiều cao cho dòng trống trong bảng B

          // Cập nhật lại chiều cao cho bảng B
          table2.updateSettings({
            rowHeights: rowHeights,
          });
        }
      });

      // Bôi đỏ các ô khác biệt giữa hai bảng (bao gồm ô đầu tiên)
      newData1.forEach((row, rowIndex) => {
        for (let col = 0; col < row.length; col++) {
          const valueA = row[col];
          const valueB = newData2[rowIndex] ? newData2[rowIndex][col] : null;

          // Nếu có sự khác biệt, bôi đỏ các ô trong cả hai bảng
          if (valueA !== valueB) {
            table1.setCellMeta(rowIndex, col, "className", "htCellDifference");
            table2.setCellMeta(rowIndex, col, "className", "htCellDifference");
          } else {
            // Nếu không có sự khác biệt, xóa lớp bôi đỏ
            table1.setCellMeta(rowIndex, col, "className", "");
            table2.setCellMeta(rowIndex, col, "className", "");
          }
        }
      });

      // Render lại bảng
      table1.render();
      table2.render();
    }
  };

  return (
    <>
      <Head>
        <title>Đối chiếu thẻ kho</title>
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
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <UploadButton content="EFFECT DATA" action={handleUploadA} />
            <Button
              startIcon={<CompareArrowsIcon />}
              onClick={compareData}
              variant="contained"
            >
              Đối chiếu
            </Button>
            <UploadButton content="ERP DATA" action={handleUploadB} />
          </Stack>
        </Grid2>
        {/* <Grid2 size={12}>
          <FormGroup style={{ width: "fit-content" }}>
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
        </Grid2> */}
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
              autoRowSize={true}
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
              autoRowSize={true}
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
    </>
  );
}

OrdersPage.requireAuth = true;
