import { ChangeEventHandler, FC, TextareaHTMLAttributes } from "react";

interface FormTextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    value: string;
    onChange: ChangeEventHandler<HTMLTextAreaElement>;
    }

const TextArea: FC<FormTextAreaProps> = ({ value, onChange, ...rest} ) => {
  return (
    <textarea
        value={value} 
        onChange={onChange} 
        {...rest}
      ></textarea>
  )
}

export default TextArea;