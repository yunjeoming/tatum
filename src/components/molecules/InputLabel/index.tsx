import { FC } from 'react';

type Props = {
  label: string;
  input: JSX.Element;
};

const InputLabel: FC<Props> = ({ label, input }) => {
  return (
    <label className="flex items-center justify-center gap-1">
      {input}
      <span className="grow cursor-pointer">{label}</span>
    </label>
  );
};

export default InputLabel;
