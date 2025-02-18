import * as React from "react";
import { Grid2, Stack, Modal, Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { HotTable, HotColumn, HotTableRef } from "@handsontable/react-wrapper";
import { registerAllModules } from "handsontable/registry";
import "handsontable/styles/handsontable.css";
import "handsontable/styles/ht-theme-main.css";
// import * as XLSX from "xlsx";
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
type status = "pass" | "fail" | "unknown" ;
// pass: Tất cả các cột của 1 mã hàng 2 bên bằng nhau. cả 2 bên set pass
// fail: 1 Bên có bên không. Bên không set fail
// unknown: Mã hàng cả 2 bên là độc nhất và có 1 hoặc 1 vài cột bị khác hoặc Mã hàng cả 2 bên là không độc nhất và có tổng của 1 hoặc 1 vài cột bị khác =>
// array[boolean]: ex: [true, true, true, false] => màu của các cell trên hàng hiển thị item đó trên 1 bảng sẽ là [trắng, trắng, trắng, đỏ]

interface effectData {
  ma: string;
  ten: string;
  tenDonViTinh: string;
  soLuongTonDauKy: number | string;
  soLuongNhapKhoTrongKy: number| string;
  soLuongXuatKhoTrongKy: number| string;
  soLuongTonCuoiKy: number| string;
  soLuongNo: number | string | null;
  trangThaiCheck: status|Array<boolean>;
}
interface erpData {
  idKho: number | string;
  tenKho: string;
  ma: string;
  ten: string;
  tenDonViTinh: string;
  soLuongTonDauKy: number | string;
  soLuongNhapKhoTrongKy: number | string;
  soLuongXuatKhoTrongKy: number | string;
  soLuongTonCuoiKy: number | string;
  chiTietNhapXuat: Array<Record<string, any>>; // hoặc định nghĩa rõ ràng hơn nếu biết cấu trúc
  trangThaiCheck: status|Array<boolean>;
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
      trangThaiCheck: "unknown"
    },
    {
      ma: "SP002",
      ten: "Sản phẩm B",
      tenDonViTinh: "Hộp",
      soLuongTonDauKy: 410,
      soLuongNhapKhoTrongKy: 80,
      soLuongXuatKhoTrongKy: 60,
      soLuongTonCuoiKy: 220,
      soLuongNo: "",
      trangThaiCheck: "unknown"
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
      trangThaiCheck: "unknown"
    },
    {
      ma: "SP004",
      ten: "Sản phẩm D",
      tenDonViTinh: "Cái",
      soLuongTonDauKy: 4,
      soLuongNhapKhoTrongKy: 44,
      soLuongXuatKhoTrongKy: 444,
      soLuongTonCuoiKy: 4444,
      soLuongNo: "",
      trangThaiCheck: "unknown"
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
      trangThaiCheck: "unknown"
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
      trangThaiCheck: "unknown"
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
      trangThaiCheck: "unknown"
    },
    {
      idKho: 1,
      tenKho: "Kho Phụ",
      ma: "SP003",
      ten: "Sản phẩm C",
      tenDonViTinh: "Hộp",
      soLuongTonDauKy: 10,
      soLuongNhapKhoTrongKy: 10,
      soLuongXuatKhoTrongKy: 0,
      soLuongTonCuoiKy: 0,
      chiTietNhapXuat: [
        { ngay: "2024-02-02", soLuong: 20, loai: "Nhập" },
        { ngay: "2024-02-06", soLuong: 10, loai: "Xuất" },
      ],
      trangThaiCheck: "unknown"
    },
    {
      idKho: 1,
      tenKho: "Kho Chính",
      ma: "SP002",
      ten: "Sản phẩm B",
      tenDonViTinh: "Hộp",
      soLuongTonDauKy: 10,
      soLuongNhapKhoTrongKy: 10,
      soLuongXuatKhoTrongKy: 0,
      soLuongTonCuoiKy: 0,
      chiTietNhapXuat: [
        { ngay: "2024-02-02", soLuong: 20, loai: "Nhập" },
        { ngay: "2024-02-06", soLuong: 10, loai: "Xuất" },
      ],
      trangThaiCheck: "unknown"
    },
    {
      idKho: 1,
      tenKho: "Kho Chính",
      ma: "SP005",
      ten: "Sản phẩm B",
      tenDonViTinh: "Hộp",
      soLuongTonDauKy: 10,
      soLuongNhapKhoTrongKy: 10,
      soLuongXuatKhoTrongKy: 0,
      soLuongTonCuoiKy: 0,
      chiTietNhapXuat: [
        { ngay: "2024-02-02", soLuong: 20, loai: "Nhập" },
        { ngay: "2024-02-06", soLuong: 10, loai: "Xuất" },
      ],
      trangThaiCheck: "unknown"
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

  const hotTableRef1 = React.useRef<HotTableRef>(null);
  const hotTableRef2 = React.useRef<HotTableRef>(null);

  const compareData = (): void => {
    // Lấy instance của cả 2 bảng từ ref
    const table1 = hotTableRef1.current?.hotInstance;
    const table2 = hotTableRef2.current?.hotInstance;
  
    // Nếu một trong hai instance không khả dụng thì thoát hàm
    if (!table1 || !table2) {
      console.error("Một hoặc cả hai hotInstance không khả dụng.");
      return;
    }
  
    let allCodeArr: string[] = [];

    // Lấy tất cả mã hàng từ effect data
    data1.forEach((item) => { 
      allCodeArr.push(item.ma);
    });

    // Lấy tất cả mã hàng từ erp data
    data2.forEach((item) => { 
      allCodeArr.push(item.ma);
    });

    // Xóa mã hàng trùng nhau
    allCodeArr = [...new Set(allCodeArr)];
  
    // Định nghĩa mapping từ tên thuộc tính cần so sánh sang chỉ số cột trong bảng
    const propertyToColIndexTable1: { [key in keyof effectData]?: number } = {
      soLuongTonDauKy: 3,
      soLuongNhapKhoTrongKy: 4,
      soLuongXuatKhoTrongKy: 5,
      soLuongTonCuoiKy: 6,
    };
  
    const propertyToColIndexTable2: { [key in keyof erpData]?: number } = {
      soLuongTonDauKy: 5,
      soLuongNhapKhoTrongKy: 6,
      soLuongXuatKhoTrongKy: 7,
      soLuongTonCuoiKy: 8,
    };

    // Chuẩn bị error data với trạng thái check mặc định là 'fail'
    // Trạng thái fail => mặc định tô đỏ cả hàng(xem tại line 21)
    const errorErpData: erpData = {
      idKho: "N/A",
      tenKho: "N/A",
      ma: "N/A",
      ten: "N/A",
      tenDonViTinh: "N/A",
      soLuongTonDauKy: "N/A",
      soLuongNhapKhoTrongKy: "N/A",
      soLuongXuatKhoTrongKy: "N/A",
      soLuongTonCuoiKy: "N/A",
      chiTietNhapXuat: [
        {}
      ],
      trangThaiCheck: "fail"
    };

    const errorEffectData: effectData = {
      ma: 'N/A',
      ten: "N/A",
      tenDonViTinh: "N/A",
      soLuongTonDauKy: "N/A",
      soLuongNhapKhoTrongKy: "N/A",
      soLuongXuatKhoTrongKy: "N/A",
      soLuongTonCuoiKy: "N/A",
      soLuongNo: null,
      trangThaiCheck: "fail"
    };

    // Chuẩn bị dummy data với trạng thái check mặc định là 'unknown' => sẽ được thay đổi thành array trong quá trình so sánh dữ liệu
    const dummyEffectData: effectData = {
      ma: "-",
      ten: "-",
      tenDonViTinh: "-",
      soLuongTonDauKy: "-",
      soLuongNhapKhoTrongKy: "-",
      soLuongXuatKhoTrongKy: "-",
      soLuongTonCuoiKy: "-",
      soLuongNo: null,
      trangThaiCheck: "unknown"
    };

    // Duyệt từng mã hàng
    allCodeArr.forEach((code, idx) => {

      // Lưu lại tất cả vị trí của mã hàng trong effect data(nếu tồn tại)
      const matchingIndices1: number[] = [];
      data1.forEach((item, item_idx) => {
        if (item.ma === code) {
          matchingIndices1.push(item_idx);
        }
      });

      // Lưu lại tất cả vị trí của mã hàng trong erp data(nếu tồn tại)
      const matchingIndices2: number[] = [];
      data2.forEach((item, item_idx) => {
        if (item.ma === code) {
          matchingIndices2.push(item_idx);
        }
      });

      if((matchingIndices1.length != 0) && (matchingIndices2.length == 0)) {
        // --- TRƯỜNG HỢP 1: data1 có mã nhưng data2 không có mã đó ---
        for (let tmpCount = 0; tmpCount < matchingIndices1.length; tmpCount++) {
          errorErpData.ma = code;
          data2.push(errorErpData);
          data1[matchingIndices1[tmpCount]].trangThaiCheck = "pass";
        }
      } else if ((matchingIndices1.length == 0) && (matchingIndices2.length != 0)) {
        // --- TRƯỜNG HỢP 2: data2 có mã nhưng data1 không có mã đó ---
        errorEffectData.ma = code;
        for (let tmpCount = 0; tmpCount < matchingIndices2.length; tmpCount++) { 
          data1.push(errorEffectData);
          data2[matchingIndices2[tmpCount]].trangThaiCheck = "pass";
        }
      } else if ((matchingIndices1.length == 1) && (matchingIndices2.length == 1)) {
        // --- TRƯỜNG HỢP 3: data1 có mã và data2 có 1 dòng khớp ---
        const temp_trangThaiCheck: boolean[] = [false];
        temp_trangThaiCheck[0] = data1[matchingIndices1[0]].soLuongTonDauKy == data2[matchingIndices2[0]].soLuongTonDauKy;
        temp_trangThaiCheck[1] = data1[matchingIndices1[0]].soLuongNhapKhoTrongKy == data2[matchingIndices2[0]].soLuongNhapKhoTrongKy;
        temp_trangThaiCheck[2] = data1[matchingIndices1[0]].soLuongXuatKhoTrongKy == data2[matchingIndices2[0]].soLuongXuatKhoTrongKy;
        temp_trangThaiCheck[3] = data1[matchingIndices1[0]].soLuongTonCuoiKy == data2[matchingIndices2[0]].soLuongTonCuoiKy;
        data1[matchingIndices1[0]].trangThaiCheck = temp_trangThaiCheck;
        data2[matchingIndices2[0]].trangThaiCheck = temp_trangThaiCheck;

      } else if ((matchingIndices1.length == 1) && (matchingIndices2.length > 1)) {
        // --- TRƯỜNG HỢP 4: data1 có nhiều dòng khớp và data2 có nhiều dòng khớp ---

        // Tính tổng các cột ở bảng EFFECT
        const tmpEffectSum: number[] = [0];
        for (let tmpCount = 0; tmpCount < matchingIndices1.length; tmpCount++) {
          if(typeof(data1[matchingIndices1[tmpCount]].soLuongTonDauKy) == 'number') {
            tmpEffectSum[0] += Number(data1[matchingIndices1[tmpCount]].soLuongTonDauKy);
          }

          if(typeof(data1[matchingIndices1[tmpCount]].soLuongNhapKhoTrongKy) == 'number') {
            tmpEffectSum[1] += Number(data1[matchingIndices1[tmpCount]].soLuongNhapKhoTrongKy);
          }

          if(typeof(data1[matchingIndices1[tmpCount]].soLuongXuatKhoTrongKy) == 'number') {
            tmpEffectSum[2] += Number(data1[matchingIndices1[tmpCount]].soLuongXuatKhoTrongKy);
          }

          if(typeof(data1[matchingIndices1[tmpCount]].soLuongTonCuoiKy) == 'number') {
            tmpEffectSum[3] += Number(data1[matchingIndices1[tmpCount]].soLuongTonCuoiKy);
          }
        }

        // Tính tổng các cột ở bảng ERP
        const tmpErpSum: number[] = [0];
        for (let tmpCount = 0; tmpCount < matchingIndices2.length; tmpCount++) {
          if(typeof(data2[matchingIndices2[tmpCount]].soLuongTonDauKy) == 'number') {
            tmpErpSum[0] += Number(data2[matchingIndices2[tmpCount]].soLuongTonDauKy);
          }

          if(typeof(data2[matchingIndices2[tmpCount]].soLuongNhapKhoTrongKy) == 'number') {
            tmpErpSum[1] += Number(data2[matchingIndices2[tmpCount]].soLuongNhapKhoTrongKy);
          }

          if(typeof(data2[matchingIndices2[tmpCount]].soLuongXuatKhoTrongKy) == 'number') {
            tmpErpSum[2] += Number(data2[matchingIndices2[tmpCount]].soLuongXuatKhoTrongKy);
          }

          if(typeof(data2[matchingIndices2[tmpCount]].soLuongTonCuoiKy) == 'number') {
            tmpErpSum[3] += Number(data2[matchingIndices2[tmpCount]].soLuongTonCuoiKy);
          }
        }

        // So sánh sum ở bảng ERP và bảng effect
        let tmpTrangThaiCheck: boolean[] = [false];
        for (let tmpCount = 0; tmpCount < tmpErpSum.length; tmpCount++) {
          if(tmpErpSum[tmpCount] == tmpEffectSum[tmpCount]) {
            tmpTrangThaiCheck[tmpCount] = true;
          }
        }

        // Đánh trạng thái so sánh cho các hàng hiện có ở cả 2 bảng
        for (let tmpCount = 0; tmpCount < matchingIndices1.length; tmpCount++) {
          data1[matchingIndices1[tmpCount]].trangThaiCheck = tmpTrangThaiCheck;
        }
        for (let tmpCount = 0; tmpCount < matchingIndices2.length; tmpCount++) {
          data2[matchingIndices2[tmpCount]].trangThaiCheck = tmpTrangThaiCheck;
        }

        // Đánh trạng thái so sánh cho các hàng dummy mới thêm vào
        dummyEffectData.ma = code;
        dummyEffectData.trangThaiCheck = tmpTrangThaiCheck;
        for (let tmpCount = 0; tmpCount < matchingIndices2.length - matchingIndices1.length; tmpCount++) {
          data1.push(dummyEffectData);
        }
      }
      
    });
    // Dữ liệu mẫu cho data1 và data2 đã được sắp xếp theo mã sản phẩm 'ma'
    const sortedData1 = data1.sort((a, b) => a.ma.localeCompare(b.ma));
    const sortedData2 = data2.sort((a, b) => a.ma.localeCompare(b.ma));
    

    sortedData1.forEach((item, item_idx) => { 
      const dummyArr: (string | number| null)[] = [
        item.ma,
        item.ten,
        item.tenDonViTinh,
        item.soLuongTonDauKy,
        item.soLuongNhapKhoTrongKy,
        item.soLuongXuatKhoTrongKy,
        item.soLuongTonCuoiKy,
        item.soLuongNo
      ];

      for (let col = 0; col < table1.countCols() - 2; col++) {
        table1.setDataAtCell(item_idx, col, dummyArr[col]);
        // Tất cả các cell được mark N/A đều tô đỏ
        if(item.trangThaiCheck === "fail") {
          table1.setCellMeta(item_idx, col, "className", "red-cell");
        } else if(item.trangThaiCheck == "unknown") {
          //Do nothing
        } else if(item.trangThaiCheck == "pass") {
          //Do nothing
        } else if(Array.isArray(item.trangThaiCheck)) {
          if((col >= 3) && (!item.trangThaiCheck[col-3])) {
            table1.setCellMeta(item_idx, col, "className", "red-cell");
          }
        }
      }
    });

    sortedData2.forEach((item, item_idx) => { 
      const dummyArr: (string | number| null)[] = [
        item.idKho,
        item.tenKho,
        item.ma,
        item.ten,
        item.tenDonViTinh,
        item.soLuongTonDauKy,
        item.soLuongNhapKhoTrongKy,
        item.soLuongXuatKhoTrongKy,
        item.soLuongTonCuoiKy
      ];
      
      for (let col = 0; col < table2.countCols() - 1; col++) {
        table2.setDataAtCell(item_idx, col, dummyArr[col]);
        if(item.trangThaiCheck === "fail") {
          table2.setCellMeta(item_idx, col, "className", "red-cell");
        } else if(item.trangThaiCheck == "unknown") {
          //Do nothing
        } else if(item.trangThaiCheck == "pass") {
          //Do nothing
        } else if(Array.isArray(item.trangThaiCheck)) {
          if((col >= 5) && (!item.trangThaiCheck[col-5])) {
            table2.setCellMeta(item_idx, col, "className", "red-cell");
          }
        }
      }
    });

    // Render lại 2 bảng để cập nhật giao diện
    table1.render();
    table2.render();
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
            ></HotTable>
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
              afterOnCellMouseDown={(event, coords) => 
                {
                  if (coords.row >= 0 && coords.col >= 0) {
                    const selectedRow = data2[coords.row];
                    setRowData(selectedRow);
                    setDetailOpen(true);
                  }
              }}
            ></HotTable>
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
              <Button
                onClick={() => setApproveOpen(false)}
                color="primary"
                variant="contained"
              >
                Duyệt
              </Button>
            </Stack>
          </Box>
        </Modal>
      </Grid2>
    </>
  );
}

OrdersPage.requireAuth = true;
