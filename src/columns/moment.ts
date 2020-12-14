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
import { DateTransformer, DatetimeTransformer } from '../transformers/moment';
import { TPropertyDecorator } from '../types/decorators';
// import { BaseFormatKeyDictionary } from '../types/formats';
import { applyDecorators } from '../utils/decorators';

function transformFrom<F = unknown, T = F>(value: F, transformers: ValueTransformer | ValueTransformer[]): T {
  return (Array.isArray(transformers) ? transformers : [transformers]).reduce((acc, transformer) => transformer.from(acc), value);
}
function transformTo<F = unknown, T = F>(value: F, transformers: ValueTransformer | ValueTransformer[]): T {
  return (Array.isArray(transformers) ? transformers : [transformers]).reduce((acc, transformer) => transformer.to(acc), value);
}

export function DateMomentColumn(
  columnOptions?: ColumnOptions,
): TPropertyDecorator {
  const transformer: ValueTransformer | ValueTransformer[] = columnOptions?.transformer ?? new DateTransformer();

  return applyDecorators(
    Column({
      type: 'date',

      ...columnOptions,

      transformer,
    }),
    Type(() => moment),
    Transform((value: string): Moment => transformFrom<string, Moment>(value, transformer), {
      toClassOnly: true,
    }),
    Transform(
      (value: Moment): string => transformTo<Moment, string>(value, transformer),
      { toPlainOnly: true },
    ),
  );
}

export function DatetimeMomentColumn(
  columnOptions?: ColumnOptions,
): TPropertyDecorator {
  const transformer: ValueTransformer | ValueTransformer[] = columnOptions?.transformer ?? new DatetimeTransformer();

  return applyDecorators(
    Column({
      type: 'datetime',

      ...columnOptions,

      transformer,
    }),
    Type(() => moment),
    Transform((value: string): Moment => transformFrom<string, Moment>(value, transformer), {
      toClassOnly: true,
    }),
    Transform(
      (value: Moment): string => transformTo<Moment, string>(value, transformer),
      { toPlainOnly: true },
    ),
  );
}

export function CreateMomentColumn(
  columnOptions?: ColumnOptions,
): TPropertyDecorator {
  const transformer: ValueTransformer | ValueTransformer[] = columnOptions?.transformer ?? new DatetimeTransformer();

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
    Transform((value: string): Moment => transformFrom<string, Moment>(value, transformer), {
      toClassOnly: true,
    }),
    Transform(
      (value: Moment): string => transformTo<Moment, string>(value, transformer),
      { toPlainOnly: true },
    ),
  );
}

export function UpdateMomentColumn(
  columnOptions?: ColumnOptions,
): TPropertyDecorator {
  const transformer: ValueTransformer | ValueTransformer[] = columnOptions?.transformer ?? new DatetimeTransformer();

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
    Transform((value: string): Moment => transformFrom<string, Moment>(value, transformer), {
      toClassOnly: true,
    }),
    Transform(
      (value: Moment): string => transformTo<Moment, string>(value, transformer),
      { toPlainOnly: true },
    ),
  );
}
