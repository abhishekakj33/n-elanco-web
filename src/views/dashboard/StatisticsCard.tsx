// ** React Imports
import { FC, MouseEvent, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

// ** Icons Imports
import DotsVertical from 'mdi-material-ui/DotsVertical'

// ** Types
import { StatsDataType } from 'src/@core/utils/shared-types'

const ITEM_HEIGHT = 80;

interface AppsData {
  statsData: StatsDataType[],
  appList: string[],
  onSelectAppName: (index: number) => void
}

const renderStats = (statsData: StatsDataType[]) => {
  return statsData.map((item: StatsDataType, index: number) => (
    <Grid item xs={12} sm={3} key={index}>
      <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          variant='rounded'
          sx={{
            mr: 3,
            width: 44,
            height: 44,
            boxShadow: 3,
            color: 'common.white',
            backgroundColor: `${item.color}.main`
          }}
        >
          {item.icon}
        </Avatar>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='caption'>{item.title}</Typography>
          <Typography variant='h6'>{item.stats}</Typography>
        </Box>
      </Box>
    </Grid>
  ))
}

const StatisticsCard: FC<AppsData> = (props) => {
  const { statsData, appList, onSelectAppName } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuItemClick = (
    event: MouseEvent<HTMLElement>,
    index: number,
  ) => {
    setSelectedIndex(index);
    onSelectAppName(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Card>
      <CardHeader
        title='Statistics Card'
        subheader={
          <Typography variant='body2'>
            <Box component='span' sx={{ fontWeight: 600, color: 'text.primary' }}>
              Update stats and data 🚀
            </Box>{' '}
            by changing selection by menu on top right hand side.
          </Typography>
        }
        action={
          <>
          <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }} onClick={handleClick}>
            <DotsVertical />
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
              width: '30ch',
            },
          }}
        >
          {appList.map((option, index) => (
            <MenuItem key={option} selected={index === selectedIndex} onClick={(event) => handleMenuItemClick(event, index)}>
              {option}
            </MenuItem>
          ))}
        </Menu>
        </>
        }
        titleTypographyProps={{
          sx: {
            mb: 2.5,
            lineHeight: '2rem !important',
            letterSpacing: '0.15px !important'
          }
        }}
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
        <Grid container spacing={[5, 0]}>
          {renderStats(statsData)}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default StatisticsCard
