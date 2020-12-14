import { TPropertyDecorator } from '../types';
import { applyDecorators } from '../utils';
import formats from '../formats';
import { BaseFormatKeyDictionary } from '../types';
import { Transform, Type } from 'class-transformer';
import { Moment } from 'moment';
import * as moment from 'moment';

export function MomentField(format: string): TPropertyDecorator {
  return applyDecorators(
    Type(() => moment),
    Transform((value: string): Moment => (value ? moment(value) : undefined), {
      toClassOnly: true,
    }),
    Transform(
      (value: Moment): string =>
        value ? moment(value).format(format) : undefined,
      { toPlainOnly: true },
    ),
  );
}

export function DateMomentField(): TPropertyDecorator {
  return MomentField(formats.get(BaseFormatKeyDictionary.DATE));
}

export function DatetimeMomentField(): TPropertyDecorator {
  return MomentField(formats.get(BaseFormatKeyDictionary.DATETIME));
}
