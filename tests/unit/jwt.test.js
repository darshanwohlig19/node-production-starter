process.env.JWT_ACCESS_SECRET = 'test_access_secret';
process.env.JWT_REFRESH_SECRET = 'test_refresh_secret';

const { signAccessToken, signRefreshToken, verifyAccessToken, verifyRefreshToken } = require('../../src/utils/jwt');

describe('JWT Utils', () => {
  const payload = { id: 'user123', role: 'user' };

  it('should sign and verify access token', () => {
    const token = signAccessToken(payload);
    const decoded = verifyAccessToken(token);
    expect(decoded.id).toBe(payload.id);
    expect(decoded.role).toBe(payload.role);
  });

  it('should sign and verify refresh token', () => {
    const token = signRefreshToken(payload);
    const decoded = verifyRefreshToken(token);
    expect(decoded.id).toBe(payload.id);
  });

  it('should throw on invalid token', () => {
    expect(() => verifyAccessToken('invalid.token.here')).toThrow();
  });
});
