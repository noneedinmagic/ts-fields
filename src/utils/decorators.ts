import { TDecorator, TExternalDecorator } from '../types/decorators';

/**
 * Function that returns a new decorator that applies all decorators provided by param
 *
 * Useful to build new decorators (or a decorator factory) encapsulating multiple decorators related with the same feature
 *
 * Inspired by the same function from NestJS, but with another TypeScript interfaces
 *
 * @param decorators one or more decorators (e.g., `ApplyGuard(...)`)
 *
 * @publicApi
 */
export function applyDecorators(
  ...decorators: TExternalDecorator[]
): TDecorator {
  return (target, propertyKey, descriptor): void => {
    for (const decorator of decorators) {
      if (target instanceof Function && !descriptor) {
        decorator(target);
        continue;
      }
      decorator(target, propertyKey, descriptor);
    }
  };
}
