const $class = (...classes: any[]) => {
  return classes
    .map((x) => (Array.isArray(x) ? (x[1] ? x[0] : null) : x))
    .filter((x) => x)
    .join(' ');
};

const $shimmer = (loading = true, type: 'block' | 'text'  = 'block') => {
  return $class('shimmer', ['shimmer--active', loading], `shimmer--${type}`);
};

export { $class, $shimmer };