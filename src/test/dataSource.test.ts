import { vi } from 'vitest';
import { dataSource, createRandomUser } from 'src/dataSource';

const fakeDb = Array.from({ length: 500 }, createRandomUser);

describe('Data Source Functionality', () => {
	test('fetches rows correctly', async () => {

		const mockSuccessCallback = vi.fn();
		const rowParams = {
			startRow: 0,
			endRow: 100,
			successCallback: mockSuccessCallback,
		} as any;

		await dataSource(fakeDb, rowParams);

		expect(mockSuccessCallback).toHaveBeenCalled();
		const [rowsThisPage, totalRows] = mockSuccessCallback.mock.calls[0];
		expect(rowsThisPage.length).toBe(100);
		expect(totalRows).toBe(500);
	});
});
