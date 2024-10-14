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
    <div className='my-3'>
      <label htmlFor={id} className='w-32'>
        {label}
      </label>
      <div className='flex gap-4'>
        <input
          id={id}
          type={inputType}
          defaultValue={defaultValue}
          placeholder={placeholder}
          className={`inp ${inputClassNames}`}
          onChange={onChange}
          ref={ref}
          {...inputAttrs}
        />
        <Button
          type={buttonType}
          classNames={buttonClassNames}
          onClick={onClick}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
}

const LabelInputRef = forwardRef(LabelInput);

export default LabelInputRef;
