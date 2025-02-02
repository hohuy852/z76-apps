'use client'

import { useState, useEffect } from 'react'
import "./style.css";

import { useRouter, usePathname } from 'next/navigation'
import { useCallback } from "react";
import {FormMode} from '@/enums/FormMode';
import ExcelForm from "@/components/ExcelForm/ExcelForm";
import useSignalR from '@/hooks/useSignalR';
import AvatarStack from "@/components/Avatar/avatar-stack";
import Handsontable from 'handsontable';
import { Box, SvgIcon, Tooltip   } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from '@mui/icons-material/Close';
import { createRoot } from "react-dom/client";
import DatePicker from '@/components/DatePicker/DatePicker';
import { format } from "date-fns";
import CircularProgress from '@mui/material/CircularProgress';
import Pagination from '@/components/Pagination/Pagination';
import type { SelectChangeEvent } from "@mui/material"
import Cookies from "js-cookie";
import { SaveIcon } from "lucide-react"
import dataToKhaiFake from '@/data/export-declaration';

interface FilterGroup {
  id: number
  operator: string
  searchField: string
  searchType: string
  compareType: string
  valueFrom: string
  valueTo: string
  searchValue: string
}
interface Operator {
  op: string,
  title: string
}
interface User {
  id: number
  name: string
  avatar: string
}
interface PaginationInfo{
  itemsPerPage: number,
  currentPage: number
}

// interface UserForm {
//   key: string
//   value: User[]
// }
export default function DocumentSearch() {
  const [list, setList] = useState<any[]>([]);
  const [currentDate, setCurrentDate] = useState<string>("");
  const [searchType, setSearchType] = useState('all');
  const [modeDetail, setModeDetail] = useState();
  const [formUsers, setFormUsers] = useState<User[]>([]);
  const [sendUserStatus, setSendUserStatus] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const columns = [
    {
        "dataField": "stt",
        "title": "STT",
        "width": "150px",
        "dataType": "numeric"
    },
    {
        "dataField": "so_to_khai",
        "title": "Số tờ khai",
        "width": "150px",
        "dataType": "text"
    },
    {
        "dataField": "ngay_dang_ky",
        "title": "Ngày đăng ký",
        "width": "150px",
        "dataType": "date"
    },
    {
        "dataField": "ma_hq",
        "title": "Mã HQ",
        "width": "150px",
        "dataType": "text"
    },
    {
        "dataField": "ma_lh",
        "title": "Mã LH",
        "width": "150px",
        "dataType": "text"
    },
    {
        "dataField": "ten_doi_tac",
        "title": "Tên đối tác",
        "width": "150px",
        "dataType": "text"
    },
    {
        "dataField": "ma_dai_ly_hq",
        "title": "Mã đại lý HQ",
        "width": "150px",
        "dataType": "text"
    },
    {
        "dataField": "phan_loai_ca_nhan_to_chuc",
        "title": "Phân loại cá nhân tổ chức",
        "width": "150px",
        "dataType": "text"
    },
    {
        "dataField": "ma_bo_phan_xu_ly_tk",
        "title": "Mã bộ phận xử lý tk",
        "width": "150px",
        "dataType": "text"
    },
    {
        "dataField": "ma_hieu_phuong_thuc_van_chuyen",
        "title": "Mã hiệu phương thức vận chuyển",
        "width": "150px",
        "dataType": "text"
    },
    {
        "dataField": "van_don",
        "title": "Vận đơn",
        "width": "150px",
        "dataType": "text"
    },
    {
        "dataField": "so_luong_kien",
        "title": "Số lượng kiện",
        "width": "150px",
        "dataType": "numeric"
    },
    {
        "dataField": "tong_trong_luong_hang_gross",
        "title": "Tổng trọng lượng hàng (Gross)",
        "width": "150px",
        "dataType": "numeric"
    },
    {
        "dataField": "ma_dia_diem_luu_kho",
        "title": "Mã địa điểm lưu kho",
        "width": "150px",
        "dataType": "text"
    },
    {
        "dataField": "ten_dia_diem_luu_kho",
        "title": "Tên địa điểm lưu kho",
        "width": "150px",
        "dataType": "text"
    },
    {
        "dataField": "ma_phuong_tien_van_chuyen",
        "title": "Mã phương tiện vận chuyển",
        "width": "150px",
        "dataType": "text"
    },
    {
        "dataField": "ten_phuong_tien_van_chuyen",
        "title": "Tên phương tiện vận chuyển",
        "width": "150px",
        "dataType": "text"
    },
    {
        "dataField": "ngay_den",
        "title": "Ngày đến",
        "width": "150px",
        "dataType": "date"
    },
    {
        "dataField": "ma_dia_diem_xep_hang",
        "title": "Mã địa điểm xếp hàng",
        "width": "150px",
        "dataType": "text"
    },
    {
        "dataField": "ten_dia_diem_xep_hang",
        "title": "Tên địa điểm xếp hàng",
        "width": "150px",
        "dataType": "text"
    },
    {
        "dataField": "ma_dia_diem_do_hang",
        "title": "Mã địa điểm dỡ hàng",
        "width": "150px",
        "dataType": "text"
    },
    {
        "dataField": "ten_dia_diem_do_hang",
        "title": "Tên địa điểm dỡ hàng",
        "width": "150px",
        "dataType": "text"
    },
    {
        "dataField": "so_luong_cont",
        "title": "Số lượng cont",
        "width": "150px",
        "dataType": "numeric"
    },
    {
        "dataField": "so_giay_phep",
        "title": "Số giấy phép",
        "width": "150px",
        "dataType": "text"
    },
    {
        "dataField": "so_hd_tm",
        "title": "Số HĐTM",
        "width": "150px",
        "dataType": "text"
    },
    {
        "dataField": "ngay_hd_tm",
        "title": "Ngày HĐTM",
        "width": "150px",
        "dataType": "date"
    },
    {
        "dataField": "tong_tri_gia_hd",
        "title": "Tổng trị giá HĐ",
        "width": "150px",
        "dataType": "numeric"
    },
    {
        "dataField": "phuong_thuc_thanh_toan",
        "title": "Phương thức thanh toán",
        "width": "150px",
        "dataType": "text"
    },
    {
        "dataField": "dieu_kien_gia_hoa_don",
        "title": "Điều kiện giá hóa đơn",
        "width": "150px",
        "dataType": "text"
    },
    {
        "dataField": "ngoai_te_hoa_don",
        "title": "Ng.Tệ hóa đơn",
        "width": "150px",
        "dataType": "text"
    },
    {
        "dataField": "ty_gia_vnd",
        "title": "Tỷ giá VNĐ",
        "width": "150px",
        "dataType": "numeric"
    },
    {
        "dataField": "phi_bh",
        "title": "Phí BH",
        "width": "150px",
        "dataType": "numeric"
    },
    {
        "dataField": "phi_vc",
        "title": "Phí VC",
        "width": "150px",
        "dataType": "numeric"
    },
    {
        "dataField": "nguoi_nop_thue",
        "title": "Người nộp thuế",
        "width": "150px",
        "dataType": "text"
    },
    {
        "dataField": "tri_gia_kb",
        "title": "Trị giá KB",
        "width": "150px",
        "dataType": "numeric"
    },
    {
        "dataField": "tong_tri_gia_tt",
        "title": "Tổng trị giá TT",
        "width": "150px",
        "dataType": "numeric"
    },
    {
        "dataField": "tong_tien_thue",
        "title": "Tổng tiền thuế",
        "width": "150px",
        "dataType": "numeric"
    },
    {
        "dataField": "ma_ly_do_de_nghi_bp",
        "title": "Mã lý do đề nghị BP",
        "width": "150px",
        "dataType": "text"
    },
    {
        "dataField": "ma_ngan_hang_tra_thue",
        "title": "Mã ngân hàng trả thuế",
        "width": "150px",
        "dataType": "text"
    },
    {
        "dataField": "nam_phat_hanh_han_muc",
        "title": "Năm phát hành hạn mức",
        "width": "150px",
        "dataType": "numeric"
    },
    {
        "dataField": "ky_hieu_ct_han_muc",
        "title": "Ký hiệu CT hạn mức",
        "width": "150px",
        "dataType": "text"
    },
    {
        "dataField": "so_ct_han_muc",
        "title": "Số CT hạn mức",
        "width": "150px",
        "dataType": "text"
    },
    {
        "dataField": "ma_xac_dinh_thoi_han_nop_thue",
        "title": "Mã xác định thời hạn nộp thuế",
        "width": "150px",
        "dataType": "text"
    },
    {
        "dataField": "ma_ngan_hang_bao_lanh",
        "title": "Mã ngân hàng bảo lãnh",
        "width": "150px",
        "dataType": "text"
    },
    {
        "dataField": "nam_phat_hanh_bao_lanh",
        "title": "Năm phát hành bảo lãnh",
        "width": "150px",
        "dataType": "numeric"
    },
    {
        "dataField": "ky_hieu_ct_bao_lanh",
        "title": "Ký hiệu CT bảo lãnh",
        "width": "150px",
        "dataType": "text"
    },
    {
        "dataField": "so_hieu_ct_bao_lanh",
        "title": "Số hiệu CT bảo lãnh",
        "width": "150px",
        "dataType": "text"
    },
    {
        "dataField": "so_hd",
        "title": "Số HĐ",
        "width": "150px",
        "dataType": "text"
    },
    {
        "dataField": "ngay_hd",
        "title": "Ngày HĐ",
        "width": "150px",
        "dataType": "date"
    },
    {
        "dataField": "ngay_hh_hd",
        "title": "Ngày HHHĐ",
        "width": "150px",
        "dataType": "date"
    },
    {
        "dataField": "trang_thai",
        "title": "Trạng thái",
        "width": "150px",
        "dataType": "text"
    },
    {
        "dataField": "phan_luong",
        "title": "Phân luồng",
        "width": "150px",
        "dataType": "text"
    },
    {
        "dataField": "loai_to_khai_nhap_xuat",
        "title": "Loại tờ khai nhập xuất",
        "width": "150px",
        "dataType": "text"
    },
    {
        "dataField": "ten_don_vi_xuat_nhap_khau",
        "title": "Tên đơn vị xuất/nhập khẩu",
        "width": "150px",
        "dataType": "text"
    },
    {
        "dataField": "loai_hinh_to_khai",
        "title": "Loại hình tờ khai",
        "width": "150px",
        "dataType": "text"
    },
    {
        "dataField": "dia_chi_dn_xuat_nhap_khau",
        "title": "Địa chỉ doanh nghiệp xuất/nhập khẩu",
        "width": "150px",
        "dataType": "text"
    },
    {
        "dataField": "ma_nuoc_xuat_khau",
        "title": "Mã nước xuất khẩu",
        "width": "150px",
        "dataType": "text"
    },
    {
        "dataField": "loai_kien",
        "title": "Loại kiện",
        "width": "150px",
        "dataType": "text"
    },
    {
        "dataField": "don_vi_tinh_trong_luong",
        "title": "Đơn vị tính trọng lượng",
        "width": "150px",
        "dataType": "text"
    },
    {
        "dataField": "hoa_don_thuong_mai",
        "title": "Hóa đơn thương mại",
        "width": "150px",
        "dataType": "text"
    },
    {
        "dataField": "ma_phan_loai_hoa_don",
        "title": "Mã phân loại hóa đơn",
        "width": "150px",
        "dataType": "text"
    },
    {
        "dataField": "ma_phan_loai_phi_van_chuyen",
        "title": "Mã phân loại phí vận chuyển",
        "width": "150px",
        "dataType": "text"
    },
    {
        "dataField": "ma_phan_loai_phi_bao_hiem",
        "title": "Mã phân loại phí bảo hiểm",
        "width": "150px",
        "dataType": "text"
    },
    {
        "dataField": "ma_tien_phi_van_chuyen",
        "title": "Mã tiền phí vận chuyển",
        "width": "150px",
        "dataType": "text"
    },
    {
        "dataField": "ma_tien_phi_bao_hiem",
        "title": "Mã tiền phí bảo hiểm",
        "width": "150px",
        "dataType": "text"
    },
    {
        "dataField": "dia_chi_nguoi_xuat_nhap_khau_1",
        "title": "Địa chỉ người xuất/nhập khẩu1",
        "width": "150px",
        "dataType": "text"
    },
    {
        "dataField": "ghi_chu",
        "title": "Ghi chú",
        "width": "150px",
        "dataType": "text"
    },
    {
        "dataField": "ma_phan_loai_hinh_thuc_hoa_don",
        "title": "Mã phân loại hình thức hóa đơn",
        "width": "150px",
        "dataType": "text"
    },
    {
        "dataField": "dia_diem_dich_cho_van_chuyen_bao_thue",
        "title": "Địa điểm đích cho vận chuyển báo thuế",
        "width": "150px",
        "dataType": "text"
    },
    {
        "dataField": "ngay_du_kien_den_dia_diem_dich",
        "title": "Ngày dự kiến đến địa điểm đích",
        "width": "150px",
        "dataType": "date"
    },
    {
        "dataField": "ngay_khoi_hanh_van_chuyen",
        "title": "Ngày khởi hành vận chuyển",
        "width": "150px",
        "dataType": "date"
    },
    {
        "dataField": "ma_phan_loai_to_khai_tri_gia",
        "title": "Mã phân loại tờ khai trị giá",
        "width": "150px",
        "dataType": "text"
    },
    {
        "dataField": "dia_chi_nguoi_xuat_nhap_khau_2",
        "title": "Địa chỉ người xuất/nhập khẩu2",
        "width": "150px",
        "dataType": "text"
    },
    {
        "dataField": "dia_chi_nguoi_xuat_nhap_khau_3",
        "title": "Địa chỉ người xuất/nhập khẩu3",
        "width": "150px",
        "dataType": "text"
    },
    {
        "dataField": "dia_chi_nguoi_xuat_nhap_khau_4",
        "title": "Địa chỉ người xuất/nhập khẩu4",
        "width": "150px",
        "dataType": "text"
    },
    {
        "dataField": "ma_dong_tien_tri_gia_tinh_thue",
        "title": "Mã đồng tiền trị giá tính thuế",
        "width": "150px",
        "dataType": "text"
    },
    { dataField: "", title: "", width: "100px", dataType: "text" },
    { data: "action", dataField: "", title: "Chức năng", type: 'Action', renderer: actionRenderer, width: "100px", dataType: "text" },
  ];
  const [filterGroups, setFilterGroups] = useState<FilterGroup[]>([
    {
      id: 0,
      operator: '',
      searchField: '',
      searchType: 'string',
      compareType: 'equal',
      valueFrom: format(new Date(new Date().getFullYear(),0,1), "dd/MM/yyyy"),
      valueTo: format(new Date(new Date().getFullYear(),11,31), "dd/MM/yyyy"),
      searchValue: ''
    }
  ]);
  const [operatorList, setOperatorList] = useState<Operator[]>([
    {
      op: "equal",
      title: "Bằng"
    },
    {
      op: "less",
      title: "Bé hơn"
    },
    {
      op: "great",
      title: "Lớn hơn"
    },
    {
      op: "between",
      title: "Trong khoảng"
    },
    
    {
      op: "contains",
      title: "Chứa"
    },
    
    {
      op: "not contains",
      title: "Không chứa"
    },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");
  const avatar = localStorage.getItem("avatar");
  
  const changeOperatorList = (type: string) => {
    switch(type) {
      case "date":
        setOperatorList([
          {
            op: "equal",
            title: "Bằng"
          },
          {
            op: "less",
            title: "Bé hơn"
          },
          {
            op: "great",
            title: "Lớn hơn"
          },
          {
            op: "between",
            title: "Trong khoảng"
          },
          
          // {
          //   op: "contains",
          //   title: "Chứa"
          // },
          
          // {
          //   op: "not contains",
          //   title: "Không chứa"
          // },
        ])
        break;
      case "number":
        setOperatorList([
          {
            op: "equal",
            title: "Bằng"
          },
          {
            op: "less",
            title: "Bé hơn"
          },
          {
            op: "great",
            title: "Lớn hơn"
          },
          // {
          //   op: "between",
          //   title: "Trong khoảng"
          // },
          
          // {
          //   op: "contains",
          //   title: "Chứa"
          // },
          
          // {
          //   op: "not contains",
          //   title: "Không chứa"
          // },
        ])
        break;
      default:
        setOperatorList([
          {
            op: "equal",
            title: "Bằng"
          },
          {
            op: "less",
            title: "Bé hơn"
          },
          {
            op: "great",
            title: "Lớn hơn"
          },
          // {
          //   op: "between",
          //   title: "Trong khoảng"
          // },
          
          {
            op: "contains",
            title: "Chứa"
          },
          
          {
            op: "not contains",
            title: "Không chứa"
          },
        ])
    }
  }
  const addFilterGroup = () => {
    setFilterGroups([
      ...filterGroups,
      {
        id: filterGroups.length + 1,
        operator: 'AND',
        searchField: columns[0].dataField,
        searchType: 'string',
        compareType: 'equal',
        valueFrom: format(new Date(new Date().getFullYear(),0,1), "dd/mm/yyyy"),
        valueTo: format(new Date(new Date().getFullYear(),11,31), "dd/MM/yyyy"),
        searchValue: ''
    }
    ])
  };
  const removeFilterGroup = (index: number) => {
    var tempArr = [...filterGroups];
    tempArr.splice(index, 1);
    setFilterGroups(tempArr);
  };
  const { messages, sendTableExportData, sendUserInForm, connection, sendFilterGroups, sendPaginationInfo } = useSignalR(
    "https://localhost:7152/chathub"
  );
  useEffect(() =>{
    const fetchSummaryData = async () => {
      try{
        var filterArrs = [{Field: "", Operator: "", Value: ""}];
        filterGroups.forEach(filter => {
          if(filter.searchType == "date" && filter.compareType == "between"){
            filterArrs.push({
              Field: filter.searchField,
              Operator: "great equal",
              Value: filter.valueFrom
            });
            filterArrs.push({
              Field: filter.searchField,
              Operator: "less equal",
              Value: filter.valueTo
            });
          } else{
            filterArrs.push({
              Field: filter.searchField,
              Operator: filter.compareType,
              Value: filter.searchValue
            });
          }
        });
        const summary = await fetch("https://localhost:7152/api/ExportDeclarations/Paging", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookies.get("token")}`, // Thêm header Authorization
          },
          body: JSON.stringify({
            "filters": JSON.stringify(filterArrs.filter(x => x.Field)),
            "take": currentPage,
            "limit": itemsPerPage,
            "type": 0
          }),
        });
        const summaryResult = await summary.json();
        setTotalItems(summaryResult.Total);
      } catch (err){
        console.error(err);
      }
    }
    fetchSummaryData();
  }, [itemsPerPage])
  useEffect(() => {
    const fetchData = async () => {
      try {
        var filterArrs = [{Field: "", Operator: "", Value: ""}];
        filterGroups.forEach(filter => {
          if(filter.searchType == "date" && filter.compareType == "between"){
            filterArrs.push({
              Field: filter.searchField,
              Operator: "great equal",
              Value: filter.valueFrom
            });
            filterArrs.push({
              Field: filter.searchField,
              Operator: "less equal",
              Value: filter.valueTo
            });
          } else{
            filterArrs.push({
              Field: filter.searchField,
              Operator: filter.compareType,
              Value: filter.searchValue
            });
          }
        });
        const response = await fetch("https://localhost:7152/api/ExportDeclarations/Paging", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookies.get("token")}`, // Thêm header Authorization
          },
          body: JSON.stringify({
            "filters": JSON.stringify(filterArrs.filter(x => x.Field)),
            "take": currentPage,
            "limit": itemsPerPage,
            "type": 1

          }),
        });
        
        const result = await response.json();
        setList(result.Data);
        sendTableExportData(userId ?? "", JSON.stringify(result.Data));
      } catch (error) {
        console.error("Lỗi khi fetch dữ liệu:", error);
      }
    };
    
    fetchData();
    setCurrentDate(new Date().toLocaleDateString());
  }, [itemsPerPage, currentPage]); // [] để chỉ gọi một lần khi component render
  useEffect(() => {
    if (connection) {
      connection.on("ReceiveTableExportData", (user: string, message: string) => {
        try {
          if(message){
            const parsedData = JSON.parse(message);
            setList(parsedData);
          }
        } catch (error) {
          console.error("Invalid JSON:", error);
        }
      });
      connection.on("UpdateUserList", (users: User[]) => {
        
        if(users != undefined){
          setFormUsers(users)
        }
      });
      connection.on("ReceiveFilterGroups", (user: string, message: string) => {
        try {
          if(message){
            const parsedData = JSON.parse(message);
            setFilterGroups(parsedData);
          }
        } catch (error) {
          console.error("Invalid JSON:", error);
        }
      });
      
      connection.on("ReceivePaginationInfo", (paginationInfo: PaginationInfo) => {
        try {
          if(paginationInfo){
            setItemsPerPage(paginationInfo.itemsPerPage);
            setCurrentPage(paginationInfo.currentPage);
          }
        } catch (error) {
          console.error("Invalid JSON:", error);
        }
      });
      return () => {
        connection.off("ReceiveTableExportData");
        connection.off("UpdateUserList");
        connection.off("ReceiveFilterGroups");
        connection.off("ReceivePaginationInfo");
        // if (typeof id === "string") {
        //   removeUserInForm(id, {
        //     userId: userId,
        //     userName: userName,
        //     avatar: avatar,
        //   });
        // }
      };
    }
    
  }, [connection]); 
  useEffect(() => {
    return () => {
      console.log("Route changed, closing WebSocket...");
      if (connection) connection.stop();
    };
  }, [pathname]); // Khi pathname thay đổi thì dừng connection
  if (sendUserStatus == false){
    const waitForConnection = setInterval(() => {
      if (connection && connection.state === "Connected") {
        console.log("WebSocket is fully connected, sending user info...");
        sendUserInForm({ userId, userName, avatar });
        setSendUserStatus(true);
        clearInterval(waitForConnection);
      }
    }, 100);
    if(sendUserStatus){
      clearInterval(waitForConnection);
    }
  }
  // Hàm xử lý sự kiện từ component con
  const blurCell = (msg: string) => {
    const parsedData = JSON.parse(msg);
    setList(parsedData);
    sendTableExportData(userId ?? "", msg);
    saveTableExportData(parsedData)
  };
  

  const searchExportDeclaration = async () => {
    console.log('filterGroups:', filterGroups);
    try {
      var filterArrs = [{Field: "", Operator: "", Value: ""}];
      filterGroups.forEach(filter => {
        if(filter.searchType == "date" && filter.compareType == "between"){
          filterArrs.push({
            Field: filter.searchField,
            Operator: "great equal",
            Value: filter.valueFrom
          });
          filterArrs.push({
            Field: filter.searchField,
            Operator: "less equal",
            Value: filter.valueTo
          });
        } else{
          filterArrs.push({
            Field: filter.searchField,
            Operator: filter.compareType,
            Value: filter.searchValue
          });
        }
      });
      const response = await fetch("https://localhost:7152/api/ExportDeclarations/Paging", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get("token")}`, // Thêm header Authorization
        },
        body: JSON.stringify({
          "filters": JSON.stringify(filterArrs.filter(x => x.Field)),
          "take": currentPage,
          "limit": itemsPerPage,
          "type": 1

        }),
      });
      const result = await response.json();
      setList(result.Data);
      sendTableExportData(userId ?? "", JSON.stringify(result.Data));
      sendFilterGroups(userId ?? "", JSON.stringify(filterGroups));
    } catch (error) {
      console.error("Lỗi khi fetch dữ liệu:", error);
    }
  }
  function actionRenderer(
    instance: Handsontable,
    td: HTMLElement,
    row: number,
    col: number,
    prop: string | number,
    value: any,
    cellProperties: Handsontable.CellProperties
  ) {
    // Nếu `root` đã tồn tại, tái sử dụng
    if (!td.dataset.reactRoot) {
      const root = createRoot(td); // Tạo React Root mới
      td.dataset.reactRoot = "true"; // Đánh dấu đã khởi tạo root

      root.render(
        <Box
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
            padding: "0 20%",
          }}
        >
          <Tooltip title="Duyệt" arrow>
            <SvgIcon
              component={CheckIcon}
              sx={{ color: "green", fontSize: 20, cursor: "pointer" }}
            />
          </Tooltip>
          <Tooltip title="Xem" arrow>
            <SvgIcon
              component={VisibilityIcon}
              sx={{ fontSize: 20, cursor: "pointer" }}
            />
          </Tooltip>
        </Box>
      );
    }

    return td;
  }

  const saveTableExportData = async (saveList: any[]) => {
    try {
    var updateRecords = saveList.filter(x => x.state == FormMode.Update);
    if(updateRecords.length == 0){
      return;
    }
    setIsSaving(true);
    var param = {
      mode: 2,
      records: updateRecords
    }
    const response = await fetch(`https://localhost:7152/api/ExportDeclarations/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Cookies.get("token")}`, // Thêm header Authorization
      },
      body: JSON.stringify(param)
    });
    if(response.ok){
      setIsSaving(false);
      var viewList = list.map((item) => {
        return {
          ...item,
          state: FormMode.View
        }
      });
      setList(viewList);
    }
    } catch (error) {
      console.error("Lỗi khi fetch dữ liệu:", error);
    }
  }
  const handlePageChange = async (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page)
    console.log(`Page changed to ${page}`);
    sendPaginationInfo({
      itemsPerPage: itemsPerPage,
      currentPage: page
    })
    // sendTableExportData(userId ?? "", JSON.stringify(list));
    // Implement your logic here to fetch data for the new page
  }

  const handleItemsPerPageChange = async (event: SelectChangeEvent<number>) => {
    const newItemsPerPage = event.target.value as number
    setItemsPerPage(newItemsPerPage)
    setCurrentPage(1) // Reset to first page when changing items per page
    console.log(`Items per page changed to ${newItemsPerPage}`)
    sendPaginationInfo({
      itemsPerPage: newItemsPerPage,
      currentPage: currentPage
    })

    // Implement your logic here to fetch data with the new items per page
    // sendTableExportData(userId ?? "", JSON.stringify(list));
  }
 
  if (!list) return <div>Loading...</div>;

  return (
    <div className="container">
      <div className="header">
        <div className="title">
          <div className="leftTitle">
            <h1>Danh sách tờ khai hải quan</h1>
            {
              isSaving ? (
                <div style={{display: 'flex', gap: '5px', paddingTop: '9px'}}>
                  <CircularProgress size={13}/>
                  <div style={{fontSize: '13px', color: '#5f6368'}}>Đang lưu...</div>
                </div>
              ) : (
                <SvgIcon
                  component={CheckIcon}
                  sx={{ color: "green", fontSize: 25, marginTop:'20px' }}
                />
              )
            }
            
            
            
          </div>
          <div className="actions">
            <div className="min-h-screen flex items-center justify-center">
              <AvatarStack users={formUsers} maxDisplayed={5} />
            </div>
          </div>
        </div>

        <div className="filterGroups">
          {filterGroups.map((group, index) => (
            <div key={group.id} className="filterGroup">
              <div className="filterRow">
                {index > 0 && (
                  <select
                    value={group.operator}
                    onChange={(e) => {
                      const newGroups = [...filterGroups]
                      newGroups[index].operator = e.target.value as 'AND' | 'OR'
                      setFilterGroups(newGroups)
                    }}
                    className="operatorSelect"
                  >
                    <option value="AND">Và</option>
                  </select>
                )}

                <div className="filterField">
                  <div>
                    Tìm theo
                  </div>
                  <select
                    value={group.searchField || "All"}
                    onChange={(e) => {
                      const newGroups = [...filterGroups];
                      newGroups[index].searchField = e.target.value;
                      newGroups[index].searchType = columns.find(x => x.dataField == e.target.value)?.dataType ?? "";
                      changeOperatorList(newGroups[index].searchType)
                      if(newGroups[index].searchType != "date") newGroups[index].compareType = "equal";
                      else newGroups[index].compareType = "between";
                      newGroups[index].searchValue = '';
                      setFilterGroups(newGroups)
                    }}
                    
                  >
                    {([{
                        "dataField": "All",
                        "title": "Tất cả",
                        "width": "150px",
                        "dataType": "all"
                    }, ...columns.filter(x => x.type != "Action")].map(col => 
                      <option key={col.dataField} value={col.dataField}>{col.title}</option>
                    ))}
                  </select>
                </div>

                <div className="filterField">
                  <select
                    value={group.compareType}
                    onChange={(e) => {
                      const newGroups = [...filterGroups]
                      newGroups[index].compareType = e.target.value
                      setFilterGroups(newGroups)
                    }}
                  >
                    {(operatorList.map((operator, index) => 
                      <option key={index} value={operator.op}>{operator.title}</option>
                    ))}
                  </select>
                </div>
                {group.searchType == "date" ?
                  group.compareType == "between" ? (
                    <div className="dateRange">
                      <div className="dateInput">
                        <DatePicker
                          value={group.valueFrom}
                          onChange={(e) => {
                            const newGroups = [...filterGroups]
                            newGroups[index].valueFrom = e
                            setFilterGroups(newGroups)
                          }}
                        />
                      </div>
                      <div className="dateInput">
                        <DatePicker
                          value={group.valueTo}
                          onChange={(e) => {
                            const newGroups = [...filterGroups]
                            newGroups[index].valueFrom = e
                            setFilterGroups(newGroups)
                          }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="dateInput">
                      <DatePicker
                          value={group.searchValue}
                          onChange={(e) => {
                            const newGroups = [...filterGroups]
                            newGroups[index].searchValue = e
                            setFilterGroups(newGroups)
                          }}
                        />
                    </div>
                    
                  )
                : (<div className="dateInput">
                      <input
                        value={group.searchValue}
                        onChange={(e) => {
                          const newGroups = [...filterGroups]
                          newGroups[index].searchValue = e.target.value
                          setFilterGroups(newGroups)
                        }}
                      />
                    </div>
                )}
                {
                  (
                    index > 0 ? <div onClick={() => removeFilterGroup(index)}><CloseIcon style={{ color: 'red', fontSize: '24px', cursor: 'pointer' }} /></div> : ''
                  )
                }
              </div>
            </div>
          ))}
        </div>

        <div className="filterActions">
          <button className="addCondition" onClick={addFilterGroup}>
            Thêm điều kiện
          </button>
          <button onClick={searchExportDeclaration} className="searchButton">Tìm kiếm</button>
        </div>
      </div>
      {/* <div className={tableContainer}>
        <table className={table}>
          <thead>
            <tr>
                <th>STT</th>
                <th>Số tờ khai</th>
                <th>Ngày khai báo</th>
                <th>Mã bộ phận xử lý tờ khai</th>
                <th>Trạng thái</th>
                <th>Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {list && list.length > 0 ? (
              list.map((item: ExportDeclaration, index: number) => (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.declaration_code}</td>
                    <td>{currentDate}</td>
                    <td>--</td>
                    <td>{item.declaration_status === 1 ? "Đã duyệt" : "Chờ xử lý"}</td>
                    <td>
                      <button className={actionButton} onClick={(e) => {
                        e.stopPropagation();  // Ngăn sự kiện lan truyền
                        showDetail(item.declaration_id, FormMode.View);
                      }}>Xem
                      </button>
                      <button className={actionButton} onClick={(e) => {
                        e.stopPropagation();  // Ngăn sự kiện lan truyền
                        showDetail(item.declaration_id, FormMode.Update);
                      }}>Sửa
                      </button>
                    </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className={styles.emptyState}>
                  <img alt="No data" width={100} height={100}/>
                  <p>Không có dữ liệu</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div> */}
      <div>
        <ExcelForm
          tableData={dataToKhaiFake} 
          blurCell={blurCell}
          columns={columns}
        />
        <Pagination
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
          itemsPerPageOptions={[1, 10, 20, 50]}
        />
        </div>
        <div className="fixed bottom-6 right-6 z-50">
            <div className="px-8 py-6 rounded-lg shadow-lg hover:shadow-xl transition-all bg-primary text-primary-foreground font-medium text-lg">
                <SaveIcon className="w-5 h-5 mr-2" />
                Cất
            </div>
        </div>
    </div>
  )
}

