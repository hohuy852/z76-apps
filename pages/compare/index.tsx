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
      const missingInA: number[] = []; // Dòng không có trong file A
      const missingInB: number[] = []; // Dòng không có trong file B
  
      // Kiểm tra sự khác biệt giữa các giá trị
      for (let row = 0; row < maxRows; row++) {
        for (let col = 0; col < maxCols; col++) {
          const value1 = data1[row] ? data1[row][col] : null;
          const value2 = data2[row] ? data2[row][col] : null;
  
          if (value1 !== value2) {
            if (!differences.includes(row)) {
              differences.push(row);
            }
          }
        }
      }
  
      // Kiểm tra và lưu các dòng thiếu trong mỗi bảng
      const codesA = data1.map((row) => row[0]); // Lấy mã hàng trong bảng A
      const codesB = data2.map((row) => row[0]); // Lấy mã hàng trong bảng B
      if(data1.length != data2.length){

        // Duyệt qua bảng A để tìm các dòng không có trong bảng B
        data1.forEach((row, rowIndex) => {
          const codeA = row[0]; // Mã hàng trong bảng A
          if (!codesB.includes(codeA)) {
            missingInB.push(rowIndex); // Dòng không có trong bảng B
          }
        });
    
        // Duyệt qua bảng B để tìm các dòng không có trong bảng A
        data2.forEach((row, rowIndex) => {
          const codeB = row[0]; // Mã hàng trong bảng B
          if (!codesA.includes(codeB)) {
            missingInA.push(rowIndex); // Dòng không có trong bảng A
          }
        });
    
        // Thêm dòng trống vào file A tại các chỉ mục bị thiếu từ file B
        missingInA.forEach((index) => {
          const rowHeight = table1.getRowHeight(index); // Lấy chiều cao dòng thừa trong bảng A
          data1.splice(index, 0, Array(data1[0].length).fill(null)); // Thêm dòng trống vào vị trí
          // table1.updateSettings({
          //   rowHeights: [...Array(index).fill(rowHeight), rowHeight, ...Array(data1.length - index - 1).fill(rowHeight)]
          // }); // Đặt chiều cao cho dòng trống
          const rowHeights = table1.getSettings().rowHeights as number[] || [];
          rowHeights[index] = rowHeight;  // Chỉ thay đổi chiều cao của dòng trống tại index

          // Cập nhật chiều cao cho bảng sau khi thêm dòng trống
          table1.updateSettings({
            rowHeights: rowHeights
          });
        });
    
        // Thêm dòng trống vào file B tại các chỉ mục bị thiếu từ file A
        missingInB.forEach((index) => {
          const rowHeight = table2.getRowHeight(index); // Lấy chiều cao dòng thừa trong bảng B
          data2.splice(index, 0, Array(data2[0].length).fill(null)); // Thêm dòng trống vào vị trí
          // table2.updateSettings({
          //   rowHeights: [...Array(index).fill(rowHeight), rowHeight, ...Array(data2.length - index - 1).fill(rowHeight)]
          // }); // Đặt chiều cao cho dòng trống
          // Cập nhật lại chiều cao cho dòng trống vừa thêm vào
          const rowHeights = table2.getSettings().rowHeights as number[] || [];
          rowHeights[index] = rowHeight;  // Chỉ thay đổi chiều cao của dòng trống tại index

          // Cập nhật chiều cao cho bảng sau khi thêm dòng trống
          table2.updateSettings({
            rowHeights: rowHeights
          });
        });
    
        // Cập nhật dữ liệu cho các bảng
        
        table1.loadData(data1);
        table2.loadData(data2);
      }
  
      // Tô đỏ các ô có sự khác biệt sau khi thêm dòng trống
      for (let row = 0; row < maxRows; row++) {
        for (let col = 0; col < maxCols; col++) {
          const value1 = data1[row] ? data1[row][col] : null;
          const value2 = data2[row] ? data2[row][col] : null;
  
          // Nếu có sự khác biệt, tô đỏ các ô
          if (value1 !== value2) {
            table1.setCellMeta(row, col, "className", "htCellDifference");
            table2.setCellMeta(row, col, "className", "htCellDifference");
          } else {
            table1.setCellMeta(row, col, "className", "");
            table2.setCellMeta(row, col, "className", "");
          }
        }
      }
      // setDataA([...data1]); // Cập nhật bảng A
      // setDataB([...data2]); // Cập nhật bảng B
      // Render lại bảng sau khi thay đổi
      table1.render();
      table2.render();
      // Log các dòng khác biệt
      if (missingInA.length > 0) {
        console.log("Các dòng khác biệt trong bảng B (không có trong bảng A):");
        missingInA.forEach((index) => {
          console.log(`Dòng khác biệt ở chỉ mục ${index}:`, data2[index]);
        });
      }
  
      if (missingInB.length > 0) {
        console.log("Các dòng khác biệt trong bảng A (không có trong bảng B):");
        missingInB.forEach((index) => {
          console.log(`Dòng khác biệt ở chỉ mục ${index}:`, data1[index]);
        });
      }
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
