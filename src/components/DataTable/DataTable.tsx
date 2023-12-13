import { DataGrid, GridColDef, GridRenderCellParams, GridToolbar, GridTreeNodeWithRender} from "@mui/x-data-grid";
import './DataTable.scss';

type Props = {
    columns: GridColDef[],
    rows: object[],
    getRowId: (row: { id: any }) => any;
    onRowDelete?: (id: any, name: any,businessName: any) => void; // Make onRowDelete optional
    onRowEdit?: (params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) => void; // Make onRowEdit optional
};
const DataTable = (props:Props) => {
    return (
        <div className="dataTable">
            <DataGrid
                className="dataGrid"
                rows={props.rows}
                columns={props.columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                        },
                    },
                }}
                slots={{toolbar:GridToolbar}}
                slotProps={{
                    toolbar:{
                        showQuickFilter:true,
                        quickFilterProps:{debounceMs:500},
                    }
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
                disableColumnFilter
                disableColumnSelector
                disableDensitySelector
            />
        </div>
    )
}
export default DataTable;