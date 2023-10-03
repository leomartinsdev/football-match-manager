import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import SequelizeMatch from '../database/models/SequelizeMatch';
import matchesMock from './mocks/Match.mock';
import loginMock from './mocks/Login.mock';
import jwt from '../utils/jwt.util';

chai.use(chaiHttp);

const { expect } = chai;

describe('GET /matches test', () => {
  beforeEach(function () { sinon.restore(); });
  it('Should return all matches', async function() {
    sinon.stub(SequelizeMatch, 'findAll').resolves(matchesMock.matches as any);

    const { status, body } = await chai.request(app).get('/matches');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(matchesMock.matches);
  })

  it('Should return all matches that are in progress', async function() {
    sinon.stub(SequelizeMatch, 'findAll').resolves(matchesMock.inProgressMatches as any);

    const { status, body } = await chai.request(app).get('/matches?inProgress=true');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(matchesMock.inProgressMatches);
  })

  it('Should return all matches that are finished', async function() {
    sinon.stub(SequelizeMatch, 'findAll').resolves(matchesMock.finishedMatches as any);

    const { status, body } = await chai.request(app).get('/matches?inProgress=false');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(matchesMock.finishedMatches);
  })
})

describe('PATCH /matches/:id/finish test', () => {
  beforeEach(function () { sinon.restore(); });

  it('Should return "Token not found" if tries to update match without a token', async function() {
    sinon.stub(SequelizeMatch, 'update').resolves([1] as any);
    sinon.stub(SequelizeMatch, 'findByPk').resolves(matchesMock.match as any);

    const { status, body } = await chai.request(app).patch('/matches/1/finish').send({ inProgress: false });

    expect(status).to.be.equal(401);
    expect(body.message).to.deep.equal('Token not found')
  })

  it('Should update match to finished', async function() {
    sinon.stub(SequelizeMatch, 'update').resolves([1] as any);
    sinon.stub(SequelizeMatch, 'findByPk').resolves(matchesMock.match as any);

    const token = jwt.sign({id: 1, role: 'admin'})

    const { status, body } = await chai.request(app).patch('/matches/1/finish').set('Authorization', `Bearer ${token}`) 

    expect(status).to.be.equal(200);
    expect(body.message).to.deep.equal('Finished')
  })
})