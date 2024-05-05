import { FC } from 'react';
import { Table } from '@/components/organisms';
import { Column, Row } from '@/types/common';

type Props = {
  columns: Column[];
  rows: Row[];
};

const Assets: FC<Props> = ({ columns, rows }) => {
  return (
    <div className="h-full flex flex-col gap-4">
      <h3>Assets</h3>
      <Table columns={columns} rows={rows} isFixedHeight={false} />
    </div>
  );
};

export default Assets;
