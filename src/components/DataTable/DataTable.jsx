import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

const DataTable = () => {
    const rows = [
        {
          id: 1143155,
          customer: "Ahmed Sayed",
          build: "9",
          city: 'dammam',
          num: "76767",
          status: "Approved",
        },
        {
          id: 2235235,
          customer: "Ayman Mohammmed",
          build: "3",
          city: 'dammam',
          num: "7697",
          status: "Pending",
        },
        {
          id: 2342353,
          customer: "Mahmoud Hesham",
          build: "10",
          city: 'dammam',
          num: "55767",
          status: "Pending",
        },
        {
          id: 2357741,
          customer: "Mostafa Anwar",
          build: "6",
          city: 'dammam',
          num: "7987",
          status: "Approved",
        },
        {
          id: 2342355,
          customer: "Youssef Ahmed",
          build: "5",
          city: 'dammam',
          num: "1234",
          status: "Pending",
        },
      ];


  return (
    <>
     <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">اسم المالك</TableCell>
            <TableCell className="tableCell">رقم الصك</TableCell>
            <TableCell className="tableCell">رقم العقار</TableCell>
            <TableCell className="tableCell">رقم العميل</TableCell>
            <TableCell className="tableCell">موقع العقار</TableCell>
            <TableCell className="tableCell">حالة الطلب</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.customer}</TableCell>
              <TableCell className="tableCell">{row.id}</TableCell>
              <TableCell className="tableCell">{row.build}</TableCell>
              <TableCell className="tableCell">{row.num}</TableCell>
              <TableCell className="tableCell">{row.city}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row.status}`}>{row.status}</span>
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