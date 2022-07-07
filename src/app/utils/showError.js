export function showError(data, name) {
  let isDirty = false;
  if (data) {
    Object.keys(data).forEach((el) => {
      if (el === name) isDirty = true;
    });
  }

  return isDirty;
}
