import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import SequelizeUser from '../database/models/SequelizeUser';
import loginMock from './mocks/Login.mock'

chai.use(chaiHttp);

const { expect } = chai;

describe('POST /login test', () => {
  beforeEach(function () { sinon.restore(); });
  it('Should return an error when trying to log without username', async function() {
    const httpRequestBody = loginMock.noMailLoginBody;

    const httpResponse = await chai.request(app).post('/login').send(httpRequestBody);

    expect(httpResponse.status).to.equal(400);
    expect(httpResponse.body).to.deep.equal({ message: 'All fields must be filled' });
  })

  it('Should return an error when when trying to log without password', async function() {
    const httpRequestBody = loginMock.noPassLoginBody;

    const httpResponse = await chai.request(app).post('/login').send(httpRequestBody);

    expect(httpResponse.status).to.equal(400);
    expect(httpResponse.body).to.deep.equal({ message: 'All fields must be filled' });
  })

  it('Should return an error when when trying to log with an invalid email', async function() {
    const httpRequestBody = loginMock.notExistingMailBody;
    sinon.stub(SequelizeUser, 'findOne').resolves(null);

    const httpResponse = await chai.request(app).post('/login').send(httpRequestBody);

    expect(httpResponse.status).to.equal(401);
    expect(httpResponse.body).to.deep.equal({ message: 'Invalid email or password' });
  })

  it('Should return when an error when trying to log with a valid email but invalid password', async function() {
    const httpRequestBody = loginMock.existingMailWithWrongPassBody;
    const mockFindOneReturn = SequelizeUser.build(loginMock.existingUser);
    sinon.stub(SequelizeUser, 'findOne').resolves(mockFindOneReturn);

    const httpResponse = await chai.request(app).post('/login').send(httpRequestBody);

    expect(httpResponse.status).to.equal(401);
    expect(httpResponse.body).to.deep.equal({ message: 'Invalid email or password' });
  })

  it('Should return a token when loging with a valid email and password', async function() {
    const httpRequestBody = loginMock.validLoginBody;
    const mockFindOneReturn = SequelizeUser.build(loginMock.existingUser);
    sinon.stub(SequelizeUser, 'findOne').resolves(mockFindOneReturn);
    sinon.stub(bcrypt, 'compareSync').resolves(true);

    const httpResponse = await chai.request(app).post('/login').send(httpRequestBody);

    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.have.key('token');
  })
})