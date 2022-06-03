import {
  Card,
  CardContent,
  Grid,
  Typography,
  makeStyles,
  CardHeader,
  IconButton,
  Divider,
  Tooltip,
  useMediaQuery,
  useTheme,
  Box,
  Tabs,
  Tab,
} from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'
// import { pendingStatusDetails } from './DataConstant'
import {
  myFirstTableCols,
  mySecondTableCols,
  pendingTaskDetails,
  userTaskDashboard,
} from './DataConstant1'
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent'
import { ProgressBar } from 'primereact/progressbar'
import { admins } from '../../util/Constants'
import {
  set_mygrouppendingAction,
  set_mygroupunassignAction,
  set_myinprogressAction,
  set_mypendingAction,
  set_range_pendingAction,
  set_range_grouppendingAction,
  reset_all,
} from '../../redux/Actions/PendingAction/Action'
import { getStatusCamundaAPI, getStatusEventCamundaAPI } from '../../api/Fetch'
import { ServiceResponse } from '../../pages/Login/Messages'
import { TabView, TabPanel } from 'primereact/tabview'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'

const useStyles = makeStyles((theme) => ({
  card: {
    margin: theme.spacing(2),
  },
  spacing: {
    margin: theme.spacing(2),
  },
  header: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
  },
  wide: {
    [theme.breakpoints.up(900)]: {
      maxWidth: 600,
      fontSize: '14px',
    },
    [theme.breakpoints.down(900)]: {
      maxWidth: 400,
      fontSize: '14px',
    },
    [theme.breakpoints.down(750)]: {
      maxWidth: 400,
      fontSize: '14px',
    },
    [theme.breakpoints.down(500)]: {
      width: 300,
      fontSize: '12px',
    },
    [theme.breakpoints.down(400)]: {
      width: 200,
      fontSize: '12px',
    },
    [theme.breakpoints.down(300)]: {
      width: 200,
      fontSize: '12px',
    },
  },
  color90: {
    color: theme.palette.primary.main,
  },
  color80: {
    color: '#FFBF00',
  },
  color60: {
    color: 'red',
  },
  tool: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.main,
  },
  tabHead: {
    color: theme.palette.primary.main,
    // fontWeight: 'bold',
    marginLeft: theme.spacing(2),
  },
  progressBar: {
    backgroundColor: 'white',
    border: '0.5px solid black',
    height: '10px',
    width: '100%',
  },
}))

function Dashboard1(props: any) {
  const [newMap, setNewMap] = useState<Array<any>>([])
  const theme = useTheme()
  const active = useMediaQuery(theme.breakpoints.down(700))
  const [isProgressLoader, setIsProgressLoader] = useState(false)
  const [tabValue, setTabValue] = useState(0)
  const [table1Data, setTable1Data] = useState<any>([])
  const [table2Data, setTable2Data] = useState<any>([])
  // let newMap1: Array<any> = []

  const {
    mypendingAction,
    myinprogressTasks,
    mygroupPendingAction,
    mygroupUnassignTasks,
    eventPendingAction,
    eventGroupPendingAction,
    set_mypendingAction,
    set_myinprogressAction,
    set_mygrouppendingAction,
    set_mygroupunassignAction,
    set_range_pendingAction,
    set_range_grouppendingAction,
    reset_all,
    userDetail,
  } = props
  const classes = useStyles()

  useEffect(() => {
    setIsProgressLoader(true)
    let pendingTasks: Array<any> = []
    let inprogressTasks: Array<any> = []
    let mygroupPendingTasks: Array<any> = []
    let mygroupUnassignTasks: Array<any> = []
    let rangePendingTasks: Array<any> = []
    let rangeGroupPendingTasks: Array<any> = []
    setNewMap([...userTaskDashboard])
    getStatusCamundaAPI &&
      getStatusCamundaAPI()
        .then((res) => {
          const pendingStatusDetails = res.data

          setIsProgressLoader(false)
          if (pendingStatusDetails && pendingStatusDetails.status) {
            pendingTasks =
              pendingStatusDetails &&
              pendingStatusDetails.status &&
              pendingStatusDetails.status.filter(
                (item: any) => item.details.toLowerCase() === 'mypendingtasks'
              )

            inprogressTasks =
              pendingStatusDetails &&
              pendingStatusDetails.status &&
              pendingStatusDetails.status.filter(
                (item: any) => item.details.toLowerCase() === 'myrequestedtasks'
              )
            mygroupPendingTasks =
              pendingStatusDetails &&
              pendingStatusDetails.status &&
              pendingStatusDetails.status.filter(
                (item: any) =>
                  item.details.toLowerCase() === 'mygrouppendingtasks'
              )
            mygroupUnassignTasks =
              pendingStatusDetails &&
              pendingStatusDetails.status &&
              pendingStatusDetails.status.filter(
                (item: any) =>
                  item.details.toLowerCase() === 'mygroupunnassignedtasks'
              )

            // console.log(pendingTasks)
            // console.log(inprogressTasks)
            // console.log(mygroupPendingTasks)
            // console.log(mygroupUnassignTasks)
            set_mypendingAction(pendingTasks)
            set_myinprogressAction(inprogressTasks)
            set_mygrouppendingAction(mygroupPendingTasks)
            set_mygroupunassignAction(mygroupUnassignTasks)
          }
        })
        .catch((error) => {
          setIsProgressLoader(false)
          set_mypendingAction([])
          set_myinprogressAction([])
          set_mygrouppendingAction([])
          set_mygroupunassignAction([])
        })
    // }, [pendingStatusDetails])

    getStatusEventCamundaAPI &&
      getStatusEventCamundaAPI()
        .then((res) => {
          const pendingTaskDetails = res.data

          setIsProgressLoader(false)

          if (pendingTaskDetails && pendingTaskDetails.status) {
            rangePendingTasks =
              pendingTaskDetails &&
              pendingTaskDetails.status &&
              pendingTaskDetails.status.filter(
                (item: any) => item.details.toLowerCase() === 'mypendingtasks'
              )
            rangeGroupPendingTasks =
              pendingTaskDetails &&
              pendingTaskDetails.status &&
              pendingTaskDetails.status.filter(
                (item: any) =>
                  item.details.toLowerCase() === 'mygrouppendingtasks'
              )
            set_range_pendingAction(rangePendingTasks)
            // set_myinprogressAction(inprogressTasks)
            set_range_grouppendingAction(rangeGroupPendingTasks)
            //set_mygroupunassignAction(mygroupUnassignTasks)
          }
        })
        .catch((error) => {
          setIsProgressLoader(false)
          set_range_pendingAction([])
          // set_myinprogressAction([])
          set_range_grouppendingAction([])
          // set_mygroupunassignAction([])
        })

    return reset_all()
  }, [])
  // }, [pendingTaskDetails])

  useEffect(() => {
    // console.log(mypendingAction)
    // console.log(myinprogressTasks)
    // console.log(mygroupPendingAction)
    // console.log(mygroupUnassignTasks)
    if (
      mypendingAction &&
      myinprogressTasks &&
      mygroupPendingAction &&
      mygroupUnassignTasks &&
      eventPendingAction &&
      eventGroupPendingAction &&
      userDetail
    ) {
      const rolelist =
        userDetail &&
        userDetail.userdetails &&
        userDetail.userdetails[0].roles.map((rl: any) => rl.roleId)
      let adminqn = false
      for (let ad = 0; ad < admins.length; ad++) {
        if (rolelist.includes(admins[ad])) {
          adminqn = true
          break
        }
      }
      const newMap1 =
        userDetail &&
        userTaskDashboard.map((item) => {
          if (item.value.toLowerCase() === 'usermanagement') {
            item.my.pendingActions =
              mypendingAction.length > 0 && mypendingAction[0].tasks.length > 0
                ? mypendingAction[0].tasks.length
                : 0
            item.my.inProgressTask =
              myinprogressTasks.length > 0 &&
              myinprogressTasks[0].tasks.length > 0
                ? myinprogressTasks[0].tasks.length
                : 0
            item.myGroup.pendingActions =
              adminqn &&
              mygroupPendingAction.length > 0 &&
              mygroupPendingAction[0].tasks.length > 0
                ? mygroupPendingAction[0].tasks.length
                : 0
            item.myGroup.inProgressTask =
              adminqn &&
              mygroupUnassignTasks.length > 0 &&
              mygroupUnassignTasks[0].tasks.length > 0
                ? mygroupUnassignTasks[0].tasks.length
                : 0
          } else if (item.value.toLowerCase() === 'rangechangemanagement') {
            item.my.pendingActions =
              eventPendingAction.length > 0 &&
              eventPendingAction[0].tasks.length > 0
                ? eventPendingAction[0].tasks.length
                : 0
            // item.my.inProgressTask =
            //   myinprogressTasks.length > 0 &&
            //   myinprogressTasks[0].tasks.length > 0
            //     ? myinprogressTasks[0].tasks.length
            //     : 0
            item.myGroup.pendingActions =
              // adminqn &&
              eventGroupPendingAction.length > 0 &&
              eventGroupPendingAction[0].tasks.length > 0
                ? eventGroupPendingAction[0].tasks.length
                : 0
            // item.myGroup.inProgressTask =
            //   adminqn &&
            //   mygroupUnassignTasks.length > 0 &&
            //   mygroupUnassignTasks[0].tasks.length > 0
            //     ? mygroupUnassignTasks[0].tasks.length
            //     : 0
          }

          return item
        })

      setNewMap([...newMap1])
    }
  }, [
    userDetail,
    mypendingAction,
    myinprogressTasks,
    mygroupPendingAction,
    mygroupUnassignTasks,
    eventPendingAction,
    eventGroupPendingAction,
  ])

  useEffect(() => {
    let rcmData = userTaskDashboard.filter(
      (dash: any) => dash.value === 'rangechangemanagement'
    )
    setTable1Data(rcmData[0].my.taskDetails)
    setTable2Data(rcmData[0].myGroup.taskDetails)
  }, [])

  const missedTemplate = (rowData: any) => {
    return rowData.missedOrOverdue[0]
    // return 1
  }

  const rejectedTemplate = (rowData: any) => {
    return rowData.rejected[0]
    // return 2
  }

  return (
    <div style={{ padding: '20px' }}>
      <LoadingComponent showLoader={isProgressLoader} />
      <Typography variant="h6" color="primary" className={classes.tabHead}>
        Task Dashboard{' '}
        <Tooltip
          title={ServiceResponse.getMessage('dashboard', 'task')}
          classes={{ tooltip: classes.wide }}
          placement={!active ? 'right-start' : 'bottom'}
        >
          <IconButton>
            <InfoOutlinedIcon />
          </IconButton>
        </Tooltip>
      </Typography>
      <Grid container>
        {newMap &&
          newMap.length > 0 &&
          newMap.map((dash, index) => {
            if (dash.value !== 'rangechangemanagement') {
              return (
                <Grid item xl={6} lg={6} md={6} sm={6} xs={12} key={index}>
                  <Card className={classes.card}>
                    <CardHeader
                      className="dashbordHeading"
                      title={dash.title}
                      //className={classes.header}
                      titleTypographyProps={{ variant: 'body1' }}
                    />
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                          <table
                            cellSpacing={5}
                            style={{
                              width: '100%',
                              textAlign: 'left',
                            }}
                          >
                            <tbody>
                              <tr>
                                <th>
                                  <Typography variant="body1" color="primary">
                                    My Task{' '}
                                    <span className="rightArrow">{'⭆'}</span>
                                  </Typography>
                                </th>
                              </tr>
                              <tr>
                                <td>
                                  <Typography variant="body2" color="primary">
                                    &#8226; Pending
                                  </Typography>
                                </td>

                                <td>
                                  <Typography
                                    variant="body2"
                                    color={
                                      dash.my.pendingActions > 0
                                        ? 'primary'
                                        : 'secondary'
                                    }
                                  >
                                    <Link
                                      to={
                                        dash.my.pendingActions > 0
                                          ? dash.my.pendingActionURL
                                          : '#'
                                      }
                                    >
                                      {' '}
                                      {dash.my.pendingActions}
                                    </Link>
                                  </Typography>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <Typography variant="body2" color="primary">
                                    &#8226; Requested
                                  </Typography>
                                </td>

                                <td>
                                  <Typography
                                    variant="body2"
                                    color={
                                      dash.my.inProgressTask > 0
                                        ? 'primary'
                                        : 'secondary'
                                    }
                                  >
                                    <Link
                                      to={
                                        dash.my.inProgressTask > 0
                                          ? dash.my.inProgressTaskURL
                                          : '#'
                                      }
                                    >
                                      {dash.my.inProgressTask}
                                    </Link>
                                  </Typography>
                                </td>
                              </tr>

                              <tr>
                                <td colSpan={2}>
                                  <Divider />
                                </td>
                              </tr>
                              <tr>
                                <th>
                                  <Typography variant="body1" color="primary">
                                    Group Task{' '}
                                    <span className="rightArrow">{'⭆'}</span>
                                  </Typography>
                                </th>
                              </tr>

                              <tr>
                                <td>
                                  <Typography variant="body2" color="primary">
                                    &#8226; Pending
                                  </Typography>
                                </td>

                                <td>
                                  <Typography
                                    variant="body2"
                                    color={
                                      dash.myGroup.pendingActions > 0
                                        ? 'primary'
                                        : 'secondary'
                                    }
                                  >
                                    <Link
                                      to={
                                        dash.myGroup.pendingActions > 0
                                          ? dash.myGroup.myGrouppendingActionURL
                                          : '#'
                                      }
                                    >
                                      {dash.myGroup.pendingActions}
                                    </Link>
                                  </Typography>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <Typography variant="body2" color="primary">
                                    &#8226; Unassigned
                                  </Typography>
                                </td>

                                <td>
                                  <Typography
                                    variant="body2"
                                    color={
                                      dash.myGroup.inProgressTask > 0
                                        ? 'primary'
                                        : 'secondary'
                                    }
                                  >
                                    <Link
                                      to={
                                        dash.myGroup.inProgressTask > 0
                                          ? dash.myGroup
                                              .myGroupInprogressTaskURL
                                          : '#'
                                      }
                                    >
                                      {dash.myGroup.inProgressTask}
                                    </Link>
                                  </Typography>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              )
            } else {
              return (
                <Grid item xl={6} lg={6} md={6} sm={6} xs={12} key={index}>
                  <Card className={classes.card}>
                    <CardHeader
                      className="dashbordHeading"
                      title={dash.title}
                      //className={classes.header}
                      titleTypographyProps={{ variant: 'body1' }}
                    />
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid
                          item
                          container
                          xl={12}
                          lg={12}
                          md={12}
                          sm={12}
                          xs={12}
                          spacing={1}
                        >
                          <Grid item xs={4} />
                          <Grid item xs={7} style={{ textAlign: 'center' }}>
                            <Typography color="primary" variant="body2">
                              <b>Last 3 Months</b>
                            </Typography>
                          </Grid>
                          <Grid item xs={1} />
                          <Grid item xs={4}>
                            <Typography color="primary" variant="body2">
                              {dash.statuscomplete}
                            </Typography>
                          </Grid>
                          <Grid item xs={7}>
                            <ProgressBar
                              value={parseInt(dash.statuscompleteval)}
                              showValue={false}
                              className={classes.progressBar}
                              color={
                                parseInt(dash.statuscompleteval) < 90
                                  ? parseInt(dash.statuscompleteval) >= 60
                                    ? theme.palette.warning.main
                                    : theme.palette.error.main
                                  : theme.palette.primary.main
                              }
                            />
                          </Grid>
                          <Grid item xs={1}>
                            <Typography color="primary" variant="body2">
                              {dash.statuscompleteval}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid
                          item
                          container
                          xl={12}
                          lg={12}
                          md={12}
                          sm={12}
                          xs={12}
                          spacing={2}
                        >
                          <Divider />
                        </Grid>
                        <Grid
                          item
                          container
                          xl={12}
                          lg={12}
                          md={12}
                          sm={12}
                          xs={12}
                          spacing={2}
                        >
                          <Tabs
                            value={tabValue}
                            textColor="primary"
                            indicatorColor="primary"
                            onChange={(event, newValue) => {
                              setTabValue(newValue)
                            }}
                            style={{ width: '100%' }}
                          >
                            <Tab label="My Task" value={0} />
                            <Tab label="Group Tasks" value={1} />
                          </Tabs>
                          {tabValue === 0 && (
                            <Box sx={{ p: 2 }}>
                              <Typography color="primary" variant="body2">
                                Pending Due Date
                              </Typography>
                              <DataTable value={table1Data} showGridlines>
                                {myFirstTableCols.map(
                                  (col: any, index: any) => {
                                    return (
                                      <Column
                                        key={index}
                                        field={col.field}
                                        header={col.header}
                                        // body={
                                        //   (col.field === 'missedOrOverdue' &&
                                        //     missedTemplate) ||
                                        //   (col.field === 'rejected' &&
                                        //     rejectedTemplate)
                                        // }
                                        bodyStyle={{
                                          fontSize: '12px',
                                          padding: '8px',
                                          // height: '43px',
                                          overflowX: 'auto',
                                          color: theme.palette.error.main,
                                          textAlign: 'center',
                                          fontWeight: 'bold',
                                        }}
                                        headerStyle={{
                                          color: 'white',
                                          backgroundColor:
                                            theme.palette.primary.main,
                                          // fontSize: '0.9rem',
                                          fontSize: '12px',
                                          padding: '8px',
                                          height: 'auto',
                                          textAlign: 'center',
                                        }}
                                      />
                                    )
                                  }
                                )}
                              </DataTable>

                              <DataTable value={table1Data} showGridlines>
                                {mySecondTableCols.map(
                                  (col: any, index: any) => {
                                    return (
                                      <Column
                                        key={index}
                                        field={col.field}
                                        header={col.header}
                                        // body={
                                        //   (col.field === 'missedOrOverdue' &&
                                        //     missedTemplate) ||
                                        //   (col.field === 'rejected' &&
                                        //     rejectedTemplate)
                                        // }
                                        bodyStyle={{
                                          fontSize: '12px',
                                          padding: '8px',
                                          // height: '43px',
                                          overflowX: 'auto',
                                          // color: theme.palette.error.main,
                                          textAlign: 'center',
                                          fontWeight: 'bold',
                                        }}
                                        headerStyle={{
                                          color: 'white',
                                          backgroundColor:
                                            theme.palette.primary.main,
                                          // fontSize: '0.9rem',
                                          fontSize: '12px',
                                          padding: '8px',
                                          height: 'auto',
                                          textAlign: 'center',
                                        }}
                                      />
                                    )
                                  }
                                )}
                              </DataTable>
                            </Box>
                          )}
                          {tabValue === 1 && (
                            <Box sx={{ p: 2 }}>
                              <Typography color="primary" variant="body2">
                                Group Tasks
                              </Typography>
                              <DataTable value={table2Data} showGridlines>
                                {myFirstTableCols.map(
                                  (col: any, index: any) => {
                                    return (
                                      <Column
                                        key={index}
                                        field={col.field}
                                        header={col.header}
                                        // body={
                                        //   (col.field === 'missedOrOverdue' &&
                                        //     missedTemplate) ||
                                        //   (col.field === 'rejected' &&
                                        //     rejectedTemplate)
                                        // }
                                        bodyStyle={{
                                          fontSize: '12px',
                                          padding: '8px',
                                          // height: '43px',
                                          overflowX: 'auto',
                                          color: theme.palette.error.main,
                                          textAlign: 'center',
                                          fontWeight: 'bold',
                                        }}
                                        headerStyle={{
                                          color: 'white',
                                          backgroundColor:
                                            theme.palette.primary.main,
                                          // fontSize: '0.9rem',
                                          fontSize: '12px',
                                          padding: '8px',
                                          height: 'auto',
                                          textAlign: 'center',
                                        }}
                                      />
                                    )
                                  }
                                )}
                              </DataTable>

                              <DataTable value={table2Data} showGridlines>
                                {mySecondTableCols.map(
                                  (col: any, index: any) => {
                                    return (
                                      <Column
                                        key={index}
                                        field={col.field}
                                        header={col.header}
                                        // body={
                                        //   (col.field === 'missedOrOverdue' &&
                                        //     missedTemplate) ||
                                        //   (col.field === 'rejected' &&
                                        //     rejectedTemplate)
                                        // }
                                        bodyStyle={{
                                          fontSize: '12px',
                                          padding: '8px',
                                          // height: '43px',
                                          overflowX: 'auto',
                                          // color: theme.palette.error.main,
                                          textAlign: 'center',
                                          fontWeight: 'bold',
                                        }}
                                        headerStyle={{
                                          color: 'white',
                                          backgroundColor:
                                            theme.palette.primary.main,
                                          // fontSize: '0.9rem',
                                          fontSize: '12px',
                                          padding: '8px',
                                          height: 'auto',
                                          textAlign: 'center',
                                        }}
                                      />
                                    )
                                  }
                                )}
                              </DataTable>
                            </Box>
                          )}

                          {/* <TabView activeIndex={0} style={{ width: '100%' }}>
                            <TabPanel
                              header="My Task"
                              // headerTemplate={headerTemplate}
                              headerStyle={{
                                color: 'primary',
                                borderColor: 'primary',
                              }}
                            >
                              <Typography color="primary" variant="body2">
                                Pending Due Date
                              </Typography>
                              <DataTable value={table1Data} showGridlines>
                                {myFirstTableCols.map(
                                  (col: any, index: any) => {
                                    return (
                                      <Column
                                        key={index}
                                        field={col.field}
                                        header={col.header}
                                        // body={
                                        //   (col.field === 'missedOrOverdue' &&
                                        //     missedTemplate) ||
                                        //   (col.field === 'rejected' &&
                                        //     rejectedTemplate)
                                        // }
                                        bodyStyle={{
                                          fontSize: '12px',
                                          padding: '8px',
                                          // height: '43px',
                                          overflowX: 'auto',
                                          color: theme.palette.error.main,
                                          textAlign: 'center',
                                          fontWeight: 'bold',
                                        }}
                                        headerStyle={{
                                          color: 'white',
                                          backgroundColor:
                                            theme.palette.primary.main,
                                          // fontSize: '0.9rem',
                                          fontSize: '12px',
                                          padding: '8px',
                                          height: 'auto',
                                          textAlign: 'center',
                                        }}
                                      />
                                    )
                                  }
                                )}
                              </DataTable>

                              <DataTable value={table1Data} showGridlines>
                                {mySecondTableCols.map(
                                  (col: any, index: any) => {
                                    return (
                                      <Column
                                        key={index}
                                        field={col.field}
                                        header={col.header}
                                        // body={
                                        //   (col.field === 'missedOrOverdue' &&
                                        //     missedTemplate) ||
                                        //   (col.field === 'rejected' &&
                                        //     rejectedTemplate)
                                        // }
                                        bodyStyle={{
                                          fontSize: '12px',
                                          padding: '8px',
                                          // height: '43px',
                                          overflowX: 'auto',
                                          // color: theme.palette.error.main,
                                          textAlign: 'center',
                                          fontWeight: 'bold',
                                        }}
                                        headerStyle={{
                                          color: 'white',
                                          backgroundColor:
                                            theme.palette.primary.main,
                                          // fontSize: '0.9rem',
                                          fontSize: '12px',
                                          padding: '8px',
                                          height: 'auto',
                                          textAlign: 'center',
                                        }}
                                      />
                                    )
                                  }
                                )}
                              </DataTable>
                            </TabPanel>

                            <TabPanel
                              header="Group Task"
                              headerStyle={{
                                color: 'primary',
                                borderColor: 'primary',
                              }}
                            >
                              <Typography color="primary" variant="body2">
                                Group Tasks
                              </Typography>
                              <DataTable value={table2Data} showGridlines>
                                {myFirstTableCols.map(
                                  (col: any, index: any) => {
                                    return (
                                      <Column
                                        key={index}
                                        field={col.field}
                                        header={col.header}
                                        // body={
                                        //   (col.field === 'missedOrOverdue' &&
                                        //     missedTemplate) ||
                                        //   (col.field === 'rejected' &&
                                        //     rejectedTemplate)
                                        // }
                                        bodyStyle={{
                                          fontSize: '12px',
                                          padding: '8px',
                                          // height: '43px',
                                          overflowX: 'auto',
                                          color: theme.palette.error.main,
                                          textAlign: 'center',
                                          fontWeight: 'bold',
                                        }}
                                        headerStyle={{
                                          color: 'white',
                                          backgroundColor:
                                            theme.palette.primary.main,
                                          // fontSize: '0.9rem',
                                          fontSize: '12px',
                                          padding: '8px',
                                          height: 'auto',
                                          textAlign: 'center',
                                        }}
                                      />
                                    )
                                  }
                                )}
                              </DataTable>

                              <DataTable value={table2Data} showGridlines>
                                {mySecondTableCols.map(
                                  (col: any, index: any) => {
                                    return (
                                      <Column
                                        key={index}
                                        field={col.field}
                                        header={col.header}
                                        // body={
                                        //   (col.field === 'missedOrOverdue' &&
                                        //     missedTemplate) ||
                                        //   (col.field === 'rejected' &&
                                        //     rejectedTemplate)
                                        // }
                                        bodyStyle={{
                                          fontSize: '12px',
                                          padding: '8px',
                                          // height: '43px',
                                          overflowX: 'auto',
                                          // color: theme.palette.error.main,
                                          textAlign: 'center',
                                          fontWeight: 'bold',
                                        }}
                                        headerStyle={{
                                          color: 'white',
                                          backgroundColor:
                                            theme.palette.primary.main,
                                          // fontSize: '0.9rem',
                                          fontSize: '12px',
                                          padding: '8px',
                                          height: 'auto',
                                          textAlign: 'center',
                                        }}
                                      />
                                    )
                                  }
                                )}
                              </DataTable>
                            </TabPanel>
                          </TabView> */}
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              )
            }
          })}
      </Grid>
    </div>
  )
}

const mapStateToProps = (state: any) => {
  return {
    mypendingAction: state.pendingActionReducer.mypendingAction,
    myinprogressTasks: state.pendingActionReducer.myinprogressTasks,
    mygroupPendingAction: state.pendingActionReducer.mygroupPendingAction,
    mygroupUnassignTasks: state.pendingActionReducer.mygroupUnassignTasks,
    eventPendingAction: state.pendingActionReducer.eventPendingAction,
    eventGroupPendingAction: state.pendingActionReducer.eventGroupPendingAction,
    userDetail: state.loginReducer.userDetail,
  }
}

const matchDispatchToProps = (dispatch: any) => {
  return {
    set_mypendingAction: (pendingTasks: any) =>
      dispatch(set_mypendingAction(pendingTasks)),
    set_myinprogressAction: (inprogressTasks: any) =>
      dispatch(set_myinprogressAction(inprogressTasks)),
    set_mygrouppendingAction: (mygroupPendingTasks: any) =>
      dispatch(set_mygrouppendingAction(mygroupPendingTasks)),
    set_mygroupunassignAction: (mygroupUnassignTasks: any) =>
      dispatch(set_mygroupunassignAction(mygroupUnassignTasks)),
    set_range_pendingAction: (rangePendingTasks: any) =>
      dispatch(set_range_pendingAction(rangePendingTasks)),
    set_range_grouppendingAction: (rangeGroupPendingTasks: any) =>
      dispatch(set_range_grouppendingAction(rangeGroupPendingTasks)),
    reset_all: () => dispatch(reset_all()),
  }
}

export default connect(mapStateToProps, matchDispatchToProps)(Dashboard1)
