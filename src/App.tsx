import { useState, useMemo, useCallback } from 'react'
import { AllCommunityModule, ModuleRegistry, InfiniteRowModelModule, ValidationModule, ClientSideRowModelModule, ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { GridReadyEvent, IGetRowsParams } from 'ag-grid-community/types/events';
import { formatFullName, formatDSR } from 'src/helpers';

export type IRow = {
	id: string;
	first_name: string;
	last_name: string;
	email: string;
	city: string;
	registered_at: string;
	full_name: string;
	dsr: string;
}

ModuleRegistry.registerModules([
	ClientSideRowModelModule,
  InfiniteRowModelModule,
	ValidationModule,
	AllCommunityModule
]);


function App({ dataSource })  {
	// Column Definitions: Defines & controls grid columns.
	const [colDefs, _] = useState<ColDef<IRow>[]>([
		{ field: 'id', editable: true, filter: true },
		{ field: 'first_name', headerName: 'First Name', editable: true },
		{ field: 'last_name', headerName: 'Last Name', editable: true },
		{ field: 'email', headerName: 'Email', editable: true },
		{ field: 'city' },
		{ field: 'registered_at', headerName: 'Registered Date', editable: true, filter: 'agDateColumnFilter' },
		{ field: 'full_name', headerName: 'Full Name', valueFormatter: formatFullName },
		{ field: 'dsr', headerName: 'DSR', valueFormatter: formatDSR },
	]);

	const onGridReady = useCallback((params: GridReadyEvent) => {
		const tableDataSource = {
			rowCount: 500,
			getRows: async function(rowParams: IGetRowsParams) {
				await dataSource(rowParams)
			}
		};
		params.api.setGridOption('datasource', tableDataSource);
	}, []);


	const defaultColDef = useMemo(() => {
		return {
			flex: 1
		};
	}, []);

	// Container: Defines the grid's theme & dimensions.
	return (
		<>
			<div style={{ width: "100%", height: '100vh' }}>
				<AgGridReact
					columnDefs={colDefs as any}
					defaultColDef={defaultColDef}
					rowBuffer={0}
					cacheBlockSize={100}
          cacheOverflowSize={2}
          maxConcurrentDatasourceRequests={1}
          infiniteInitialRowCount={100}
          maxBlocksInCache={10}
					rowModelType={"infinite"}
					onGridReady={onGridReady}
				/>
			</div>
		</>
	);
}

export default App
