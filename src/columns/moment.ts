import { Transform, Type } from 'class-transformer';
import { Moment } from 'moment';
import * as moment from 'moment';
import {
  ColumnOptions,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import formats from '../formats/collection';
import {
  DateTransformer,
  DatetimeTransformer,
} from '../transformers/moment';
import { TPropertyDecorator } from '../types/decorators';
import { FormatKey } from '../types/formats';
import { applyDecorators } from '../utils/decorators';

export function DateMomentColumn(
  columnOptions?: ColumnOptions,
): TPropertyDecorator {
  return applyDecorators(
    Column({
      type: 'date',
      transformer: DateTransformer,

      ...columnOptions,
    }),
    Type(() => moment),
    Transform((value: string): Moment => (value ? moment(value) : undefined), {
      toClassOnly: true,
    }),
    Transform(
      (value: Moment): string =>
        value ? moment(value).format(formats.get(FormatKey.DATE)) : undefined,
      { toPlainOnly: true },
    ),
  );
}

export function DatetimeMomentColumn(
  columnOptions?: ColumnOptions,
): TPropertyDecorator {
  return applyDecorators(
    Column({
      type: 'datetime',
      transformer: DatetimeTransformer,

      ...columnOptions,
    }),
    Type(() => moment),
    Transform((value: string): Moment => (value ? moment(value) : undefined), {
      toClassOnly: true,
    }),
    Transform(
      (value: Moment): string =>
        value ? moment(value).format(formats.get(FormatKey.DATETIME)) : undefined,
      { toPlainOnly: true },
    ),
  );
}

export function CreateMomentColumn(
  columnOptions?: ColumnOptions,
): TPropertyDecorator {
  return applyDecorators(
    CreateDateColumn({
      name: 'created_at',
      type: 'datetime',
      precision: null,
      default: () => 'CURRENT_TIMESTAMP',
      transformer: DatetimeTransformer,

      ...columnOptions,
    }),
    Type(() => moment),
    Transform((value: string): Moment => (value ? moment(value) : undefined), {
      toClassOnly: true,
    }),
    Transform(
      (value: Moment): string =>
        value ? moment(value).format(formats.get(FormatKey.DATETIME)) : undefined,
      { toPlainOnly: true },
    ),
  );
}

export function UpdateMomentColumn(
  columnOptions?: ColumnOptions,
): TPropertyDecorator {
  return applyDecorators(
    UpdateDateColumn({
      name: 'updated_at',
      type: 'datetime',
      precision: null,
      default: () => 'CURRENT_TIMESTAMP',
      onUpdate: 'CURRENT_TIMESTAMP',
      transformer: DatetimeTransformer,

      ...columnOptions,
    }),
    Type(() => moment),
    Transform((value: string): Moment => (value ? moment(value) : undefined), {
      toClassOnly: true,
    }),
    Transform(
      (value: Moment): string =>
        value ? moment(value).format(formats.get(FormatKey.DATETIME)) : undefined,
      { toPlainOnly: true },
    ),
  );
}
