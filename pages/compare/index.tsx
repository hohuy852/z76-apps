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
import { table } from "console";
// register Handsontable's modules
registerAllModules();
type status = "pass" | "fail" | "unknown";
// pass: Tất cả các cột của 1 mã hàng 2 bên bằng nhau. cả 2 bên set pass
// fail: 1 Bên có bên không. Bên không set fail
// unknown: Mã hàng cả 2 bên là độc nhất và có 1 hoặc 1 vài cột bị khác hoặc Mã hàng cả 2 bên là không độc nhất và có tổng của 1 hoặc 1 vài cột bị khác =>
// array[boolean]: ex: [true, true, true, false] => màu của các cell trên hàng hiển thị item đó trên 1 bảng sẽ là [trắng, trắng, trắng, đỏ]

interface effectData {
  ma: string;
  ten: string;
  tenDonViTinh: string;
  soLuongTonDauKy: number | string;
  soLuongNhapKhoTrongKy: number | string;
  soLuongXuatKhoTrongKy: number | string;
  soLuongTonCuoiKy: number | string;
  soLuongNo: number | string | null;
  trangThaiCheck: status | Array<boolean>;
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
  trangThaiCheck: status | Array<boolean>;
}

export default function OrdersPage() {
  const dataEffect: effectData[] = [
    {
      ma: "SP001",
      ten: "Sản phẩm A",
      tenDonViTinh: "Cái",
      soLuongTonDauKy: 110,
      soLuongNhapKhoTrongKy: 50,
      soLuongXuatKhoTrongKy: 30,
      soLuongTonCuoiKy: 120,
      soLuongNo: "",
      trangThaiCheck: "unknown",
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
      trangThaiCheck: "unknown",
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
      trangThaiCheck: "unknown",
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
      trangThaiCheck: "unknown",
    },
  ];

  // Dữ liệu mẫu cho erpData
  const dataErp: erpData[] = [
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
      trangThaiCheck: "unknown",
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
      trangThaiCheck: "unknown",
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
      trangThaiCheck: "unknown",
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
      trangThaiCheck: "unknown",
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
      trangThaiCheck: "unknown",
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
      trangThaiCheck: "unknown",
    },
  ];
  // const [effectData, setEffectData] = React.useState<(boolean | string | number)[][]>([]);
  // const [erpData, seterpData] = React.useState<(boolean | string | number)[][]>([]);
  const [open, setOpen] = React.useState(false);
  const [detailOpen, setDetailOpen] = React.useState(false);
  const [approveOpen, setApproveOpen] = React.useState(false);
  const [rowData, setRowData] = React.useState<erpData | null>(null);
  // const [effectFilteredData, setEffectFilteredData] = React.useState<effectData[]>([]);
  // const [resultMatched, setResultMatched] = React.useState<erpData[]>([]);
  // const [erpFilteredData, setErpFilteredData] = React.useState<erpData[]>([]);
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

      // seterpData(formattedData);
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
    let startAll = performance.now();

    // Lấy instance của cả 2 bảng từ ref
    const table1 = hotTableRef1.current?.hotInstance;
    const table2 = hotTableRef2.current?.hotInstance;
    const table1Data = hotTableRef1.current?.hotInstance?.getData();
    const table2Data = hotTableRef2.current?.hotInstance?.getData();
    if (!table1Data || !table2Data) {
      console.error("Không thể lấy dữ liệu từ bảng.");
      return;
    }
 // Chuyển dữ liệu bảng thành các interface tương ứng
    const data1: effectData[] = table1Data.map((row: any) => ({
      ma: row[0],
      ten: row[1],
      tenDonViTinh: row[2],
      soLuongTonDauKy: row[3],
      soLuongNhapKhoTrongKy: row[4],
      soLuongXuatKhoTrongKy: row[5],
      soLuongTonCuoiKy: row[6],
      soLuongNo: row[7] ?? null,
      trangThaiCheck: row[8] ?? "unknown",
    }));

    const data2: erpData[] = table2Data.map((row: any) => ({
      idKho: row[0],
      tenKho: row[1],
      ma: row[2],
      ten: row[3],
      tenDonViTinh: row[4],
      soLuongTonDauKy: row[5],
      soLuongNhapKhoTrongKy: row[6],
      soLuongXuatKhoTrongKy: row[7],
      soLuongTonCuoiKy: row[8],
      chiTietNhapXuat: row[9] ?? [{}],
      trangThaiCheck: row[10] ?? "unknown",
    }));
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
    const errorerpData: erpData = {
      idKho: "N/A",
      tenKho: "N/A",
      ma: "N/A",
      ten: "N/A",
      tenDonViTinh: "N/A",
      soLuongTonDauKy: "N/A",
      soLuongNhapKhoTrongKy: "N/A",
      soLuongXuatKhoTrongKy: "N/A",
      soLuongTonCuoiKy: "N/A",
      chiTietNhapXuat: [{}],
      trangThaiCheck: "fail",
    };

    const errorEffectData: effectData = {
      ma: "N/A",
      ten: "N/A",
      tenDonViTinh: "N/A",
      soLuongTonDauKy: "N/A",
      soLuongNhapKhoTrongKy: "N/A",
      soLuongXuatKhoTrongKy: "N/A",
      soLuongTonCuoiKy: "N/A",
      soLuongNo: null,
      trangThaiCheck: "fail",
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
      trangThaiCheck: "unknown",
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

      if (matchingIndices1.length != 0 && matchingIndices2.length == 0) {
        // --- TRƯỜNG HỢP 1: data1 có mã nhưng data2 không có mã đó ---
        for (let tmpCount = 0; tmpCount < matchingIndices1.length; tmpCount++) {
          errorerpData.ma = code;
          data2.push(errorerpData);
          data1[matchingIndices1[tmpCount]].trangThaiCheck = "pass";
        }
      } else if (matchingIndices1.length == 0 && matchingIndices2.length != 0) {
        // --- TRƯỜNG HỢP 2: data2 có mã nhưng data1 không có mã đó ---
        errorEffectData.ma = code;
        for (let tmpCount = 0; tmpCount < matchingIndices2.length; tmpCount++) {
          data1.push(errorEffectData);
          data2[matchingIndices2[tmpCount]].trangThaiCheck = "pass";
        }
      } else if (matchingIndices1.length == 1 && matchingIndices2.length == 1) {
        // --- TRƯỜNG HỢP 3: data1 có mã và data2 có 1 dòng khớp ---
        const temp_trangThaiCheck: boolean[] = [false];
        temp_trangThaiCheck[0] =
          data1[matchingIndices1[0]].soLuongTonDauKy ==
          data2[matchingIndices2[0]].soLuongTonDauKy;
        temp_trangThaiCheck[1] =
          data1[matchingIndices1[0]].soLuongNhapKhoTrongKy ==
          data2[matchingIndices2[0]].soLuongNhapKhoTrongKy;
        temp_trangThaiCheck[2] =
          data1[matchingIndices1[0]].soLuongXuatKhoTrongKy ==
          data2[matchingIndices2[0]].soLuongXuatKhoTrongKy;
        temp_trangThaiCheck[3] =
          data1[matchingIndices1[0]].soLuongTonCuoiKy ==
          data2[matchingIndices2[0]].soLuongTonCuoiKy;
        data1[matchingIndices1[0]].trangThaiCheck = temp_trangThaiCheck;
        data2[matchingIndices2[0]].trangThaiCheck = temp_trangThaiCheck;
      } else if (matchingIndices1.length == 1 && matchingIndices2.length > 1) {
        // --- TRƯỜNG HỢP 4: data1 có nhiều dòng khớp và data2 có nhiều dòng khớp ---

        // Tính tổng các cột ở bảng EFFECT
        const tmpEffectSum: number[] = [0];
        for (let tmpCount = 0; tmpCount < matchingIndices1.length; tmpCount++) {
          if (
            typeof data1[matchingIndices1[tmpCount]].soLuongTonDauKy == "number"
          ) {
            tmpEffectSum[0] += Number(
              data1[matchingIndices1[tmpCount]].soLuongTonDauKy
            );
          }

          if (
            typeof data1[matchingIndices1[tmpCount]].soLuongNhapKhoTrongKy ==
            "number"
          ) {
            tmpEffectSum[1] += Number(
              data1[matchingIndices1[tmpCount]].soLuongNhapKhoTrongKy
            );
          }

          if (
            typeof data1[matchingIndices1[tmpCount]].soLuongXuatKhoTrongKy ==
            "number"
          ) {
            tmpEffectSum[2] += Number(
              data1[matchingIndices1[tmpCount]].soLuongXuatKhoTrongKy
            );
          }

          if (
            typeof data1[matchingIndices1[tmpCount]].soLuongTonCuoiKy ==
            "number"
          ) {
            tmpEffectSum[3] += Number(
              data1[matchingIndices1[tmpCount]].soLuongTonCuoiKy
            );
          }
        }

        // Tính tổng các cột ở bảng ERP
        const tmpErpSum: number[] = [0];
        for (let tmpCount = 0; tmpCount < matchingIndices2.length; tmpCount++) {
          if (
            typeof data2[matchingIndices2[tmpCount]].soLuongTonDauKy == "number"
          ) {
            tmpErpSum[0] += Number(
              data2[matchingIndices2[tmpCount]].soLuongTonDauKy
            );
          }

          if (
            typeof data2[matchingIndices2[tmpCount]].soLuongNhapKhoTrongKy ==
            "number"
          ) {
            tmpErpSum[1] += Number(
              data2[matchingIndices2[tmpCount]].soLuongNhapKhoTrongKy
            );
          }

          if (
            typeof data2[matchingIndices2[tmpCount]].soLuongXuatKhoTrongKy ==
            "number"
          ) {
            tmpErpSum[2] += Number(
              data2[matchingIndices2[tmpCount]].soLuongXuatKhoTrongKy
            );
          }

          if (
            typeof data2[matchingIndices2[tmpCount]].soLuongTonCuoiKy ==
            "number"
          ) {
            tmpErpSum[3] += Number(
              data2[matchingIndices2[tmpCount]].soLuongTonCuoiKy
            );
          }
        }

        // So sánh sum ở bảng ERP và bảng effect
        let tmpTrangThaiCheck: boolean[] = [false];
        for (let tmpCount = 0; tmpCount < tmpErpSum.length; tmpCount++) {
          if (tmpErpSum[tmpCount] == tmpEffectSum[tmpCount]) {
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
        for (
          let tmpCount = 0;
          tmpCount < matchingIndices2.length - matchingIndices1.length;
          tmpCount++
        ) {
          data1.push(dummyEffectData);
        }
      }
    });
    // Dữ liệu mẫu cho data1 và data2 đã được sắp xếp theo mã sản phẩm 'ma'
    const sortedData1 = data1.sort((a, b) => a.ma.localeCompare(b.ma));
    const sortedData2 = data2.sort((a, b) => a.ma.localeCompare(b.ma));
    let start1 = performance.now();
    const metaDataBackup1: (any)[] = []; // Mỗi phần tử có dạng: { row, col, key, value }

    sortedData1.forEach((item, item_idx) => {
      const dummyArr: (string | number | null)[] = [
        item.ma,
        item.ten,
        item.tenDonViTinh,
        item.soLuongTonDauKy,
        item.soLuongNhapKhoTrongKy,
        item.soLuongXuatKhoTrongKy,
        item.soLuongTonCuoiKy,
        item.soLuongNo,
      ];

      // Bảo Tín: Thực hiện bind giá trị dòng vào tableData, lưu thuộc tính bôi đỏ lại thành 1 mảng metaDataBackup rồi set 1 lượt (tránh gọi handsontable chọt từng ô bị chậm)
      table1Data[item_idx] = dummyArr;

      // Kiểm tra điều kiện và lưu metadata cần thiết vào metaDataBackup2
      for (let col = 0; col < table1.countCols() - 1; col++) {
        if (item.trangThaiCheck === "fail") {
          metaDataBackup1.push({ row: item_idx, col: col, key: "className", value: "red-cell" });
        } else if (item.trangThaiCheck === "unknown") {
          // Do nothing
        } else if (item.trangThaiCheck === "pass") {
          // Do nothing
        } else if (Array.isArray(item.trangThaiCheck)) {
          // Bảo Tín: Xem lại dòng này vì sao phải trừ, vì em vừa sửa thành -3 thành -5, xem kết quả vẫn đúng đúng
          if (col >= 5 && !item.trangThaiCheck[col - 5]) {
            metaDataBackup1.push({ row: item_idx, col: col, key: "className", value: "red-cell" });
          }
        }
      }
    });
    // Cập nhật dữ liệu mới cho Handsontable một lần
    table1.updateSettings({
      data: table1Data
    });
    // Sau khi load dữ liệu mới, áp dụng lại tất cả metadata đã lưu
    metaDataBackup1.forEach(meta => {
      table1.setCellMeta(meta.row, meta.col, meta.key, meta.value);
    });
    let end1 = performance.now();
    console.log("Thời gian thực hiện sort 1: ", end1 - start1);
    let start2 = performance.now();
    
    const metaDataBackup2: (any)[] = []; // Mỗi phần tử có dạng: { row, col, key, value }

    sortedData2.forEach((item, item_idx) => {
      // Tạo mảng dữ liệu cho hàng
      const dummyArr = [
        item.idKho,
        item.tenKho,
        item.ma,
        item.ten,
        item.tenDonViTinh,
        item.soLuongTonDauKy,
        item.soLuongNhapKhoTrongKy,
        item.soLuongXuatKhoTrongKy,
        item.soLuongTonCuoiKy,
      ];
      // Bảo Tín: Thực hiện bind giá trị dòng vào tableData, lưu thuộc tính bôi đỏ lại thành 1 mảng metaDataBackup rồi set 1 lượt (tránh gọi handsontable chọt từng ô bị chậm)

      table2Data[item_idx] = dummyArr;

      // Kiểm tra điều kiện và lưu metadata cần thiết vào metaDataBackup2
      for (let col = 0; col < table2.countCols(); col++) {
        if (item.trangThaiCheck === "fail") {
          metaDataBackup2.push({ row: item_idx, col: col, key: "className", value: "red-cell" });
        } else if (item.trangThaiCheck === "unknown") {
          // Do nothing
        } else if (item.trangThaiCheck === "pass") {
          // Do nothing
        } else if (Array.isArray(item.trangThaiCheck)) {
          if (col >= 5 && !item.trangThaiCheck[col - 5]) {
            metaDataBackup2.push({ row: item_idx, col: col, key: "className", value: "red-cell" });
          }
        }
      }
    });

    // Cập nhật dữ liệu mới cho Handsontable một lần
    table2.updateSettings({
      data: table2Data
    });

    // Sau khi load dữ liệu mới, áp dụng lại tất cả metadata đã lưu
    metaDataBackup2.forEach(meta => {
      table2.setCellMeta(meta.row, meta.col, meta.key, meta.value);
    });
    let end2 = performance.now();
    console.log("Thời gian thực hiện sort 2: ", end2 - start2);
    // Render lại 2 bảng để cập nhật giao diện
    table1.render();
    table2.render();
    let endAll = performance.now();
    console.log("Thời gian thực hiện tất cả: ", endAll - startAll);
  };

  /**
 * Hàm filterData nhận vào 2 mảng dữ liệu và trả về 3 mảng kết quả:
 * - effectFilteredData: dữ liệu data1 sau khi loại bỏ các mục đã match
 * - resultMatched: các nhóm từ data2 có tổng các thuộc tính khớp với mục tương ứng trong data1
 * - erpFilteredData: dữ liệu data2 sau khi đã loại bỏ các mục đã match
 */
  function filterData(
    data1: effectData[],
    data2: erpData[]
  ): {
    effectFilteredData: effectData[];
    resultMatched: erpData[];
    erpFilteredData: erpData[];
  } {
    // Nhóm data2 theo 'ma'
    const groupedData2: Record<string, erpData[]> = data2.reduce((acc, item) => {
      if (!acc[item.ma]) {
        acc[item.ma] = [];
      }
      acc[item.ma].push(item);
      return acc;
    }, {} as Record<string, erpData[]>);

    // Lọc kết quả: nếu tổng các thuộc tính của nhóm data2 khớp với mục tương ứng ở data1 thì giữ lại cả nhóm đó
    const resultMatched: erpData[] = [];

    for (const ma in groupedData2) {
      const group: erpData[] = groupedData2[ma];
      // Tìm mục tương ứng trong data1
      const target = data1.find((item) => item.ma === ma);
      if (!target) continue; // Nếu không có mục tương ứng ở data1 thì bỏ qua

      // Tính tổng các thuộc tính của nhóm (ép sang number nếu cần)
      const sum = group.reduce(
        (acc, cur) => ({
          soLuongTonDauKy: Number(acc.soLuongTonDauKy) + Number(cur.soLuongTonDauKy),
          soLuongNhapKhoTrongKy:
            Number(acc.soLuongNhapKhoTrongKy) + Number(cur.soLuongNhapKhoTrongKy),
          soLuongXuatKhoTrongKy:
            Number(acc.soLuongXuatKhoTrongKy) + Number(cur.soLuongXuatKhoTrongKy),
          soLuongTonCuoiKy:
            Number(acc.soLuongTonCuoiKy) + Number(cur.soLuongTonCuoiKy),
        }),
        {
          soLuongTonDauKy: 0,
          soLuongNhapKhoTrongKy: 0,
          soLuongXuatKhoTrongKy: 0,
          soLuongTonCuoiKy: 0,
        }
      );

      // So sánh tổng của nhóm data2 với dữ liệu tương ứng từ data1
      if (
        sum.soLuongTonDauKy === Number(target.soLuongTonDauKy) &&
        sum.soLuongNhapKhoTrongKy === Number(target.soLuongNhapKhoTrongKy) &&
        sum.soLuongXuatKhoTrongKy === Number(target.soLuongXuatKhoTrongKy) &&
        sum.soLuongTonCuoiKy === Number(target.soLuongTonCuoiKy)
      ) {
        resultMatched.push(...group);
      }
    }

    // Helper function: tính tổng các thuộc tính của một mảng các entry
    function sumProps(entries: erpData[]): {
      soLuongTonDauKy: number;
      soLuongNhapKhoTrongKy: number;
      soLuongXuatKhoTrongKy: number;
      soLuongTonCuoiKy: number;
    } {
      return entries.reduce(
        (sum, entry) => {
          sum.soLuongTonDauKy += Number(entry.soLuongTonDauKy);
          sum.soLuongNhapKhoTrongKy += Number(entry.soLuongNhapKhoTrongKy);
          sum.soLuongXuatKhoTrongKy += Number(entry.soLuongXuatKhoTrongKy);
          sum.soLuongTonCuoiKy += Number(entry.soLuongTonCuoiKy);
          return sum;
        },
        {
          soLuongTonDauKy: 0,
          soLuongNhapKhoTrongKy: 0,
          soLuongXuatKhoTrongKy: 0,
          soLuongTonCuoiKy: 0,
        }
      );
    }

    // Lọc data1: loại bỏ các mục có tổng thuộc tính ở data2 khớp
    const effectFilteredData = data1.filter((d1) => {
      // Tìm các entry trong data2 có cùng 'ma'
      const matchingData2 = data2.filter((d2) => d2.ma === d1.ma);

      // Nếu không có entry nào khớp, giữ lại mục đó
      if (matchingData2.length === 0) {
        return true;
      }

      // Tính tổng các thuộc tính của các entry trong data2
      const summedData2 = sumProps(matchingData2);

      // Nếu tổng ở data2 khớp với data1, loại bỏ mục này khỏi data1
      if (
        summedData2.soLuongTonDauKy === Number(d1.soLuongTonDauKy) &&
        summedData2.soLuongNhapKhoTrongKy === Number(d1.soLuongNhapKhoTrongKy) &&
        summedData2.soLuongXuatKhoTrongKy === Number(d1.soLuongXuatKhoTrongKy) &&
        summedData2.soLuongTonCuoiKy === Number(d1.soLuongTonCuoiKy)
      ) {
        // Loại bỏ các entry đã match khỏi data2
        matchingData2.forEach((matching) => {
          const index = data2.findIndex(
            (d2) =>
              d2.ma === matching.ma &&
              Number(d2.soLuongTonDauKy) === Number(matching.soLuongTonDauKy) &&
              Number(d2.soLuongNhapKhoTrongKy) === Number(matching.soLuongNhapKhoTrongKy)
          );
          if (index !== -1) {
            data2.splice(index, 1);
          }
        });
        return false;
      }

      return true;
    });

    // Lọc data2 (các entry còn lại sau khi loại bỏ các entry đã match)
    const erpFilteredData = data2.filter((d2) => {
      // Giữ lại entry nếu không tìm thấy mục tương ứng trong data1
      const matchingData1 = data1.find((d1) => d1.ma === d2.ma);
      return matchingData1 ? true : true;
    });

    return {
      effectFilteredData,
      resultMatched,
      erpFilteredData,
    };
  }
  const handleFilterData = () => {
    const table1 = hotTableRef1.current?.hotInstance;
    const table2 = hotTableRef2.current?.hotInstance;
  
    if (!table1 || !table2) {
      console.error("Một hoặc cả hai hotInstance không khả dụng.");
      return;
    }
  
    // Tạo bản sao nếu cần tránh tác động phụ
    const data1Copy = [...dataEffect];
    const data2Copy = [...dataErp];
  
    const { effectFilteredData, resultMatched, erpFilteredData } = filterData(
      data1Copy,
      data2Copy
    );
    // // Cập nhật state
    // setEffectFilteredData(effectFilteredData);
    // setResultMatched(resultMatched);
    // setErpFilteredData(erpFilteredData);
  
    // Cập nhật Handsontable ngay lập tức
    table1.loadData(effectFilteredData);
    table2.loadData(erpFilteredData);
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
              onClick={handleFilterData}
              variant="contained"
            >
              Loc
            </Button>
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
              data={dataEffect}
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
                columns: [7, 8],
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
            ></HotTable>
          </Grid2>
          <Grid2 size="grow">
            <HotTable
              data={dataErp}
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
                columns: [9, 10],
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
                if (coords.row >= 0 && coords.col >= 0) {
                  const selectedRow = dataErp[coords.row];
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
                  data={dataErp}
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
