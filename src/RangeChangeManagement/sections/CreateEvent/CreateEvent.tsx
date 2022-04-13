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
import {
  DatePicker,
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers'
import React, { useEffect, useRef, useState } from 'react'
import { Toast } from 'primereact/toast'
import DateFnsUtils from '@date-io/date-fns'
import { useHistory, Prompt } from 'react-router-dom'
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
import { routes, life } from '../../../util/Constants'
import { allMessages } from '../../../util/Messages'
import '../../../index.css'
import {
  createEventsCamunda,
  // getProductHierarchyAPI,
  // putUserGroupAPI,
  getProductHierarchyListAPI,
  getResetTypes,
  getUsersAPIByEmailAndRole,
  patchRangeResetEvents,
} from '../../../api/Fetch'
import ConfirmCheckSign from '../../components/ConfirmCheck/ConfirmCheckSign'
import { connect } from 'react-redux'
import ConfirmBox from '../../../components/ConfirmBox/ConfirmBox'
import LoadingComponent from '../../../components/LoadingComponent/LoadingComponent'
import {
  setFile,
  resetFile,
  setErrorFile,
  resetErrorFile,
} from '../../../redux/Actions/FileUpload'
// import styled from 'styled-components'

function CreateEvent(props: any) {
  const history = useHistory()
  const classes = useStyles()
  const theme = useTheme()
  const small = useMediaQuery(theme.breakpoints.up(768))
  const {
    userDetail,
    setFile,
    resetFile,
    fileData,
    fileErrorData,
    setErrorFile,
    resetErrorFile,
  } = props

  const {
    DEFAULT,
    RANGEAMEND_CREATE,
    RANGEAMEND_MANAGE_TASK,
    RANGEAMEND_EVENTDASH,
    RANGEAMEND_MANAGE,
  } = routes

  // const [uniqueId, setUniqueId] = useState<any>("");
  // const [uniqueIdError, setUniqueIdError] = useState<any>("");
  const [errorData, setErrorData] = useState<any>('')

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
  const [launchDate, setLaunchDate] = useState<any>(
    `${new Date().toISOString().split('T')[0]}`
  )
  const [launchDateError, setLaunchDateError] = useState<any>('')
  const [eventName, setEventName] = useState<any>('')
  const [storeWasteProcess, setStoreWasteProcess] = useState<any>('')
  const [buyer, setBuyer] = useState<any>('')
  const [buyerValue, setBuyerValue] = useState<any>('')
  const [buyerConfirmed, setBuyerConfirmed] = useState<any>(false)
  const [buyingAssistant, setBuyingAssistant] = useState<any>('')
  const [buyingAssistantValue, setBuyingAssistantValue] = useState<any>('')
  const [buyingAssistantConfirmed, setBuyingAssistantConfirmed] =
    useState<any>(false)
  const [ownBrandManager, setOwnBrandManager] = useState<any>('')
  const [ownBrandManagerValue, setOwnBrandManagerValue] = useState<any>('')
  const [ownBrandManagerConfirmed, setOwnBrandManagerConfirmed] =
    useState<any>(false)
  const [seniorBuyingManager, setSeniorBuyingManager] = useState<any>('')
  const [seniorBuyingManagerValue, setSeniorBuyingManagerValue] =
    useState<any>('')
  const [seniorBuyingManagerConfirmed, setSeniorBuyingManagerConfirmed] =
    useState<any>(false)
  const [merchandiser, setMerchandiser] = useState<any>('')
  const [merchandiserValue, setMerchandiserValue] = useState<any>('')
  const [merchandiserConfirmed, setMerchandiserConfirmed] = useState<any>(false)
  const [rangeResetManager, setRangeResetManager] = useState<any>('')
  const [rangeResetManagerValue, setRangeResetManagerValue] = useState<any>('')
  const [rangeResetManagerConfirmed, setRangeResetManagerConfirmed] =
    useState<any>(false)
  const [categoryDirector, setCategoryDirector] = useState<any>('')
  const [categoryDirectorValue, setCategoryDirectorValue] = useState<any>('')
  const [categoryDirectorConfirmed, setCategoryDirectorConfirmed] =
    useState<any>(false)
  const [supplyChainSpecialist, setSupplyChainSpecialist] = useState<any>('')
  const [supplyChainSpecialistValue, setSupplyChainSpecialistValue] =
    useState<any>('')
  const [supplyChainSpecialistConfirmed, setSupplyChainSpecialistConfirmed] =
    useState<any>(false)
  const [clearancePriceApplied, setClearancePriceApplied] = useState('Y')
  const [orderStopDateCheck, setStopDateCheck] = useState('Y')
  const [stopOrder, setStopOrder] = useState('Y')

  const [classOpen, setClassOpen] = useState(false)

  const [errRafDueDate, setErrRafdueDate] = useState<any>(false)
  const [errReset, setErrReset] = useState<any>(false)
  const [errGroup, setErrGroup] = useState<any>(false)
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

  const [rafDueDateError1, setRafDueDateError1] = useState<any>('')
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
  const [productHierValues, setProductHierValues] = useState<any>([])
  const [disabled, setDisabled] = React.useState(false)

  const [errorCheck, setErrorCheck] = useState(-1)

  const toast = useRef<any>(null)
  const focusResetType = useRef<any>(null)
  const focusGroup = useRef<any>(null)
  const focusDepartment = useRef<any>(null)
  const focusCategory = useRef<any>(null)
  const focusLaunchDate = useRef<any>(null)
  const focusRafDueDate = useRef<any>(null)
  const focusBuyer = useRef<any>(null)
  const focusCategoryDirector = useRef<any>(null)
  const focusSeniorBuyingManager = useRef<any>(null)
  const focusBuyingAssistant = useRef<any>(null)
  const focusMerchandiser = useRef<any>(null)
  const focusSupplyChainSpecialist = useRef<any>(null)
  const focusOwnBrandManager = useRef<any>(null)
  const focusRangeRestManager = useRef<any>(null)

  const [resetOptions, setResetOptions] = useState<any>([])
  const [groupOptions, setGroupOptions] = useState<any>([])
  const [categoryOptions, setCategoryOptions] = useState<any>([])
  const [departmentOptions, setDepartmentOptions] = useState<any>([])

  const [cancelOpenApprove, setCancelOpenApprove] = React.useState(false)
  const [cancelOpenSave, setCancelOpenSave] = React.useState(false)
  const [back, setBack] = React.useState(false)
  const [isPageModified, setIsPageModified] = React.useState(false)
  const [isSuccessCall, setIsSuccessCall] = React.useState(true)
  const [isProgressLoader, setIsProgressLoader] = React.useState(false)
  const [toastRemove, setToastRemove] = React.useState('')

  useEffect(() => {
    console.log(rafDueDateError1)
  }, [rafDueDateError1])

  useEffect(() => {
    return () => resetErrorFile()
  }, [])

  const checkForErrors = (value: any) => {
    if (value) {
      if (value.appDueDateError) {
        setRafDueDate(value.appDueDate)
        setErrRafdueDate(true)
        setRafDueDateError1(value.appDueDateError)
      } else {
        console.log(value.appDueDate)
        value.appDueDate && setRafDueDate(value.appDueDate)
      }

      if (value.resetTypeError) {
        // setBuyer(value.buyerEmailId)
        setResetType({ value: value.resetType, label: value.resetType })
        setErrReset(true)
        // setErrBuyer(true)
        setResetError1(value.resetTypeError)
      } else {
        value.resetType &&
          setResetType({ value: value.resetType, label: value.resetType })
      }

      if (value.categoryError) {
        // setBuyer(value.buyerEmailId)
        // setRafDueDate(value.department)
        setErrDepartment(true)
        setDepartmentError1('Invalid Product Hierarchy')
        // setCategoryGError1('Invalid Category')
      } else {
        value.tradeGroup &&
          setGroup({
            value: value.tradeGroup,
            label: value.tradeGroup,
            groupName: value.tradeGroup,
          })
        value.category &&
          setCategory({
            value: value.category,
            label: value.category,
            categoryId: value.categoryId,
            categoryName: value.category,
          })
      }

      if (value.departmentError) {
        // setBuyer(value.buyerEmailId)
        // setRafDueDate(value.department)
        setErrDepartment(true)
        // setDepartmentError1(value.departmentError)
        setDepartmentError1('Invalid Product Hierarchy')
      } else {
        value.tradeGroup &&
          setGroup({
            value: value.tradeGroup,
            label: value.tradeGroup,
            groupName: value.tradeGroup,
          })
        value.category &&
          setCategory({
            value: value.category,
            label: value.category,
            categoryId: value.categoryId,
            categoryName: value.category,
          })
        value.department &&
          setDepartment({
            value: value.department,
            label: value.department,
            departmentId: value.departmentId,
            departmentName: value.department,
          })
      }

      if (value.buyerError) {
        setBuyerConfirmed(false)
        setBuyer(value.buyerEmailId)
        setErrBuyer(true)
        setBuyerValue('')
        setBuyerError1(value.buyerError)
      } else {
        setBuyerConfirmed(false)
        setBuyer(value.buyerEmailId)
      }

      if (value.categoryDirectorError) {
        setCategoryDirectorConfirmed(false)
        setCategoryDirector(value.categoryDirectorEmailId)
        setErrCategoryDirector(true)
        setCategoryDirectorValue('')
        setCategoryDirectorError1(value.categoryDirectorError)
      } else {
        setCategoryDirectorConfirmed(false)
        setCategoryDirector(value.categoryDirectorEmailId)
      }

      if (value.seniorBuyingManagerError) {
        setSeniorBuyingManagerConfirmed(false)
        setSeniorBuyingManager(value.seniorBuyingManagerEmailId)
        setErrSeniorBuyingManager(true)
        setSeniorBuyingManagerValue('')
        setSeniorBuyingManagerError1(value.seniorBuyingManagerError)
      } else {
        setSeniorBuyingManagerConfirmed(false)
        setSeniorBuyingManager(value.seniorBuyingManagerEmailId)
      }

      if (value.buyerAssistantError) {
        setBuyingAssistantConfirmed(false)
        setBuyingAssistant(value.buyerAssistantEmailId)
        setErrBuyerAssisant(true)
        setBuyingAssistantValue('')
        setBuyingAssistentError1(value.buyerAssistantError)
      } else {
        setBuyingAssistantConfirmed(false)
        setBuyingAssistant(value.buyerAssistantEmailId)
      }

      if (value.merchandiserError) {
        setMerchandiserConfirmed(false)
        setMerchandiser(value.merchandiserEmailId)
        setErrMerchandiser(true)
        setMerchandiserValue('')
        setMerchandiserError1(value.merchandiserError)
      } else {
        setMerchandiserConfirmed(false)
        setMerchandiser(value.merchandiserEmailId)
      }

      if (value.supplyChainAnalystError) {
        setSupplyChainSpecialistConfirmed(false)
        setSupplyChainSpecialist(value.supplyChainAnalystEmailId)
        setErrSupplyChainSpecialist(true)
        setSupplyChainSpecialistValue('')
        setSupChainSpecialistError1(value.supplyChainAnalystError)
      } else {
        setSupplyChainSpecialistConfirmed(false)
        setSupplyChainSpecialist(value.supplyChainAnalystEmailId)
      }

      if (value.ownBrandManagerError) {
        setOwnBrandManagerConfirmed(false)
        setOwnBrandManager(value.ownBrandManagerEmailId)
        setErrOwnBrandManager(true)
        setOwnBrandManagerValue('')
        setOwnBrandManagerError1(value.ownBrandManagerError)
      } else {
        setOwnBrandManagerConfirmed(false)
        setOwnBrandManager(value.ownBrandManagerEmailId)
      }

      if (value.rangeResetManagerError) {
        setRangeResetManagerConfirmed(false)
        setRangeResetManager(value.rangeResetManagerEmailId)
        setErrRangeResetManager(true)
        setRangeResetManagerValue('')
        setRangeResetManagerError1(value.rangeResetManagerError)
      } else {
        setRangeResetManagerConfirmed(false)
        setRangeResetManager(value.rangeResetManagerEmailId)
      }

      setLaunchDate(value.targetDate)
      let classValues = value.planogramClass
      console.log(classValues)
      if (classValues && classValues.length > 0) {
        setConfirmClassValues(classValues.className)
      }
      // setEventName(value.name)
    }
  }

  useEffect(() => {
    if (fileErrorData) {
      checkForErrors(fileErrorData)
    }
  }, [])

  // useEffect(() => {
  //   if (storeWasteProcess) {
  //     let data = storeWasteProcess.value
  //     let waste = data.replace('_', ' ')
  //     let newWaste = waste.split('_')
  //     console.log(newWaste)
  //     let newData = `Week +${newWaste[0]}\\ +${newWaste[1]}`
  //     console.log(newData)
  //   }
  // }, [storeWasteProcess])

  useEffect(() => {
    getResetTypes().then((res: any) => {
      const options = res.data.map((item: any) => {
        return {
          value: item.configValue,
          label: item.configValue,
        }
      })
      setResetOptions(options)
    })
  }, [])

  useEffect(() => {
    getProductHierarchyListAPI &&
      getProductHierarchyListAPI('department')
        .then((res: any) => {
          const hierarchyList = res.data.hierarchyNode.map((item: any) => {
            return {
              groupId: item.group,
              groupName: item.groupName,
              categoryId: item.category,
              categoryName: item.categoryName,
              departmentId: item.department,
              departmentName: item.departmentName,
            }
          })
          setProductHierValues(hierarchyList)
          console.log(hierarchyList)
        })
        .catch((err: any) => setProductHierValues([]))
  }, [])
  useEffect(() => {
    if (productHierValues) {
      let data: any = []
      productHierValues.map((item: any) => {
        if (!data) {
          data.push({
            value: item.groupId,
            label: item.groupName,
            groupId: item.groupId,
            groupName: item.groupName,
          })
        } else if (
          data.findIndex((d: any) => d.groupId === item.groupId) === -1
        ) {
          data.push({
            value: item.groupId,
            label: item.groupName,
            groupId: item.groupId,
            groupName: item.groupName,
          })
        }
      })
      console.log(data)
      setGroupOptions(data)
    }
  }, [productHierValues])

  useEffect(() => {
    if (group) {
      let data: any = []
      productHierValues.map((item: any) => {
        if (
          data.findIndex((d: any) => d.categoryId === item.categoryId) === -1
        ) {
          if (group.groupId === item.groupId) {
            data.push({
              value: item.categoryId,
              label: item.categoryName,
              categoryId: item.categoryId,
              categoryName: item.categoryName,
            })
          }
        }
      })
      console.log(data)
      setCategoryOptions(data)
    }
  }, [group])

  useEffect(() => {
    if (category) {
      let data: any = []
      productHierValues.map((item: any) => {
        if (
          data.findIndex((d: any) => d.departmentId === item.departmentId) ===
          -1
        ) {
          if (item.categoryId === category.categoryId) {
            data.push({
              value: item.departmentId,
              label: item.departmentName,
              departmentId: item.departmentId,
              departmentName: item.departmentName,
            })
          }
        }
      })
      console.log(data)
      setDepartmentOptions(data)
    }
  }, [category])

  useEffect(() => {
    // if (!fileErrorData) {
    if (!fileErrorData.name) {
      if (!eventName) {
        if (department && launchDate) {
          var lDate = new Date(launchDate)
          console.log(lDate)
          var name =
            department.departmentName.replace(/ /g, '_') +
            '_' +
            lDate.getDate() +
            lDate.toLocaleString('default', { month: 'short' }) +
            lDate.getFullYear()
          console.log(name)
          setEventName(name)
        } else {
          setEventName('')
        }
      }
    } else {
      setEventName(fileErrorData.name)
    }
    // }
  }, [group, category, department, launchDate, eventName])

  useEffect(() => {
    if (confirmClassValues && confirmClassValues.length > 0) {
      // console.log(confirmClassValues)
      setClassFormData(() => {
        return confirmClassValues.map((class1: any) => class1.value)
      })
    } else {
      setClassFormData(null)
    }
  }, [confirmClassValues])

  const goBack = () => {
    history.goBack()
    resetErrorFile()
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
    if (e) {
      setErrReset(false)
      setResetType(e)
      setIsPageModified(true)
      console.log(e)
    } else {
      setResetType('')
    }
    // setResetType(e.target.value)
    // if (e.target.value !== '') {
    //   setResetTypeError('')
    // }
  }

  const handleGroup = (e: any) => {
    if (e) {
      setErrGroup(false)
      setErrCategory(false)
      setErrDepartment(false)
      setIsPageModified(true)
      setGroup(e)
      setCategory('')
      setDepartment('')
      setDepartmentOptions([])
    } else {
      setGroup('')
      setCategory('')
      setDepartment('')
      setCategoryOptions([])
      setDepartmentOptions([])
    }
  }
  // setGroup(e.target.value)
  // if (e.target.value !== '') {
  //   setGroupError('')
  // }
  const handleCategory = (e: any) => {
    if (e) {
      setErrCategory(false)
      setErrDepartment(false)
      setCategory(e)
      setDepartment('')
    } else {
      setCategory('')
      setDepartment('')
      setDepartmentOptions([])
    }

    // setCategory(e.target.value)
    // if (e.target.value !== '') {
    //   setCategoryError('')
    // }
  }
  const handleDepartment = (e: any) => {
    if (e) {
      setErrDepartment(false)
      setDepartment(e)
    } else {
      setDepartment('')
    }

    // setDepartment(e.target.value)
    // if (e.target.value !== '') {
    //   setDepartmentError('')
    // }
  }
  const handleBuyer = (e: any) => {
    setBuyerConfirmed(false)
    const value = e.target.value
    if (value === null || value === undefined || value === '') {
      setBuyer('')
    } else {
      setErrBuyer(false)
      setBuyer(value)
      setIsPageModified(true)
    }

    // setBuyer(e)
    // if (e) {
    //   setBuyerError('')
    // }
  }

  const handleBuyingAssistant = (e: any) => {
    setBuyingAssistantConfirmed(false)
    const value = e.target.value
    if (value === null || value === undefined || value === '') {
      setBuyingAssistant('')
    } else {
      setErrBuyerAssisant(false)
      setBuyingAssistant(value)
      setIsPageModified(true)
    }
  }

  const handleOwnBrandManager = (e: any) => {
    setOwnBrandManagerConfirmed(false)
    const value = e.target.value
    if (value === null || value === undefined || value === '') {
      setOwnBrandManager('')
    } else {
      setErrOwnBrandManager(false)
      setOwnBrandManager(value)
      setIsPageModified(true)
    }
  }
  const handleSeniorBuyingManager = (e: any) => {
    setSeniorBuyingManagerConfirmed(false)
    const value = e.target.value
    if (value === null || value === undefined || value === '') {
      setSeniorBuyingManager('')
    } else {
      setErrSeniorBuyingManager(false)
      setSeniorBuyingManager(value)
      setIsPageModified(true)
    }
  }
  const handleMerchandiser = (e: any) => {
    setMerchandiserConfirmed(false)
    const value = e.target.value
    if (value === null || value === undefined || value === '') {
      setMerchandiser('')
    } else {
      setErrMerchandiser(false)
      setMerchandiser(value)
      setIsPageModified(true)
    }
  }

  const handleRangeResetManager = (e: any) => {
    setRangeResetManagerConfirmed(false)
    const value = e.target.value
    if (value === null || value === undefined || value === '') {
      setRangeResetManager('')
    } else {
      setErrRangeResetManager(false)
      setRangeResetManager(value)
      setIsPageModified(true)
    }
  }
  const handleCategoryDirector = (e: any) => {
    setCategoryDirectorConfirmed(false)
    const value = e.target.value
    if (value === null || value === undefined || value === '') {
      setCategoryDirector('')
    } else {
      setErrCategoryDirector(false)
      setCategoryDirector(value)
      setIsPageModified(true)
    }
  }
  const handleSupplyChainSpecialist = (e: any) => {
    setSupplyChainSpecialistConfirmed(false)
    const value = e.target.value
    if (value === null || value === undefined || value === '') {
      setSupplyChainSpecialist('')
    } else {
      setErrSupplyChainSpecialist(false)
      setSupplyChainSpecialist(value)
      setIsPageModified(true)
    }
  }

  const handleClearancePrice = (e: any) => {
    console.log(e.target.value)
    setClearancePriceApplied(e.target.value)
    setIsPageModified(true)
  }

  const handleStopDateCheck = (e: any) => {
    console.log(e.target.value)
    setStopDateCheck(e.target.value)
    setIsPageModified(true)
  }

  const handleStopOrder = (e: any) => {
    console.log(e.target.value)
    setStopOrder(e.target.value)
    setIsPageModified(true)
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
    if (e <= launchDate) {
      setRafDueDate(e)
      setErrRafdueDate(false)
      setRafDueDateError1('')
    }

    setIsPageModified(true)
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
    if (e > rafDueDate) {
      setErrRafdueDate(false)
      setRafDueDateError1('')
    }
    setErrLaunchDate(false)
    setLaunchError1('')
    setIsPageModified(true)
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
    setIsPageModified(true)
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
    console.log('clicked')
    let roleId = 'BUYER'
    buyer !== ''
      ? getUsersAPIByEmailAndRole &&
        getUsersAPIByEmailAndRole(roleId, buyer)
          .then((res: any) => {
            console.log('matched')
            setBuyerConfirmed(true)
            setBuyerValue(res.data.userdetails[0].user)
            setErrBuyer(false)
            setBuyerError1('')
          })
          .catch((err: any) => {
            console.log('not')
            setBuyer('')
            setBuyerConfirmed(false)
            setErrBuyer(true)
            setBuyerValue('')
            setBuyerError1(allMessages.error.emailError)
          })
      : setErrBuyer(true)
    setBuyerError1(allMessages.error.emailSearcherror)
  }

  const handleBuyingAssistantClick = () => {
    let roleId = 'BYAST'
    buyingAssistant !== ''
      ? getUsersAPIByEmailAndRole &&
        getUsersAPIByEmailAndRole(roleId, buyingAssistant)
          .then((res: any) => {
            console.log('matched')
            setBuyingAssistantConfirmed(true)
            setBuyingAssistantValue(res.data.userdetails[0].user)
          })
          .catch((err: any) => {
            console.log('not')
            setBuyingAssistant('')
            setBuyingAssistantConfirmed(false)
            setBuyingAssistantValue('')
            setErrBuyerAssisant(true)
            setBuyingAssistentError1(allMessages.error.emailError)
          })
      : setErrBuyerAssisant(true)
    setBuyingAssistentError1(allMessages.error.emailSearcherror)
  }

  const handleOwnBrandManagerClick = () => {
    let roleId = 'OWNBRM'
    ownBrandManager !== ''
      ? getUsersAPIByEmailAndRole &&
        getUsersAPIByEmailAndRole(roleId, ownBrandManager)
          .then((res) => {
            console.log('matched')
            setOwnBrandManagerConfirmed(true)
            setOwnBrandManagerValue(res.data.userdetails[0].user)
          })
          .catch((err) => {
            console.log('not')
            setOwnBrandManager('')
            setOwnBrandManagerConfirmed(false)
            setOwnBrandManagerValue('')
            setErrOwnBrandManager(true)
            setOwnBrandManagerError1(allMessages.error.emailError)
          })
      : setErrOwnBrandManager(true)
    setOwnBrandManagerError1(allMessages.error.emailSearcherror)
  }

  const handleSeniorBuyingManagerClick = () => {
    let roleId = 'SRBYM'
    seniorBuyingManager !== ''
      ? getUsersAPIByEmailAndRole &&
        getUsersAPIByEmailAndRole(roleId, seniorBuyingManager)
          .then((res) => {
            console.log('matched')
            setSeniorBuyingManagerConfirmed(true)
            setSeniorBuyingManagerValue(res.data.userdetails[0].user)
          })
          .catch((err) => {
            console.log('not')
            setSeniorBuyingManager('')
            setSeniorBuyingManagerConfirmed(false)
            setSeniorBuyingManagerValue('')
            setErrSeniorBuyingManager(true)
            setSeniorBuyingManagerError1(allMessages.error.emailError)
          })
      : setErrSeniorBuyingManager(true)
    setSeniorBuyingManagerError1(allMessages.error.emailSearcherror)
  }

  const handleMerchandiserClick = () => {
    let roleId = 'MERCH'
    merchandiser !== ''
      ? getUsersAPIByEmailAndRole &&
        getUsersAPIByEmailAndRole(roleId, merchandiser)
          .then((res) => {
            console.log('matched')
            setMerchandiserConfirmed(true)
            setMerchandiserValue(res.data.userdetails[0].user)
          })
          .catch((err) => {
            console.log('not')
            setMerchandiser('')
            setMerchandiserConfirmed(false)
            setMerchandiserValue('')
            setErrMerchandiser(true)
            setMerchandiserError1(allMessages.error.emailError)
          })
      : setErrMerchandiser(true)
    setMerchandiserError1(allMessages.error.emailSearcherror)
  }

  const handleRangeResetManagerClick = () => {
    let roleId = 'RRMNGR'
    rangeResetManager !== ''
      ? getUsersAPIByEmailAndRole &&
        getUsersAPIByEmailAndRole(roleId, rangeResetManager)
          .then((res) => {
            console.log('matched')
            setRangeResetManagerConfirmed(true)
            setRangeResetManagerValue(res.data.userdetails[0].user)
          })
          .catch((err) => {
            console.log('not')
            setRangeResetManager('')
            setRangeResetManagerConfirmed(false)
            setRangeResetManagerValue('')
            setErrRangeResetManager(true)
            setRangeResetManagerError1(allMessages.error.emailError)
          })
      : setErrRangeResetManager(true)
    setRangeResetManagerError1(allMessages.error.emailSearcherror)
  }

  const handleCategoryDirectorClick = () => {
    let roleId = 'CTDIR'
    categoryDirector !== ''
      ? getUsersAPIByEmailAndRole &&
        getUsersAPIByEmailAndRole(roleId, categoryDirector)
          .then((res) => {
            console.log('matched')
            setCategoryDirectorConfirmed(true)
            setCategoryDirectorValue(res.data.userdetails[0].user)
          })
          .catch((err) => {
            console.log('not')
            setErrCategoryDirector(true)
            setCategoryDirector('')
            setCategoryDirectorConfirmed(false)
            setCategoryDirectorValue('')
            setCategoryDirectorError1(allMessages.error.emailError)
          })
      : setErrCategoryDirector(true)
    setCategoryDirectorError1(allMessages.error.emailSearcherror)
  }

  const handleSupplyChainSpecialistClick = () => {
    let roleId = 'SCSPL'
    supplyChainSpecialist !== ''
      ? getUsersAPIByEmailAndRole &&
        getUsersAPIByEmailAndRole(roleId, supplyChainSpecialist)
          .then((res) => {
            console.log('matched')
            setSupplyChainSpecialistConfirmed(true)
            setSupplyChainSpecialistValue(res.data.userdetails[0].user)
          })
          .catch((err) => {
            console.log('not')
            setSupplyChainSpecialist('')
            setErrSupplyChainSpecialist(true)
            setSupplyChainSpecialistConfirmed(false)
            setSupplyChainSpecialistValue('')
            setSupChainSpecialistError1(allMessages.error.emailError)
          })
      : setErrSupplyChainSpecialist(true)
    setSupChainSpecialistError1(allMessages.error.emailSearcherror)
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

  // const validateResetType = () => {
  //   if (!resetType) {
  //     setResetTypeError('Please select a reset type')
  //     return false
  //   } else {
  //     return true
  //   }
  // }

  // const validateDepartment = () => {
  //   if (!department) {
  //     setDepartmentError('Please select a department')
  //     return false
  //   } else {
  //     return true
  //   }
  // }

  // const validateGroup = () => {
  //   if (!group) {
  //     setGroupError('Please select a group')
  //     return false
  //   } else {
  //     return true
  //   }
  // }

  // const validateCategory = () => {
  //   if (!category) {
  //     setCategoryError('Please select a category')
  //     return false
  //   } else {
  //     return true
  //   }
  // }

  // const validateBuyer = () => {
  //   if (!buyer) {
  //     setBuyerError('Please select a Buyer')
  //     return false
  //   } else {
  //     return true
  //   }
  // }

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

  const checkForm = async (btnName: string) => {
    let flag = 1
    if (!resetType || resetType === null || resetType === undefined) {
      flag = 0
      setErrReset(true)
      setResetError1(allMessages.error.noRequestType)
      focusResetType.current.focus()
    }
    if (resetType.value === 'rapid' && !rafDueDate) {
      flag = 0
      setErrRafdueDate(true)
      setRafDueDateError1(allMessages.error.noRafDueDate)
    }
    if (!group || group === null || group === undefined) {
      flag = 0
      setErrGroup(true)
      settradingGError1(allMessages.error.noTradingGroup)
      focusGroup.current.focus()
    }
    if (!category || category === null || category === undefined) {
      flag = 0
      setErrCategory(true)
      setCategoryGError1(allMessages.error.noCategory)
      focusCategory.current.focus()
    }
    if (!department || department === null || department === undefined) {
      flag = 0
      setErrDepartment(true)
      setDepartmentError1(allMessages.error.noDepartment)
      focusDepartment.current.focus()
    }
    if (!launchDate || launchDate === null || launchDate === undefined) {
      flag = 0
      setErrLaunchDate(true)
      setLaunchError1(allMessages.error.noLaunchDate)
      focusLaunchDate.current.focus()
    }
    if (
      !buyer ||
      buyer === null ||
      buyer === undefined ||
      buyerConfirmed === false
    ) {
      flag = 0
      setErrBuyer(true)
      setBuyerError1(allMessages.error.emailSearcherror)
      focusBuyer.current.focus()
    }
    // if (buyerConfirmed === false && buyer !== '') {
    //   flag = 0
    //   setErrBuyer(true)
    //   setBuyerError1(allMessages.error.emailSearcherror)
    // }
    if (
      !buyingAssistant ||
      buyingAssistant === null ||
      buyingAssistant === undefined ||
      buyingAssistantConfirmed === false
    ) {
      flag = 0
      setErrBuyerAssisant(true)
      setBuyingAssistentError1(allMessages.error.emailSearcherror)
      focusBuyingAssistant.current.focus()
    }
    // if (buyingAssistantConfirmed === false) {
    //   flag = 0
    //   setErrBuyerAssisant(true)
    //   setBuyingAssistentError1('please search buying assitant')
    // }

    if (
      !ownBrandManager ||
      ownBrandManager === null ||
      ownBrandManager === undefined ||
      buyingAssistantConfirmed === false
    ) {
      flag = 0
      setErrOwnBrandManager(true)
      setOwnBrandManagerError1(allMessages.error.emailSearcherror)
      focusOwnBrandManager.current.focus()
    }
    // if (ownBrandManagerConfirmed === false) {
    //   flag = 0
    //   setErrOwnBrandManager(true)
    //   setOwnBrandManagerError1('search own brande manager')
    // }
    if (
      !seniorBuyingManager ||
      seniorBuyingManager === null ||
      seniorBuyingManager === undefined ||
      seniorBuyingManagerConfirmed === false
    ) {
      flag = 0
      setErrSeniorBuyingManager(true)
      setSeniorBuyingManagerError1(allMessages.error.emailSearcherror)
      focusSeniorBuyingManager.current.focus()
    }
    // if (seniorBuyingManagerConfirmed === false) {
    //   flag = 0
    //   setErrSeniorBuyingManager(true)
    //   setSeniorBuyingManagerError1('Please search senior buying manager')
    // }
    if (
      !merchandiser ||
      merchandiser === null ||
      merchandiser === undefined ||
      merchandiserConfirmed === false
    ) {
      flag = 0
      setErrMerchandiser(true)
      setMerchandiserError1(allMessages.error.emailSearcherror)
      focusMerchandiser.current.focus()
    }
    // if (merchandiserConfirmed === false) {
    //   flag = 0
    //   setErrMerchandiser(true)
    //   setMerchandiserError1('Please search merchandiser')
    // }
    if (
      !rangeResetManager ||
      rangeResetManager === null ||
      rangeResetManager === undefined ||
      rangeResetManagerConfirmed === false
    ) {
      flag = 0
      setErrRangeResetManager(true)
      setRangeResetManagerError1(allMessages.error.emailSearcherror)
      focusRangeRestManager.current.focus()
    }
    // if (rangeResetManagerConfirmed === false) {
    //   flag = 0
    //   setErrRangeResetManager(true)
    //   setRangeResetManagerError1('Please search range reset manager')
    // }
    if (
      !categoryDirector ||
      categoryDirector === null ||
      categoryDirector === undefined ||
      categoryDirectorConfirmed === false
    ) {
      flag = 0
      setErrCategoryDirector(true)
      setCategoryDirectorError1(allMessages.error.emailSearcherror)
      focusCategoryDirector.current.focus()
    }
    // if (categoryDirectorConfirmed === false) {
    //   flag = 0
    //   setErrCategoryDirector(true)
    //   setCategoryDirectorError1('Please search category director')
    // }
    if (
      !supplyChainSpecialist ||
      supplyChainSpecialist === null ||
      supplyChainSpecialist === undefined ||
      supplyChainSpecialistConfirmed === false
    ) {
      flag = 0
      setErrSupplyChainSpecialist(true)
      setSupChainSpecialistError1(allMessages.error.emailSearcherror)
      focusSupplyChainSpecialist.current.focus()
    }
    // if (supplyChainSpecialistConfirmed === false) {
    //   flag = 0
    //   setErrSupplyChainSpecialist(true)
    //   setSupChainSpecialistError1('Please search supply chain specialist')
    // }
    if (flag === 1 && btnName === 'save') {
      setToastRemove('save')
      // setCancelOpenApprove(true)
      setCancelOpenSave(true)
    }
    if (flag === 1 && btnName === 'create') {
      setToastRemove('create')
      setCancelOpenApprove(true)
    }
  }

  const handleToaster = () => {
    if (toastRemove === 'save') {
      history.push(`${DEFAULT}${RANGEAMEND_MANAGE}`)
    } else if (toastRemove === 'create') {
      // history.push(`${DEFAULT}${RANGEAMEND_MANAGE_TASK}`)
      history.push(`${DEFAULT}${RANGEAMEND_MANAGE}`)
    } else {
      history.push(`${DEFAULT}`)
    }
  }

  // useEffect(() => {
  //   if (resetType.value !== 'rapid') {
  //     setErrRafdueDate(false)
  //     setRafDueDateError1('')
  //   }
  //   if (resetType.value === 'rapid' && rafDueDate !== '') {
  //     setErrRafdueDate(false)
  //     setRafDueDateError1('')
  //   }
  // }, [resetType, rafDueDate])

  const handleSaveAfterDialog = (e: any) => {
    e.preventDefault()
    checkForm('save')
  }
  const handleCancelSave = (e: any) => {
    e.preventDefault()
    setCancelOpenSave((p) => !p)
  }
  const handleCreateSave = (e: any) => {
    setIsProgressLoader(true)
    const formData = {
      rangeResets: [
        {
          // uniqueId: uniqueId,
          resetType: resetType.value,
          tradeGroup: group.groupName,
          categoryId: category.categoryId,
          category: category.categoryName,
          department: department.departmentName,
          departmentId: department.departmentId,
          targetDate: `${launchDate} ${'01:00:00.00'}`,
          appDueDate: rafDueDate ? `${rafDueDate} ${'01:00:00.00'}` : null,
          name: eventName,
          planogramClass: classFormData
            ? {
                className: classFormData,
              }
            : null,
          storeWasteProcessTiming: storeWasteProcess.value
            ? storeWasteProcess.value
            : '',
          // buyer: buyer,
          buyerId: buyerValue.userId,
          buyerEmailId: buyerValue.emailId,
          buyer: buyerValue.middleName
            ? `${buyerValue.firstName} ${buyerValue.middleName} ${buyerValue.lastName}`
            : `${buyerValue.firstName} ${buyerValue.lastName}`,
          buyerAssistantId: buyingAssistantValue.userId,
          buyerAssistantEmailId: buyingAssistantValue.emailId,
          buyerAssistant: buyingAssistantValue.middleName
            ? `${buyingAssistantValue.firstName} ${buyingAssistantValue.middleName} ${buyingAssistantValue.lastName}`
            : `${buyingAssistantValue.firstName} ${buyingAssistantValue.lastName}`,
          ownBrandManagerId: ownBrandManagerValue.userId,
          ownBrandManagerEmailId: ownBrandManagerValue.emailId,
          ownBrandManager: ownBrandManagerValue.middleName
            ? `${ownBrandManagerValue.firstName} ${ownBrandManagerValue.middleName} ${ownBrandManagerValue.lastName}`
            : `${ownBrandManagerValue.firstName} ${ownBrandManagerValue.lastName}`,
          seniorBuyingManagerId: seniorBuyingManagerValue.userId,
          seniorBuyingManagerEmailId: seniorBuyingManagerValue.emailId,
          seniorBuyingManager: seniorBuyingManagerValue.middleName
            ? `${seniorBuyingManagerValue.firstName} ${seniorBuyingManagerValue.middleName} ${seniorBuyingManagerValue.lastName}`
            : `${seniorBuyingManagerValue.firstName} ${seniorBuyingManagerValue.lastName}`,
          merchandiserId: merchandiserValue.userId,
          merchandiserEmailId: merchandiserValue.emailId,
          merchandiser: merchandiserValue.middleName
            ? `${merchandiserValue.firstName} ${merchandiserValue.middleName} ${merchandiserValue.lastName}`
            : `${merchandiserValue.firstName} ${merchandiserValue.lastName}`,
          rangeResetManagerId: rangeResetManagerValue.userId,
          rangeResetManagerEmailId: rangeResetManagerValue.emailId,
          rangeResetManager: rangeResetManagerValue.middleName
            ? `${rangeResetManagerValue.firstName} ${rangeResetManagerValue.middleName} ${rangeResetManagerValue.lastName}`
            : `${rangeResetManagerValue.firstName} ${rangeResetManagerValue.lastName}`,
          categoryDirectorId: categoryDirectorValue.userId,
          categoryDirectorEmailId: categoryDirectorValue.emailId,
          categoryDirector: categoryDirectorValue.middleName
            ? `${categoryDirectorValue.firstName} ${categoryDirectorValue.middleName} ${categoryDirectorValue.lastName}`
            : `${categoryDirectorValue.firstName} ${categoryDirectorValue.lastName}`,
          supplyChainAnalystId: supplyChainSpecialistValue.userId,
          supplyChainAnalystEmailId: supplyChainSpecialistValue.emailId,
          supplyChainAnalyst: supplyChainSpecialistValue.middleName
            ? `${supplyChainSpecialistValue.firstName} ${supplyChainSpecialistValue.middleName} ${supplyChainSpecialistValue.lastName}`
            : `${supplyChainSpecialistValue.firstName} ${supplyChainSpecialistValue.lastName}`,
          clearancePriceApplied: clearancePriceApplied,
          orderStopDateCheck: orderStopDateCheck,
          stopOrder: stopOrder,
          fileName: 'string',
          createdById: userDetail && userDetail.userdetails[0].user.userId,
          createdByName:
            userDetail && userDetail.userdetails[0].user.middleName
              ? `${userDetail.userdetails[0].user.firstName} ${userDetail.userdetails[0].user.middleName} ${userDetail.userdetails[0].user.lastName}`
              : `${userDetail.userdetails[0].user.firstName} ${userDetail.userdetails[0].user.lastName}`,
        },
      ],
    }
    console.log(formData)

    patchRangeResetEvents(formData)
      .then((res: any) => {
        setIsSuccessCall(false)
        // let newVal = [formData.rangeResets[0], ...fileData]
        // setFile(newVal)
        console.log(res.data)
        // if (errorCheck && errorCheck > -1) {
        if (fileErrorData) {
          if (
            res.data[0].status.toLowerCase() === 'draft' ||
            res.data[0].status.toLowerCase() === 'confirmed'
          ) {
            setDisabled(true)
            let newVal = [res.data[0], ...fileData]
            let _tasks = newVal.filter(
              (value: any) => fileErrorData.errorId !== value.errorId
            )
            setFile(_tasks)
            toast.current.show({
              severity: 'success',
              summary: 'Success',
              // detail: `Event ${res.data[0].audit[0].action} at ${res.data[0].audit[0].at}`,
              life: life,
              className: 'login-toast',
            })
          } else if (res.data[0].status.toLowerCase() === 'duplicate') {
            toast.current.show({
              severity: 'error',
              summary: 'Duplicate Event',
              // detail: `Event ${res.data[0].audit[0].action} at ${res.data[0].audit[0].at}`,
              life: life,
              className: 'login-toast',
            })
            setDisabled(false)
          } else {
            console.log()
            // setErrorData(res.data[0])
            setDisabled(false)
            checkForErrors(res.data[0])
          }
        } else {
          if (
            res.data[0].status.toLowerCase() === 'draft' ||
            res.data[0].status.toLowerCase() === 'confirmed'
          ) {
            setDisabled(true)
            toast.current.show({
              severity: 'success',
              summary: 'Success',
              // detail: `Event ${res.data[0].audit[0].action} at ${res.data[0].audit[0].at}`,
              life: life,
              className: 'login-toast',
            })
          } else if (res.data[0].status.toLowerCase() === 'duplicate') {
            toast.current.show({
              severity: 'error',
              summary: 'Duplicate Event',
              // detail: `Event ${res.data[0].audit[0].action} at ${res.data[0].audit[0].at}`,
              life: life,
              className: 'login-toast',
            })
            setDisabled(false)
          } else {
            setDisabled(false)
            checkForErrors(res.data[0])
          }
        }
        setIsProgressLoader(false)
      })
      .catch((err: any) => {
        setIsSuccessCall(false)
        setIsProgressLoader(false)
        setDisabled(false)
        console.log(err)
        toast.current.show({
          severity: 'error',
          summary: 'Error!',
          // detail: err.response.data.errorMessage,
          life: life,
          className: 'login-toast',
        })
      })
    // history.push({
    //   pathname: `${DEFAULT}${RANGEAMEND_MANAGE_TASK}`,
    //   search: `?event=${formData['eventName']}`, // query string
    //   state: {
    //     // location state
    //     data: formData,
    //   },
    // })
    // } else {
    //   console.log('fail')
    //   toast.current.show({
    //     severity: 'error',
    //     summary: '',
    //     detail: 'Please fill all the essential fields',
    //     life: 2000,
    //   })
    // }
  }

  useEffect(() => {
    console.log(isSuccessCall)
  }, [isSuccessCall])
  const handleBack = (e: any) => {
    e.preventDefault()
    setBack((p) => !p)
  }
  const viewConfirmSave = (
    <ConfirmBox
      cancelOpen={cancelOpenSave}
      handleCancel={handleCancelSave}
      handleProceed={handleCreateSave}
      label1="Are you sure to Save?"
      label2="Please click Ok to proceed"
    />
  )
  const viewConfirmBack = (
    <ConfirmBox
      cancelOpen={back}
      handleCancel={handleBack}
      handleProceed={goBack}
      label1="Sure to go Back?"
      label2="All your data will be lost"
    />
  )

  const handleCreateAfterDialog = (e: any) => {
    e.preventDefault()
    checkForm('create')
  }
  const handleCancelCreate = (e: any) => {
    e.preventDefault()
    setCancelOpenApprove((p) => !p)
  }

  const handleCreateEvent = () => {
    setIsProgressLoader(true)
    const formData = {
      rangeResets: [
        {
          // uniqueId: uniqueId,
          resetType: resetType.value,
          tradeGroup: group.groupName,
          categoryId: category.categoryId,
          category: category.categoryName,
          department: department.departmentName,
          departmentId: department.departmentId,
          targetDate: `${launchDate} ${'01:00:00.00'}`,
          appDueDate: rafDueDate ? `${rafDueDate} ${'01:00:00.00'}` : null,
          name: eventName,
          planogramClass: {
            className: classFormData ? classFormData : [],
          },
          storeWasteProcessTiming: storeWasteProcess.value
            ? storeWasteProcess.value
            : '',
          // buyer: buyer,
          buyerId: buyerValue.userId,
          buyerEmailId: buyerValue.emailId,
          buyer: buyerValue.middleName
            ? `${buyerValue.firstName} ${buyerValue.middleName} ${buyerValue.lastName}`
            : `${buyerValue.firstName} ${buyerValue.lastName}`,
          buyerAssistantId: buyingAssistantValue.userId,
          buyerAssistantEmailId: buyingAssistantValue.emailId,
          buyerAssistant: buyingAssistantValue.middleName
            ? `${buyingAssistantValue.firstName} ${buyingAssistantValue.middleName} ${buyingAssistantValue.lastName}`
            : `${buyingAssistantValue.firstName} ${buyingAssistantValue.lastName}`,
          ownBrandManagerId: ownBrandManagerValue.userId,
          ownBrandManagerEmailId: ownBrandManagerValue.emailId,
          ownBrandManager: ownBrandManagerValue.middleName
            ? `${ownBrandManagerValue.firstName} ${ownBrandManagerValue.middleName} ${ownBrandManagerValue.lastName}`
            : `${ownBrandManagerValue.firstName} ${ownBrandManagerValue.lastName}`,
          seniorBuyingManagerId: seniorBuyingManagerValue.userId,
          seniorBuyingManagerEmailId: seniorBuyingManagerValue.emailId,
          seniorBuyingManager: seniorBuyingManagerValue.middleName
            ? `${seniorBuyingManagerValue.firstName} ${seniorBuyingManagerValue.middleName} ${seniorBuyingManagerValue.lastName}`
            : `${seniorBuyingManagerValue.firstName} ${seniorBuyingManagerValue.lastName}`,
          merchandiserId: merchandiserValue.userId,
          merchandiserEmailId: merchandiserValue.emailId,
          merchandiser: merchandiserValue.middleName
            ? `${merchandiserValue.firstName} ${merchandiserValue.middleName} ${merchandiserValue.lastName}`
            : `${merchandiserValue.firstName} ${merchandiserValue.lastName}`,
          rangeResetManagerId: rangeResetManagerValue.userId,
          rangeResetManagerEmailId: rangeResetManagerValue.emailId,
          rangeResetManager: rangeResetManagerValue.middleName
            ? `${rangeResetManagerValue.firstName} ${rangeResetManagerValue.middleName} ${rangeResetManagerValue.lastName}`
            : `${rangeResetManagerValue.firstName} ${rangeResetManagerValue.lastName}`,
          categoryDirectorId: categoryDirectorValue.userId,
          categoryDirectorEmailId: categoryDirectorValue.emailId,
          categoryDirector: categoryDirectorValue.middleName
            ? `${categoryDirectorValue.firstName} ${categoryDirectorValue.middleName} ${categoryDirectorValue.lastName}`
            : `${categoryDirectorValue.firstName} ${categoryDirectorValue.lastName}`,
          supplyChainAnalystId: supplyChainSpecialistValue.userId,
          supplyChainAnalystEmailId: supplyChainSpecialistValue.emailId,
          supplyChainAnalyst: supplyChainSpecialistValue.middleName
            ? `${supplyChainSpecialistValue.firstName} ${supplyChainSpecialistValue.middleName} ${supplyChainSpecialistValue.lastName}`
            : `${supplyChainSpecialistValue.firstName} ${supplyChainSpecialistValue.lastName}`,
          clearancePriceApplied: clearancePriceApplied,
          orderStopDateCheck: orderStopDateCheck,
          stopOrder: stopOrder,
          fileName: 'string',
          createdById: userDetail && userDetail.userdetails[0].user.userId,
          createdByName:
            userDetail && userDetail.userdetails[0].user.middleName
              ? `${userDetail.userdetails[0].user.firstName} ${userDetail.userdetails[0].user.middleName} ${userDetail.userdetails[0].user.lastName}`
              : `${userDetail.userdetails[0].user.firstName} ${userDetail.userdetails[0].user.lastName}`,
        },
      ],
    }
    console.log(formData)

    patchRangeResetEvents(formData)
      .then((res: any) => {
        setDisabled(true)
        setIsSuccessCall(false)
        setIsProgressLoader(false)
        // let newVal = [formData.rangeResets[0], ...fileData]
        // setFile(newVal)
        console.log(res.data)
        // if (errorCheck && errorCheck > -1) {
        if (fileErrorData) {
          if (
            res.data[0].status.toLowerCase() === 'draft' ||
            res.data[0].status.toLowerCase() === 'confirmed'
          ) {
            let newVal = [res.data[0], ...fileData]
            let _tasks = newVal.filter(
              (value: any) => fileErrorData.errorId !== value.errorId
            )
            setFile(_tasks)

            const formdata1 = {
              requests: [
                {
                  submitType: 'new',
                  eventId: res.data[0].id,
                  eventStatus: res.data[0].status,
                  requester: {
                    persona:
                      userDetail && userDetail.userdetails[0].user.middleName
                        ? `${userDetail.userdetails[0].user.firstName} ${userDetail.userdetails[0].user.middleName} ${userDetail.userdetails[0].user.lastName}`
                        : `${userDetail.userdetails[0].user.firstName} ${userDetail.userdetails[0].user.lastName}`,
                    details: {
                      emailId:
                        userDetail && userDetail.userdetails[0].user.emailId,
                      userId:
                        userDetail && userDetail.userdetails[0].user.userId,
                      name:
                        userDetail && userDetail.userdetails[0].user.middleName
                          ? `${userDetail.userdetails[0].user.firstName} ${userDetail.userdetails[0].user.middleName} ${userDetail.userdetails[0].user.lastName}`
                          : `${userDetail.userdetails[0].user.firstName} ${userDetail.userdetails[0].user.lastName}`,
                    },
                    roles:
                      userDetail &&
                      userDetail.userdetails[0].roles.map((role: any) => {
                        return {
                          roleId: role.roleId,
                        }
                      }),
                    usergroups:
                      userDetail &&
                      userDetail.userdetails[0].usergroups.map((group: any) => {
                        return {
                          groupId: group.groupId,
                          status: group.status,
                        }
                      }),
                  },
                  eventHeader: {
                    resetType: res.data[0].resetType,
                    rafAppDueDate: res.data[0].appDueDate,
                    eventLaunchDate: res.data[0].targetDate,
                    eventName: res.data[0].name,
                    eventHierarchy: {
                      tradingGroup: res.data[0].tradeGroup,
                      category: res.data[0].category,
                      department: res.data[0].department,
                    },
                    inventoryControl: {
                      planogramClass: res.data[0].planogramClass.className,
                      storeWastetiming: res.data[0].wastageRange,
                      orderStopDateCheckRequired: res.data[0].orderStopDateheck,
                      stopOrderStockRundown: res.data[0].stopOrder,
                      clearancePriceApplied: res.data[0].clearancePriceCheck,
                    },
                    eventTeam: {
                      team: [
                        {
                          persona: 'Buyer',
                          details: {
                            emailId: res.data[0].buyerEmailId,
                            userId: res.data[0].buyerId,
                            name: res.data[0].buyer,
                          },
                        },
                        {
                          persona: 'Category Director',
                          details: {
                            emailId: res.data[0].categoryDirectorEmailId,
                            userId: res.data[0].categoryDirectorId,
                            name: res.data[0].categoryDirector,
                          },
                        },
                        {
                          persona: 'Senior Buying Manager',
                          details: {
                            emailId: res.data[0].seniorBuyingManagerEmailId,
                            userId: res.data[0].seniorBuyingManagerId,
                            name: res.data[0].seniorBuyingManager,
                          },
                        },
                        {
                          persona: 'Buying Assistant',
                          details: {
                            emailId: res.data[0].buyerAssistantEmailId,
                            userId: res.data[0].buyerAssistantId,
                            name: res.data[0].buyerAssistant,
                          },
                        },
                        {
                          persona: 'Merchandiser',
                          details: {
                            emailId: res.data[0].merchandiserEmailId,
                            userId: res.data[0].merchandiserId,
                            name: res.data[0].merchandiser,
                          },
                        },
                        {
                          persona: 'Supply Chain Specialist',
                          details: {
                            emailId: res.data[0].supplyChainAnalystEmailId,
                            userId: res.data[0].supplyChainAnalystId,
                            name: res.data[0].supplyChainAnalyst,
                          },
                        },
                        {
                          persona: 'Own Brand Manager',
                          details: {
                            emailId: res.data[0].ownBrandManagerEmailId,
                            userId: res.data[0].ownBrandManagerId,
                            name: res.data[0].ownBrandManager,
                          },
                        },
                        {
                          persona: 'Range Reset Manager',
                          details: {
                            emailId: res.data[0].rangeResetManagerEmailId,
                            userId: res.data[0].rangeResetManagerId,
                            name: res.data[0].rangeResetManager,
                          },
                        },
                      ],
                    },
                  },
                },
              ],
            }
            console.log(formdata1)

            createEventsCamunda(res.data[0].id, formdata1)
              .then((res: any) => {
                console.log(res.data)
                toast.current.show({
                  severity: 'success',
                  summary: 'Success',
                  // detail: `Event ${res.data[0].audit[0].action} at ${res.data[0].audit[0].at}`,
                  life: life,
                  className: 'login-toast',
                })
              })
              .catch((err: any) => {
                console.log(err)
                toast.current.show({
                  severity: 'error',
                  summary: 'Error',
                  // detail: `Event ${res.data[0].audit[0].action} at ${res.data[0].audit[0].at}`,
                  life: life,
                  className: 'login-toast',
                })
              })
          } else if (res.data[0].status.toLowerCase() === 'duplicate') {
            toast.current.show({
              severity: 'error',
              summary: 'Duplicate Event',
              // detail: `Event ${res.data[0].audit[0].action} at ${res.data[0].audit[0].at}`,
              life: life,
              className: 'login-toast',
            })
            setDisabled(false)
          } else {
            console.log()
            // setErrorData(res.data[0])
            setDisabled(false)
            checkForErrors(res.data[0])
          }
        } else {
          if (
            res.data[0].status.toLowerCase() === 'draft' ||
            res.data[0].status.toLowerCase() === 'confirmed'
          ) {
            const formdata1 = {
              requests: [
                {
                  submitType: 'new',
                  eventId: res.data[0].id,
                  eventStatus: res.data[0].status,
                  requester: {
                    persona:
                      userDetail && userDetail.userdetails[0].user.middleName
                        ? `${userDetail.userdetails[0].user.firstName} ${userDetail.userdetails[0].user.middleName} ${userDetail.userdetails[0].user.lastName}`
                        : `${userDetail.userdetails[0].user.firstName} ${userDetail.userdetails[0].user.lastName}`,
                    details: {
                      emailId:
                        userDetail && userDetail.userdetails[0].user.emailId,
                      userId:
                        userDetail && userDetail.userdetails[0].user.userId,
                      name:
                        userDetail && userDetail.userdetails[0].user.middleName
                          ? `${userDetail.userdetails[0].user.firstName} ${userDetail.userdetails[0].user.middleName} ${userDetail.userdetails[0].user.lastName}`
                          : `${userDetail.userdetails[0].user.firstName} ${userDetail.userdetails[0].user.lastName}`,
                    },
                    roles:
                      userDetail &&
                      userDetail.userdetails[0].roles.map((role: any) => {
                        return {
                          roleId: role.roleId,
                        }
                      }),
                    usergroups:
                      userDetail &&
                      userDetail.userdetails[0].usergroups.map((group: any) => {
                        return {
                          groupId: group.groupId,
                          status: group.status,
                        }
                      }),
                  },
                  eventHeader: {
                    resetType: res.data[0].resetType,
                    rafAppDueDate: res.data[0].appDueDate,
                    eventLaunchDate: res.data[0].targetDate,
                    eventName: res.data[0].name,
                    eventHierarchy: {
                      tradingGroup: res.data[0].tradeGroup,
                      category: res.data[0].category,
                      department: res.data[0].department,
                    },
                    inventoryControl: {
                      planogramClass: res.data[0].planogramClass.className,
                      storeWastetiming: res.data[0].wastageRange,
                      orderStopDateCheckRequired: res.data[0].orderStopDateheck,
                      stopOrderStockRundown: res.data[0].stopOrder,
                      clearancePriceApplied: res.data[0].clearancePriceCheck,
                    },
                    eventTeam: {
                      team: [
                        {
                          persona: 'Buyer',
                          details: {
                            emailId: res.data[0].buyerEmailId,
                            userId: res.data[0].buyerId,
                            name: res.data[0].buyer,
                          },
                        },
                        {
                          persona: 'Category Director',
                          details: {
                            emailId: res.data[0].categoryDirectorEmailId,
                            userId: res.data[0].categoryDirectorId,
                            name: res.data[0].categoryDirector,
                          },
                        },
                        {
                          persona: 'Senior Buying Manager',
                          details: {
                            emailId: res.data[0].seniorBuyingManagerEmailId,
                            userId: res.data[0].seniorBuyingManagerId,
                            name: res.data[0].seniorBuyingManager,
                          },
                        },
                        {
                          persona: 'Buying Assistant',
                          details: {
                            emailId: res.data[0].buyerAssistantEmailId,
                            userId: res.data[0].buyerAssistantId,
                            name: res.data[0].buyerAssistant,
                          },
                        },
                        {
                          persona: 'Merchandiser',
                          details: {
                            emailId: res.data[0].merchandiserEmailId,
                            userId: res.data[0].merchandiserId,
                            name: res.data[0].merchandiser,
                          },
                        },
                        {
                          persona: 'Supply Chain Specialist',
                          details: {
                            emailId: res.data[0].supplyChainAnalystEmailId,
                            userId: res.data[0].supplyChainAnalystId,
                            name: res.data[0].supplyChainAnalyst,
                          },
                        },
                        {
                          persona: 'Own Brand Manager',
                          details: {
                            emailId: res.data[0].ownBrandManagerEmailId,
                            userId: res.data[0].ownBrandManagerId,
                            name: res.data[0].ownBrandManager,
                          },
                        },
                        {
                          persona: 'Range Reset Manager',
                          details: {
                            emailId: res.data[0].rangeResetManagerEmailId,
                            userId: res.data[0].rangeResetManagerId,
                            name: res.data[0].rangeResetManager,
                          },
                        },
                      ],
                    },
                  },
                },
              ],
            }
            console.log(formdata1)

            createEventsCamunda(res.data[0].id, formdata1)
              .then((res: any) => {
                console.log(res.data)
                toast.current.show({
                  severity: 'success',
                  summary: 'Success',
                  // detail: `Event ${res.data[0].audit[0].action} at ${res.data[0].audit[0].at}`,
                  life: life,
                  className: 'login-toast',
                })
              })
              .catch((err: any) => {
                console.log(err)
                toast.current.show({
                  severity: 'error',
                  summary: 'Error',
                  // detail: `Event ${res.data[0].audit[0].action} at ${res.data[0].audit[0].at}`,
                  life: life,
                  className: 'login-toast',
                })
              })
          } else if (res.data[0].status.toLowerCase() === 'duplicate') {
            toast.current.show({
              severity: 'error',
              summary: 'Duplicate Event',
              // detail: `Event ${res.data[0].audit[0].action} at ${res.data[0].audit[0].at}`,
              life: life,
              className: 'login-toast',
            })
            setDisabled(false)
          } else {
            console.log()
            // setErrorData(res.data[0])
            setDisabled(false)
            checkForErrors(res.data[0])
          }
        }
      })
      .catch((err: any) => {
        setIsSuccessCall(false)
        setIsProgressLoader(false)
        setDisabled(false)
        console.log(err)
        toast.current.show({
          severity: 'error',
          summary: 'Error!',
          // detail: err.response.data.errorMessage,
          life: life,
          className: 'login-toast',
        })
      })
  }

  const viewConfirmCreate = (
    <ConfirmBox
      cancelOpen={cancelOpenApprove}
      handleCancel={handleCancelCreate}
      handleProceed={handleCreateEvent}
      label1="Are you sure to Create?"
      label2="Please click Ok to proceed"
    />
  )

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

                      {/* <Select
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
                      </Select> */}

                      <AutocompleteSelect
                        value={resetType}
                        options={resetOptions}
                        onChange={handleResetType}
                        placeholder="Select Reset Type"
                        ref={focusResetType}
                      />

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
                        onChange={(e: any) => {
                          handleRafDueDate(e.toISOString().split('T')[0])
                        }}
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
                      {/* <br />
                      <div
                        className={classes.errorMessage}
                        ref={focusRafDueDate}
                      >
                        {rafDueDateError}
                      </div> */}

                      <br />
                      {errRafDueDate && (
                        <span className={classes.errorMessageColor}>
                          {rafDueDateError1}
                        </span>
                      )}
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

                      {/* <Select
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
                        // classes={{
                        //   select: classes.text,
                        // }}
                      >
                        {groupOptions &&
                          groupOptions.map((type: any) => {
                            return (
                              <MenuItem
                                value={type.value}
                                key={type.value}
                                className={classes.muiSelect}
                                classes={{
                                  selected: classes.selectColor,
                                }}
                              >
                                {type.label}
                              </MenuItem>
                            )
                          })}
                      </Select> */}

                      <AutocompleteSelect
                        value={group}
                        options={groupOptions}
                        onChange={handleGroup}
                        placeholder="Select Trading Group"
                        ref={focusGroup}
                      />

                      {errGroup && (
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

                      {/* <Select
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
                      </Select> */}

                      <AutocompleteSelect
                        value={category}
                        options={categoryOptions}
                        onChange={handleCategory}
                        placeholder="Select Category"
                        isDisabled={categoryOptions.length > 0 ? false : true}
                        ref={focusCategory}
                      />

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

                      {/* <Select
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
                      </Select> */}

                      <AutocompleteSelect
                        value={department}
                        options={departmentOptions}
                        onChange={handleDepartment}
                        placeholder="Select Department"
                        isDisabled={departmentOptions.length > 0 ? false : true}
                        ref={focusDepartment}
                      />

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
                        onChange={(e: any) => {
                          handleLaunchDate(e.toISOString().split('T')[0])
                        }}
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

                      {/* <Select
                        value={toreWasteProcess}
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
                      </Select> */}

                      <AutocompleteSelect
                        value={storeWasteProcess}
                        options={wastageRanges}
                        onChange={(e: any) => {
                          console.log(e)
                          setStoreWasteProcess(e)
                          setIsPageModified(true)
                        }}
                        placeholder="Select Store Waste Process Timing"
                      />
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

                  <Grid
                    container
                    item
                    xl={7}
                    lg={7}
                    md={7}
                    sm={7}
                    xs={12}
                    // spacing={2}
                  >
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

                    <Grid item xl={11} lg={11} md={11} sm={10} xs={10}>
                      <Typography variant="subtitle2" color="primary">
                        <SearchSelect
                          value={buyer}
                          // onChange={(e: any) => setBuyer(e.target.value)}
                          onChange={handleBuyer}
                          placeholder="Search Buyer"
                          onClick={handleBuyerClick}
                          ref={focusBuyer}
                        />
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xl={1}
                      lg={1}
                      md={1}
                      sm={2}
                      xs={2}
                      style={{ textAlign: 'center' }}
                    >
                      <ConfirmCheckSign confirmValue={buyerConfirmed} />
                    </Grid>
                    <Typography variant="subtitle2" color="primary">
                      {errBuyer && (
                        <span className={classes.errorMessageColor}>
                          {buyerError1}
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

                  <Grid item container xl={7} lg={7} md={7} sm={7} xs={12}>
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
                    <Grid item xl={11} lg={11} md={11} sm={10} xs={10}>
                      <Typography variant="subtitle2" color="primary">
                        <SearchSelect
                          value={categoryDirector}
                          // onChange={(e: any) => console.log(e.target.value)}
                          onChange={handleCategoryDirector}
                          placeholder="Search Category Director"
                          onClick={handleCategoryDirectorClick}
                          ref={focusCategoryDirector}
                        />
                      </Typography>
                    </Grid>

                    <Grid
                      item
                      xl={1}
                      lg={1}
                      md={1}
                      sm={2}
                      xs={2}
                      style={{ textAlign: 'center' }}
                    >
                      <ConfirmCheckSign
                        confirmValue={categoryDirectorConfirmed}
                      />
                    </Grid>

                    <Typography variant="subtitle2" color="primary">
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
                      Senior Buying Manager
                      {requiredStar}
                    </Typography>
                  </Grid>

                  <Grid item container xl={7} lg={7} md={7} sm={7} xs={12}>
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
                    <Grid item xl={11} lg={11} md={11} sm={10} xs={10}>
                      <Typography variant="subtitle2" color="primary">
                        <SearchSelect
                          value={seniorBuyingManager}
                          // onChange={(e: any) => console.log(e.target.value)}
                          onChange={handleSeniorBuyingManager}
                          placeholder="Search Senior Buying Manager"
                          onClick={handleSeniorBuyingManagerClick}
                          ref={focusSeniorBuyingManager}
                        />
                      </Typography>
                    </Grid>

                    <Grid
                      item
                      xl={1}
                      lg={1}
                      md={1}
                      sm={2}
                      xs={2}
                      style={{ textAlign: 'center' }}
                    >
                      <ConfirmCheckSign
                        confirmValue={seniorBuyingManagerConfirmed}
                      />
                    </Grid>

                    <Typography variant="subtitle2" color="primary">
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
                      Buying Assistant
                      {requiredStar}
                    </Typography>
                  </Grid>

                  <Grid item container xl={7} lg={7} md={7} sm={7} xs={12}>
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
                    <Grid item xl={11} lg={11} md={11} sm={10} xs={10}>
                      <Typography variant="subtitle2" color="primary">
                        <SearchSelect
                          value={buyingAssistant}
                          // onChange={(e: any) => console.log(e.target.value)}
                          onChange={handleBuyingAssistant}
                          placeholder="Search Buying Assistant"
                          onClick={handleBuyingAssistantClick}
                          ref={focusBuyingAssistant}
                        />
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xl={1}
                      lg={1}
                      md={1}
                      sm={2}
                      xs={2}
                      style={{ textAlign: 'center' }}
                    >
                      <ConfirmCheckSign
                        confirmValue={buyingAssistantConfirmed}
                      />
                    </Grid>
                    <Typography variant="subtitle2" color="primary">
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
                      Merchandiser
                      {requiredStar}
                    </Typography>
                  </Grid>

                  <Grid item container xl={7} lg={7} md={7} sm={7} xs={12}>
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
                    <Grid item xl={11} lg={11} md={11} sm={10} xs={10}>
                      <Typography variant="subtitle2" color="primary">
                        <SearchSelect
                          value={merchandiser}
                          // onChange={(e: any) => console.log(e.target.value)}
                          onChange={handleMerchandiser}
                          placeholder="Search Merchandiser"
                          onClick={handleMerchandiserClick}
                          ref={focusMerchandiser}
                        />
                      </Typography>
                    </Grid>

                    <Grid
                      item
                      xl={1}
                      lg={1}
                      md={1}
                      sm={2}
                      xs={2}
                      style={{ textAlign: 'center' }}
                    >
                      <ConfirmCheckSign confirmValue={merchandiserConfirmed} />
                    </Grid>

                    <Typography variant="subtitle2" color="primary">
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
                      Supply Chain Specialist
                      {requiredStar}
                    </Typography>
                  </Grid>

                  <Grid item container xl={7} lg={7} md={7} sm={7} xs={12}>
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
                    <Grid item xl={11} lg={11} md={11} sm={10} xs={10}>
                      <Typography variant="subtitle2" color="primary">
                        <SearchSelect
                          value={supplyChainSpecialist}
                          // onChange={(e: any) => console.log(e.target.value)}
                          onChange={handleSupplyChainSpecialist}
                          placeholder="Search Supply Chain Specialist"
                          onClick={handleSupplyChainSpecialistClick}
                          ref={focusSupplyChainSpecialist}
                        />
                      </Typography>
                    </Grid>

                    <Grid
                      item
                      xl={1}
                      lg={1}
                      md={1}
                      sm={2}
                      xs={2}
                      style={{ textAlign: 'center' }}
                    >
                      <ConfirmCheckSign
                        confirmValue={supplyChainSpecialistConfirmed}
                      />
                    </Grid>

                    <Typography variant="subtitle2" color="primary">
                      {errSupplyChainSpecialist && (
                        <span className={classes.errorMessageColor}>
                          {supChainSpecialistError1}
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

                  <Grid item container xl={7} lg={7} md={7} sm={7} xs={12}>
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
                    <Grid item xl={11} lg={11} md={11} sm={10} xs={10}>
                      <Typography variant="subtitle2" color="primary">
                        <SearchSelect
                          value={ownBrandManager}
                          // onChange={(e: any) => console.log(e.target.value)}
                          onChange={handleOwnBrandManager}
                          placeholder="Search Own Brand Manager"
                          onClick={handleOwnBrandManagerClick}
                          ref={focusOwnBrandManager}
                        />
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xl={1}
                      lg={1}
                      md={1}
                      sm={2}
                      xs={2}
                      style={{ textAlign: 'center' }}
                    >
                      <ConfirmCheckSign
                        confirmValue={ownBrandManagerConfirmed}
                      />
                    </Grid>

                    <Typography variant="subtitle2" color="primary">
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
                      Range Reset Manager
                      {requiredStar}
                    </Typography>
                  </Grid>

                  <Grid item container xl={7} lg={7} md={7} sm={7} xs={12}>
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
                    <Grid item xl={11} lg={11} md={11} sm={10} xs={10}>
                      <Typography variant="subtitle2" color="primary">
                        <SearchSelect
                          value={rangeResetManager}
                          // onChange={(e: any) => console.log(e.target.value)}
                          onChange={handleRangeResetManager}
                          placeholder="Search Range Reset Manager"
                          onClick={handleRangeResetManagerClick}
                          ref={focusRangeRestManager}
                        />
                      </Typography>
                    </Grid>

                    <Grid
                      item
                      xl={1}
                      lg={1}
                      md={1}
                      sm={2}
                      xs={2}
                      style={{ textAlign: 'center' }}
                    >
                      <ConfirmCheckSign
                        confirmValue={rangeResetManagerConfirmed}
                      />
                    </Grid>

                    <Typography variant="subtitle2" color="primary">
                      {errRangeResetManager && (
                        <span className={classes.errorMessageColor}>
                          {rangeResetManagerError1}
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
                        onClick={handleSaveAfterDialog}
                        size="small"
                        disabled={disabled}
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
                        onClick={handleCreateAfterDialog}
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
        <LoadingComponent showLoader={isProgressLoader} />
      </div>
    </Box>
  )

  return (
    <>
      <Prompt
        when={isPageModified && isSuccessCall}
        //when={isPageModified}
        message={allMessages.success.promptMessage}
      />
      <Toast
        ref={toast}
        position="bottom-left"
        // onRemove={() => {
        //   history.push(`${DEFAULT}${RANGEAMEND_MANAGE}`)
        // }}
        onRemove={handleToaster}
      />
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
          {viewConfirmSave}
          {viewConfirmBack}
          {viewConfirmCreate}
          {/* </Grid> */}
        </Grid>
      </Paper>
    </>
  )
}

const mapStateToProps = (state: any) => {
  return {
    userDetail: state.loginReducer.userDetail,
    fileData: state.fileReducer.fileData,
    fileErrorData: state.fileReducer.fileErrorData,
  }
}

const matchDispatchToProps = (dispatch: any) => {
  return {
    setFile: (fileData: any) => dispatch(setFile(fileData)),
    resetFile: () => dispatch(resetFile()),
    setErrorFile: (fileData: any) => dispatch(setErrorFile(fileData)),
    resetErrorFile: () => dispatch(resetErrorFile()),
  }
}

export default connect(mapStateToProps, matchDispatchToProps)(CreateEvent)
