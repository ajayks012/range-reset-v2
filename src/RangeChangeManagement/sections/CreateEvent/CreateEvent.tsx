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
  Select,
  OutlinedInput,
  MenuItem,
} from '@material-ui/core'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import React, { useEffect, useRef, useState } from 'react'
import { Toast } from 'primereact/toast'
import DateFnsUtils from '@date-io/date-fns'
import { useHistory } from 'react-router-dom'
import {
  Buyers,
  BuyingAssistants,
  categories,
  CategoryDirectors,
  classOptions,
  departments,
  groups,
  Merchandisers,
  OwnBrandManagers,
  RangeResetManagers,
  resetTypes,
  SeniorBuyingManagers,
  SupplyChainSpecialists,
  wastageRanges,
  yesOrNo,
} from './DataConstants'
import AutocompleteSelect from '../../components/AutoCompleteSelect/AutocompleteSelect'
import DialogHeader from '../../components/DialogHeader/DialogHeader'
import { useStyles } from './styles'
import SearchSelect from '../../components/SearchSelect/SearchSelect'
import { routes } from '../../../util/Constants'
import { allMessages } from '../../../util/Messages'
import '../../../index.css'
import {
  // getProductHierarchyAPI,
  // putUserGroupAPI,
  getProductHierarchyListAPI,
} from '../../../api/Fetch'

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
  const [resetType, setResetType] = useState<any>('')
  const [resetTypeError, setResetTypeError] = useState<any>('')
  const [classValues, setClassValues] = useState<any>()
  const [confirmClassValues, setConfirmClassValues] = useState<any>()
  const [classFormData, setClassFormData] = useState<any>()
  const [group, setGroup] = useState<any>('')
  const [groupError, setGroupError] = useState<any>('')
  const [category, setCategory] = useState<any>('')
  const [categoryError, setCategoryError] = useState<any>('')
  const [department, setDepartment] = useState<any>('')
  const [departmentError, setDepartmentError] = useState<any>('')
  const [rafDueDate, setRafDueDate] = useState<any>(null)
  const [rafDueDateError, setRafDueDateError] = useState<any>('')
  const [launchDate, setLaunchDate] = useState<any>(null)
  const [launchDateError, setLaunchDateError] = useState<any>('')
  const [eventName, setEventName] = useState<any>('')
  const [storeWasteProcess, setStoreWasteProcess] = useState<any>('')
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
  const [clearancePriceApplied, setClearancePriceApplied] = useState('y')
  const [orderStopDateCheck, setStopDateCheck] = useState('y')
  const [stopOrder, setStopOrder] = useState('y')

  const [classOpen, setClassOpen] = useState(false)

  const [errReset, setErrReset] = useState<any>(false)
  const [errHandle, setErrHandle] = useState<any>(false)
  const [errCategory, setErrCategory] = useState<any>(false)
  const [errDepartment, setErrDepartment] = useState<any>(false)
  const [errLaunchDate, setErrLaunchDate] = useState<any>(false)
  const [errBuyer, setErrBuyer] = useState<any>(false)
  const [errBuyerAssisant, setErrBuyerAssisant] = useState<any>(false)
  const [errOwnBrandManager, setErrOwnBrandManager] = useState<any>(false)
  const [errSeniorBuyingManager, setErrSeniorBuyingManager] =
    useState<any>(false)
  const [errMerchandiser, setErrMerchandiser] = useState<any>(false)
  const [errRangeResetManager, setErrRangeResetManager] = useState<any>(false)
  const [errCategoryDirector, setErrCategoryDirector] = useState<any>(false)
  const [errSupplyChainSpecialist, setErrSupplyChainSpecialist] =
    useState<any>(false)

  const [resetError1, setResetError1] = useState<any>('')
  const [tradingGError1, settradingGError1] = useState<any>('')
  const [categoryError1, setCategoryGError1] = useState<any>('')
  const [departmentError1, setDepartmentError1] = useState<any>('')
  const [launchError1, setLaunchError1] = useState<any>('')
  const [buyerError1, setBuyerError1] = useState<any>('')
  const [buyingAssistentError1, setBuyingAssistentError1] = useState<any>('')
  const [ownBrandManagerError1, setOwnBrandManagerError1] = useState<any>('')
  const [seniorBuyingManagerError1, setSeniorBuyingManagerError1] =
    useState<any>('')
  const [merchandiserError1, setMerchandiserError1] = useState<any>('')
  const [rangeResetManagerError1, setRangeResetManagerError1] =
    useState<any>('')
  const [categoryDirectorError1, setCategoryDirectorError1] = useState<any>('')
  const [supChainSpecialistError1, setSupChainSpecialistError1] =
    useState<any>('')

  const toast = useRef<any>(null)
  const focusResetType = useRef<any>(null)
  // const focusUniqueId = useRef<any>(null);
  const focusGroup = useRef<any>(null)
  const focusDepartment = useRef<any>(null)
  const focusCategory = useRef<any>(null)
  const focusLaunchDate = useRef<any>(null)
  const focusBuyer = useRef<any>(null)
  const focusRafDueDate = useRef<any>(null)

  const [groupOptions, setGroupOptions] = useState<any>([])
  const [categoryOptions, setCategoryOptions] = useState<any>([])
  const [departmentOptions, setDepartmentOptions] = useState<any>([])

  useEffect(() => {
    getProductHierarchyListAPI &&
      getProductHierarchyListAPI('group')
        .then((res: any) => {
          const grpList = res.data.hierarchyNode.map((item: any) => {
            return {
              value: item.groupName,
              label: item.groupName,
              id: item.group,
              hierGroup: 'group',
            }
          })
          setGroupOptions(grpList)
          console.log('group length: ', grpList.length)
        })
        .catch((err: any) => setGroupOptions([]))
  }, [])

  useEffect(() => {
    console.log(group)
    getProductHierarchyListAPI &&
      getProductHierarchyListAPI('category')
        .then((res: any) => {
          const categoryList = res.data.hierarchyNode.map((item: any) => {
            return {
              value: item.categoryName,
              label: item.categoryName,
              id: item.category,
              hierGroup: 'category',
              groupName: item.groupName,
            }
          })

          group &&
            setCategoryOptions(
              categoryList.filter((cat: any) => cat.groupName === group)
            )
          group &&
            console.log(
              'category length: ',
              categoryList.filter((cat: any) => cat.groupName === group)
            )
        })
        .catch((err: any) => setCategoryOptions([]))
  }, [group])

  useEffect(() => {
    if (group && category) {
      getProductHierarchyListAPI &&
        getProductHierarchyListAPI('department')
          .then((res: any) => {
            const depList = res.data.hierarchyNode.map((item: any) => {
              return {
                value: item.departmentName,
                label: item.departmentName,
                id: item.department,
                hierGroup: 'department',
                groupName: item.groupName,
                categoryName: item.categoryName,
              }
            })
            setDepartmentOptions(
              depList.filter(
                (dep: any) =>
                  dep.groupName === group && dep.categoryName === category
              )
            )
            console.log(
              'department length: ',
              depList.filter(
                (dep: any) =>
                  dep.groupName === group && dep.categoryName === category
              )
            )
            // setLoaded(true)
          })
          .catch((err: any) => {
            setDepartmentOptions([])
            // setLoaded(true)
          })
    }
  }, [category])

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
    const value = e.target.value
    if (value === null || value === undefined || value === '') {
      setResetType('')
    } else {
      setErrReset(false)
      setResetType(value)
      console.log(value)
    }
    // setResetType(e.target.value)
    // if (e.target.value !== '') {
    //   setResetTypeError('')
    // }
  }

  const handleGroup = (e: any) => {
    const value = e.target.value
    if (value === null || value === undefined || value === '') {
      setGroup('')
    } else {
      setErrHandle(false)
      setGroup(value)
    }

    // setGroup(e.target.value)
    // if (e.target.value !== '') {
    //   setGroupError('')
    // }
  }
  const handleCategory = (e: any) => {
    const value = e.target.value
    if (value === null || value === undefined || value === '') {
      setCategory('')
    } else {
      setErrCategory(false)
      setCategory(value)
    }

    // setCategory(e.target.value)
    // if (e.target.value !== '') {
    //   setCategoryError('')
    // }
  }
  const handleDepartment = (e: any) => {
    const value = e.target.value
    if (value === null || value === undefined || value === '') {
      setDepartment('')
    } else {
      setErrDepartment(false)
      setDepartment(value)
    }

    // setDepartment(e.target.value)
    // if (e.target.value !== '') {
    //   setDepartmentError('')
    // }
  }
  const handleBuyer = (e: any) => {
    const value = e.target.value
    if (value === null || value === undefined || value === '') {
      setBuyer('')
    } else {
      setErrBuyer(false)
      setBuyer(value)
    }

    // setBuyer(e)
    // if (e) {
    //   setBuyerError('')
    // }
  }

  const handleBuyingAssistant = (e: any) => {
    const value = e.target.value
    if (value === null || value === undefined || value === '') {
      setBuyingAssistant('')
    } else {
      setErrBuyerAssisant(false)
      setBuyingAssistant(value)
    }
  }

  const handleOwnBrandManager = (e: any) => {
    const value = e.target.value
    if (value === null || value === undefined || value === '') {
      setOwnBrandManager('')
    } else {
      setErrOwnBrandManager(false)
      setOwnBrandManager(value)
    }
  }
  const handleSeniorBuyingManager = (e: any) => {
    const value = e.target.value
    if (value === null || value === undefined || value === '') {
      setSeniorBuyingManager('')
    } else {
      setErrSeniorBuyingManager(false)
      setSeniorBuyingManager(value)
    }
  }
  const handleMerchandiser = (e: any) => {
    const value = e.target.value
    if (value === null || value === undefined || value === '') {
      setMerchandiser('')
    } else {
      setErrMerchandiser(false)
      setMerchandiser(value)
    }
  }

  const handleRangeResetManager = (e: any) => {
    const value = e.target.value
    if (value === null || value === undefined || value === '') {
      setRangeResetManager('')
    } else {
      setErrRangeResetManager(false)
      setRangeResetManager(value)
    }
  }
  const handleCategoryDirector = (e: any) => {
    const value = e.target.value
    if (value === null || value === undefined || value === '') {
      setCategoryDirector('')
    } else {
      setErrCategoryDirector(false)
      setCategoryDirector(value)
    }
  }
  const handleSupplyChainSpecialist = (e: any) => {
    const value = e.target.value
    if (value === null || value === undefined || value === '') {
      setSupplyChainSpecialist('')
    } else {
      setErrSupplyChainSpecialist(false)
      setSupplyChainSpecialist(value)
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

  // const handleCreate = () => {
  //   if (
  //     validateResetType() &&
  //     validateGroup() &&
  //     validateCategory() &&
  //     validateDepartment() &&
  //     validateBuyer()
  //   ) {
  //     console.log('success')

  //     const formData = {
  //       // uniqueId: uniqueId,
  //       resetType: resetType,
  //       tradeGroup: group,
  //       category: category,
  //       department: department,
  //       launchDate: launchDate,
  //       rafDueDate: rafDueDate,
  //       eventName: eventName,
  //       planogramClass: {
  //         className: classFormData,
  //       },
  //       storeWasteProcessTiming: storeWasteProcess,
  //       // buyer: buyer,
  //       buyer: buyerConfirmed,
  //       buyerAssistant: buyingAssistant,
  //       ownBrandManager: ownBrandManager,
  //       seniorBuyingManager: seniorBuyingManager,
  //       merchandiser: merchandiser,
  //       rangeResetManager: rangeResetManager,
  //       categoryDirector: categoryDirector,
  //       supplyChainAnalyst: supplyChainSpecialist,
  //       clearancePriceApplied: clearancePriceApplied,
  //       orderStopDateCheck: orderStopDateCheck,
  //       stopOrder: stopOrder,
  //     }
  //     console.log(formData)
  //     history.push({
  //       pathname: `${DEFAULT}${RANGEAMEND_MANAGE_TASK}`,
  //       search: `?event=${formData['eventName']}`, // query string
  //       state: {
  //         // location state
  //         data: formData,
  //       },
  //     })
  //   } else {
  //     console.log('fail')
  //     toast.current.show({
  //       severity: 'error',
  //       summary: '',
  //       detail: 'Please fll all the essential fields',
  //       life: 2000,
  //     })
  //   }
  // }

  const handleCreateSubmit = (e: any) => {
    e.preventDefault()
    // console.log('Sridhar')
    // console.log('RAF Date', rafDueDate.getTime())
    // console.log('Launch Date', launchDate.getTime())

    if (!resetType || resetType === null || resetType === undefined) {
      setErrReset(true)
      setResetError1('Please select request type')
    } else {
      setErrReset(false)
      setResetError1('')
    }
    if (!group || group === null || group === undefined) {
      setErrHandle(true)
      settradingGError1('Please select trading group')
    } else {
      setErrHandle(false)
      settradingGError1('')
    }
    if (!category || category === null || category === undefined) {
      setErrCategory(true)
      setCategoryGError1('Please select category')
    } else {
      setErrCategory(false)
      setCategoryGError1('')
    }
    if (!department || department === null || department === undefined) {
      setErrDepartment(true)
      setDepartmentError1('Please select department')
    } else {
      setErrDepartment(false)
      setDepartmentError1('')
    }
    if (!launchDate || launchDate === null || launchDate === undefined) {
      setErrLaunchDate(true)
      setLaunchError1('Please select launch date')
    } else {
      setErrLaunchDate(false)
      setLaunchError1('')
    }
    // if (launchDate.getTime() <= rafDueDate.getTime()) {
    //   setErrLaunchDate(true)
    //   setLaunchError1(
    //     'RAF/App due date shouldn' + ' t be greater than launch date'
    //   )
    // } else {
    //   setErrLaunchDate(false)
    //   setLaunchError1('')
    // }
    if (!buyer || buyer === null || buyer === undefined) {
      setErrBuyer(true)
      setBuyerError1('Please select buyer')
    } else {
      setErrBuyer(false)
      setBuyerError1('')
    }
    if (
      !buyingAssistant ||
      buyingAssistant === null ||
      buyingAssistant === undefined
    ) {
      setErrBuyerAssisant(true)
      setBuyingAssistentError1('Please select buying assistant')
    } else {
      setErrBuyerAssisant(false)
      setBuyingAssistentError1('')
    }
    if (
      !ownBrandManager ||
      ownBrandManager === null ||
      ownBrandManager === undefined
    ) {
      setErrOwnBrandManager(true)
      setOwnBrandManagerError1('Please select own brand manager')
    } else {
      setErrOwnBrandManager(false)
      setOwnBrandManagerError1('')
    }
    if (
      !seniorBuyingManager ||
      seniorBuyingManager === null ||
      seniorBuyingManager === undefined
    ) {
      setErrSeniorBuyingManager(true)
      setSeniorBuyingManagerError1('Please select senior buying manager')
    } else {
      setErrSeniorBuyingManager(false)
      setSeniorBuyingManagerError1('')
    }
    if (!merchandiser || merchandiser === null || merchandiser === undefined) {
      setErrMerchandiser(true)
      setMerchandiserError1('Please select merchandiser')
    } else {
      setErrMerchandiser(false)
      setMerchandiserError1('')
    }
    if (
      !rangeResetManager ||
      rangeResetManager === null ||
      rangeResetManager === undefined
    ) {
      setErrRangeResetManager(true)
      setRangeResetManagerError1('Please select range reset manager')
    } else {
      setErrRangeResetManager(false)
      setRangeResetManagerError1('')
    }
    if (
      !categoryDirector ||
      categoryDirector === null ||
      categoryDirector === undefined
    ) {
      setErrCategoryDirector(true)
      setCategoryDirectorError1('Please select categiry director')
    } else {
      setErrCategoryDirector(false)
      setCategoryDirectorError1('')
    }
    if (
      !supplyChainSpecialist ||
      supplyChainSpecialist === null ||
      supplyChainSpecialist === undefined
    ) {
      setErrSupplyChainSpecialist(true)
      setSupChainSpecialistError1('Please select sup. chain specialist')
    } else {
      setErrSupplyChainSpecialist(false)
      setSupChainSpecialistError1('')
    }
    if (
      resetType &&
      group &&
      category &&
      department &&
      buyer &&
      buyingAssistant &&
      ownBrandManager &&
      seniorBuyingManager &&
      merchandiser &&
      rangeResetManager &&
      categoryDirector &&
      supplyChainSpecialist
    ) {
      const formData = {
        // uniqueId: uniqueId,
        resetType: resetType,
        tradeGroup: group,
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
        detail: 'Please fill all the essential fields',
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
                      {/* <select
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
                        {resetTypes.map((type) => {
                          return (
                            <option value={type.name} key={type.name}>
                              {type.text}
                            </option>
                          )
                        })}
                      </select> */}

                      <Select
                        value={resetType}
                        onChange={handleResetType}
                        color="primary"
                        displayEmpty
                        renderValue={(value: any) =>
                          value === '' ? '---Select Reset Type---' : value
                        }
                        input={
                          <OutlinedInput
                            margin="dense"
                            value={resetType}
                            className={classes.selectField}
                            color="primary"
                          />
                        }
                      >
                        {resetTypes.map((type) => {
                          return (
                            <MenuItem
                              value={type.text}
                              key={type.name}
                              className={classes.muiSelect}
                            >
                              {type.text}
                            </MenuItem>
                          )
                        })}
                      </Select>
                      {errReset && (
                        <span className={classes.errorMessageColor}>
                          {resetError1}
                        </span>
                      )}

                      {/* <br />
                      <div className={classes.errorMessage}>
                        {resetTypeError && resetTypeError}
                      </div> */}
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
                        TextFieldComponent={(props: any) => (
                          <OutlinedInput
                            margin="dense"
                            onClick={props.onClick}
                            value={props.value}
                            onChange={props.onChange}
                            className={classes.dateFields}
                          />
                        )}
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
                      {/* <select
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
                      </select> */}

                      <Select
                        value={group}
                        onChange={handleGroup}
                        displayEmpty
                        renderValue={(value: any) =>
                          value ? value : '--- Select Trading Group ---'
                        }
                        input={
                          <OutlinedInput
                            margin="dense"
                            className={classes.selectField}
                          />
                        }
                      >
                        {groupOptions &&
                          groupOptions.map((type: any) => {
                            return (
                              <MenuItem
                                value={type.value}
                                key={type.value}
                                className={classes.muiSelect}
                              >
                                {type.label}
                              </MenuItem>
                            )
                          })}
                      </Select>

                      {errHandle && (
                        <span className={classes.errorMessageColor}>
                          {tradingGError1}
                        </span>
                      )}

                      {/* <div className={classes.errorMessage}>{groupError}</div> */}
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
                      {/* <select
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
                      </select> */}

                      <Select
                        value={category}
                        onChange={handleCategory}
                        displayEmpty
                        renderValue={(value: any) =>
                          value ? value : '--- Select Category ---'
                        }
                        input={
                          <OutlinedInput
                            margin="dense"
                            className={classes.selectField}
                          />
                        }
                        disabled={categoryOptions.length > 0 ? false : true}
                      >
                        {categoryOptions.map((type: any) => {
                          return (
                            <MenuItem
                              value={type.value}
                              key={type.value}
                              className={classes.muiSelect}
                            >
                              {type.label}
                            </MenuItem>
                          )
                        })}
                      </Select>

                      {errCategory && (
                        <span className={classes.errorMessageColor}>
                          {categoryError1}
                        </span>
                      )}

                      {/* <div className={classes.errorMessage}>
                        {categoryError}
                      </div> */}
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
                      {/* <select
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
                      </select> */}

                      <Select
                        value={department}
                        onChange={handleDepartment}
                        displayEmpty
                        renderValue={(value: any) =>
                          value ? value : '--- Select Department ---'
                        }
                        input={
                          <OutlinedInput
                            margin="dense"
                            className={classes.selectField}
                          />
                        }
                        disabled={departmentOptions.length > 0 ? false : true}
                      >
                        {departmentOptions.map((type: any) => {
                          return (
                            <MenuItem
                              value={type.value}
                              key={type.value}
                              className={classes.muiSelect}
                            >
                              {type.label}
                            </MenuItem>
                          )
                        })}
                      </Select>

                      {errDepartment && (
                        <span className={classes.errorMessageColor}>
                          {departmentError1}
                        </span>
                      )}

                      {/* <div className={classes.errorMessage}>
                        {departmentError}
                      </div> */}
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
                        TextFieldComponent={(props: any) => (
                          <OutlinedInput
                            margin="dense"
                            onClick={props.onClick}
                            value={props.value}
                            onChange={props.onChange}
                            className={classes.dateFields}
                          />
                        )}
                      />

                      {/* <input
                    type="date"
                    value={launchDate}
                    // ref={focusLaunchDate}
                    onChange={handleLaunchDate}
                    className={classes.dateFields}
                    required
                  /> */}

                      <br />
                      {errLaunchDate && (
                        <span className={classes.errorMessageColor}>
                          {launchError1}
                        </span>
                      )}

                      {/* <div className={classes.errorMessage}>
                        {launchDateError}
                      </div> */}
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
                      {/* <input
                        type="text"
                        placeholder="Event Name"
                        value={eventName}
                        className={classes.inputFields}
                        onChange={(e) => {
                          setEventName(e.target.value)
                        }}
                        required
                      /> */}
                      <OutlinedInput
                        placeholder="Event Name"
                        margin="dense"
                        value={eventName}
                        className={classes.inputFields}
                        onChange={(e) => {
                          setEventName(e.target.value)
                        }}
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
                        {/* <FormControlLabel
                          value="y"
                          control={radio}
                          label="Yes"
                        />
                        <FormControlLabel
                          value="n"
                          control={radio}
                          label="No"
                        /> */}

                        {yesOrNo.map((type) => {
                          return (
                            <FormControlLabel
                              value={type.name}
                              key={type.name}
                              control={radio}
                              label={type.text}
                            />
                          )
                        })}
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
                        {/* <FormControlLabel
                          value="Yes"
                          control={radio}
                          label="Yes"
                        />
                        <FormControlLabel
                          value="No"
                          control={radio}
                          label="No"
                        /> */}
                        {yesOrNo.map((type) => {
                          return (
                            <FormControlLabel
                              value={type.name}
                              key={type.name}
                              control={radio}
                              label={type.text}
                            />
                          )
                        })}
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
                        {/* <FormControlLabel
                          value="Yes"
                          control={radio}
                          label="Yes"
                        />
                        <FormControlLabel
                          value="No"
                          control={radio}
                          label="No"
                        /> */}
                        {yesOrNo.map((type) => {
                          return (
                            <FormControlLabel
                              value={type.name}
                              key={type.name}
                              control={radio}
                              label={type.text}
                            />
                          )
                        })}
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
                      {/* <select
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
                      </select> */}

                      <Select
                        value={storeWasteProcess}
                        onChange={(e) => {
                          setStoreWasteProcess(e.target.value)
                        }}
                        displayEmpty
                        renderValue={(value: any) =>
                          value
                            ? value
                            : '--- Select Store Waste Process Timing ---'
                        }
                        input={
                          <OutlinedInput
                            margin="dense"
                            className={classes.selectField}
                          />
                        }
                      >
                        {wastageRanges.map((type) => {
                          return (
                            <MenuItem
                              value={type.text}
                              key={type.name}
                              className={classes.muiSelect}
                            >
                              {type.text}
                            </MenuItem>
                          )
                        })}
                      </Select>
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
                        // onChange={(e: any) => setBuyer(e.target.value)}
                        onChange={handleBuyer}
                        placeholder="Search Buyer"
                        onClick={handleBuyerClick}
                      />

                      {errBuyer && (
                        <span className={classes.errorMessageColor}>
                          {buyerError1}
                        </span>
                      )}

                      {/* <div className={classes.errorMessage} ref={focusBuyer}>
                        {buyerError}
                      </div> */}
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
                        // onChange={(e: any) => console.log(e.target.value)}
                        onChange={handleBuyingAssistant}
                        placeholder="Search Buying Assistant"
                        onClick={() => console.log('clicked')}
                      />
                      {errBuyerAssisant && (
                        <span className={classes.errorMessageColor}>
                          {buyingAssistentError1}
                        </span>
                      )}
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
                        // onChange={(e: any) => console.log(e.target.value)}
                        onChange={handleOwnBrandManager}
                        placeholder="Search Own Brand Manager"
                        onClick={() => console.log('clicked')}
                      />

                      {errOwnBrandManager && (
                        <span className={classes.errorMessageColor}>
                          {ownBrandManagerError1}
                        </span>
                      )}
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
                        // onChange={(e: any) => console.log(e.target.value)}
                        onChange={handleSeniorBuyingManager}
                        placeholder="Search Senior Buying Manager"
                        onClick={() => console.log('clicked')}
                      />

                      {errSeniorBuyingManager && (
                        <span className={classes.errorMessageColor}>
                          {seniorBuyingManagerError1}
                        </span>
                      )}
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
                        // onChange={(e: any) => console.log(e.target.value)}
                        onChange={handleMerchandiser}
                        placeholder="Search Merchandiser"
                        onClick={() => console.log('clicked')}
                      />

                      {errMerchandiser && (
                        <span className={classes.errorMessageColor}>
                          {merchandiserError1}
                        </span>
                      )}
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
                        // onChange={(e: any) => console.log(e.target.value)}
                        onChange={handleRangeResetManager}
                        placeholder="Search Range Reset Manager"
                        onClick={() => console.log('clicked')}
                      />

                      {errRangeResetManager && (
                        <span className={classes.errorMessageColor}>
                          {rangeResetManagerError1}
                        </span>
                      )}
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
                        // onChange={(e: any) => console.log(e.target.value)}
                        onChange={handleCategoryDirector}
                        placeholder="Search Category Director"
                        onClick={() => console.log('clicked')}
                      />

                      {errCategoryDirector && (
                        <span className={classes.errorMessageColor}>
                          {categoryDirectorError1}
                        </span>
                      )}
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
                        // onChange={(e: any) => console.log(e.target.value)}
                        onChange={handleSupplyChainSpecialist}
                        placeholder="Search Supply Chain Specialist"
                        onClick={() => console.log('clicked')}
                        required
                      />
                      {errSupplyChainSpecialist && (
                        <span className={classes.errorMessageColor}>
                          {supChainSpecialistError1}
                        </span>
                      )}
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
                        // onClick={handleCreate}
                        onClick={handleCreateSubmit}
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
