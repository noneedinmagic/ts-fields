import { FormatKey, FormatValue } from '../types/formats';

const DATE: string = 'YYYY-MM-DD';
const TIME: string = 'HH:mm:ss';

const formats: Record<FormatKey, FormatValue> = {
  [FormatKey.DATE]: DATE,
  [FormatKey.TIME]: TIME,
  [FormatKey.DATETIME]: `${DATE} ${TIME}`,
};

export default formats;
