import { RESTART_ON_REMOUNT, DAEMON, ONCE_TILL_UNMOUNT } from '../constants';

describe('Tests for constants', () => {
  it('should match the constants', () => {
    const restartOnRemount = '@@saga-injector/restart-on-remount';
    const daemon = '@@saga-injector/daemon';
    const onceTillUnmount = '@@saga-injector/once-till-unmount';
    expect(RESTART_ON_REMOUNT).toEqual(restartOnRemount);
    expect(DAEMON).toEqual(daemon);
    expect(ONCE_TILL_UNMOUNT).toEqual(onceTillUnmount);
  });
});
