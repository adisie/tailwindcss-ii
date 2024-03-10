import { useMemo, useState } from "react";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
// data files
import { dataFiles } from "../DataFile";

// icons
import { CiSearch } from "react-icons/ci";
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from "react-icons/io";

// main
// ReactTable
const ReactTable = () => {
  // students
  const students = useMemo(() => dataFiles.students, []);

  // states
  const [filtering, setFiltering] = useState("");
  const [sorting, setSorting] = useState([]);

  // custome cells
  const profileCell = ({ row }) => {
    const { first_name, last_name, profile } = row.original;
    return (
      <div className="flex items-center justify-start gap-1">
        {/* image */}
        <div>
          <img
            src={profile}
            alt=""
            className="w-[24px] h-[24px] rounded-full object-center object-cover"
          />
        </div>
        {/* username */}
        <div className="flex flex-col">
          <span className="text-gray-700 font-semibold text-sm">
            {first_name}
          </span>
          <span className="text-gray-500 text-xs">{last_name}</span>
        </div>
      </div>
    );
  };
  // columns
  const studentComuns = [
    {
      header: "Student",
      accessorKey: "first_name",
      cell: profileCell,
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Department",
      accessorKey: "department",
    },
  ];
  // student table
  const studentTable = useReactTable({
    data: students,
    columns: studentComuns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      globalFilter: filtering,
      sorting: sorting,
    },
    onGlobalFilterChange: setFiltering,
    onSortingChange: setSorting,
  });

  return (
    <div className="w-full h-full flex justify-center">
      <div className="max-w-[720px] flex-grow mx-auto p-3">
        {/* search */}
        <div className="flex items-center justify-center">
          <div className="flex items-center justify-center rounded-full bg-gray-200 px-2 py-[.15rem] my-3">
            <CiSearch className="text-xl" />
            <input
              type="text"
              placeholder="search"
              className="focus:outline-none focus:ring-0 bg-transparent border-none h-[24px]"
              onChange={(e) => setFiltering(e.target.value)}
            />
          </div>
        </div>
        <table className="w-full">
          <thead className="bg-emerald-600 text-gray-50 border-b border-gray-300">
            {studentTable.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="p-1 text-left cursor-pointer"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {
                      {
                        asc: (
                          <IoIosArrowRoundDown className="inline-block ml-1 text-xl text-white" />
                        ),
                        desc: (
                          <IoIosArrowRoundUp className="inline-block ml-1 text-xl text-white" />
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
              <tr key={row.id} className="bg-gray-50 border-b border-gray-200">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="text-left">
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
