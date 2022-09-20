import {checkTextIsEmpty} from '../src/helpers/utils';
import {
  getData,
  isFavoriteStorage,
  setFavorite,
  storeData,
} from '../src/services/storage';

describe('Components test', () => {
  /* Utils */
  test('Check if text is empty', () => {
    expect(checkTextIsEmpty('')).toBe(true);
  });

  test('Check if text is not empty', () => {
    expect(checkTextIsEmpty('123')).toBe(false);
  });

  /* Async Storage */
  test('Check set favorite', async () => {
    setFavorite('1', true);

    const resp = await isFavoriteStorage('1');

    expect(resp).toBe(true);
  });

  test('Check not favorite', async () => {
    setFavorite('2', false);

    const resp = await isFavoriteStorage('2');

    expect(resp).toBe(false);
  });

  test('Update favorite', async () => {
    setFavorite('3', true);
    setFavorite('3', false);

    const resp = await isFavoriteStorage('3');

    expect(resp).toBe(false);
  });

  test('Save any data', async () => {
    storeData('key', 'value');

    const resp = await getData('key');

    expect(resp).toBe('value');
  });

  test('Get unexistent key', async () => {
    const resp = await getData('randomKey');

    expect(resp).toBe('');
  });
});
