import { IconButton, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ReqContext } from "../../contexts/ReqContext";
import MoreVertIcon from '@mui/icons-material/MoreVert';


const DataTable = ({tableInfo}) => {
  const {tableList, setTableList} = useContext(ReqContext)
    
  const handleDelete = (id) => {
    const newList = tableList.filter((item)=>{
      return item.id !== id;
    });
    setTableList(newList);
  };
  
  
const ITEM_HEIGHT = 48;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
     <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">اسم المالك</TableCell>
            <TableCell className="tableCell">المدينة</TableCell>
            <TableCell className="tableCell">المنطقة</TableCell>
            <TableCell className="tableCell">الحي</TableCell>
            <TableCell className="tableCell">موقع العقار</TableCell>
            <TableCell className="tableCell">حالة الطلب</TableCell>
            <TableCell className="tableCell text-center">تفاصيل</TableCell>
            


          </TableRow>
        </TableHead>
        <TableBody>
          {tableInfo?.map((row) => (
              <TableRow key={row.id}>
              <TableCell className="tableCell">{row.owner.username}</TableCell>
              <TableCell className="tableCell">{row.city}</TableCell>
              <TableCell className="tableCell">{row.region}</TableCell>
              <TableCell className="tableCell">{row.neighborhood}</TableCell>
              <TableCell className="tableCell">{row.city}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row.status == 0? 'Pending':'Approved'}`}>{row.status == 0 ? "معلق": 'مغلق'}</span>
              </TableCell>
              {/* <TableCell className="tableCell text-center"><button className="btn btn-info"><Link to={`/list/details/${row.id}`} style={{color:'white', textDecoration:'none'}}>Details</Link></button></TableCell>
              <TableCell className="tableCell text-center"><button className="btn btn-warning"><Link to={`/list/edit/${row.id}`} style={{color:'white', textDecoration:'none'}}>Edit</Link></button></TableCell>
              <TableCell className="tableCell text-center"><button className="btn btn-danger" onClick={()=>{handleDelete(row.id)}}>Delete</button></TableCell> */}

              <TableCell className="tableCell">
              <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '10ch',
            textAlign:'center'
          },
        }}
      >
          <MenuItem onClick={handleClose}>
          <Link to={`/list/details/${row.id}`} style={{color:'gray', textDecoration:'none'}}>تفاصيل </Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
          <Link to={`/list/edit/${row.id}`} style={{color:'gray', textDecoration:'none'}}>تعديل</Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
          <div onClick={()=>{handleDelete(row.id)}} style={{color:'gray', textDecoration:'none'}}>حذف</div>
          </MenuItem>
      </Menu>
    </div>
              </TableCell>

            </TableRow>
            
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  )
}

export default DataTable