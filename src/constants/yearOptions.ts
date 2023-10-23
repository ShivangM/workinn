const yearOptions = new Array(50).fill(undefined).map((_, i) => {
  const year = new Date().getFullYear() - i;
  return { value: year, label: year };
});

export default yearOptions;
