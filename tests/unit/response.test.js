const { sendSuccess, sendError } = require('../../src/utils/response');

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('Response Utils', () => {
  it('sendSuccess should return 200 with success payload', () => {
    const res = mockRes();
    sendSuccess(res, { message: 'OK', data: { id: 1 } });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true, message: 'OK', data: { id: 1 } });
  });

  it('sendError should return 500 by default', () => {
    const res = mockRes();
    sendError(res, { message: 'Error' });
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ success: false, message: 'Error' });
  });

  it('sendSuccess without data should not include data key', () => {
    const res = mockRes();
    sendSuccess(res, { message: 'Done' });
    const call = res.json.mock.calls[0][0];
    expect(call).not.toHaveProperty('data');
  });
});
