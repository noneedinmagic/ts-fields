import { Transform, Type } from 'class-transformer';
import { Moment } from 'moment';
import * as moment from 'moment';
import {
  ColumnOptions,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ValueTransformer,
} from 'typeorm';

// import formats from '../formats';
import { MomentTransformer, DateTransformer, DatetimeTransformer } from '../transformers/moment';
import { TPropertyDecorator } from '../types/decorators';
// import { BaseFormatKeyDictionary } from '../types/formats';
import { applyDecorators } from '../utils/decorators';

// function transformFrom<F = unknown, T = F>(value: F, transformers: ValueTransformer | ValueTransformer[]): T {
//   return (Array.isArray(transformers) ? transformers : [transformers]).reduce((acc, transformer) => transformer.from(acc), value);
// }
// function transformTo<F = unknown, T = F>(value: F, transformers: ValueTransformer | ValueTransformer[]): T {
//   return (Array.isArray(transformers) ? transformers : [transformers]).reduce((acc, transformer) => transformer.to(acc), value);
// }

export function DateMomentColumn(
  columnOptions?: ColumnOptions,
): TPropertyDecorator {
  const defaultTransformer: MomentTransformer = new DateTransformer();
  const transformer: ValueTransformer | ValueTransformer[] = columnOptions?.transformer ?? defaultTransformer;

  return applyDecorators(
    Column({
      type: 'date',

      ...columnOptions,

      transformer,
    }),
    Type(() => moment),
    Transform((value: string): Moment => defaultTransformer.fromPlain(value), {
      toClassOnly: true,
    }),
    Transform(
      (value: Moment): string => defaultTransformer.toPlain(value),
      { toPlainOnly: true },
    ),
  );
}

export function DatetimeMomentColumn(
  columnOptions?: ColumnOptions,
): TPropertyDecorator {
  const defaultTransformer: MomentTransformer = new DatetimeTransformer();
  const transformer: ValueTransformer | ValueTransformer[] = columnOptions?.transformer ?? defaultTransformer;

  return applyDecorators(
    Column({
      type: 'datetime',

      ...columnOptions,

      transformer,
    }),
    Type(() => moment),
    Transform((value: string): Moment => defaultTransformer.fromPlain(value), {
      toClassOnly: true,
    }),
    Transform(
      (value: Moment): string => defaultTransformer.toPlain(value),
      { toPlainOnly: true },
    ),
  );
}

export function CreateMomentColumn(
  columnOptions?: ColumnOptions,
): TPropertyDecorator {
  const defaultTransformer: MomentTransformer = new DatetimeTransformer();
  const transformer: ValueTransformer | ValueTransformer[] = columnOptions?.transformer ?? defaultTransformer;

  return applyDecorators(
    CreateDateColumn({
      name: 'created_at',
      type: 'datetime',
      precision: null,
      default: () => 'CURRENT_TIMESTAMP',

      ...columnOptions,

      transformer,
    }),
    Type(() => moment),
    Transform((value: string): Moment => defaultTransformer.fromPlain(value), {
      toClassOnly: true,
    }),
    Transform(
      (value: Moment): string => defaultTransformer.toPlain(value),
      { toPlainOnly: true },
    ),
  );
}

export function UpdateMomentColumn(
  columnOptions?: ColumnOptions,
): TPropertyDecorator {
  const defaultTransformer: MomentTransformer = new DatetimeTransformer();
  const transformer: ValueTransformer | ValueTransformer[] = columnOptions?.transformer ?? defaultTransformer;

  return applyDecorators(
    UpdateDateColumn({
      name: 'updated_at',
      type: 'datetime',
      precision: null,
      default: () => 'CURRENT_TIMESTAMP',
      onUpdate: 'CURRENT_TIMESTAMP',

      ...columnOptions,

      transformer,
    }),
    Type(() => moment),
    Transform((value: string): Moment => defaultTransformer.fromPlain(value), {
      toClassOnly: true,
    }),
    Transform(
      (value: Moment): string => defaultTransformer.toPlain(value),
      { toPlainOnly: true },
    ),
  );
}
