import { FormatKey, FormatValue } from '../types/formats';
import * as defaults from './default';

export class FormatCollection {
  constructor (
    protected readonly _formats: Map<FormatKey, FormatValue> = new Map,
  ) {}

  public get(key: FormatKey): FormatValue {
    return this._formats.has(key) ? this._formats.get(key) : defaults[key];
  }

  public set(key: FormatKey, value: FormatValue): this {
    this._formats.set(key, value);
    return this;
  }
}

const _globalInstance = new FormatCollection;
export default _globalInstance;
