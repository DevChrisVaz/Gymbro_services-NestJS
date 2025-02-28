export type TFilterOperator =
  | 'eq'
  | 'ne'
  | 'lt'
  | 'lte'
  | 'gt'
  | 'gte'
  | 'like'
  | 'in';

export type TFilters<T> = {
  [K in keyof T]?: {
    [Operator in TFilterOperator]?: T[K] extends string // Si el tipo es un string, solo permitimos 'eq', 'like' y 'in'
      ? Operator extends 'eq' | 'like' | 'in'
        ? string | string[]
        : never
      : // Si el tipo es un número, permitimos 'eq', 'ne', 'lt', 'lte', 'gt', 'gte'
        T[K] extends number
        ? Operator extends 'eq' | 'ne' | 'lt' | 'lte' | 'gt' | 'gte'
          ? number | [number] // Para rangos en 'lt' y 'gt'
          : never
        : // Si el tipo es una fecha, permitimos 'eq', 'ne', 'lt', 'lte', 'gt', 'gte'
          T[K] extends Date
          ? Operator extends 'eq' | 'ne' | 'lt' | 'lte' | 'gt' | 'gte'
            ? Date | string // Permite pasar una fecha como string
            : never
          : // Si es un booleano, solo permitimos 'eq' y 'ne'
            T[K] extends boolean
            ? Operator extends 'eq' | 'ne'
              ? boolean
              : never
            : never; // Para otros tipos no definimos ningún operador
  };
};
