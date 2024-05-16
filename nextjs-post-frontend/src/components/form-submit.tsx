"use client";

import { useFormStatus } from "react-dom";

const FormSubmit = () => {
  const status = useFormStatus();

  if (status.pending) {
    return <p>Creating...</p>;
  }

  return (
    <p className="form-actions">
      <button type="reset">Reset</button>
      <button>Create Post</button>
    </p>
  );
};

export default FormSubmit;
