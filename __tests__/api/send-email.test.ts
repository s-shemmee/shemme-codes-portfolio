const sendMock = jest.fn();

jest.mock('resend', () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: { send: sendMock },
  })),
}));

beforeEach(() => {
  sendMock.mockReset();
  process.env.RESEND_API_KEY = 're_test';
  process.env.RESEND_FROM_EMAIL = 'from@example.com';
  process.env.RECEIVING_EMAIL = 'to@example.com';
});
