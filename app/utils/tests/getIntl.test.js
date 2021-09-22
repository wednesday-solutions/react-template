import { createIntl, createIntlCache } from 'react-intl';
import translations from '@app/translations/en.json';
import getIntl from '../getIntl';

describe('Tests for getIntl method', () => {
  it('should return the output of createIntl() method with appropriate values', () => {
    const expectedResult = createIntl(
      {
        locale: 'en',
        messages: translations
      },
      createIntlCache()
    );
    expect(JSON.stringify(getIntl())).toStrictEqual(JSON.stringify(expectedResult));
  });
});
