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

import {
  MomentTransformer,
  DateTransformer,
  DatetimeTransformer,
} from '../transformers/moment';
import { TPropertyDecorator } from '../types/decorators';
import { applyDecorators } from '../utils/decorators';

export function DateMomentColumn(
  columnOptions?: ColumnOptions,
): TPropertyDecorator {
  const defaultTransformer: MomentTransformer = new DateTransformer();
  const transformer: ValueTransformer | ValueTransformer[] =
    columnOptions?.transformer ?? defaultTransformer;

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
    Transform((value: Moment): string => defaultTransformer.toPlain(value), {
      toPlainOnly: true,
    }),
  );
}

export function DatetimeMomentColumn(
  columnOptions?: ColumnOptions,
): TPropertyDecorator {
  const defaultTransformer: MomentTransformer = new DatetimeTransformer();
  const transformer: ValueTransformer | ValueTransformer[] =
    columnOptions?.transformer ?? defaultTransformer;

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
    Transform((value: Moment): string => defaultTransformer.toPlain(value), {
      toPlainOnly: true,
    }),
  );
}

export function CreateMomentColumn(
  columnOptions?: ColumnOptions,
): TPropertyDecorator {
  const defaultTransformer: MomentTransformer = new DatetimeTransformer();
  const transformer: ValueTransformer | ValueTransformer[] =
    columnOptions?.transformer ?? defaultTransformer;

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
    Transform((value: Moment): string => defaultTransformer.toPlain(value), {
      toPlainOnly: true,
    }),
  );
}

export function UpdateMomentColumn(
  columnOptions?: ColumnOptions,
): TPropertyDecorator {
  const defaultTransformer: MomentTransformer = new DatetimeTransformer();
  const transformer: ValueTransformer | ValueTransformer[] =
    columnOptions?.transformer ?? defaultTransformer;

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
    Transform((value: Moment): string => defaultTransformer.toPlain(value), {
      toPlainOnly: true,
    }),
  );
}
