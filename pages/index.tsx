import * as React from "react";
import { useSession } from "next-auth/react";
import { HotTable, HotColumn } from '@handsontable/react-wrapper';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/styles/handsontable.css';
import 'handsontable/styles/ht-theme-main.css';

// register Handsontable's modules
registerAllModules();
import { data } from "./constants";
export default function HomePage() {
  return (
    <HotTable
      data={data}
      autoColumnSize
      height='100%'
      width='100%'
      colHeaders={[
        "Company Name",
        "Name",
        "Sell date",
        "In stock",
        "Quantity",
        "Order ID",
        "Country",
      ]}
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
      themeName="ht-theme-main-dark-auto"
    >
      <HotColumn data={1} />
      <HotColumn data={3} />
      <HotColumn data={4} type="date" allowInvalid={false} />
      <HotColumn data={6} type="checkbox" className="htCenter" />
      <HotColumn data={7} type="numeric" />
      <HotColumn data={5} />
      <HotColumn data={2} />
    </HotTable>
  );
}

HomePage.requireAuth = true;
