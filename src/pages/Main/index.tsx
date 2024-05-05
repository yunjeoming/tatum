'use client';

import SelectedOptions from './components/SelectedOptions';
import AllOptions from './components/AllOptions';
import Assets from './components/Assets';
import useMain from './useMain';
import { LoadingSuspense } from '@/components/organisms';

const Main = () => {
  const {
    nodeData,
    checkedKeys,
    checkedNodes,
    columns,
    rows,
    searchWord,
    totalCount,
    isLoading,
    handleChangeCheckbox,
    handleChangeValue,
    handleDeleteSearchWord,
    handleDeleteOption,
  } = useMain();

  return (
    <div className="flex h-screen">
      <LoadingSuspense isLoading={isLoading}>
        <aside className="shrink-0 w-96 min-h-full h-fit flex flex-col gap-8 p-4">
          <AllOptions
            searchWord={searchWord}
            options={nodeData?.nodes || []}
            checkedItems={checkedKeys}
            onChangeCheckbox={handleChangeCheckbox}
            onChangeValue={handleChangeValue}
            onDelete={handleDeleteSearchWord}
          />
          <SelectedOptions
            totalCount={totalCount}
            selectedCount={checkedKeys.length}
            options={checkedNodes}
            onDeleteOption={handleDeleteOption}
          />
        </aside>
        <main className="grow p-4 min-h-full h-fit">
          <Assets columns={columns} rows={rows} />
        </main>
      </LoadingSuspense>
    </div>
  );
};

export default Main;
