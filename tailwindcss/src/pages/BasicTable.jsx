import { useMemo, useState } from "react";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

// icons
import { BiSolidUpArrowAlt } from "react-icons/bi";
import { RiArrowDownFill } from "react-icons/ri";

// data file
import { myData } from "../DataFile";

const BasicTable = () => {
  // data
  const data = useMemo(() => myData.firstData, []);
  // table columns
  const columns = [
    {
      header: "ID",
      accessorKey: "id",
      footer: "Id",
    },
    {
      header: "First",
      accessorKey: "first_name",
    },
    {
      header: "Last",
      accessorKey: "last_name",
      cell: (info) => info.getValue().toUpperCase(),
    },
    {
      header: "EMAIL",
      accessorKey: "email",
      footer: "Email",
    },
    {
      header: "PROFESSION",
      accessorKey: "pro",
      footer: "Proffession",
    },
  ];

  // states
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");

  // table
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  return (
    <div className="w3-container">
      <div>
        <input
          type="text"
          onChange={(e) => setFiltering(e.target.value)}
          placeholder="search"
        />
      </div>
      {/* table */}
      <table className="w3-table-all">
        {/* table header */}
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  className="flex items-center justify-between gap-2 cursor-pointer"
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  {
                    {
                      asc: (
                        <BiSolidUpArrowAlt className="inline-block text-xl mr-1" />
                      ),
                      desc: (
                        <RiArrowDownFill className="inline-block text-xl mr-1" />
                      ),
                    }[header.column.getIsSorted() ?? null]
                  }
                </th>
              ))}
            </tr>
          ))}
        </thead>
        {/* table body */}
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center justify-center gap-x-5 my-5">
        <button
          className="px-5 py-1 bg-blue-700 text-white rounded-sm"
          onClick={() => table.setPageIndex(0)}
        >
          first page
        </button>
        <button
          disabled={!table.getCanPreviousPage()}
          className="px-5 py-1 bg-blue-700 text-white rounded-sm"
          onClick={() => table.previousPage()}
        >
          previous page
        </button>
        <button
          disabled={!table.getCanNextPage()}
          className={`px-5 py-1  text-white rounded-sm ${
            table.getCanNextPage() ? "bg-blue-700" : "bg-blue-400"
          }`}
          onClick={() => table.nextPage()}
        >
          next page
        </button>
        <button
          className="px-5 py-1 bg-blue-700 text-white rounded-sm"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        >
          last page
        </button>
      </div>
    </div>
  );
};

export default BasicTable;
