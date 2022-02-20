import { HttpResponseInterceptor } from '@src/common/interceptors/http-response.interceptor';

describe('HttpResponseInterceptor', () => {
  it('should be defined', () => {
    expect(new HttpResponseInterceptor()).toBeDefined();
  });
});
