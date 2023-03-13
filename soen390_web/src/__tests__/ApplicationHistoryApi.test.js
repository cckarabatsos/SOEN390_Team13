import { getAllApplication, handleWithdrawApplication } from '../api/ApplicationHistoryApi';
import axios from 'axios';
import api from "../config.json";

jest.mock('axios');

describe('ApplicationHistoryApi', () => {
  test('getAllApplication returns application history', async () => {
    // mock API call
   
    // call function
    const result = await getAllApplication('1');

   
    
  });

  test('handleWithdrawApplication withdraws application', async () => {
    // mock API call
    axios.post.mockResolvedValueOnce({ data: true });

    // call function
    const result = await handleWithdrawApplication('1');

    // verify result
    expect(result).toBe(true);
  });
});
test('getAllApplication returns false when an error occurs', async () => {
  // mock API call
  axios.get.mockRejectedValueOnce(new Error('Error'));

  // call function
  const result = await getAllApplication('1');

  // verify result
  expect(result).toBe(false);
});

test('handleWithdrawApplication makes a POST request to the correct API endpoint', async () => {
  // mock API call
  axios.post.mockResolvedValueOnce({ data: true });

  // call function
  await handleWithdrawApplication('1');

  // verify API call
  expect(axios.post).toHaveBeenCalledWith(api.BACKEND_API + '/application/remove/5?postingID=1');
});

test('getAllApplication returns an empty array when the API returns an empty response', async () => {
  // mock API call
  axios.get.mockResolvedValueOnce({ data: [] });

  // call function
  const result = await getAllApplication('1');

  // verify result
  expect(result).toEqual([]);
});

test('handleWithdrawApplication returns false when the API returns a false response', async () => {
  // mock API call
  axios.post.mockResolvedValueOnce({ data: false });

  // call function
  const result = await handleWithdrawApplication('1');

  // verify result
  expect(result).toBe(false);
});
