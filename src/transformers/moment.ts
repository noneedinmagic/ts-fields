import { ValueTransformer } from 'typeorm';
import { Moment } from 'moment';
import * as moment from 'moment';
import dbFormats from '../formats/db';
import collection from '../formats';
// import { BaseFormatKeyDictionary } from '../types/formats';

// function createMomentTransformer(dbFormat: string, parseFormat?: string): ValueTransformer {
//   return {
//     from: (dbValue: string): Moment => (dbValue ? moment(dbValue, parseFormat) : undefined),
//     to: (value: Moment): string =>
//       value ? moment(value).format(dbFormat) : undefined,
//   };
// }

// export const DatetimeTransformer: ValueTransformer = createMomentTransformer(
//   dbFormats[BaseFormatKeyDictionary.DATETIME],
//   collection.get(BaseFormatKeyDictionary.DATETIME),
// );

// export const DateTransformer: ValueTransformer = createMomentTransformer(
//   dbFormats[BaseFormatKeyDictionary.DATE],
//   collection.get(BaseFormatKeyDictionary.DATE),
// );

// export class BaseMomentTransformer implements ValueTransformer {
//   // public readonly dbFormat: string;
//   // public readonly parseFormat: string;

//   constructor(
//     public readonly dbFormat: string,
//     public readonly parseFormat?: string,
//   ) {
//     // this.dbFormat = options?.dbFormat;
//     // this.parseFormat = options?.parseFormat;
//   }

//   public from(dbValue: string): Moment {
//     return (dbValue ? moment(dbValue, this.parseFormat) : undefined);
//   }

//   public to(value: Moment): string {
//     return value ? moment(value).format(this.dbFormat) : undefined;
//   }
// }

export abstract class MomentTransformer implements ValueTransformer {
  public readonly dbFormat: string;
  protected readonly _collectionKey: string;

  constructor(protected readonly _parseFormat?: string){}

  public get parseFormat(): string {
    return this._parseFormat ?? collection.get(this._collectionKey);
  }

  public from(dbValue: string): Moment {
    return (dbValue ? moment(dbValue, this.parseFormat) : undefined);
  }

  public to(value: Moment): string {
    return value ? moment(value).format(this.dbFormat): undefined;
  }
}

export class DatetimeTransformer extends MomentTransformer {
  // public readonly dbFormat: string = 'YYYY-MM-DD HH:mm:ss';
  public readonly dbFormat: string = dbFormats['DATETIME'];
  protected readonly _collectionKey: string = 'DATETIME';
}

export class DateTransformer extends MomentTransformer {
  // public readonly dbFormat: string = 'YYYY-MM-DD';
  public readonly dbFormat: string = dbFormats['DATE'];
  protected readonly _collectionKey: string = 'DATE';
}
