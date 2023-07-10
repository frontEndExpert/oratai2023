export type FormElementConfig = {
  elementType: string;
  elementConfig: {
    type?: string;
    placeholder?: string;
    options?: Array<{ value: string; displayValue: string }>;
  };
  value: string;
  name?: string;
  validation: {
    required: boolean;
    minLength?: number;
    maxLength?: number;
    isNumeric?: boolean;
    isEmail?: boolean;
  };
  valid: boolean;
  touched: boolean;
};

export type ElementConfig = {
  value: string;
  valid: boolean;
  touched: boolean;
};