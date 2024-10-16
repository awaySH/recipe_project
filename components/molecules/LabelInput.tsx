import {
  ChangeEvent,
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
  useId,
} from 'react';
import Button from '../atoms/Button';

type Props = {
  label: string;
  inputType?: string;
  placeholder?: string;
  defaultValue?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  inputClassNames?: string;
  inputAttrs?: InputHTMLAttributes<HTMLInputElement>;
  buttonClassNames?: string;
  buttonText?: string;
  buttonType?: 'submit' | 'button' | 'reset';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

function LabelInput(
  {
    label,
    inputAttrs,
    inputType = 'text',
    defaultValue = '',
    placeholder = `${label}을 입력하세요`,
    onChange = () => {},
    inputClassNames = '',
    buttonClassNames = '',
    buttonText = '',
    buttonType = 'submit',
    onClick = () => {},
  }: Props,
  ref: ForwardedRef<HTMLInputElement>
) {
  const id = useId();

  return (
    <div className='mb-4'>
      <label
        htmlFor={id}
        className='block text-sm font-semibold text-gray-700 mb-1'
      >
        {label}
      </label>
      <div className='flex'>
        <input
          id={id}
          type={inputType}
          defaultValue={defaultValue}
          placeholder={placeholder}
          className={`block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${inputClassNames}`}
          onChange={onChange}
          ref={ref}
          {...inputAttrs}
        />
        {buttonText && (
          <Button
            type={buttonType}
            classNames={`ml-2 w-[70px] ${buttonClassNames}`}
            onClick={onClick}
          >
            {buttonText}
          </Button>
        )}
      </div>
    </div>
  );
}

const LabelInputRef = forwardRef(LabelInput);

export default LabelInputRef;
