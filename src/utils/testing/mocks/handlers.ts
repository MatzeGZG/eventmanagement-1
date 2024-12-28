import { rest } from 'msw';

export const handlers = [
  // Mock Supabase auth endpoints
  rest.post('*/auth/v1/token', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        access_token: 'mock-token',
        user: {
          id: '1',
          email: 'test@example.com'
        }
      })
    );
  }),

  // Mock PredictHQ events endpoint
  rest.get('*/events', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        results: [
          {
            id: '1',
            title: 'Test Event',
            start: new Date().toISOString(),
            location: [0, 0]
          }
        ]
      })
    );
  })
];