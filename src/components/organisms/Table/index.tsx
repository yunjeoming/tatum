import { FC } from 'react';
import { Column, Row } from '@/types/common';

type Props = {
  columns: Column[];
  rows: Row[];
  isFixedHeight?: boolean;
};

const Table: FC<Props> = ({ columns, rows, isFixedHeight = true }) => {
  return (
    <div className={`${isFixedHeight ? 'grow min-h-0 overflow-auto' : ''}`}>
      <table className="w-full">
        <thead className={`sticky top-0 bg-gray-100`}>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="relative text-left min-w-20 px-2 py-1 before:content-[''] before:absolute before:top-1/4 before:left-0 before:w-1 before:h-1/2 before:border-l-2 before:border-gray-300"
                style={{ width: 100 / columns.length + '%' }}
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="text-sm">
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b">
              {columns.map((column) => {
                const currValue = row[column.key];
                return (
                  <td key={currValue} className="px-2 py-1">
                    {currValue}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
