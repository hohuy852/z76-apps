interface EffectData {
  ma: string;
  ten: string;
  tenDonViTinh: string;
  soLuongTonDauKy: number;
  soLuongNhapKhoTrongKy: number;
  soLuongXuatKhoTrongKy: number;
  soLuongTonCuoiKy: number;
  soLuongNo: number | string | null;
}

interface ErpData {
  idKho: number;
  tenKho: string;
  ma: string;
  ten: string;
  tenDonViTinh: string;
  soLuongTonDauKy: number;
  soLuongNhapKhoTrongKy: number;
  soLuongXuatKhoTrongKy: number;
  soLuongTonCuoiKy: number;
  chiTietNhapXuat: Array<Record<string, any>>; // Có thể định nghĩa rõ ràng hơn nếu biết cấu trúc
}

const data1: EffectData[] = [
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
  },
];

const data2: ErpData[] = [
  {
    idKho: 2,
    tenKho: "Kho Chính",
    ma: "SP002",
    ten: "Sản phẩm A",
    tenDonViTinh: "Cái",
    soLuongTonDauKy: 200,
    soLuongNhapKhoTrongKy: 80,
    soLuongXuatKhoTrongKy: 60,
    soLuongTonCuoiKy: 220,
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
    soLuongTonDauKy: 0,
    soLuongNhapKhoTrongKy: 0,
    soLuongXuatKhoTrongKy: 0,
    soLuongTonCuoiKy: 0,
    chiTietNhapXuat: [
      { ngay: "2024-02-02", soLuong: 20, loai: "Nhập" },
      { ngay: "2024-02-06", soLuong: 10, loai: "Xuất" },
    ],
  },
  {
    idKho: 1,
    tenKho: "Kho Phụ",
    ma: "SP001",
    ten: "Sản phẩm B",
    tenDonViTinh: "Hộp",
    soLuongTonDauKy: 100,
    soLuongNhapKhoTrongKy: 50,
    soLuongXuatKhoTrongKy: 30,
    soLuongTonCuoiKy: 120,
    chiTietNhapXuat: [
      { ngay: "2024-02-02", soLuong: 20, loai: "Nhập" },
      { ngay: "2024-02-06", soLuong: 10, loai: "Xuất" },
    ],
  },
];

// Nhóm data2 theo 'ma'
const groupedData2: Record<string, ErpData[]> = data2.reduce((acc, item) => {
  if (!acc[item.ma]) {
    acc[item.ma] = [];
  }
  acc[item.ma].push(item);
  return acc;
}, {} as Record<string, ErpData[]>);

// Lọc kết quả: nếu tổng các thuộc tính của nhóm data2 khớp với mục tương ứng ở data1 thì giữ lại cả nhóm đó
const resultMatched: ErpData[] = [];

for (const ma in groupedData2) {
  const group: ErpData[] = groupedData2[ma];
  // Tìm mục tương ứng trong data1
  const target = data1.find(item => item.ma === ma);
  if (!target) continue; // Nếu không có mục tương ứng ở data1 thì bỏ qua

  // Tính tổng các thuộc tính của nhóm
  const sum = group.reduce(
    (acc, cur) => ({
      soLuongTonDauKy: acc.soLuongTonDauKy + cur.soLuongTonDauKy,
      soLuongNhapKhoTrongKy: acc.soLuongNhapKhoTrongKy + cur.soLuongNhapKhoTrongKy,
      soLuongXuatKhoTrongKy: acc.soLuongXuatKhoTrongKy + cur.soLuongXuatKhoTrongKy,
      soLuongTonCuoiKy: acc.soLuongTonCuoiKy + cur.soLuongTonCuoiKy,
    }),
    { soLuongTonDauKy: 0, soLuongNhapKhoTrongKy: 0, soLuongXuatKhoTrongKy: 0, soLuongTonCuoiKy: 0 }
  );

  // So sánh tổng của nhóm data2 với dữ liệu tương ứng từ data1
  if (
    sum.soLuongTonDauKy === target.soLuongTonDauKy &&
    sum.soLuongNhapKhoTrongKy === target.soLuongNhapKhoTrongKy &&
    sum.soLuongXuatKhoTrongKy === target.soLuongXuatKhoTrongKy &&
    sum.soLuongTonCuoiKy === target.soLuongTonCuoiKy
  ) {
    resultMatched.push(...group);
  }
}

// Helper function to sum props of multiple entries with the same id
function sumProps(entries:any) {
  return entries.reduce((sum :any, entry: any) => {
    sum.soLuongTonDauKy += entry.soLuongTonDauKy;
    sum.soLuongNhapKhoTrongKy += entry.soLuongNhapKhoTrongKy;
    sum.soLuongXuatKhoTrongKy += entry.soLuongXuatKhoTrongKy;
    sum.soLuongTonCuoiKy += entry.soLuongTonCuoiKy;
    return sum;
  }, {soLuongTonDauKy: 0, soLuongNhapKhoTrongKy: 0, soLuongXuatKhoTrongKy: 0, soLuongTonCuoiKy: 0});
}

// Filter out matching ids and sums from data1
const resultData1 = data1.filter(d1 => {
  // Find corresponding data2 entries
  const matchingData2 = data2.filter(d2 => d2.ma === d1.ma);

  if (matchingData2.length === 0) {
    return true; // No match, keep the entry in data1
  }

  // Sum the properties of all matching data2 entries
  const summedData2 = sumProps(matchingData2);

  // If summedData2 matches data1 entry, remove it from both data1 and data2
  if (
    summedData2.soLuongTonDauKy === d1.soLuongTonDauKy &&
    summedData2.soLuongNhapKhoTrongKy === d1.soLuongNhapKhoTrongKy &&
    summedData2.soLuongXuatKhoTrongKy === d1.soLuongXuatKhoTrongKy &&
    summedData2.soLuongTonCuoiKy === d1.soLuongTonCuoiKy
  ) {
    // Remove matched entries from data2
    matchingData2.forEach(matching => {
      const index = data2.findIndex(d2 => d2.ma === matching.ma && d2.soLuongTonDauKy === matching.soLuongTonDauKy && d2.soLuongNhapKhoTrongKy === matching.soLuongNhapKhoTrongKy);
      data2.splice(index, 1); // Remove this entry from data2
    });
    return false; // Don't keep this entry in data1
  }

  return true; // Keep this entry in data1
});

// Filter data2 entries that are not removed
const resultData2 = data2.filter(d2 => {
  const matchingData1 = data1.find(d1 => d1.ma === d2.ma);
  if (!matchingData1) {
    return true; // Keep if no match in data1
  }
  return true; // Keep if matching but not removed
});

console.log('Filtered data1:', resultData1);
console.log('Filtered data2:', resultData2);
console.log('Matched results:', resultMatched);
