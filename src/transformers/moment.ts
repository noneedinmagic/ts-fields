import { ValueTransformer } from 'typeorm';
import { Moment } from 'moment';
import * as moment from 'moment';
import * as formats from '../formats/db';
import { FormatKey } from '../types/formats';

function createMomentTransformer(format: string): ValueTransformer {
  return {
    from: (dbValue: string): Moment => (dbValue ? moment(dbValue) : undefined),
    to: (value: Moment): string =>
      value ? moment(value).format(format) : undefined,
  };
}

export const DatetimeTransformer: ValueTransformer = createMomentTransformer(
  formats[FormatKey.DATETIME],
);

export const DateTransformer: ValueTransformer = createMomentTransformer(
  formats[FormatKey.DATE],
);
