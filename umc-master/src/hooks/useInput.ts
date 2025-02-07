import { useState } from "react";

type InputErrorHandler = (error: string) => string;

export interface UseInputProps {
  initialValue?: string;
  validate?: (value: string, errorHandler: InputErrorHandler) => Promise<string> | string;  // validate를 비동기 함수로 지원
  errorHandler?: InputErrorHandler;
}

export default function useInput({
  initialValue = "",
  validate = () => "",
  errorHandler = () => "",
}: UseInputProps) {
  const [input, setInput] = useState(initialValue);
  const [errorMessage, setErrorMessage] = useState("");

  const isError = 0 < errorMessage.length;

  const changeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);

    const validationResult = await validate(e.target.value, errorHandler);
    setErrorMessage(validationResult);
  };

  const handleInputError = (error: string) => {
    setErrorMessage(errorHandler(error));
  };

  const resetValue = () => {
    setInput("");
    setErrorMessage("");
  };

  return {
    input,
    isError,
    errorMessage,
    changeHandler,
    handleInputError,
    resetValue,
  };
}