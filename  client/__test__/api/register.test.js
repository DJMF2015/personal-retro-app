import handler from '../../pages/api/users/register';
import DatabaseService from '../../helpers/db-util';
import Users from '../../models/users';

jest.mock('../../helpers/db-util', () => ({
  connectToDatabase: jest.fn(),
}));

jest.mock('../../models/users', () => {
  const save = jest.fn();
  const User = jest.fn(() => ({ save }));
  return Object.assign(User, { save });
});

jest.setTimeout(20000);

describe('Register a User', () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      method: 'POST',
      body: {
        name: 'John McClane',
        email: 'abcd@and.digital',
        password: 'abc567',
      },
    };
    res = {
      status: jest.fn(() => res),
      send: jest.fn(),
    };
  });

  it('should return 422 if method is not POST', async () => {
    req.method = 'GET';

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.send).toHaveBeenCalledTimes(1);
  });

  it('should return 200 when user enters all correct details', async () => {
    await handler(req, res);

    expect(DatabaseService.connectToDatabase).toHaveBeenCalled();
    expect(Users).toHaveBeenCalledTimes(1);
    expect(Users.save).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledTimes(1);
  });

  it('should return status 422 if field is empty', async () => {
    req.body.email = '';

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.send).toHaveBeenCalledTimes(1);
  });
});
