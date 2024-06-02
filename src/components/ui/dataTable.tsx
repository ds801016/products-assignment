import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { PrimeReactProvider } from "primereact/api";
import { ReactNode, useRef } from "react";
import { Loader2 } from "lucide-react";

export interface ColumnMeta {
  field: string;
  header: string;
  template?: (result: any) => ReactNode;
  width?: number;
  minWidth?: number;
}

function MyDataTable({
  data,
  columns,
  selection,
  selectedItems,
  onSelectionChange,
  loading,
}: {
  data: any[];
  columns: ColumnMeta[];
  selection?: boolean;
  selectedItems?: [];
  loading?: boolean;
  onSelectionChange?: (values: []) => void;
}) {
  const dt = useRef<DataTable>(null);

  const handleDownloadCSV = () => {};
  return (
    <PrimeReactProvider>
      <div className="bg-white border p-2 rounded-lg flex-1 h-full max-w-full overflow-hidden">
        <DataTable
          style={{ fontSize: 14 }}
          size="small"
          showGridlines={true}
          value={data}
          selectionMode={"multiple"}
          dragSelection
          loading={loading}
          loadingIcon={
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="text-primary animate-spin" size={50} />
              <p className="font-semibold text-muted-foreground opacity-50 text-lg">
                Fetching your data...
              </p>
            </div>
          }
          // virtualScrollerOptions={{ itemSize: virutalSize }}
          selection={selectedItems}
          onSelectionChange={(e: any) =>
            onSelectionChange && onSelectionChange(e.value)
          }
          filterDisplay="row"
          emptyMessage={
            <div className="flex-1 flex mt-[15%] justify-center h-full">
              <img src="/empty.svg" className="h-[150px] opacity-40" />
            </div>
          }
          stripedRows
          removableSort
          scrollable
          sortMode="multiple"
          // className="h-full"
          scrollHeight="flex"
          // tableStyle={{ width: "100%" }}
        >
          {/* <Column
          selectionMode="multiple"
          headerStyle={{ width: "3rem" }}
        ></Column> */}

          {columns.map((col) => (
            <Column
              filter
              style={{ width: col.width, minWidth: col.minWidth }}
              key={col.field}
              sortable
              body={col.template}
              field={col.field}
              header={col.header}
            />
          ))}
        </DataTable>
      </div>
    </PrimeReactProvider>
  );
}

export default MyDataTable;
