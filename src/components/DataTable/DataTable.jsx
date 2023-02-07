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
            <TableCell className="tableCell text-center">اسم المالك</TableCell>
            <TableCell className="tableCell text-center">رقم الصك</TableCell>
            <TableCell className="tableCell text-center">رقم العقار</TableCell>
            <TableCell className="tableCell text-center">التاريخ</TableCell>
            <TableCell className="tableCell text-center">حالة الطلب</TableCell>
            <TableCell className="tableCell text-center">خيارات</TableCell>
            


          </TableRow>
        </TableHead>
        <TableBody>
          {tableInfo?.map((row) => (
              <TableRow key={row.id}>
              <TableCell className="tableCell text-center">{row.owner.username}</TableCell>
              <TableCell className="tableCell text-center">{row.installment_number}</TableCell>
              <TableCell className="tableCell text-center">{row.building_number}</TableCell>
              <TableCell className="tableCell text-center">{row.created.slice(0,10).split('-').join('/')}</TableCell>
              <TableCell className="tableCell text-center">
                <div className="d-flex justify-content-center align-items-center">
                <span className={`status ${row.status == 0? 'Pending':'Approved'}`}></span><span>{row.status == 0 ? "معلق": 'مغلق'}</span>
                </div>
              </TableCell>
             
              <TableCell className="tableCell text-center">
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
            display:'flex',
            justifyContent: 'center'
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