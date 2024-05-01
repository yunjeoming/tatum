import { FC, InputHTMLAttributes } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  indeterminate?: boolean;
};

const Checkbox: FC<Props> = ({ checked, indeterminate, ...others }) => {
  const getImage = () => {
    if (indeterminate) {
      return '-';
    }

    if (checked) {
      return '✓';
    }

    return '';
  };

  return (
    <span className="relative flex w-4 h-4 items-center justify-center shrink-0 border rounded-sm">
      <input
        type="checkbox"
        className="absolute top-0 left-0 w-full h-full appearance-none cursor-pointer"
        checked={checked}
        {...others}
      />
      <span className="text-center text-xs w-full h-full">{getImage()}</span>
    </span>
  );
};

export default Checkbox;
