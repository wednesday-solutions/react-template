import { createBrowserHistory } from 'history';
export const baseUrl = () => (process.env.NODE_ENV === 'production' ? '/react-template' : '/');
const history = createBrowserHistory({ basename: baseUrl() });
export default history;
