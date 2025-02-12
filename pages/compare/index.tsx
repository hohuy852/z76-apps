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
      
      const sheetName = workbook.SheetNames[0];
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
  
      // Lấy dữ liệu từ 2 bảng
      const effectData = table1.getData();
      const erpData = table2.getData();
  
      // --- Xử lý dữ liệu cho bảng Effect (table1) ---
      const EffectmergedMap = new Map<string, any>();
      effectData.forEach((row) => {
        const key = row[0];
        if (EffectmergedMap.has(key)) {
          const existing = EffectmergedMap.get(key);
          // Cộng dồn giá trị số từ index 3 đến 6
          for (let i = 3; i <= 6; i++) {
            existing[i] += row[i];
          }
        } else {
          // Clone row để không thay đổi dữ liệu gốc
          const newRow = [...row];
          if (typeof newRow[1] === "string") {
            newRow[1] = newRow[1].split("{")[0];
          }
          EffectmergedMap.set(key, newRow);
        }
      });
      const data1 = Array.from(EffectmergedMap.values());
  
      // --- Xử lý dữ liệu cho bảng ERP (table2) ---
      const ERPmergedMap = new Map<string, any>();
      erpData.forEach((row) => {
        const key = row[0];
        if (ERPmergedMap.has(key)) {
          const existing = ERPmergedMap.get(key);
          for (let i = 3; i <= 6; i++) {
            existing[i] += row[i];
          }
        } else {
          const newRow = [...row];
          if (typeof newRow[1] === "string") {
            newRow[1] = newRow[1].split("{")[0];
          }
          ERPmergedMap.set(key, newRow);
        }
      });
      const data2 = Array.from(ERPmergedMap.values());
  
      // --- Ghép dữ liệu từ 2 bảng theo mã hàng (key) ---
      const mapA = new Map(data1.map((row) => [row[0], row]));
      const mapB = new Map(data2.map((row) => [row[0], row]));
  
      // Lấy danh sách key duy nhất và sắp xếp
      const allCodes = [...new Set([...mapA.keys(), ...mapB.keys()])].sort();
      const newData1: any[] = [];
      const newData2: any[] = [];
  
      allCodes.forEach((code) => {
        if (mapA.has(code) && mapB.has(code)) {
          newData1.push(mapA.get(code));
          newData2.push(mapB.get(code));
        } else if (mapA.has(code)) {
          newData1.push(mapA.get(code));
          newData2.push(Array(data1[0].length).fill(null)); // Thêm dòng trống cho bảng ERP (table2)
        } else {
          newData1.push(Array(data2[0].length).fill(null)); // Thêm dòng trống cho bảng Effect (table1)
          newData2.push(mapB.get(code));
        }
      });
  
      // Load dữ liệu mới vào bảng
      table1.loadData(newData1);
      table2.loadData(newData2);
  
      console.log("Total rows in newData1:", newData1.length);
      console.log("Total rows in newData2:", newData2.length);
  
      // --- Cập nhật chiều cao dòng (rowHeights) ban đầu ---
      const rowHeightsA: number[] =
        (table1.getSettings().rowHeights as number[]) || [];
      const rowHeightsB: number[] =
        (table2.getSettings().rowHeights as number[]) || [];
  
      // Cập nhật cho bảng Effect (table1): Các dòng trống (không có dữ liệu ở bảng ERP)
      newData1.forEach((row, rowIndex) => {
        if (row.every((cell: any) => cell === null)) {
          for (let col = 0; col < row.length; col++) {
            table1.setCellMeta(rowIndex, col, "className", "htRowMissing");
          }
          // Lấy chiều cao của dòng tương ứng từ bảng ERP (table2)
          const rowHeight = table2.getRowHeight(rowIndex);
          rowHeightsA[rowIndex] = rowHeight;
          console.log(`table1 - row ${rowIndex}:`, rowHeight);
        }
      });
  
      // Cập nhật cho bảng ERP (table2): Các dòng trống (không có dữ liệu ở bảng Effect)
      newData2.forEach((row, rowIndex) => {
        if (row.every((cell: any) => cell === null)) {
          for (let col = 0; col < row.length; col++) {
            table2.setCellMeta(rowIndex, col, "className", "htRowMissing");
          }
          const rowHeight = table1.getRowHeight(rowIndex);
          rowHeightsB[rowIndex] = rowHeight;
          console.log(`table2 - row ${rowIndex}:`, rowHeight);
        }
      });
  
      console.log("Final rowHeightsA:", rowHeightsA);
      console.log("Final rowHeightsB:", rowHeightsB);
  
      // Cập nhật lại settings cho cả hai bảng (1 lần duy nhất)
      table1.updateSettings({ rowHeights: rowHeightsA });
      table2.updateSettings({ rowHeights: rowHeightsB });
  
      // --- So sánh từng ô và đánh dấu sự khác biệt ---
      newData1.forEach((row, rowIndex) => {
        for (let col = 0; col < row.length; col++) {
          const valueA = row[col];
          const valueB = newData2[rowIndex] ? newData2[rowIndex][col] : null;
          if (valueA !== valueB) {
            table1.setCellMeta(rowIndex, col, "className", "htCellDifference");
            table2.setCellMeta(rowIndex, col, "className", "htCellDifference");
          } else {
            table1.setCellMeta(rowIndex, col, "className", "");
            table2.setCellMeta(rowIndex, col, "className", "");
          }
        }
      });
  
      // Render lại bảng
      table1.render();
      table2.render();
  
      // --- Hook sau khi render để cập nhật lại chiều cao của các dòng trống ---
      // Cập nhật cho bảng ERP (table2)
      table2.addHook("afterRender", function () {
        let updated = false;
        newData2.forEach((row, rowIndex) => {
          if (row.every((cell: any) => cell === null)) {
            const newHeight = table1.getRowHeight(rowIndex);
            if (newHeight !== undefined && rowHeightsB[rowIndex] !== newHeight) {
              rowHeightsB[rowIndex] = newHeight;
              console.log(`afterRender - table2 row ${rowIndex}:`, newHeight);
              updated = true;
            }
          }
        });
        if (updated) {
          table2.updateSettings({ rowHeights: rowHeightsB });
        }
      });
  
      // Cập nhật cho bảng Effect (table1)
      table1.addHook("afterRender", function () {
        let updated = false;
        newData1.forEach((row, rowIndex) => {
          if (row.every((cell: any) => cell === null)) {
            const newHeight = table2.getRowHeight(rowIndex);
            if (newHeight !== undefined && rowHeightsA[rowIndex] !== newHeight) {
              rowHeightsA[rowIndex] = newHeight;
              console.log(`afterRender - table1 row ${rowIndex}:`, newHeight);
              updated = true;
            }
          }
        });
        if (updated) {
          table1.updateSettings({ rowHeights: rowHeightsA });
        }
      });
  
      // --- Hook bổ sung: Đồng bộ chiều cao của các dòng có cell khác biệt ---
      // Với các dòng có cell được đánh dấu "htCellDifference", lấy chiều cao của dòng ở cả 2 bảng,
      // sau đó đặt lại cho cả 2 bảng bằng giá trị lớn nhất.
      table1.addHook("afterRender", function () {
        let updated = false;
        for (let rowIndex = 0; rowIndex < newData1.length; rowIndex++) {
          // Kiểm tra xem dòng có chứa cell khác biệt hay không
          let hasDifference = false;
          for (let col = 0; col < newData1[rowIndex].length; col++) {
            const meta = table1.getCellMeta(rowIndex, col);
            if (meta && typeof meta.className === "string" && meta.className.indexOf("htCellDifference") !== -1) {
              hasDifference = true;
              break;
            }
          }
          if (hasDifference) {
            const height1 = table1.getRowHeight(rowIndex);
            const height2 = table2.getRowHeight(rowIndex);
            const newHeight = Math.max(height1 || 0, height2 || 0);
            if (rowHeightsA[rowIndex] !== newHeight || rowHeightsB[rowIndex] !== newHeight) {
              rowHeightsA[rowIndex] = newHeight;
              rowHeightsB[rowIndex] = newHeight;
              console.log(`afterRender (difference equalize) - row ${rowIndex}:`, newHeight);
              updated = true;
            }
          }
        }
        if (updated) {
          table1.updateSettings({ rowHeights: rowHeightsA });
          table2.updateSettings({ rowHeights: rowHeightsB });
        }
      });
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
