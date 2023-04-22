// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'

// ** Types Imports
import { ThemeColor } from 'src/@core/layouts/types'
import { ChangeEvent, FC, useState } from 'react'
import { TablePagination } from '@mui/material'
import { ApplicationsData } from 'src/@core/utils/shared-types'

interface StatusObj {
  [key: string]: {
    color: ThemeColor
  }
}

const statusObj: StatusObj = {
  environment: { color: 'primary' },
  appName: { color: 'secondary' },
  businessUnit: { color: 'info' },
}

interface AppsData {
  appRows: ApplicationsData[]
}

const DashboardTable: FC<AppsData> = (props) => {
  const { appRows } = props;
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }
 
  return (
    <Card>
      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              <TableCell>Resource/Service</TableCell>
              <TableCell>Consumed</TableCell>
              <TableCell>Cost</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Tags</TableCell>
              <TableCell>InstanceId</TableCell>
            </TableRow>
          </TableHead>
         <TableBody>
            {appRows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: ApplicationsData) => (
              <TableRow hover key={row.id} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{row.ResourceGroup}</Typography>
                    <Typography variant='caption'>{row.ServiceName}</Typography>
                  </Box>
                </TableCell>
                <TableCell>{row.ConsumedQuantity}</TableCell>
                <TableCell>{row.Cost}</TableCell>
                <TableCell>{row.Date}</TableCell>
                <TableCell>
                  <Chip
                    label={row.Tags?.environment}
                    color={statusObj[row.Tags]?.color}
                    sx={{
                      height: 24,
                      fontSize: '0.75rem',
                      textTransform: 'capitalize',
                      '& .MuiChip-label': { fontWeight: 500 }
                    }}
                  />
                </TableCell>
                <TableCell>{row.InstanceId}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={appRows?.length ?? 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  )
}

export default DashboardTable
