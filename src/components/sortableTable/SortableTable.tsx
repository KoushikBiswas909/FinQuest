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
  enableSelection?: boolean;
  selectedIds?: string[];
  onSelectionChange?: (ids: string[]) => void;
  idKey?: keyof T;
  renderActions?: (row: T) => React.ReactNode; // <- NEW
}

export default function SortableTable<T extends Record<string, any>>({
  columns,
  data,
  enableSelection = false,
  selectedIds = [],
  onSelectionChange,
  idKey = "id",
  renderActions,
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

  const toggleSelectAll = (checked: boolean) => {
    if (!onSelectionChange) return;
    if (checked) {
      const allIds = data.map((row) => String(row[idKey]));
      onSelectionChange(allIds);
    } else {
      onSelectionChange([]);
    }
  };

  const toggleSelectOne = (id: string) => {
    if (!onSelectionChange) return;
    if (selectedIds.includes(id)) {
      onSelectionChange(selectedIds.filter((sid) => sid !== id));
    } else {
      onSelectionChange([...selectedIds, id]);
    }
  };

  const allSelected = enableSelection && selectedIds.length === data.length && data.length > 0;

  return (
    <div className="w-full overflow-x-auto rounded-lg shadow relative">
      <table className="min-w-[1200px] border-collapse">
        <thead className="sticky top-0 z-10">
          <tr className="bg-gradient-to-r from-blue-600 to-blue-500 text-white">
            {enableSelection && (
              <th className="px-4 py-3">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={(e) => toggleSelectAll(e.target.checked)}
                />
              </th>
            )}
            {columns.map((col) => (
              <th
                key={String(col.key)}
                onClick={() => requestSort(col.key)}
                className="cursor-pointer px-4 py-3 text-left text-sm font-semibold hover:bg-blue-700 transition-colors whitespace-nowrap"
              >
                {col.label} {getSortIndicator(col.key)}
              </th>
            ))}
            {renderActions && <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>}
          </tr>
        </thead>
        <tbody className="bg-white">
          {sortedData.length === 0 && (
            <tr>
              <td
                colSpan={columns.length + (enableSelection ? 1 : 0) + (renderActions ? 1 : 0)}
                className="px-4 py-4 text-center text-gray-500"
              >
                No data available
              </td>
            </tr>
          )}
          {sortedData.map((row, idx) => {
            const rowId = String(row[idKey]);
            return (
              <tr
                key={rowId}
                className={`${idx % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}
              >
                {enableSelection && (
                  <td className="border-t border-gray-200 px-4 py-2 text-sm text-gray-800">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(rowId)}
                      onChange={() => toggleSelectOne(rowId)}
                    />
                  </td>
                )}
                {columns.map((col) => (
                  <td
                    key={String(col.key)}
                    className="border-t border-gray-200 px-4 py-2 text-sm text-gray-800 whitespace-nowrap"
                  >
                    {row[col.key] as string}
                  </td>
                ))}
                {renderActions && (
                  <td className="border-t border-gray-200 px-4 py-2">{renderActions(row)}</td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
