import './InputHeader.scss';
import { GridColDef } from "@mui/x-data-grid";

type Props = {
    slug: string,
    columns: GridColDef[],
}
const InputHeader = (props: Props) => {
    return (
        <div className="inputHeader">
            {
                props.columns.filter(item => item.field !== "id" && item.field !== "img" && item.field !== "actions")
                    .map(column => (
                        <div className='item'>
                            <input type={column.type} placeholder={column.field} />
                        </div>
                    ))}
            <button className='button'>Save</button>
        </div>
    )
}
export default InputHeader;