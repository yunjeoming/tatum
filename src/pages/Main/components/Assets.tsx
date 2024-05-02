import { FC } from 'react';
import { LoadingUI, Table } from '@/components/organisms';
import { Column, Row } from '@/types/common';

type Props = {
  columns: Column[];
  rows: Row[];
  isLoading: boolean;
};

const Assets: FC<Props> = ({ columns, rows, isLoading }) => {
  return (
    <div className="h-full flex flex-col gap-4">
      <h3>Assets</h3>
      {isLoading ? <LoadingUI className="h-96" /> : <Table columns={columns} rows={rows} isFixedHeight={false} />}
    </div>
  );
};

export default Assets;
