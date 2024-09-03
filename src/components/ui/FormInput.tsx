import { ChangeEvent, ChangeEventHandler, FC, InputHTMLAttributes } from "react";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string; 
  onChange: ChangeEventHandler<HTMLInputElement>; 
}

const FormInput: FC<FormInputProps> = ({ value, onChange, ...rest }) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e);
    }
  return (
    <input 
      type="text"
      value={value}
      onChange={handleChange}
      {...rest} 
    />
  );
};

export default FormInput;