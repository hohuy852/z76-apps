import { useState, useEffect } from "react";
import "./style.css";
import { useRouter, usePathname } from "next/navigation";
import { FormMode } from "@/enums/FormMode";
import ExcelForm from "@/components/ExcelForm/ExcelForm";
import useSignalR from "@/hooks/useSignalR";
import AvatarStack from "@/components/Avatar/avatar-stack";
import Handsontable from "handsontable";
import { Box, SvgIcon, Tooltip } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { createRoot } from "react-dom/client";
import DatePicker from "@/components/DatePicker/DatePicker";
import { format } from "date-fns";
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "@/components/Pagination/Pagination";
import type { SelectChangeEvent } from "@mui/material";
import Cookies from "js-cookie";
import dataToKhaiFake from "@/data/export-declaration";
import { Autocomplete, TextField, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import baseUrl from '@/hostingConfig';

interface FilterGroup {
  id: number;
  operator: string;
  searchField: string;
  searchType: string;
  compareType: string;
  valueFrom: string;
  valueTo: string;
  searchValue: string;
}
interface Operator {
  op: string;
  title: string;
}
interface User {
  id: number;
  name: string;
  avatar: string;
}
interface PaginationInfo {
  itemsPerPage: number;
  currentPage: number;
}

// interface UserForm {
//   key: string
//   value: User[]
// }
export default function DocumentSearch() {
  // State danh sách tờ khai trên form excel
  const [list, setList] = useState<any[]>([]);
  // State các user hiện có mặt trong form
  const [formUsers, setFormUsers] = useState<User[]>([]);
  // State đánh dấu web socket đã thực hiện gửi thông tin user khi user vào form hay chưa
  const [sendUserStatus, setSendUserStatus] = useState(false);
  // State đánh dấu đang lưu hay không (phục vụ hiển thị giao diện)
  const [isSaving, setIsSaving] = useState(false);
  // router
  const router = useRouter();
  const pathname = usePathname();
  // Các cột có trong tờ khai
  const columns = [
    {
      dataField: "stt",
      title: "STT",
      width: "150px",
      dataType: "numeric",
    },
    {
      dataField: "so_to_khai",
      title: "Số tờ khai",
      width: "150px",
      dataType: "text",
    },
    {
      dataField: "ngay_dang_ky",
      title: "Ngày đăng ký",
      width: "150px",
      dataType: "date",
    },
    {
      dataField: "ma_hq",
      title: "Mã HQ",
      width: "150px",
      dataType: "text",
    },
    {
      dataField: "ma_lh",
      title: "Mã LH",
      width: "150px",
      dataType: "text",
    },
    {
      dataField: "ten_doi_tac",
      title: "Tên đối tác",
      width: "150px",
      dataType: "text",
    },
    {
      dataField: "ma_dai_ly_hq",
      title: "Mã đại lý HQ",
      width: "150px",
      dataType: "text",
    },
    {
      dataField: "phan_loai_ca_nhan_to_chuc",
      title: "Phân loại cá nhân tổ chức",
      width: "150px",
      dataType: "text",
    },
    {
      dataField: "ma_bo_phan_xu_ly_tk",
      title: "Mã bộ phận xử lý tk",
      width: "150px",
      dataType: "text",
    },
    {
      dataField: "ma_hieu_phuong_thuc_van_chuyen",
      title: "Mã hiệu phương thức vận chuyển",
      width: "150px",
      dataType: "text",
    },
    {
      dataField: "van_don",
      title: "Vận đơn",
      width: "150px",
      dataType: "text",
    },
    {
      dataField: "so_luong_kien",
      title: "Số lượng kiện",
      width: "150px",
      dataType: "numeric",
    },
    {
      dataField: "tong_trong_luong_hang_gross",
      title: "Tổng trọng lượng hàng (Gross)",
      width: "150px",
      dataType: "numeric",
    },
    {
      dataField: "ma_dia_diem_luu_kho",
      title: "Mã địa điểm lưu kho",
      width: "150px",
      dataType: "text",
    },
    {
      dataField: "ten_dia_diem_luu_kho",
      title: "Tên địa điểm lưu kho",
      width: "150px",
      dataType: "text",
    },
    {
      dataField: "ma_phuong_tien_van_chuyen",
      title: "Mã phương tiện vận chuyển",
      width: "150px",
      dataType: "text",
    },
    {
      dataField: "ten_phuong_tien_van_chuyen",
      title: "Tên phương tiện vận chuyển",
      width: "150px",
      dataType: "text",
    },
    {
      dataField: "ngay_den",
      title: "Ngày đến",
      width: "150px",
      dataType: "date",
    },
    {
      dataField: "ma_dia_diem_xep_hang",
      title: "Mã địa điểm xếp hàng",
      width: "150px",
      dataType: "text",
    },
    {
      dataField: "ten_dia_diem_xep_hang",
      title: "Tên địa điểm xếp hàng",
      width: "150px",
      dataType: "text",
    },
    {
      dataField: "ma_dia_diem_do_hang",
      title: "Mã địa điểm dỡ hàng",
      width: "150px",
      dataType: "text",
    },
    {
      dataField: "ten_dia_diem_do_hang",
      title: "Tên địa điểm dỡ hàng",
      width: "150px",
      dataType: "text",
    },
    {
      dataField: "so_luong_cont",
      title: "Số lượng cont",
      width: "150px",
      dataType: "numeric",
    },
    {
      dataField: "so_giay_phep",
      title: "Số giấy phép",
      width: "150px",
      dataType: "text",
    },
    {
      dataField: "so_hd_tm",
      title: "Số HĐTM",
      width: "150px",
      dataType: "text",
    },
    {
      dataField: "ngay_hd_tm",
      title: "Ngày HĐTM",
      width: "150px",
      dataType: "date",
    },
    {
      dataField: "tong_tri_gia_hd",
      title: "Tổng trị giá HĐ",
      width: "150px",
      dataType: "numeric",
    },
    {
      dataField: "phuong_thuc_thanh_toan",
      title: "Phương thức thanh toán",
      width: "150px",
      dataType: "text",
    },
    {
      dataField: "dieu_kien_gia_hoa_don",
      title: "Điều kiện giá hóa đơn",
      width: "150px",
      dataType: "text",
    },
    {
      dataField: "ngoai_te_hoa_don",
      title: "Ng.Tệ hóa đơn",
      width: "150px",
      dataType: "text",
    },
    {
      dataField: "ty_gia_vnd",
      title: "Tỷ giá VNĐ",
      width: "150px",
      dataType: "numeric",
    },
    {
      dataField: "phi_bh",
      title: "Phí BH",
      width: "150px",
      dataType: "numeric",
    },
    {
      dataField: "phi_vc",
      title: "Phí VC",
      width: "150px",
      dataType: "numeric",
    },
    {
      dataField: "nguoi_nop_thue",
      title: "Người nộp thuế",
      width: "150px",
      dataType: "text",
    },
    {
      dataField: "tri_gia_kb",
      title: "Trị giá KB",
      width: "150px",
      dataType: "numeric",
    },
    {
      dataField: "tong_tri_gia_tt",
      title: "Tổng trị giá TT",
      width: "150px",
      dataType: "numeric",
    },
    {
      dataField: "tong_tien_thue",
      title: "Tổng tiền thuế",
      width: "150px",
      dataType: "numeric",
    },
    {
      dataField: "ma_ly_do_de_nghi_bp",
      title: "Mã lý do đề nghị BP",
      width: "150px",
      dataType: "text",
    },
    {
      dataField: "ma_ngan_hang_tra_thue",
      title: "Mã ngân hàng trả thuế",
      width: "150px",
      dataType: "text",
    },
    {
      dataField: "nam_phat_hanh_han_muc",
      title: "Năm phát hành hạn mức",
      width: "150px",
      dataType: "numeric",
    },
    {
      dataField: "ky_hieu_ct_han_muc",
      title: "Ký hiệu CT hạn mức",
      width: "150px",
      dataType: "text",
    },
    {
      dataField: "so_ct_han_muc",
      title: "Số CT hạn mức",
      width: "150px",
      dataType: "text",
    },
    {
      dataField: "ma_xac_dinh_thoi_han_nop_thue",
      title: "Mã xác định thời hạn nộp thuế",
      width: "150px",
      dataType: "text",
    },
    {
      dataField: "ma_ngan_hang_bao_lanh",
      title: "Mã ngân hàng bảo lãnh",
      width: "150px",
      dataType: "text",
    },
    {
      dataField: "nam_phat_hanh_bao_lanh",
      title: "Năm phát hành bảo lãnh",
      width: "150px",
      dataType: "numeric",
    },
    {
      dataField: "ky_hieu_ct_bao_lanh",
      title: "Ký hiệu CT bảo lãnh",
      width: "150px",
      dataType: "text",
    },
    {
      dataField: "so_hieu_ct_bao_lanh",
      title: "Số hiệu CT bảo lãnh",
      width: "150px",
      dataType: "text",
    },
    {
      dataField: "so_hd",
      title: "Số HĐ",
      width: "150px",
      dataType: "text",
    },
    {
      dataField: "ngay_hd",
      title: "Ngày HĐ",
      width: "150px",
      dataType: "date",
    },
    {
      dataField: "ngay_hh_hd",
      title: "Ngày HHHĐ",
      width: "150px",
      dataType: "date",
    },
    {
      dataField: "trang_thai",
      title: "Trạng thái",
      width: "150px",
      dataType: "text",
    },
    {
      dataField: "phan_luong",
      title: "Phân luồng",
      width: "150px",
      dataType: "text",
    },
    {
      dataField: "loai_to_khai_nhap_xuat",
      title: "Loại tờ khai nhập xuất",
      width: "150px",
      dataType: "text",
    },
    {
      dataField: "ten_don_vi_xuat_nhap_khau",
      title: "Tên đơn vị xuất/nhập khẩu",
      width: "150px",
      dataType: "text",
    },
    {
      dataField: "loai_hinh_to_khai",
      title: "Loại hình tờ khai",
      width: "150px",
      dataType: "text",
    },
    {
      dataField: "dia_chi_dn_xuat_nhap_khau",
      title: "Địa chỉ doanh nghiệp xuất/nhập khẩu",
      width: "150px",
      dataType: "text",
    },
    {
      dataField: "ma_nuoc_xuat_khau",
      title: "Mã nước xuất khẩu",
      width: "150px",
      dataType: "text",
    },
    {
      dataField: "loai_kien",
      title: "Loại kiện",
      width: "150px",
      dataType: "text",
    },
    {
      dataField: "don_vi_tinh_trong_luong",
      title: "Đơn vị tính trọng lượng",
      width: "150px",
      dataType: "text",
    },
    {
      dataField: "hoa_don_thuong_mai",
      title: "Hóa đơn thương mại",
      width: "150px",
      dataType: "text",
    },
    {
      dataField: "ma_phan_loai_hoa_don",
      title: "Mã phân loại hóa đơn",
      width: "150px",
      dataType: "text",
    },
    {
      dataField: "ma_phan_loai_phi_van_chuyen",
      title: "Mã phân loại phí vận chuyển",
      width: "150px",
      dataType: "text",
    },
    {
      dataField: "ma_phan_loai_phi_bao_hiem",
      title: "Mã phân loại phí bảo hiểm",
      width: "150px",
      dataType: "text",
    },
    {
      dataField: "ma_tien_phi_van_chuyen",
      title: "Mã tiền phí vận chuyển",
      width: "150px",
      dataType: "text",
    },
    {
      dataField: "ma_tien_phi_bao_hiem",
      title: "Mã tiền phí bảo hiểm",
      width: "150px",
      dataType: "text",
    },
    {
      dataField: "dia_chi_nguoi_xuat_nhap_khau_1",
      title: "Địa chỉ người xuất/nhập khẩu1",
      width: "150px",
      dataType: "text",
    },
    {
      dataField: "ghi_chu",
      title: "Ghi chú",
      width: "150px",
      dataType: "text",
    },
    {
      dataField: "ma_phan_loai_hinh_thuc_hoa_don",
      title: "Mã phân loại hình thức hóa đơn",
      width: "150px",
      dataType: "text",
    },
    {
      dataField: "dia_diem_dich_cho_van_chuyen_bao_thue",
      title: "Địa điểm đích cho vận chuyển báo thuế",
      width: "150px",
      dataType: "text",
    },
    {
      dataField: "ngay_du_kien_den_dia_diem_dich",
      title: "Ngày dự kiến đến địa điểm đích",
      width: "150px",
      dataType: "date",
    },
    {
      dataField: "ngay_khoi_hanh_van_chuyen",
      title: "Ngày khởi hành vận chuyển",
      width: "150px",
      dataType: "date",
    },
    {
      dataField: "ma_phan_loai_to_khai_tri_gia",
      title: "Mã phân loại tờ khai trị giá",
      width: "150px",
      dataType: "text",
    },
    {
      dataField: "dia_chi_nguoi_xuat_nhap_khau_2",
      title: "Địa chỉ người xuất/nhập khẩu2",
      width: "150px",
      dataType: "text",
    },
    {
      dataField: "dia_chi_nguoi_xuat_nhap_khau_3",
      title: "Địa chỉ người xuất/nhập khẩu3",
      width: "150px",
      dataType: "text",
    },
    {
      dataField: "dia_chi_nguoi_xuat_nhap_khau_4",
      title: "Địa chỉ người xuất/nhập khẩu4",
      width: "150px",
      dataType: "text",
    },
    {
      dataField: "ma_dong_tien_tri_gia_tinh_thue",
      title: "Mã đồng tiền trị giá tính thuế",
      width: "150px",
      dataType: "text",
    },
    { dataField: "", title: "", width: "100px", dataType: "text" },
    {
      data: "action",
      dataField: "",
      title: "Chức năng",
      type: "Action",
      renderer: actionRenderer,
      width: "100px",
      dataType: "text",
    },
  ];
  const [filterGroups, setFilterGroups] = useState<FilterGroup[]>([
    {
      id: 0,
      operator: "",
      searchField: "",
      searchType: "string",
      compareType: "equal",
      valueFrom: format(new Date(new Date().getFullYear(), 0, 1), "dd/MM/yyyy"),
      valueTo: format(new Date(new Date().getFullYear(), 11, 31), "dd/MM/yyyy"),
      searchValue: "",
    },
  ]);
  // State danh sách các phép so sánh khi filter
  const [operatorList, setOperatorList] = useState<Operator[]>([
    {
      op: "equal",
      title: "Bằng",
    },
    {
      op: "less",
      title: "Bé hơn",
    },
    {
      op: "great",
      title: "Lớn hơn",
    },
    {
      op: "between",
      title: "Trong khoảng",
    },

    {
      op: "contains",
      title: "Chứa",
    },

    {
      op: "not contains",
      title: "Không chứa",
    },
  ]);
  // State trang hiện tại là trang bao nhiêu ở phân trang
  const [currentPage, setCurrentPage] = useState(1);
  // State số bản ghi trong 1 trang
  const [itemsPerPage, setItemsPerPage] = useState(10);
  // State tổng số bản ghi theo filter
  const [totalItems, setTotalItems] = useState(0);

  // Lấy ra thông tin user hiện tại ở localstorage, phục vụ gửi lên room user chung trong form
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");
  const avatar = localStorage.getItem("avatar");

  /**
   * Action thay đổi phép so sánh khi filter
   * @param type: kiểu dữ liệu khi thay đổi phép so sánh
   */
  const changeOperatorList = (type: string) => {
    switch (type) {
      case "date":
        setOperatorList([
          {
            op: "equal",
            title: "Bằng",
          },
          {
            op: "less",
            title: "Bé hơn",
          },
          {
            op: "great",
            title: "Lớn hơn",
          },
          {
            op: "between",
            title: "Trong khoảng",
          },

          // {
          //   op: "contains",
          //   title: "Chứa"
          // },

          // {
          //   op: "not contains",
          //   title: "Không chứa"
          // },
        ]);
        break;
      case "number":
        setOperatorList([
          {
            op: "equal",
            title: "Bằng",
          },
          {
            op: "less",
            title: "Bé hơn",
          },
          {
            op: "great",
            title: "Lớn hơn",
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
        ]);
        break;
      default:
        setOperatorList([
          {
            op: "equal",
            title: "Bằng",
          },
          {
            op: "less",
            title: "Bé hơn",
          },
          {
            op: "great",
            title: "Lớn hơn",
          },
          // {
          //   op: "between",
          //   title: "Trong khoảng"
          // },

          {
            op: "contains",
            title: "Chứa",
          },

          {
            op: "not contains",
            title: "Không chứa",
          },
        ]);
    }
  };
  /**
   * Thực hiện thêm 1 cụm filter
   */
  const addFilterGroup = () => {
    setFilterGroups([
      ...filterGroups,
      {
        id: filterGroups.length + 1,
        operator: "AND",
        searchField: columns[0].dataField,
        searchType: "string",
        compareType: "equal",
        valueFrom: format(
          new Date(new Date().getFullYear(), 0, 1),
          "dd/mm/yyyy"
        ),
        valueTo: format(
          new Date(new Date().getFullYear(), 11, 31),
          "dd/MM/yyyy"
        ),
        searchValue: "",
      },
    ]);
  };
  /**
   * Thực hiện xóa 1 cụm filter
   * @param index: vị trí xóa
   */
  const removeFilterGroup = (index: number) => {
    var tempArr = [...filterGroups];
    tempArr.splice(index, 1);
    setFilterGroups(tempArr);
  };
  // Lấy ra các method của websocket sử dụng signalR
  const {
    messages,
    sendTableExportData,
    sendUserInForm,
    connection,
    sendFilterGroups,
    sendPaginationInfo,
  } = useSignalR(`${baseUrl}/chathub`);
  /**
   * Effect Lấy tổng số bản ghi theo filter hiện tại, gọi lại khi số bản ghi trong 1 trang được thay đổi (itemsPerPage)
   */
  useEffect(() => {
    const fetchSummaryData = async () => {
      try {
        var filterArrs = [{ Field: "", Operator: "", Value: "" }];
        filterGroups.forEach((filter) => {
          if (filter.searchType == "date" && filter.compareType == "between") {
            filterArrs.push({
              Field: filter.searchField,
              Operator: "great equal",
              Value: filter.valueFrom,
            });
            filterArrs.push({
              Field: filter.searchField,
              Operator: "less equal",
              Value: filter.valueTo,
            });
          } else {
            filterArrs.push({
              Field: filter.searchField,
              Operator: filter.compareType,
              Value: filter.searchValue,
            });
          }
        });
        const summary = await fetch(
          `${baseUrl}/ExportDeclarations/Paging`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get("authjs.session-token")}`, // Thêm header Authorization
            },
            body: JSON.stringify({
              filters: JSON.stringify(filterArrs.filter((x) => x.Field)),
              take: currentPage,
              limit: itemsPerPage,
              type: 0,
            }),
          }
        );
        const summaryResult = await summary.json();
        setTotalItems(summaryResult.Total);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSummaryData();
  }, [itemsPerPage]);
  /**
   * Effect lấy dữ liệu các tờ khai ở form excel theo filter hiện tại, gọi lại khi số bản ghi trong 1 trang hoặc trang số hiện tại thay đổi
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        var filterArrs = [{ Field: "", Operator: "", Value: "" }];
        filterGroups.forEach((filter) => {
          if (filter.searchType == "date" && filter.compareType == "between") {
            filterArrs.push({
              Field: filter.searchField,
              Operator: "great equal",
              Value: filter.valueFrom,
            });
            filterArrs.push({
              Field: filter.searchField,
              Operator: "less equal",
              Value: filter.valueTo,
            });
          } else {
            filterArrs.push({
              Field: filter.searchField,
              Operator: filter.compareType,
              Value: filter.searchValue,
            });
          }
        });
        const response = await fetch(
          `${baseUrl}/ExportDeclarations/Paging`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get("authjs.session-token")}`, // Thêm header Authorization
            },
            body: JSON.stringify({
              filters: JSON.stringify(filterArrs.filter((x) => x.Field)),
              take: currentPage,
              limit: itemsPerPage,
              type: 1,
            }),
          }
        );

        const result = await response.json();
        setList(result.Data);
        sendTableExportData(userId ?? "", JSON.stringify(result.Data));
      } catch (error) {
        console.error("Lỗi khi fetch dữ liệu:", error);
      }
    };

    fetchData();
  }, [itemsPerPage, currentPage]); 
  /**
   * Effect thực hiện lắng nghe các sự kiện từ websocket thay đổi khi connection thay đổi
   * + ReceiveTableExportData: Lắng nghe thông tin danh sách tờ khai được gửi từ user khác
   * + UpdateUserList: Lắng nghe thông tin các user hiện tại trong form
   * + ReceiveFilterGroups: Lắng nghe filter hiện tại từ các user khác
   * + ReceivePaginationInfo: Lắng nghe chuyển đổi phân trang từ các user khác
   */
  useEffect(() => {
    if (connection) {
      connection.on(
        "ReceiveTableExportData",
        (user: string, message: string) => {
          try {
            if (message) {
              const parsedData = JSON.parse(message);
              setList(parsedData);
            }
          } catch (error) {
            console.error("Invalid JSON:", error);
          }
        }
      );
      connection.on("UpdateUserList", (users: User[]) => {
        if (users != undefined) {
          setFormUsers(users);
        }
      });
      connection.on("ReceiveFilterGroups", (user: string, message: string) => {
        try {
          if (message) {
            const parsedData = JSON.parse(message);
            setFilterGroups(parsedData);
          }
        } catch (error) {
          console.error("Invalid JSON:", error);
        }
      });

      connection.on(
        "ReceivePaginationInfo",
        (paginationInfo: PaginationInfo) => {
          try {
            if (paginationInfo) {
              setItemsPerPage(paginationInfo.itemsPerPage);
              setCurrentPage(paginationInfo.currentPage);
            }
          } catch (error) {
            console.error("Invalid JSON:", error);
          }
        }
      );
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
  /**
   * Effect thực hiện ngắt kết nối với websocket khi thay đổi route
   */
  useEffect(() => {
    return () => {
      console.log("Route changed, closing WebSocket...");
      if (connection) connection.stop();
    };
  }, [pathname]); // Khi pathname thay đổi thì dừng connection
  /**
   * Thực hiện check liên tục xem connection websocket đã vào trạng thái connected chưa (kết nối thành công)
   * thành công rồi thì mới gửi thông tin user khi vào form (bổ sung vào trạng thái các user hiện có trong form)
   */
  if (sendUserStatus == false) {
    const waitForConnection = setInterval(() => {
      if (connection && connection.state === "Connected") {
        console.log("WebSocket is fully connected, sending user info...");
        sendUserInForm({ userId, userName, avatar });
        setSendUserStatus(true);
        clearInterval(waitForConnection);
      }
    }, 100);
    // Gửi đc rồi thì xóa vòng lặp
    if (sendUserStatus) {
      clearInterval(waitForConnection);
    }
  }
  /**
   * Thực hiện gửi websocket về data hiện tại ở form excel khi người dùng thực hiện sửa rồi nhảy từ ô này sang ô khác
   * @param msg: data người dùng hiện tại gửi
  */
  const blurCell = (msg: string) => {
    const parsedData = JSON.parse(msg);
    setList(parsedData);
    sendTableExportData(userId ?? "", msg);
    saveTableExportData(parsedData);
  };
  /**
   * Thực hiện tìm kiếm theo filter
   */
  const searchExportDeclaration = async () => {
    console.log("filterGroups:", filterGroups);
    try {
      // Chuẩn hóa lại filterGroup
      var filterArrs = [{ Field: "", Operator: "", Value: "" }];
      filterGroups.forEach((filter) => {
        if (filter.searchType == "date" && filter.compareType == "between") {
          filterArrs.push({
            Field: filter.searchField,
            Operator: "great equal",
            Value: filter.valueFrom,
          });
          filterArrs.push({
            Field: filter.searchField,
            Operator: "less equal",
            Value: filter.valueTo,
          });
        } else {
          filterArrs.push({
            Field: filter.searchField,
            Operator: filter.compareType,
            Value: filter.searchValue,
          });
        }
      });
      // Gọi api
      const response = await fetch(
        `${baseUrl}/ExportDeclarations/Paging`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("authjs.session-token")}`, // Thêm header Authorization
          },
          body: JSON.stringify({
            filters: JSON.stringify(filterArrs.filter((x) => x.Field)),
            take: currentPage,
            limit: itemsPerPage,
            type: 1,
          }),
        }
      );
      // parse kết quả
      const result = await response.json();
      // Khi có kết quả, thực hiện set lại giá trị form excel, gửi thông tin form excel thay đổi, thông tin filter thay đổi cho tất cả user trong form
      setList(result.Data);
      sendTableExportData(userId ?? "", JSON.stringify(result.Data));
      sendFilterGroups(userId ?? "", JSON.stringify(filterGroups));
    } catch (error) {
      console.error("Lỗi khi fetch dữ liệu:", error);
    }
  };
  /**
   * Override actionRenderer của handsontable để thực hiện custom thêm nút "Duyệt" ở cuối bảng excel
   */
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
  /**
   * Thực hiện Lưu dữ liệu danh sách tờ khai vào database
   * @param saveList: Data ở form excel
   * @returns 
   */
  const saveTableExportData = async (saveList: any[]) => {
    try {
      // Chỉ lấy những bản ghi được sửa (có trường state là 2)
      var updateRecords = saveList.filter((x) => x.state == FormMode.Update);
      if (updateRecords.length == 0) {
        return;
      }
      // set biến đang lưu để thực hiện hiển thị loading
      setIsSaving(true);
      // Gọi api Lưu
      var param = {
        mode: 2,
        records: updateRecords,
      };
      const response = await fetch(
        `${baseUrl}/ExportDeclarations/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("authjs.session-token")}`, // Thêm header Authorization
          },
          body: JSON.stringify(param),
        }
      );
      if (response.ok) {
        setIsSaving(false);
        // Nếu lưu thành công, đưa danh sách về tất cả trạng thái View, để không bị lưu nhiều lần
        var viewList = list.map((item) => {
          return {
            ...item,
            state: FormMode.View,
          };
        });
        setList(viewList);
      }
    } catch (error) {
      console.error("Lỗi khi fetch dữ liệu:", error);
    }
  };
  /**
   * Action đổi số trang ở phân trang
   * @param event: Hành động đổi số trang
   * @param page: trang số bao nhiêu
   */
  const handlePageChange = async (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
    console.log(`Page changed to ${page}`);
    // Khi thay đổi số trang, thực hiện gửi websocket update lại số trang cho tất cả người dùng trong form
    sendPaginationInfo({
      itemsPerPage: itemsPerPage,
      currentPage: page,
    });
    // sendTableExportData(userId ?? "", JSON.stringify(list));
    // Implement your logic here to fetch data for the new page
  };
  /**
   * Action thực hiện thay đổi số bản ghi trong 1 trang
   * @param event: hành động thay đổi số bản ghi trong 1 trang
   */
  const handleItemsPerPageChange = async (event: SelectChangeEvent<number>) => {
    const newItemsPerPage = event.target.value as number;
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
    console.log(`Items per page changed to ${newItemsPerPage}`);
    // Khi thay đổi số bản ghi trong 1 trang, thực hiện gửi websocket update lại số bản ghi trong 1 trang cho tất cả người dùng trong form
    sendPaginationInfo({
      itemsPerPage: newItemsPerPage,
      currentPage: currentPage,
    });

    // Implement your logic here to fetch data with the new items per page
    // sendTableExportData(userId ?? "", JSON.stringify(list));
  };
  // Nếu chưa có data ở form excel, hiển thị loading, dòng này chủ yếu để thực thi đồng bộ, có dữ liệu thì mới render ui
  if (!list) return <div>Loading...</div>;

  return (
    <div className="container">
      <div className="header">
        <div className="title">
          <div className="leftTitle">
            {isSaving ? (
              <div style={{ display: "flex", gap: "5px", paddingTop: "9px" }}>
                <CircularProgress size={13} />
                <div style={{ fontSize: "13px", color: "#5f6368" }}>
                  Đang lưu...
                </div>
              </div>
            ) : (
              <SvgIcon
                component={CheckIcon}
                sx={{ color: "green", fontSize: 25}}
              />
            )}
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
                <Autocomplete
                  value={group.operator}
                  size="small"
                  onChange={(
                    event: React.SyntheticEvent,
                    newValue: string | null
                  ) => {
                    const newGroups = [...filterGroups];
                    newGroups[index].operator = newValue ?? "AND"; // Default to 'AND' if null
                    setFilterGroups(newGroups);
                  }}
                  options={["AND", "OR"]}
                  getOptionLabel={(option) =>
                    option === "AND" ? "Và" : "Hoặc"
                  }
                  sx={{ width: 95 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Operator" />
                  )}
                  className="operatorSelect"
                  disableClearable
                />
              )}
                <div className="filterField">
                  <Autocomplete
                    disableClearable
                    size="small"
                    value={group.searchField || "All"}
                    onChange={(event: any, newValue: string | null) => {
                      const newGroups = [...filterGroups];
                      newGroups[index].searchField = newValue || "All";
                      newGroups[index].searchType =
                        columns.find((x) => x.dataField === newValue)
                          ?.dataType ?? "";

                      changeOperatorList(newGroups[index].searchType);
                      newGroups[index].compareType =
                        newGroups[index].searchType !== "date"
                          ? "equal"
                          : "between";

                      newGroups[index].searchValue = "";
                      setFilterGroups(newGroups);
                    }}
                    options={[
                      { dataField: "All", title: "Tất cả", dataType: "all" },
                      ...columns.filter((x) => x.type !== "Action"),
                    ].map((col) => col.dataField)}
                    getOptionLabel={(option) =>
                      columns.find((col) => col.dataField === option)?.title ||
                      option
                    }
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Search Field" />
                    )}
                  />
                </div>

                <div className="filterField">
                  <Autocomplete
                    value={group.compareType}
                    size="small"
                    disableClearable
                    onChange={(event: any, newValue: string | null) => {
                      const newGroups = [...filterGroups];
                      newGroups[index].compareType = newValue || "";
                      setFilterGroups(newGroups);
                    }}
                    options={operatorList.map((operator) => operator.op)}
                    getOptionLabel={(option) =>
                      operatorList.find((operator) => operator.op === option)
                        ?.title || option
                    }
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Compare Type" />
                    )}
                  />
                </div>
                {group.searchType == "date" ? (
                  group.compareType == "between" ? (
                    <div className="dateRange">
                      <div className="dateInput">
                        <DatePicker
                          value={group.valueFrom}
                          onChange={(e) => {
                            const newGroups = [...filterGroups];
                            newGroups[index].valueFrom = e;
                            setFilterGroups(newGroups);
                          }}
                        />
                      </div>
                      <div className="dateInput">
                        <DatePicker
                          value={group.valueTo}
                          onChange={(e) => {
                            const newGroups = [...filterGroups];
                            newGroups[index].valueFrom = e;
                            setFilterGroups(newGroups);
                          }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="dateInput">
                      <DatePicker
                        value={group.searchValue}
                        onChange={(e) => {
                          const newGroups = [...filterGroups];
                          newGroups[index].searchValue = e;
                          setFilterGroups(newGroups);
                        }}
                      />
                    </div>
                  )
                ) : (
                  <div className="dateInput">
                    <TextField
                      size="small"
                      value={group.searchValue}
                      onChange={(e) => {
                        const newGroups = [...filterGroups];
                        newGroups[index].searchValue = e.target.value;
                        setFilterGroups(newGroups);
                      }}
                      label="Search Value"
                      variant="outlined"
                    />
                  </div>
                )}
                {index > 0 ? (
                  <div onClick={() => removeFilterGroup(index)} className="deleteIcon">
                    <DeleteIcon />
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="filterActions">
          <Button
            variant="contained"
            style={{ marginRight: "10px" }}
            onClick={addFilterGroup}
          >
            Thêm điều kiện
          </Button>
          <Button variant="contained" onClick={searchExportDeclaration}>
            Tìm kiếm
          </Button>
        </div>
      </div>
      <div>
        <ExcelForm
          tableData={list}
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
    </div>
  );
}
