import 'url-search-params-polyfill';

// ie8, ios < 10 does not support object.values
if (!Object.values) {
  Object.values = (o: Record<string, string>) => Object.keys(o).map(k => o[k]);
}
