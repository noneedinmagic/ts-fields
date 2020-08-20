export type TBaseDecorator = (
  target: object | Function, // eslint-disable-line @typescript-eslint/ban-types
  propertyKey?: string | symbol,
  ...rest: unknown[]
) => void;

export type TPropertyDecorator = (
  target: object | Function, // eslint-disable-line @typescript-eslint/ban-types
  propertyKey?: string | symbol,
) => void;

export type TDecorator = TBaseDecorator | TPropertyDecorator;

export type TExternalDecorator = Function; // eslint-disable-line @typescript-eslint/ban-types
