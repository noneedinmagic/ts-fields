import { ValueTransformer } from 'typeorm';
import { Moment } from 'moment';
import * as moment from 'moment';
import * as dbFormats from '../formats/db';
import collection from '../formats';
import { BaseFormatKeyDictionary } from '../types/formats';

function createMomentTransformer(dbFormat: string, parseFormat?: string): ValueTransformer {
  return {
    from: (dbValue: string): Moment => (dbValue ? moment(dbValue, parseFormat) : undefined),
    to: (value: Moment): string =>
      value ? moment(value).format(dbFormat) : undefined,
  };
}

export const DatetimeTransformer: ValueTransformer = createMomentTransformer(
  dbFormats[BaseFormatKeyDictionary.DATETIME],
  collection.get(BaseFormatKeyDictionary.DATETIME),
);

export const DateTransformer: ValueTransformer = createMomentTransformer(
  dbFormats[BaseFormatKeyDictionary.DATE],
  collection.get(BaseFormatKeyDictionary.DATE),
);
