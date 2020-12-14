import { FormatKey, FormatValue, BaseFormatKeyDictionary } from '../types/formats';

const DATE: string = 'YYYY-MM-DD';
const TIME: string = 'HH:mm:ss';

const formats: Record<FormatKey, FormatValue> = {
  [BaseFormatKeyDictionary.DATE]: DATE,
  [BaseFormatKeyDictionary.TIME]: TIME,
  [BaseFormatKeyDictionary.DATETIME]: `${DATE} ${TIME}`,
};

export default formats;
