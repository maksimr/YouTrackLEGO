import {expect} from 'chai';
import {rootElement} from '../renderer';

describe('renderer', function() {
  it('should create rootElement', function() {
    expect(typeof rootElement).to.be.eql('object');
  });
});