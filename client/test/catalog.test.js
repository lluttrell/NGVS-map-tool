import '../src/catalog'
import Catalog from '../src/catalog';
import TapClient from '../src/tap-client';

jest.mock('../src/tap-client');


describe('test init', () => {
  const mockQueryFunction = jest.fn();
  mockQueryFunction.mockReturnValue('Official_name, Old_name, principleRA');
  TapClient.query = mockQueryFunction;
  let testCatalog = new Catalog('cfht.ngvsCatalog');
  testCatalog.init();

  test('check columnNames', () => {
    expect(testCatalog.principleColumnNames[0]).toBe('Official_name')
  })

  test('check arrayLength', () => {
    expect(testCatalog.principleColumnNames.length).toBe(3)
  })
})