import { ValueTransformer } from 'typeorm';
import { Moment } from 'moment';
import * as moment from 'moment';
import dbFormats from '../formats/db';
import collection from '../formats';

export abstract class MomentTransformer implements ValueTransformer {
  public readonly dbFormat: string;
  protected readonly _collectionKey: string;

  constructor(protected readonly _parseFormat?: string) {}

  public get parseFormat(): string {
    return this._parseFormat ?? collection.get(this._collectionKey);
  }

  public from(dbValue: string): Moment {
    return dbValue ? moment(dbValue, this.dbFormat) : undefined;
  }

  public to(value: Moment): string {
    return value ? moment(value).format(this.dbFormat) : undefined;
  }

  public fromPlain(value: string): Moment {
    return value ? moment(value, this.parseFormat) : undefined;
  }

  public toPlain(value: Moment): string {
    return value ? moment(value).format(this.parseFormat) : undefined;
  }
}

export class DatetimeTransformer extends MomentTransformer {
  public readonly dbFormat: string = dbFormats['DATETIME'];
  protected readonly _collectionKey: string = 'DATETIME';
}

export class DateTransformer extends MomentTransformer {
  public readonly dbFormat: string = dbFormats['DATE'];
  protected readonly _collectionKey: string = 'DATE';
}
