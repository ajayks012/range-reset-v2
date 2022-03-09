import {
  makeStyles,
  Grid,
  Typography,
  Button,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Dialog,
  useTheme,
  useMediaQuery,
  Paper,
} from '@material-ui/core'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import React, { useEffect, useRef, useState } from 'react'
import { Toast } from 'primereact/toast'
import DateFnsUtils from '@date-io/date-fns'
import { useHistory } from 'react-router-dom'
import {
  Buyers,
  BuyingAssistants,
  CategoryDirectors,
  classOptions,
  Merchandisers,
  OwnBrandManagers,
  RangeResetManagers,
  resetTypes,
  SeniorBuyingManagers,
  SupplyChainSpecialists,
} from './DataConstants'
import Select from 'react-select'
import AutocompleteSelect from '../../components/AutoCompleteSelect/AutocompleteSelect'
import DialogHeader from '../../components/DialogHeader/DialogHeader'
import { useStyles } from './styles'
import SearchSelect from '../../components/SearchSelect/SearchSelect'
import { routes } from '../../../util/Constants'
import { allMessages } from '../../../util/Messages'

function CreateEvent() {
  const history = useHistory()
  const classes = useStyles()
  const theme = useTheme()
  const small = useMediaQuery(theme.breakpoints.up(768))

  const {
    DEFAULT,
    RANGEAMEND_CREATE,
    RANGEAMEND_MANAGE_TASK,
    RANGEAMEND_EVENTDASH,
  } = routes

  // const [uniqueId, setUniqueId] = useState<any>("");
  // const [uniqueIdError, setUniqueIdError] = useState<any>("");
  const [resetType, setResetType] = useState<any>()
  const [resetTypeError, setResetTypeError] = useState<any>('')
  const [classValues, setClassValues] = useState<any>()
  const [confirmClassValues, setConfirmClassValues] = useState<any>()
  const [classFormData, setClassFormData] = useState<any>()
  const [group, setGroup] = useState<any>()
  const [groupError, setGroupError] = useState<any>('')
  const [category, setCategory] = useState<any>()
  const [categoryError, setCategoryError] = useState<any>('')
  const [department, setDepartment] = useState<any>()
  const [departmentError, setDepartmentError] = useState<any>('')
  const [rafDueDate, setRafDueDate] = useState<any>(null)
  const [rafDueDateError, setRafDueDateError] = useState<any>('')
  const [launchDate, setLaunchDate] = useState<any>(null)
  const [launchDateError, setLaunchDateError] = useState<any>('')
  const [eventName, setEventName] = useState<any>('')
  const [storeWasteProcess, setStoreWasteProcess] = useState<any>()
  const [buyer, setBuyer] = useState<any>('')
  const [buyerConfirmed, setBuyerConfirmed] = useState<any>('')
  const [buyerError, setBuyerError] = useState<any>('')
  const [buyingAssistant, setBuyingAssistant] = useState<any>('')
  const [ownBrandManager, setOwnBrandManager] = useState<any>('')
  const [seniorBuyingManager, setSeniorBuyingManager] = useState<any>('')
  const [merchandiser, setMerchandiser] = useState<any>('')
  const [rangeResetManager, setRangeResetManager] = useState<any>('')
  const [categoryDirector, setCategoryDirector] = useState<any>('')
  const [supplyChainSpecialist, setSupplyChainSpecialist] = useState<any>('')
  const [clearancePriceApplied, setClearancePriceApplied] = useState('Yes')
  const [orderStopDateCheck, setStopDateCheck] = useState('Yes')
  const [stopOrder, setStopOrder] = useState('Yes')

  const [classOpen, setClassOpen] = useState(false)

  const toast = useRef<any>(null)
  const focusResetType = useRef<any>(null)
  // const focusUniqueId = useRef<any>(null);
  const focusGroup = useRef<any>(null)
  const focusDepartment = useRef<any>(null)
  const focusCategory = useRef<any>(null)
  const focusLaunchDate = useRef<any>(null)
  const focusBuyer = useRef<any>(null)
  const focusRafDueDate = useRef<any>(null)

  useEffect(() => {
    if (department && launchDate && !eventName) {
      var lDate = new Date(launchDate)
      console.log(lDate)
      var name =
        department.replace(/ /g, '_') +
        '_' +
        lDate.getDate() +
        lDate.toLocaleString('default', { month: 'short' }) +
        lDate.getFullYear()
      console.log(name)
      setEventName(name)
    }
  }, [department, launchDate, eventName])

  useEffect(() => {
    if (confirmClassValues) {
      setClassFormData(() => {
        return confirmClassValues.map((class1: any) => class1.value)
      })
    }
  }, [confirmClassValues])

  const goBack = () => {
    history.goBack()
  }

  const requiredStar = (
    <>
      &nbsp;
      <span
        style={{
          color: '#ff0000',
        }}
      >
        *
      </span>
    </>
  )

  // const handleUniqueId = (e: any) => {
  //   setUniqueId(e.target.value);
  //   if (e.target.value !== "") {
  //     setUniqueIdError("");
  //   }
  // };

  const handleResetType = (e: any) => {
    setResetType(e.target.value)
    if (e.target.value !== '') {
      setResetTypeError('')
    }
  }

  const handleGroup = (e: any) => {
    setGroup(e.target.value)
    if (e.target.value !== '') {
      setGroupError('')
    }
  }
  const handleCategory = (e: any) => {
    setCategory(e.target.value)
    if (e.target.value !== '') {
      setCategoryError('')
    }
  }
  const handleDepartment = (e: any) => {
    setDepartment(e.target.value)
    if (e.target.value !== '') {
      setDepartmentError('')
    }
  }
  const handleBuyer = (e: any) => {
    setBuyer(e)
    if (e) {
      setBuyerError('')
    }
  }

  const handleClearancePrice = (e: any) => {
    console.log(e.target.value)
    setClearancePriceApplied(e.target.value)
  }

  const handleStopDateCheck = (e: any) => {
    console.log(e.target.value)
    setStopDateCheck(e.target.value)
  }

  const handleStopOrder = (e: any) => {
    console.log(e.target.value)
    setStopOrder(e.target.value)
  }
  const handleRafDueDate = (e: any) => {
    // const newDate = date.getDate() + "-" + parseInt(date.getMonth() + 1) + "-" + date.getFullYear()
    // console.log(newDate)
    // const date = e.target.value
    // setRafDueDate(date)
    // const appDate: any = new Date(date)
    // const date1: any = new Date(launchDate && launchDate)
    // console.log(appDate)
    // console.log(date1)
    // if (launchDate) {
    //   const diffTime = appDate - date1
    //   console.log(diffTime)
    //   if (diffTime > 0) {
    //     setRafDueDateError(
    //       '‘RAF / App Due Date’ should not be greater than ‘Launch Date’'
    //     )
    //     focusRafDueDate.current.focus()
    //   } else {
    //     setRafDueDateError('')
    //   }
    // }

    setRafDueDate(e)
  }

  const handleLaunchDate = (e: any) => {
    // const newDate = date.getDate() + "-" + parseInt(date.getMonth() + 1) + "-" + date.getFullYear()
    // console.log(newDate)
    // const date = e.target.value
    // setLaunchDate(date)
    // const appDate: any = new Date(rafDueDate)
    // const date1: any = new Date(date)
    // if (rafDueDate) {
    //   const diffTime = appDate - date1
    //   console.log(diffTime)
    //   if (diffTime > 0) {
    //     setRafDueDateError(
    //       '‘RAF / App Due Date’ should not be greater than ‘Launch Date’'
    //     )
    //     focusRafDueDate.current.focus()
    //   } else {
    //     setRafDueDateError('')
    //   }
    // }
    setLaunchDate(e)
  }

  // const handleFinaliseLineDetail = (date: any) => {
  //     const newDate = date.getDate() + "-" + parseInt(date.getMonth() + 1) + "-" + date.getFullYear()
  //     console.log(newDate)
  //     setLaunchDate(date);
  // };

  // const RafDueDateComponent = forwardRef((props:any, ref:any) => (
  //     <KeyboardDatePicker
  //         format="dd/MM/yyyy"
  //         inputVariant='outlined'
  //         value={rafDueDate}
  //         ref={ref}
  //         onChange={handleRafDueDate}
  //         KeyboardButtonProps={{
  //             'aria-label': 'change date',
  //         }}
  //         required
  //     />
  // ))

  const buttonText = 'Create & Publish Events'
  const radio = <Radio color="primary" />

  const handleClassChange = (selected: any) => {
    console.log(selected)
    setClassValues(selected)
    // if (selected.length > 0) setErrorRoles('')
  }

  const handleClassConfirm = () => {
    // const classData=classValues && classValues.map((class:any)=>{class.value})
    // console.log(classData)
    setConfirmClassValues(classValues)
    handleClassClose()
  }

  const handleClassClose = () => {
    setClassOpen(false)
  }

  const handleBuyerClick = () => {
    let index = Buyers.findIndex((item) => item.email === buyer)
    if (index > -1) {
      setBuyerConfirmed(Buyers[index]['value'])
      console.log(Buyers[index]['value'])
    } else {
      setBuyerError('Not found')
    }
  }

  const classDialog = (
    <Dialog open={classOpen} onClose={handleClassClose}>
      <Box
        sx={{
          height: 450,
          width: 'auto',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
        className={classes.classDialog}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <DialogHeader title="Add Class" onClose={handleClassClose} />

          <Box
            sx={{
              alignItems: 'flex-start',
              marginTop: '30px',
            }}
          >
            <AutocompleteSelect
              value={classValues}
              isMulti={true}
              options={classOptions}
              onChange={handleClassChange}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'end',
          }}
        >
          <Button
            variant="contained"
            color="primary"
            className={classes.buttons}
            onClick={handleClassConfirm}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Dialog>
  )

  const validateResetType = () => {
    if (!resetType) {
      setResetTypeError('Please select a reset type')
      return false
    } else {
      return true
    }
  }

  const validateDepartment = () => {
    if (!department) {
      setDepartmentError('Please select a department')
      return false
    } else {
      return true
    }
  }

  const validateGroup = () => {
    if (!group) {
      setGroupError('Please select a group')
      return false
    } else {
      return true
    }
  }

  const validateCategory = () => {
    if (!category) {
      setCategoryError('Please select a category')
      return false
    } else {
      return true
    }
  }

  const validateBuyer = () => {
    if (!buyer) {
      setBuyerError('Please select a Buyer')
      return false
    } else {
      return true
    }
  }

  // useEffect(() => {
  //   if (uniqueIdError !== "") {
  //     focusUniqueId.current.focus();
  //   }
  // });

  useEffect(() => {
    if (resetTypeError !== '') {
      focusResetType.current.focus()
    }
  }, [resetTypeError])

  useEffect(() => {
    if (groupError !== '') {
      focusGroup.current.focus()
    }
  }, [groupError])

  useEffect(() => {
    if (categoryError !== '') {
      focusCategory.current.focus()
    }
  }, [categoryError])

  useEffect(() => {
    if (departmentError !== '') {
      focusDepartment.current.focus()
    }
  }, [departmentError])

  useEffect(() => {
    if (buyerError !== '') {
      focusBuyer.current.focus()
    }
  }, [buyerError])

  const handleCreate = () => {
    if (
      validateResetType() &&
      validateGroup() &&
      validateCategory() &&
      validateDepartment() &&
      validateBuyer()
    ) {
      console.log('success')

      const formData = {
        // uniqueId: uniqueId,
        resetType: resetType,
        group: group,
        category: category,
        department: department,
        launchDate: launchDate,
        rafDueDate: rafDueDate,
        eventName: eventName,
        planogramClass: {
          className: classFormData,
        },
        storeWasteProcessTiming: storeWasteProcess,
        // buyer: buyer,
        buyer: buyerConfirmed,
        buyerAssistant: buyingAssistant,
        ownBrandManager: ownBrandManager,
        seniorBuyingManager: seniorBuyingManager,
        merchandiser: merchandiser,
        rangeResetManager: rangeResetManager,
        categoryDirector: categoryDirector,
        supplyChainAnalyst: supplyChainSpecialist,
        clearancePriceApplied: clearancePriceApplied,
        orderStopDateCheck: orderStopDateCheck,
        stopOrder: stopOrder,
      }
      console.log(formData)
      history.push({
        pathname: `${DEFAULT}${RANGEAMEND_MANAGE_TASK}`,
        search: `?event=${formData['eventName']}`, // query string
        state: {
          // location state
          data: formData,
        },
      })
    } else {
      console.log('fail')
      toast.current.show({
        severity: 'error',
        summary: '',
        detail: 'Please fll all the essential fields',
        life: 2000,
      })
    }
  }

  const createEventForm = (
    <Box
      className="createRequest"
      sx={{
        flexDirection: 'column',
        display: 'flex',
        p: 2,
        paddingLeft: '40px',
        paddingRight: '30px',
        textAlign: 'left',
        // width:"100%"
      }}
    >
      <div className="createRequestContainer">
        <Grid container style={{ justifyContent: 'center' }}>
          <Grid
            container
            item
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={12}
            style={{ paddingBottom: '20px' }}
          >
            <Grid item xs={8} sm={10}>
              <Typography variant="h6" color="primary">
                Create Event
              </Typography>
            </Grid>

            <Grid item xs={4} sm={2} style={{ textAlign: 'right' }}>
              <button
                // className={classes.backButton}
                className="backButton"
                onClick={goBack}
              >
                <svg
                  className="MuiSvgIcon-root"
                  focusable="false"
                  viewBox="0 0 34 34"
                  aria-hidden="true"
                >
                  <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
                </svg>
                Back
              </button>
            </Grid>
          </Grid>
          <form>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid
                container
                item
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={12}
                spacing={2}
              >
                {/* <Grid container item xl={12} lg={12} md={12} sm={12} xs={12}>
              <Grid item xl={5} lg={5} md={5} sm={12} xs={12}>
                <Typography variant="subtitle2" color="primary">
                  Unique ID
                  {requiredStar}
                </Typography>
              </Grid>

              <Grid item xl={7} lg={7} md={7} sm={12} xs={12}>
                <Typography variant="subtitle2" color="primary">
                  <input
                    type="text"
                    name="uniqueId"
                    id="uniqueId"
                    placeholder="eg. 123456"
                    value={uniqueId}
                    ref={focusUniqueId}
                    className={classes.inputFields}
                    onChange={handleUniqueId}
                    // defaultValue=""
                    // value={uniqueId}
                    required
                  />
                  <br />
                  <div className={classes.errorMessage}>
                    {uniqueIdError && uniqueIdError}
                  </div>
                </Typography>
              </Grid>
            </Grid> */}
                <Grid container item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <Grid item xl={5} lg={5} md={5} sm={5} xs={12}>
                    <Typography variant="subtitle2" color="primary">
                      Reset Type
                      {requiredStar}
                    </Typography>
                  </Grid>

                  <Grid item xl={7} lg={7} md={7} sm={7} xs={12}>
                    <Typography variant="subtitle2" color="primary">
                      <select
                        name="requesttype"
                        id="requesttype"
                        className={classes.selectField}
                        ref={focusResetType}
                        defaultValue=""
                        value={resetType}
                        // onChange={e => {
                        //     setResetType(e.target.value);
                        // }}
                        onChange={handleResetType}
                        required
                      >
                        <option disabled value="">
                          --- Select Reset Type ---
                        </option>
                        {/* <option value="Rapid Response">
                      Rapid Response
                      </option>
                    <option value="Seasonal Range Reset">
                      Seasonal Range Reset
                    </option>
                    <option value="Planned Range Reset">
                      Planned Range Reset
                    </option>
                    <option value="Seasonal Range Change">
                      Seasonal Range Change
                    </option>
                    <option value="Range Reset">Range Reset</option> */}
                        {resetTypes.map((type) => {
                          return (
                            <option value={type.name} key={type.name}>
                              {type.text}
                            </option>
                          )
                        })}
                      </select>
                      <br />
                      <div className={classes.errorMessage}>
                        {resetTypeError && resetTypeError}
                      </div>
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <Grid item xl={5} lg={5} md={5} sm={5} xs={12}>
                    <Typography variant="subtitle2" color="primary">
                      RAF/App Due Date
                    </Typography>
                  </Grid>

                  <Grid
                    item
                    xl={7}
                    lg={7}
                    md={7}
                    sm={7}
                    xs={12}
                    // style={{height:"38px"}}
                  >
                    <Typography variant="subtitle2" color="primary">
                      {/* <input type="text" value={rafDueDate && rafDueDate.getDate()}
                                        style={{
                                            display: "none",
                                        }}
                                        ref={focusRafDueDate}
                                        readOnly
                                    /> */}
                      <DatePicker
                        format="dd/MM/yyyy"
                        inputVariant="outlined"
                        value={rafDueDate}
                        // ref={focusRafDueDate}
                        onChange={handleRafDueDate}
                        // KeyboardButtonProps={{
                        //   'aria-label': 'change date',
                        // }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        emptyLabel="Enter RAF/APP Due Date"
                        maxDate={launchDate && launchDate}
                        maxDateMessage={allMessages.error.rafDateError}
                      />

                      {/* <input
                    type="date"
                    value={rafDueDate}
                    // ref={focusRafDueDate}
                    onChange={handleRafDueDate}
                    max={launchDate && launchDate}
                    className={classes.dateFields}
                    required={
                      resetType && resetType === 'Rapid Response' ? true : false
                    }
                  /> */}

                      {/* <RafDueDateComponent ref={focusRafDueDate}/> */}
                      <br />
                      <div
                        className={classes.errorMessage}
                        ref={focusRafDueDate}
                      >
                        {rafDueDateError}
                      </div>
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <Grid item xl={5} lg={5} md={5} sm={5} xs={12}>
                    <Typography variant="subtitle2" color="primary">
                      Trading Group
                      {requiredStar}
                    </Typography>
                  </Grid>

                  <Grid item xl={7} lg={7} md={7} sm={7} xs={12}>
                    <Typography variant="subtitle2" color="primary">
                      <select
                        name="group"
                        id="group"
                        className={classes.selectField}
                        defaultValue=""
                        ref={focusGroup}
                        value={group}
                        onChange={handleGroup}
                        required
                      >
                        <option disabled value="">
                          --- Select Group ---
                        </option>
                        <option value="Frozen">Frozen</option>
                        {/* <option value="Ambient">
                                            Ambient
                                        </option> */}
                      </select>
                      <div className={classes.errorMessage}>{groupError}</div>
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <Grid item xl={5} lg={5} md={5} sm={5} xs={12}>
                    <Typography variant="subtitle2" color="primary">
                      Category
                      {requiredStar}
                    </Typography>
                  </Grid>

                  <Grid item xl={7} lg={7} md={7} sm={7} xs={12}>
                    <Typography variant="subtitle2" color="primary">
                      <select
                        name="category"
                        id="category"
                        className={classes.selectField}
                        defaultValue=""
                        value={category}
                        ref={focusCategory}
                        onChange={handleCategory}
                        required
                      >
                        <option disabled value="">
                          --- Select Category ---
                        </option>
                        <option value="Frozen Food">Frozen Food</option>
                      </select>
                      <div className={classes.errorMessage}>
                        {categoryError}
                      </div>
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <Grid item xl={5} lg={5} md={5} sm={5} xs={12}>
                    <Typography variant="subtitle2" color="primary">
                      Department
                      {requiredStar}
                    </Typography>
                  </Grid>

                  <Grid item xl={7} lg={7} md={7} sm={7} xs={12}>
                    <Typography variant="subtitle2" color="primary">
                      <select
                        name="department"
                        id="department"
                        className={classes.selectField}
                        defaultValue=""
                        value={department}
                        ref={focusDepartment}
                        onChange={handleDepartment}
                        required
                      >
                        <option disabled value="">
                          --- Select Department ---
                        </option>
                        <option value="Frozen Chips">Frozen Chips</option>
                        <option value="Frozen Vegetables">
                          Frozen Vegetables
                        </option>
                        <option value="Frozen Fish">Frozen Fish</option>
                      </select>
                      <div className={classes.errorMessage}>
                        {departmentError}
                      </div>
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <Grid item xl={5} lg={5} md={5} sm={5} xs={12}>
                    <Typography variant="subtitle2" color="primary">
                      Launch Date
                      {requiredStar}
                    </Typography>
                  </Grid>

                  <Grid item xl={7} lg={7} md={7} sm={7} xs={12}>
                    <Typography variant="subtitle2" color="primary">
                      <DatePicker
                        format="dd/MM/yyyy"
                        inputVariant="outlined"
                        value={launchDate}
                        // ref={focusLaunchDate}
                        onChange={handleLaunchDate}
                        // KeyboardButtonProps={{
                        //   'aria-label': 'change date',
                        // }}
                        emptyLabel="Enter Launch Date"
                      />

                      {/* <input
                    type="date"
                    value={launchDate}
                    // ref={focusLaunchDate}
                    onChange={handleLaunchDate}
                    className={classes.dateFields}
                    required
                  /> */}

                      <div className={classes.errorMessage}>
                        {launchDateError}
                      </div>
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <Grid item xl={5} lg={5} md={5} sm={5} xs={12}>
                    <Typography variant="subtitle2" color="primary">
                      Event Name
                    </Typography>
                  </Grid>

                  <Grid item xl={7} lg={7} md={7} sm={7} xs={12}>
                    <Typography variant="subtitle2" color="primary">
                      <input
                        type="text"
                        placeholder="Event Name"
                        value={eventName}
                        className={classes.inputFields}
                        onChange={(e) => {
                          setEventName(e.target.value)
                        }}
                        required
                      />
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <Grid item xl={5} lg={5} md={5} sm={5} xs={12}>
                    <Typography variant="subtitle2" color="primary">
                      Planogram Class
                    </Typography>
                  </Grid>

                  <Grid item xl={7} lg={7} md={7} sm={7} xs={12}>
                    <Typography variant="subtitle2" color="primary">
                      <button
                        className={classes.backButton}
                        type="button"
                        onClick={() => setClassOpen(true)}
                      >
                        Class(
                        {confirmClassValues && confirmClassValues.length
                          ? confirmClassValues.length
                          : '0'}
                        )
                      </button>
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <Grid item xl={5} lg={5} md={5} sm={5} xs={12}>
                    <Typography variant="subtitle2" color="primary">
                      Clearance Price Applied
                    </Typography>
                  </Grid>

                  <Grid item container xl={7} lg={7} md={7} sm={7} xs={12}>
                    <FormControl>
                      <RadioGroup
                        name="clearancePrice"
                        value={clearancePriceApplied}
                        onChange={handleClearancePrice}
                        style={{ display: 'inline' }}
                      >
                        <FormControlLabel
                          value="Yes"
                          control={radio}
                          label="Yes"
                        />
                        <FormControlLabel
                          value="No"
                          control={radio}
                          label="No"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </Grid>

                <Grid container item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <Grid item xl={5} lg={5} md={5} sm={5} xs={12}>
                    <Typography variant="subtitle2" color="primary">
                      GSCOP Date Check Required
                    </Typography>
                  </Grid>

                  <Grid item container xl={7} lg={7} md={7} sm={7} xs={12}>
                    <FormControl>
                      <RadioGroup
                        name="GSCOPDateCheck"
                        value={orderStopDateCheck}
                        onChange={handleStopDateCheck}
                        style={{ display: 'inline' }}
                      >
                        <FormControlLabel
                          value="Yes"
                          control={radio}
                          label="Yes"
                        />
                        <FormControlLabel
                          value="No"
                          control={radio}
                          label="No"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </Grid>

                <Grid container item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <Grid item xl={5} lg={5} md={5} sm={5} xs={12}>
                    <Typography variant="subtitle2" color="primary">
                      Stop Order (Stock rundown)
                    </Typography>
                  </Grid>

                  <Grid item container xl={7} lg={7} md={7} sm={7} xs={12}>
                    <FormControl>
                      <RadioGroup
                        name="stopOrder"
                        value={stopOrder}
                        onChange={handleStopOrder}
                        style={{ display: 'inline' }}
                      >
                        <FormControlLabel
                          value="Yes"
                          control={radio}
                          label="Yes"
                        />
                        <FormControlLabel
                          value="No"
                          control={radio}
                          label="No"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </Grid>

                <Grid container item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <Grid item xl={5} lg={5} md={5} sm={5} xs={12}>
                    <Typography variant="subtitle2" color="primary">
                      Store Waste Process Timing
                    </Typography>
                  </Grid>

                  <Grid item xl={7} lg={7} md={7} sm={7} xs={12}>
                    <Typography variant="subtitle2" color="primary">
                      <select
                        name="Store Waste Process Timing"
                        id="storeWasteProcessTiming"
                        className={classes.selectField}
                        defaultValue=""
                        value={storeWasteProcess}
                        onChange={(e) => {
                          setStoreWasteProcess(e.target.value)
                        }}
                        required
                      >
                        <option disabled value="">
                          --- Select Store Waste Process Timing ---
                        </option>
                        <option value="Week +4\ +7">Week +4\ +7</option>
                        <option value="Week +5\ +8">Week +5\ +8</option>
                        <option value="Week +6\ +9">Week +6\ +9</option>
                        <option value="Week +7\ +10">Week +6\ +10</option>
                      </select>
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <Grid item xl={5} lg={5} md={5} sm={5} xs={12}>
                    <Typography variant="subtitle2" color="primary">
                      Buyer
                      {requiredStar}
                    </Typography>
                  </Grid>

                  <Grid item xl={7} lg={7} md={7} sm={7} xs={12}>
                    <Typography variant="subtitle2" color="primary">
                      {/* <select
                                        value={buyer}
                                        onChange={(e: any) => handleBuyer(e.target.value)}
                                        className={classes.selectField}
                                        defaultValue=""
                                        ref={focusBuyer}
                                        required
                                    >
                                        <option value="" disabled>
                                            --- Select Buyer ---
                                        </option>
                                        {
                                            Buyers.map((b: any) => {
                                                return (<option key={b.value} value={b.value}>{b.label}</option>)
                                            })
                                        }
                                    </select> */}

                      <SearchSelect
                        value={buyer}
                        onChange={(e: any) => setBuyer(e.target.value)}
                        placeholder="Search Buyer"
                        onClick={handleBuyerClick}
                      />

                      <div className={classes.errorMessage} ref={focusBuyer}>
                        {buyerError}
                      </div>
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <Grid item xl={5} lg={5} md={5} sm={5} xs={12}>
                    <Typography variant="subtitle2" color="primary">
                      Buying Assistant
                      {requiredStar}
                    </Typography>
                  </Grid>

                  <Grid item xl={7} lg={7} md={7} sm={7} xs={12}>
                    <Typography variant="subtitle2" color="primary">
                      {/* <select
                                        value={buyingAssistant}
                                        onChange={(e: any) => setBuyingAssistant(e.target.value)}
                                        className={classes.selectField}
                                        defaultValue=""
                                    >
                                        <option value="" disabled>
                                            --- Select Buying Assistant ---
                                        </option>
                                        {
                                            BuyingAssistants.map((b: any) => {
                                                return (<option key={b.value} value={b.value}>{b.label}</option>)
                                            })
                                        }
                                    </select> */}

                      <SearchSelect
                        value={buyingAssistant}
                        onChange={(e: any) => console.log(e.target.value)}
                        placeholder="Search Buying Assistant"
                        onClick={() => console.log('clicked')}
                      />
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <Grid item xl={5} lg={5} md={5} sm={5} xs={12}>
                    <Typography variant="subtitle2" color="primary">
                      Own Brand Manager
                      {requiredStar}
                    </Typography>
                  </Grid>

                  <Grid item xl={7} lg={7} md={7} sm={7} xs={12}>
                    <Typography variant="subtitle2" color="primary">
                      {/* <select
                                        value={ownBrandManager}
                                        onChange={(e: any) => setOwnBrandManager(e.target.value)}
                                        className={classes.selectField}
                                        defaultValue=""
                                    >
                                        <option value="" disabled>
                                            --- Select Own Brand Manager ---
                                        </option>
                                        {
                                            OwnBrandManagers.map((b: any) => {
                                                return (<option key={b.value} value={b.value}>{b.label}</option>)
                                            })
                                        }
                                    </select> */}

                      <SearchSelect
                        value={ownBrandManager}
                        onChange={(e: any) => console.log(e.target.value)}
                        placeholder="Search Own Brand Manager"
                        onClick={() => console.log('clicked')}
                      />
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <Grid item xl={5} lg={5} md={5} sm={5} xs={12}>
                    <Typography variant="subtitle2" color="primary">
                      Senior Buying Manager
                      {requiredStar}
                    </Typography>
                  </Grid>

                  <Grid item xl={7} lg={7} md={7} sm={7} xs={12}>
                    <Typography variant="subtitle2" color="primary">
                      {/* <select
                                        value={seniorBuyingManager}
                                        onChange={(e: any) => setSeniorBuyingManager(e.target.value)}
                                        className={classes.selectField}
                                        defaultValue=""
                                    >
                                        <option value="" disabled>
                                            --- Select Senior Buying Manager ---
                                        </option>
                                        {
                                            SeniorBuyingManagers.map((b: any) => {
                                                return (<option key={b.value} value={b.value}>{b.label}</option>)
                                            })
                                        }
                                    </select> */}

                      <SearchSelect
                        value={seniorBuyingManager}
                        onChange={(e: any) => console.log(e.target.value)}
                        placeholder="Search Senior Buying Manager"
                        onClick={() => console.log('clicked')}
                      />
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <Grid item xl={5} lg={5} md={5} sm={5} xs={12}>
                    <Typography variant="subtitle2" color="primary">
                      Merchandiser
                      {requiredStar}
                    </Typography>
                  </Grid>

                  <Grid item xl={7} lg={7} md={7} sm={7} xs={12}>
                    <Typography variant="subtitle2" color="primary">
                      {/* <select
                                        value={merchandiser}
                                        onChange={(e: any) => setMerchandiser(e.target.value)}
                                        className={classes.selectField}
                                        defaultValue=""
                                        ref={focusBuyer}
                                    >
                                        <option value="" disabled>
                                            --- Select Merchandiser ---
                                        </option>
                                        {
                                            Merchandisers.map((b: any) => {
                                                return (<option key={b.value} value={b.value}>{b.label}</option>)
                                            })
                                        }
                                    </select> */}

                      <SearchSelect
                        value={merchandiser}
                        onChange={(e: any) => console.log(e.target.value)}
                        placeholder="Search Merchandiser"
                        onClick={() => console.log('clicked')}
                      />
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <Grid item xl={5} lg={5} md={5} sm={5} xs={12}>
                    <Typography variant="subtitle2" color="primary">
                      Range Reset Manager
                      {requiredStar}
                    </Typography>
                  </Grid>

                  <Grid item xl={7} lg={7} md={7} sm={7} xs={12}>
                    <Typography variant="subtitle2" color="primary">
                      {/* <select
                                        value={rangeResetManager}
                                        onChange={(e: any) => setRangeResetManager(e.target.value)}
                                        className={classes.selectField}
                                        defaultValue=""
                                        ref={focusBuyer}
                                    >
                                        <option value="" disabled>
                                            --- Select Range Reset Manager ---
                                        </option>
                                        {
                                            RangeResetManagers.map((b: any) => {
                                                return (<option key={b.value} value={b.value}>{b.label}</option>)
                                            })
                                        }
                                    </select> */}

                      <SearchSelect
                        value={rangeResetManager}
                        onChange={(e: any) => console.log(e.target.value)}
                        placeholder="Search Range Reset Manager"
                        onClick={() => console.log('clicked')}
                      />
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <Grid item xl={5} lg={5} md={5} sm={5} xs={12}>
                    <Typography variant="subtitle2" color="primary">
                      Category Director
                      {requiredStar}
                    </Typography>
                  </Grid>

                  <Grid item xl={7} lg={7} md={7} sm={7} xs={12}>
                    <Typography variant="subtitle2" color="primary">
                      {/* <select
                                        value={categoryDirector}
                                        onChange={(e: any) => setCategoryDirector(e.target.value)}
                                        className={classes.selectField}
                                        defaultValue=""
                                        ref={focusBuyer}
                                    >
                                        <option value="" disabled>
                                            --- Select Category Director ---
                                        </option>
                                        {
                                            CategoryDirectors.map((b: any) => {
                                                return (<option key={b.value} value={b.value}>{b.label}</option>)
                                            })
                                        }
                                    </select> */}

                      <SearchSelect
                        value={categoryDirector}
                        onChange={(e: any) => console.log(e.target.value)}
                        placeholder="Search Category Director"
                        onClick={() => console.log('clicked')}
                      />
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <Grid item xl={5} lg={5} md={5} sm={5} xs={12}>
                    <Typography variant="subtitle2" color="primary">
                      Supply Chain Specialist
                      {requiredStar}
                    </Typography>
                  </Grid>

                  <Grid item xl={7} lg={7} md={7} sm={7} xs={12}>
                    <Typography variant="subtitle2" color="primary">
                      {/* <select
                                        value={supplyChainSpecialist}
                                        onChange={(e: any) => setSupplyChainSpecialist(e.target.value)}
                                        className={classes.selectField}
                                        defaultValue=""
                                        ref={focusBuyer}
                                    >
                                        <option value="" disabled>
                                            --- Select Supply Chain Specialist ---
                                        </option>
                                        {
                                            SupplyChainSpecialists.map((b: any) => {
                                                return (<option key={b.value} value={b.value}>{b.label}</option>)
                                            })
                                        }
                                    </select> */}

                      <SearchSelect
                        value={supplyChainSpecialist}
                        onChange={(e: any) => console.log(e.target.value)}
                        placeholder="Search Supply Chain Specialist"
                        onClick={() => console.log('clicked')}
                        required
                      />
                    </Typography>
                  </Grid>
                </Grid>

                <Grid
                  container
                  item
                  xl={12}
                  lg={12}
                  md={12}
                  sm={12}
                  xs={12}
                  spacing={2}
                  style={{
                    textAlign: 'center',
                    paddingTop: '20px',
                    // justifyContent:"right"
                  }}
                >
                  <Grid
                    container
                    item
                    xl={7}
                    lg={7}
                    md={5}
                    sm={1}
                    xs={12}
                  ></Grid>
                  <Grid
                    container
                    item
                    xl={5}
                    lg={5}
                    md={7}
                    sm={11}
                    xs={12}
                    spacing={2}
                  >
                    <Grid item xl={2} lg={2} md={2} sm={3} xs={12}>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.buttons}
                        size="small"
                      >
                        Save
                      </Button>
                    </Grid>
                    <Grid item xl={6} lg={6} md={6} sm={5} xs={12}>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.buttons}
                        size="small"
                      >
                        {buttonText}
                      </Button>
                    </Grid>
                    <Grid item xl={4} lg={4} md={4} sm={4} xs={12}>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.buttons}
                        onClick={handleCreate}
                        size="small"
                      >
                        Create Event
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </MuiPickersUtilsProvider>
          </form>
        </Grid>
      </div>
    </Box>
  )

  return (
    <>
      <Toast ref={toast} position="bottom-left" />
      <Paper className={classes.root} elevation={0}>
        <Grid
          container
          item
          xs={12}
          alignItems="center"
          justifyContent="center"
          className={classes.text}
        >
          {/* <Grid item lg={9} xl={9} md={10} sm={12} xs={12}> */}
          {createEventForm}
          {classDialog}
          {/* </Grid> */}
        </Grid>
      </Paper>
    </>
  )
}

export default CreateEvent
