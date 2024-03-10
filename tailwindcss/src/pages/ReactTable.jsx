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
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardArrowLeft,
  MdKeyboardDoubleArrowRight,
  MdKeyboardArrowRight,
} from "react-icons/md";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
// data files
import { dataFiles } from "../DataFile";

const ReactTable = () => {
  // states
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");

  // columns
  const studentsColumns = [
    {
      header: "First Name",
      accessorKey: "first_name",
    },
    {
      header: "Last Name",
      accessorKey: "last_name",
    },
    {
      header: "Department",
      accessorKey: "department",
    },
    {
      header: "Nationality",
      accessorKey: "nation",
    },
  ];
  // data
  const studentsFile = useMemo(() => dataFiles.students, []);

  // table
  const studentTable = useReactTable({
    data: studentsFile,
    columns: studentsColumns,
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
    <div>
      <h3 className="text-xl text-blue-800 font-bold my-1">Students</h3>
      {/* search */}
      <div className="flex items-center justify-center">
        <div className="flex items-center justify-center bg-gray-100 rounded-full px-3 py-1">
          <FiSearch className="text-2xl" />
          <input
            type="text"
            placeholder="search student"
            className="focus:outline-none focus:ring-0 border-none bg-transparent h-[28px]"
            onChange={(e) => setFiltering(e.target.value)}
          />
        </div>
      </div>
      <table className="w-full">
        <thead>
          {studentTable.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  className="cursor-pointer"
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {
                    {
                      asc: (
                        <IoMdArrowDropdown className="inline-block text-lg ml-2" />
                      ),
                      desc: (
                        <IoMdArrowDropup className="inline-block text-lg ml-2" />
                      ),
                    }[header.column.getIsSorted() ?? null]
                  }
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {studentTable.getRowModel().rows.map((row) => (
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
      {/* button container */}
      <div className="flex items-center justify-center gap-3 my-3">
        {/* first */}
        <button
          className="bg-blue-700 px-3 rounded-sm"
          onClick={() => studentTable.setPageIndex(0)}
        >
          <MdOutlineKeyboardDoubleArrowLeft className="text-3xl text-white" />
        </button>
        {/* previous */}
        <button
          className={`px-3 rounded-sm ${
            studentTable.getCanPreviousPage() ? "bg-blue-700" : "bg-blue-500"
          }`}
          onClick={() => studentTable.previousPage()}
        >
          <MdOutlineKeyboardArrowLeft className="text-3xl text-white" />
        </button>
        {/* next */}
        <button
          disabled={!studentTable.getCanNextPage()}
          className={`px-3 rounded-sm ${
            studentTable.getCanNextPage() ? "bg-blue-700" : "bg-blue-500"
          }`}
          onClick={() => studentTable.nextPage()}
        >
          <MdKeyboardArrowRight className="text-3xl text-white" />
        </button>
        {/* last */}
        <button
          className="bg-blue-700 px-3 rounded-sm"
          onClick={() =>
            studentTable.setPageIndex(studentTable.getPageCount() - 1)
          }
        >
          <MdKeyboardDoubleArrowRight className="text-3xl text-white" />
        </button>
      </div>
    </div>
  );
};

export default ReactTable;
