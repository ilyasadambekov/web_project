const $class = (...classes: any[]) => {
  return classes
    .map((x) => (Array.isArray(x) ? (x[1] ? x[0] : null) : x))
    .filter((x) => x)
    .join(' ');
};

export { $class };