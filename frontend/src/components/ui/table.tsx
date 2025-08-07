import React from 'react';

type Props<T> = {
  data: T[];
  columns: { key: keyof T; label: string }[];
};

const Table = <T extends object>({ data, columns }: Props<T>) => {
  return (
    <table className="w-full border border-gray-300 mt-4">
      <thead>
        <tr className="bg-gray-100">
          {columns.map(col => (
            <th key={String(col.key)} className="text-left px-4 py-2">
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx} className="border-t">
            {columns.map(col => (
              <td key={String(col.key)} className="px-4 py-2">
                {row[col.key] as any}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;