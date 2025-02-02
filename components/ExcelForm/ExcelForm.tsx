'use client'

import React, { useEffect, useRef, useState } from 'react';
import Handsontable from 'handsontable';
import { HotTable, HotColumn } from '@handsontable/react';
import { registerAllModules } from "handsontable/registry";
import 'handsontable/dist/handsontable.full.min.css';
import './excel.component.css';
import { prototype } from 'events';
import { FormMode } from '@/enums/FormMode';
import { Box, fabClasses, SvgIcon, Tooltip } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import VisibilityIcon from "@mui/icons-material/Visibility";

// import useSignalR from '@/hooks/useSignalR';
registerAllModules();

interface TableRow {
  [key: string]: any; // Dành cho các thuộc tính dữ liệu động
  readonly?: boolean; // Thêm thuộc tính readonly
  [key: number]: any; // Dành cho các cột dữ liệu
}

interface ChildProps {
  tableData: TableRow[];
  blurCell: (msg:string) => void;
  columns: any[];
}
const ExcelForm: React.FC<ChildProps> = ({tableData, blurCell, columns}) => {
  const hotTableRef = useRef(null);

  // Tạo bản sao độc lập của data để tránh Handsontable chỉnh sửa trực tiếp props
  const [localTableData, setLocalTableData] = useState<any[]>();

  useEffect(() => {
    setLocalTableData(tableData); // Deep clone để tránh vấn đề tham chiếu
  }, [tableData]);

  return (
    <div className="excel-form-container">
      <HotTable
        ref={hotTableRef}
        data={tableData} // Tạo dữ liệu mẫu
        colHeaders={columns.filter(col => col.type != "Action").map((col) => col.title)}
        columns={columns.filter(col => col.type != "Action").map(col => ({ data: col.dataField, title: col.title, renderer: col.renderer, type: col.dataType, dateFormat: 'DD/MM/YYYY' }))}
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
        rowHeaders={true}
        width="100%"
        height="auto"
        licenseKey="non-commercial-and-evaluation"
        rowHeights='30px'
        className="ht-theme-main" 
        wordWrap={false}
        colWidths={columns.filter(x => x.type != "Action").map(col => col.width)}
        manualColumnResize={true}
        autoColumnSize
        afterChange={(changes, source) => {
          if (!changes || source === "loadData") return; // Tránh lỗi khi changes bị null/undefined
        
          setLocalTableData((prevData) => {
            if (!prevData) return prevData; // Nếu prevData là undefined, không làm gì
        
            const newData = prevData.map(obj => ({ ...obj })); // Clone an toàn
            changes.forEach(([row, prop, oldVal, newVal]) => {
              if(typeof(prop) === 'string'){
                newData[row].prop = newVal;
                newData[row].state = FormMode.Update;
              }
            });
            blurCell(JSON.stringify(newData))
            return newData;
          });
        }}
        dropdownMenu={false}
        multiColumnSorting={false}
        filters={false}
        headerClassName="htLeft"
        manualRowMove={true}
        autoWrapRow={true}
        autoWrapCol={true}
        manualRowResize={true}
        navigableHeaders={true}
        cells={(row, col) => {
          const cellProperties = {} as Handsontable.CellProperties;
      
          // Kiểm tra giá trị readonly trong tableData
          if (tableData[row] && tableData[row].readonly) {
            cellProperties.readOnly = true; // Disable toàn bộ hàng nếu readonly = true
          }
      
          return cellProperties;
        }}
      >
      </HotTable>
      <HotTable
        className='action-table ht-theme-main'
        ref={hotTableRef}
        data={tableData} // Tạo dữ liệu mẫu
        colHeaders={columns.filter(col => col.type == "Action").map((col) => col.title)}
        columns={columns.filter(col => col.type == "Action").map(col => ({ data: col.dataField, title: col.title, renderer: col.renderer }))}
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
        rowHeaders={false}
        readOnly={true}
        height="auto"
        licenseKey="non-commercial-and-evaluation"
        rowHeights='30px'
        wordWrap={false}
        colWidths={columns.filter(col => col.type == "Action").map(col => col.width)}
        manualColumnResize={true}
        autoColumnSize
        afterChange={(changes, source) => {
          if (!changes || source === "loadData") return; // Tránh lỗi khi changes bị null/undefined
        
          setLocalTableData((prevData) => {
            if (!prevData) return prevData; // Nếu prevData là undefined, không làm gì
        
            const newData = prevData.map(obj => ({ ...obj })); // Clone an toàn
            changes.forEach(([row, prop, oldVal, newVal]) => {
              if(typeof(prop) === 'string'){
                newData[row].prop = newVal;
                newData[row].state = FormMode.Update;
              }
            });
            blurCell(JSON.stringify(newData))
            return newData;
          });
        }}
        dropdownMenu={false}
        multiColumnSorting={false}
        filters={false}
        headerClassName="htLeft"
        manualRowMove={true}
        autoWrapRow={true}
        autoWrapCol={true}
        manualRowResize={true}
        navigableHeaders={true}
      >
      </HotTable>
    </div>
  );
};

export default ExcelForm;
