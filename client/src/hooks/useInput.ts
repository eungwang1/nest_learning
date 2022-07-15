import React, { ChangeEvent, useState } from "react";

const useInput = (initialValue: any) => {
  const [inputValue, setInputValue] = useState(initialValue);
  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setInputValue(() => value);
  };
  return [inputValue, onChangeInput, setInputValue];
};

export default useInput;
