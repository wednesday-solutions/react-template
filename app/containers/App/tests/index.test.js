import { renderWithIntl } from '@utils/testUtils';
import App from '../index';

describe('<App /> container tests', () => {
  it('should render and match the snapshot', () => {
    const { container } = renderWithIntl(App);
    expect(container).toMatchSnapshot();
  });
});
