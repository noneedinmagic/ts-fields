import { FormatCollection } from './collection';
import defaultFormats from './default';

const collection: FormatCollection = new FormatCollection();

for (const [key, value] of Object.entries(defaultFormats)) {
  collection.set(key, value);
}

export default collection;
