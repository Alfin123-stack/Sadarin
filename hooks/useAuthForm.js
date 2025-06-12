import { useState } from "react";

export const useAuthForm = (fields = []) => {
  const [focused, setFocused] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field]: false }), {})
  );

  const handleFocus = (key) => {
    setFocused((prev) =>
      Object.fromEntries(
        Object.entries(prev).map(([k]) => [k, k === key])
      )
    );
  };

  const handleBlur = (key) => {
    setFocused((prev) => ({ ...prev, [key]: false }));
  };

  return { focused, handleFocus, handleBlur };
};
