"use client";
import React, { useState } from "react";

export interface Column<T> {
  key: keyof T;
  label: string;
}

interface SortConfig<T> {
  key: keyof T;
  direction: "asc" | "desc";
}

interface Props<T> {
  columns: Column<T>[];
  data: T[];
}

export default function SortableTable<T extends Record<string, any>>({
  columns,
  data,
}: Props<T>) {
  const [sortConfig, setSortConfig] = useState<SortConfig<T> | null>(null);

  const sortedData = React.useMemo(() => {
    let sortableData = [...data];
    if (sortConfig !== null) {
      sortableData.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (typeof aValue === "number" && typeof bValue === "number") {
          return sortConfig.direction === "asc"
            ? aValue - bValue
            : bValue - aValue;
        }

        return sortConfig.direction === "asc"
          ? String(aValue).localeCompare(String(bValue))
          : String(bValue).localeCompare(String(aValue));
      });
    }
    return sortableData;
  }, [data, sortConfig]);

  const requestSort = (key: keyof T) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getSortIndicator = (key: keyof T) => {
    if (!sortConfig || sortConfig.key !== key) return "↕";
    return sortConfig.direction === "asc" ? "↑" : "↓";
  };

  return (
    <div className="w-full overflow-x-auto rounded-lg shadow relative">
      <table className="min-w-[1200px] border-collapse">
        <thead className="sticky top-0 z-10">
          <tr className="bg-gradient-to-r from-blue-600 to-blue-500 text-white">
            {columns.map((col) => (
              <th
                key={String(col.key)}
                onClick={() => requestSort(col.key)}
                className="cursor-pointer px-4 py-3 text-left text-sm font-semibold hover:bg-blue-700 transition-colors whitespace-nowrap"
              >
                {col.label} {getSortIndicator(col.key)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white">
          {sortedData.length === 0 && (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-4 text-center text-gray-500"
              >
                No data available
              </td>
            </tr>
          )}
          {sortedData.map((row, idx) => (
            <tr
              key={idx}
              className={`${
                idx % 2 === 0 ? "bg-gray-50" : "bg-white"
              } hover:bg-gray-100`}
            >
              {columns.map((col) => (
                <td
                  key={String(col.key)}
                  className="border-t border-gray-200 px-4 py-2 text-sm text-gray-800 whitespace-nowrap"
                >
                  {row[col.key] as string}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
