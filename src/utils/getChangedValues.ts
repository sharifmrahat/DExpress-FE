const getChangedFields = <T extends object>(
  initial: T,
  current: T
): Partial<T> => {
  return (Object.keys(current) as (keyof T)[]).reduce(
    (changes: Partial<T>, key: keyof T) => {
      if (initial[key] !== current[key]) {
        changes[key] = current[key];
      }
      return changes;
    },
    {}
  );
};

export default getChangedFields;
