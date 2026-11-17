type FormValue = string | Blob | null | undefined;

export const toFormData = (fields: Record<string, FormValue>): FormData => {
  const formData = new FormData();

  Object.entries(fields).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      formData.append(key, value);
    }
  });

  return formData;
};