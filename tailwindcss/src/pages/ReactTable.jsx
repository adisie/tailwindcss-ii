import { useMemo } from "react";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
} from "@tanstack/react-table";

// data files
import { dataFiles } from "../DataFile";

const ReactTable = () => {
  // data
  const customers = useMemo(() => dataFiles.customers, []);
  // custome cells
  // name cell
  const customeNameCell = ({ row }) => {
    const { first_name, last_name } = row.original;
    return (
      <div>
        <h3 className="text-gray-700">{first_name}</h3>
        <span className="text-gray-500 text-xs hidden sm:flex">
          {last_name}
        </span>
      </div>
    );
  };
  // table columns
  const customerColumns = [
    {
      header: "Name",
      accessorKey: "first_name",
      cell: customeNameCell,
    },
    {
      header: "Phone",
      accessorKey: "phone",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Address",
      accessorKey: "address",
    },
  ];
  // customer table
  const customerTable = useReactTable({
    data: customers,
    columns: customerColumns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className="flex items-center justify-center">
      <div className="max-w-[720px] mx-auto flex-grow">
        <table className="w-full">
          <thead className="bg-emerald-600 text-gray-100 ">
            {customerTable.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="p-1 text-left transition-all ease-in-out duration-300 hover:bg-emerald-500 cursor-pointer whitespace-nowrap"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {customerTable.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b border-gray-300 bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-1">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReactTable;
