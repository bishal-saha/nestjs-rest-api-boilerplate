import { TimeoutInterceptor } from '@src/common/interceptors/timeout.interceptor';

describe('TimeoutInterceptor', () => {
  it('should be defined', () => {
    expect(new TimeoutInterceptor()).toBeDefined();
  });
});
