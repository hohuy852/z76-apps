import * as React from "react";
import { Grid2, Stack, Modal, Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { HotTable, HotColumn, HotTableRef } from "@handsontable/react-wrapper";
import { registerAllModules } from "handsontable/registry";
import "handsontable/styles/handsontable.css";
import "handsontable/styles/ht-theme-main.css";
import * as XLSX from "xlsx";
import data from "../../data/data.json";
import UploadButton from "@/components/UploadButton";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import Head from "next/head";
import DatePicker from "@/components/DatePicker/DatePicker";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import "./style.css";
import dayjs from "dayjs";
// register Handsontable's modules
registerAllModules();
interface effectData {
  ma: string;
  ten: string;
  tenDonViTinh: string;
  soLuongTonDauKy: number;
  soLuongNhapKhoTrongKy: number;
  soLuongXuatKhoTrongKy: number;
  soLuongTonCuoiKy: number;
  soLuongNo: number | string | null;
}
interface erpData {
  idKho: number;
  tenKho: string;
  ma: string;
  ten: string;
  tenDonViTinh: string;
  soLuongTonDauKy: number;
  soLuongNhapKhoTrongKy: number;
  soLuongXuatKhoTrongKy: number;
  soLuongTonCuoiKy: number;
  chiTietNhapXuat: Array<Record<string, any>>; // hoặc định nghĩa rõ ràng hơn nếu biết cấu trúc
}

export default function OrdersPage() {
  const data1: effectData[] = [
    {
      ma: "SP001",
      ten: "Sản phẩm A",
      tenDonViTinh: "Cái",
      soLuongTonDauKy: 100,
      soLuongNhapKhoTrongKy: 50,
      soLuongXuatKhoTrongKy: 30,
      soLuongTonCuoiKy: 120,
      soLuongNo: "",
    },
    {
      ma: "SP002",
      ten: "Sản phẩm B",
      tenDonViTinh: "Hộp",
      soLuongTonDauKy: 200,
      soLuongNhapKhoTrongKy: 80,
      soLuongXuatKhoTrongKy: 60,
      soLuongTonCuoiKy: 220,
      soLuongNo: "",
    },
    {
      ma: "SP003",
      ten: "Sản phẩm C",
      tenDonViTinh: "Thùng",
      soLuongTonDauKy: 50,
      soLuongNhapKhoTrongKy: 20,
      soLuongXuatKhoTrongKy: 10,
      soLuongTonCuoiKy: 60,
      soLuongNo: "",
    }
  ];
  
  // Dữ liệu mẫu cho erpData
  const data2: erpData[] = [
    {
      idKho: 1,
      tenKho: "Kho Chính",
      ma: "SP001",
      ten: "Sản phẩm A",
      tenDonViTinh: "Cái",
      soLuongTonDauKy: 110,
      soLuongNhapKhoTrongKy: 50,
      soLuongXuatKhoTrongKy: 30,
      soLuongTonCuoiKy: 120,
      chiTietNhapXuat: [
        { ngay: "2024-02-01", soLuong: 10, loai: "Nhập" },
        { ngay: "2024-02-05", soLuong: 5, loai: "Xuất" },
      ],
    },
    {
      idKho: 2,
      tenKho: "Kho Phụ",
      ma: "SP002",
      ten: "Sản phẩm B",
      tenDonViTinh: "Hộp",
      soLuongTonDauKy: 200,
      soLuongNhapKhoTrongKy: 80,
      soLuongXuatKhoTrongKy: 60,
      soLuongTonCuoiKy: 220,
      chiTietNhapXuat: [
        { ngay: "2024-02-02", soLuong: 20, loai: "Nhập" },
        { ngay: "2024-02-06", soLuong: 10, loai: "Xuất" },
      ],
    },
    {
      idKho: 2,
      tenKho: "Kho Phụ",
      ma: "SP002",
      ten: "Sản phẩm B",
      tenDonViTinh: "Hộp",
      soLuongTonDauKy: 10,
      soLuongNhapKhoTrongKy: 0,
      soLuongXuatKhoTrongKy: 0,
      soLuongTonCuoiKy: 0,
      chiTietNhapXuat: [
        { ngay: "2024-02-02", soLuong: 20, loai: "Nhập" },
        { ngay: "2024-02-06", soLuong: 10, loai: "Xuất" },
      ],
    }
  ];
  // const [effectData, setEffectData] = React.useState<(boolean | string | number)[][]>([]);
  // const [erpData, setErpData] = React.useState<(boolean | string | number)[][]>([]);
  const [open, setOpen] = React.useState(false);
  const [detailOpen, setDetailOpen] = React.useState(false);
  const [approveOpen, setApproveOpen] = React.useState(false);
  const [rowData, setRowData] = React.useState<erpData | null>(null);

  const [loading, setLoading] = React.useState(false);
  // Lấy ngày hiện tại làm giá trị mặc định
  const currentDate = dayjs().format("YYYY-MM-DD");
  // Khởi tạo state cho ngày bắt đầu và ngày kết thúc
  const [startDate, setStartDate] = React.useState<string>(currentDate);
  const [endDate, setEndDate] = React.useState<string>(currentDate);

  const fetchData = async () => {
    setLoading(true);

    try {
      const vtId = [3];
      const btpId = [4];
      console.log(startDate, endDate);

      // Hàm gọi API chung
      const fetchFromAPI = async (idKho: number, url: string) => {
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            ID_Kho: idKho,
            MaList: [],
            TuNgay: startDate,
            DenNgay: endDate,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          setOpen(false);
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.json();
      };

      // Gọi API 1 và API 2 song song
      const vtpPromises = vtId.map((id) =>
        fetchFromAPI(id, "https://apilayoutkho.z76.vn/autobot/thekhovt")
      );
      const btpPromises = btpId.map((id) =>
        fetchFromAPI(id, "https://apilayoutkho.z76.vn/autobot/thekhobtp")
      );

      // Chờ tất cả API hoàn thành
      const vtpResults = await Promise.all(vtpPromises);
      console.log("Kết quả API 1:", vtpResults);
      const btpResults = await Promise.all(btpPromises);

      // Gộp dữ liệu từ tất cả API lại thành 1 mảng
      const allResults = [...vtpResults.flat(), ...btpResults.flat()];
      const formattedData: any[][] = allResults.map((item) => {
        // Chuyển đổi trường chiTietNhapXuat sang chuỗi JSON
        const transformedItem = {
          ...item,
          chiTietNhapXuat: JSON.stringify(item.chiTietNhapXuat),
        };

        // Trả về một mảng chứa các giá trị của object đã chuyển đổi
        return Object.values(transformedItem);
      });

      // setErpData(formattedData);
      console.log("Dữ liệu sau khi gộp:", formattedData);
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const handleOpen = (row: any) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    handleClose();
  };


  const handleUploadA = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        // console.log(formattedData);
      } catch (error) {
        console.error("Error uploading file A:", error);
      }
    }
  };

  const handleUploadB = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {

      } catch (error) {
        console.error("Error uploading file B:", error);
      }
    }
  };

  const hotTableRef1 = React.useRef<HotTableRef>(null);
  const hotTableRef2 = React.useRef<HotTableRef>(null);


    // Hàm chuyển đổi các phần tử string số sang number
  // Định nghĩa mapping từ tên thuộc tính cần so sánh sang chỉ số cột trong bảng
  const propertyToColIndex: { [key: string]: number } = {
    soLuongTonDauKy: 3,
    soLuongNhapKhoTrongKy: 4,
    soLuongXuatKhoTrongKy: 5,
    soLuongTonCuoiKy: 6,
  };

  const compareData = (): void => {
    // Lấy instance của cả 2 bảng từ ref
    const table1 = hotTableRef1.current?.hotInstance;
    const table2 = hotTableRef2.current?.hotInstance;
  
    // Nếu một trong hai instance không khả dụng thì thoát hàm
    if (!table1 || !table2) {
      console.error("Một hoặc cả hai hotInstance không khả dụng.");
      return;
    }
  
    // Định nghĩa mapping từ tên thuộc tính cần so sánh sang chỉ số cột trong bảng
    const propertyToColIndexTable1: { [key in keyof effectData]?: number } = {
      soLuongTonDauKy: 3,
      soLuongNhapKhoTrongKy: 4,
      soLuongXuatKhoTrongKy: 5,
      soLuongTonCuoiKy: 6,
    };
  
    const propertyToColIndexTable2: { [key in keyof erpData]?: number } = {
      soLuongTonDauKy: 5, // Chỉ số cột khác trong bảng 2
      soLuongNhapKhoTrongKy: 6,
      soLuongXuatKhoTrongKy: 7,
      soLuongTonCuoiKy: 8,
    };
  
    // Duyệt qua từng phần tử trong data1
    data1.forEach((item, i) => {
      // Tìm các dòng trong data2 có cùng mã (ma)
      const matchingIndices: number[] = [];
      data2.forEach((item2, j) => {
        if (item2.ma === item.ma) {
          matchingIndices.push(j);
        }
      });
  
      if (matchingIndices.length === 0) {
        // --- TRƯỜNG HỢP 1: data1 có mã nhưng data2 không có mã đó ---
        table2.alter("insert_row_below", i, 1); // Chèn 1 dòng trống dưới vị trí i
        table1.alter("insert_row_below", i + 1, 1); // Chèn 1 dòng trống tương ứng trong table1 (i+1 để thêm dưới dòng i)
  
        const totalCols = table2.countCols();
        const newRowIndex = i + 1; // Dòng mới được chèn là dưới dòng i, vì insert_row_below
  
        // Tô đỏ toàn bộ dòng vừa thêm ở table2
        for (let col = 0; col < totalCols; col++) {
          table2.setCellMeta(newRowIndex, col, "className", "red-cell");
        }
  
        // Tô đỏ toàn bộ dòng vừa thêm ở table1
        for (let col = 0; col < totalCols; col++) {
          table1.setCellMeta(newRowIndex, col, "className", "red-cell");
        }
  
        console.warn(`Mã ${item.ma} không có trong data2. Đã thêm dòng trống tại index ${newRowIndex}.`);
      } else if (matchingIndices.length === 1) {
        // --- TRƯỜNG HỢP 2: data1 có mã và data2 có 1 dòng khớp ---
        const j = matchingIndices[0];
        const compareKeys: (keyof effectData)[] = [
          "soLuongTonDauKy",
          "soLuongNhapKhoTrongKy",
          "soLuongXuatKhoTrongKy",
          "soLuongTonCuoiKy",
        ];
  
        compareKeys.forEach((prop) => {
          const colIndex1 = propertyToColIndexTable1[prop];
          const colIndex2 = propertyToColIndexTable2[prop as keyof erpData];
  
          if (colIndex1 !== undefined && colIndex2 !== undefined && item[prop] !== data2[j][prop as keyof erpData]) {
            // Tô đỏ ô tại table1
            table1.setCellMeta(i, colIndex1, "className", "red-cell");
            // Tô đỏ ô tương ứng tại table2
            table2.setCellMeta(j, colIndex2, "className", "red-cell");
  
            console.error(
              `Mã ${item.ma}: Giá trị ${prop} không khớp (data1: ${item[prop]} vs data2: ${data2[j][prop as keyof erpData]}).`
            );
          }
        });
      } else {
        // --- TRƯỜNG HỢP 3: data1 có mã và data2 có nhiều dòng khớp ---
        const colIndex1 = propertyToColIndexTable1["soLuongTonDauKy"];
        const colIndex2 = propertyToColIndexTable2["soLuongTonDauKy"];
  
        if (colIndex1 === undefined || colIndex2 === undefined) return;
  
        // Tính tổng soLuongTonDauKy từ tất cả các dòng khớp trong data2
        const sumData2 = matchingIndices.reduce(
          (sum, idx) => sum + data2[idx].soLuongTonDauKy,
          0
        );
  
        // So sánh tổng soLuongTonDauKy từ data2 với giá trị trong data1
        if (item.soLuongTonDauKy !== sumData2) {
          // Tô đỏ ô soLuongTonDauKy ở table1
          table1.setCellMeta(i, colIndex1, "className", "red-cell");
  
          // Tô đỏ tất cả các ô soLuongTonDauKy tương ứng ở các dòng trong table2
          matchingIndices.forEach((j) => {
            table2.setCellMeta(j, colIndex2, "className", "red-cell");
          });
  
          console.error(
            `Mã ${item.ma}: soLuongTonDauKy không khớp (data1: ${item.soLuongTonDauKy} vs data2 sum: ${sumData2}).`
          );
        }
      }
    });
  
    // Render lại 2 bảng để cập nhật giao diện
    table1.render();
    table2.render();
  };
 // Hàm chuyển đổi các phần tử string số sang number
  const onCellClick = (
  ) => {


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
            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              <Button
                startIcon={<CloudUploadIcon />}
                onClick={handleOpen}
                variant="contained"
              >
                ERP DATA
              </Button>
              <Button
                startIcon={<CloudUploadIcon />}
                onClick={() => setApproveOpen(true)}
                variant="contained"
              >
                Duyệt thẻ kho
              </Button>
            </Stack>
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
              data={data1}
              colWidths={[203, 289, 150, 150, 150, 150, 150, 150]}
              autoColumnSize
              height="100%"
              ref={hotTableRef1}
              width="100%"
              colHeaders={data.effectHeader}
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
            </HotTable>
          </Grid2>
          <Grid2 size="grow">
            <HotTable
              data={data2}
              ref={hotTableRef2}
              colWidths={[
                100, 150, 203, 289, 150, 150, 150, 150, 150, 150, 150,
              ]}
              height="100%"
              width="100%"
              colHeaders={data.erpHeader}
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
                columns: [9], 
                indicators: false,
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
              afterOnCellMouseDown={(event, coords) => {
              
              }}
            >
            </HotTable>
          </Grid2>
        </Grid2>
        {/* MODAL Chi tiết nhập xuất */}
        <Modal
          open={detailOpen}
          onClose={() => setDetailOpen(false)}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
            }}
          >
            <h2 id="modal-title">Chi tiết nhập xuất</h2>
            <div
              id="modal-description"
              style={{ minHeight: "300px", width: "900px" }}
            >
              {rowData ? (
                <>
                  <p>
                    <strong>Mã hàng:</strong> {rowData.ma}
                  </p>
                  <p>
                    <strong>Tên hàng:</strong> {rowData.ten}
                  </p>
                  <p>
                    <strong>Đơn vị tính:</strong> {rowData.tenDonViTinh}
                  </p>
                </>
              ) : (
                <p>Không có dữ liệu</p>
              )}
              {rowData && rowData.chiTietNhapXuat.length > 0 ? (
                <>
                  <HotTable
                    data={rowData.chiTietNhapXuat.map(
                      ({ id, idKho, ma, ...rest }) => Object.values(rest)
                    )}
                    colWidths={[200, 200, 200, 200, 150, 150, 150, 350]}
                    height="300"
                    width="100%"
                    colHeaders={true}
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
                    className="ht-theme-main"
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
                </>
              ) : (
                <p>Không có dữ liệu chi tiết nhập xuất</p>
              )}
            </div>

            <Stack
              direction="row"
              spacing={2}
              sx={{ mt: 2 }}
              justifyContent="flex-end"
            >
              <Button onClick={() => setDetailOpen(false)}>Đóng</Button>
            </Stack>
          </Box>
        </Modal>
        {/* MODAL ERP*/}
        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
            }}
          >
            <>
              <h2>Chọn khoảng thời gian</h2>
              <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                <Typography width={150}>Từ ngày:</Typography>
                <DatePicker
                  value={startDate}
                  onChange={(newValue) => {
                    setStartDate(newValue); // Cập nhật giá trị cho ngày bắt đầu
                    console.log("Ngày bắt đầu:", newValue);
                  }}
                />
              </Stack>
              <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                <Typography width={150}>Đến ngày:</Typography>
                <DatePicker
                  value={endDate}
                  onChange={(newValue) => {
                    setEndDate(newValue); // Cập nhật giá trị cho ngày kết thúc
                    console.log("Ngày kết thúc:", newValue);
                  }}
                />
              </Stack>
              <Stack
                direction="row"
                spacing={2}
                sx={{ mt: 2 }}
                justifyContent="flex-end"
              >
                <Button onClick={handleClose}>Hủy</Button>
                <Button
                  onClick={fetchData}
                  variant="contained"
                  color="primary"
                  loading={loading}
                >
                  Tải dữ liệu
                </Button>
              </Stack>
            </>
          </Box>
        </Modal>
        {/* MODAL Duyệt thẻ kho */}
        <Modal open={approveOpen} onClose={() => setApproveOpen(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
            }}
          >
            <h2 id="modal-title">Chi tiết nhập xuất</h2>
            <div
              id="modal-description"
              style={{ minHeight: "500px", width: "1000px" }}
            >
              <>
                <p>
                  <strong>Tên người duyệt:</strong> Nguyễn Văn A
                </p>
                <p>
                  <strong>Kho: </strong> 1,2,3,4
                </p>
                <p>
                  <strong>Tháng: </strong> 1
                </p>
                <p>
                  <strong>Năm: </strong> 2025
                </p>
              </>
             
                <>
                  <HotTable
                    data={data2}
                    colWidths={[
                      100, 150, 203, 289, 150, 150, 150, 150, 150, 150, 150,
                    ]}
                    height="500"
                    width="100%"
                    colHeaders={true}
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
                    className="ht-theme-main"
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
                    <HotColumn data={8} />
                  </HotTable>
                </>
            </div>

            <Stack
              direction="row"
              spacing={2}
              sx={{ mt: 2 }}
              justifyContent="flex-end"
            >
              <Button onClick={() => setApproveOpen(false)}>Đóng</Button>
              <Button onClick={() => setApproveOpen(false)}  color="primary" variant="contained">Duyệt</Button>
            </Stack>
          </Box>
        </Modal>
      </Grid2>
    </>
  );
}

OrdersPage.requireAuth = true;
