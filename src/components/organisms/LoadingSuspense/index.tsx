import { FC } from 'react';
import { LoadingUI } from '@/components/molecules';

type Props = {
  isLoading: boolean;
  children: JSX.Element | JSX.Element[];
};

const LoadingSuspense: FC<Props> = ({ isLoading, children }) => {
  return <>{isLoading ? <LoadingUI /> : children}</>;
};

export default LoadingSuspense;
