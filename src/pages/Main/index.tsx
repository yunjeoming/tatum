'use client';

import SelectedOptions from './components/SelectedOptions';
import AllOptions from './components/AllOptions';
import Assets from './components/Assets';
import useMain from './useMain';

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
      <aside className="shrink-0 w-96 min-h-full h-fit flex flex-col gap-8 p-4">
        <AllOptions
          searchWord={searchWord}
          options={nodeData?.nodes || []}
          checkedItems={checkedKeys}
          isLoading={isLoading}
          onChangeCheckbox={handleChangeCheckbox}
          onChangeValue={handleChangeValue}
          onDelete={handleDeleteSearchWord}
        />
        <SelectedOptions
          totalCount={totalCount}
          selectedCount={checkedKeys.length}
          options={checkedNodes}
          isLoading={isLoading}
          onDeleteOption={handleDeleteOption}
        />
      </aside>
      <main className="grow p-4 min-h-full h-fit">
        <Assets columns={columns} rows={rows} isLoading={isLoading} />
      </main>
    </div>
  );
};

export default Main;
