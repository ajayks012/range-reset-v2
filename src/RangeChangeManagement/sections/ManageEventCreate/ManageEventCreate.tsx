import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {
    Buyers,
    BuyingAssistants,
    manageEventPublishCols,
    manageTaskPublishCols,
    manageTaskPublishRows,
    Merchandisers,
    OwnBrandManagers,
    RangeResetManagers,
    SeniorBuyingManagers,
    SupplyChainSpecialists,
    CategoryDirectors,
    classOptions,
} from './DataConstants'
import {
    Grid,
    useTheme,
    Typography,
    Button,
    TextField,
    Box,
    Dialog,
    Radio,
    RadioGroup,
    FormControl,
    FormControlLabel,
    useMediaQuery
} from '@material-ui/core'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from "@date-io/date-fns";
import Select from 'react-select'
import { Autocomplete, } from '@material-ui/lab'
import AutocompleteSelect from '../../components/AutoCompleteSelect/AutocompleteSelect'
import DialogHeader from '../../components/DialogHeader/DialogHeader'
import { useStyles } from './styles'
import { routes } from '../../../util/Constants'

function ManageEventCreate() {
    const location = useLocation<any>()
    const history = useHistory()
    const theme1 = useTheme()
    const small = useMediaQuery(theme1.breakpoints.up("sm"))
    const classes = useStyles()

    const {
        DEFAULT,
        RANGEAMEND_EVENTDASH
      } = routes;

    const [eventDetails, setEventDetails] = useState<any>()
    const [eventName, setEventName] = useState<any>("")
    const [taskDetails, setTaskDetails] = useState<any>(manageTaskPublishRows)
    const [singleTask, setSingleTask] = useState<any>()
    const [selectTasks, setSelectTasks] = useState<any>()
    const [classValues, setClassValues] = useState<any>()
    const [classConfirmed, setClassConfirmed] = useState<any>()
    const [userGroup, setUserGroup] = useState<any>()
    const [userGroupValue, setUserGroupValue] = useState<any>()

    const [classOpen, setClassOpen] = useState(false)
    const [groupsOpen, setGroupsOpen] = useState(false)

    const goBack = () => {
        history.goBack();
    };

    useEffect(() => {
        console.log(location.state.data)
        const data = location.state.data
        setEventDetails([data])
        setEventName(data['eventName'])
        setClassValues(() => {
            let classes = data['planogramClass']["className"];
            let classValues = []
            for (var i in classes) {
                classValues.push({
                    label: classes[i],
                    value: classes[i]
                })
            }
            return classValues;
        })
    }, [location])

    useEffect(() => {
        console.log(eventDetails)
    }, [eventDetails])

    const radio = (<Radio color="primary" />)

    const handleClassChange = (selected: any) => {
        console.log(selected)
        setClassValues(selected)
    }

    useEffect(() => {
        let classes = []
        if (classValues) {
            for (var i in classValues) {
                classes.push(classValues[i].value)
            }
        }
        setClassConfirmed(classes)
    },[classValues])

    const handleClassConfirm = () => {
        handleClassClose()
        setEventDetails((prevState: any) => {
            if (prevState[0].hasOwnProperty('planogramClass')) {
                let a = {
                    ...prevState[0],
                    planogramClass: {
                        className: classConfirmed
                    }
                }
                console.log(a)
                return [a]
            }
        })
    }

    const handleClassClose = () => {
        setClassOpen(false)
    }

    const classDialog = (
        <Dialog open={classOpen}
            onClose={handleClassClose}>

            <Box
                sx={{
                    height: 450,
                    // width: 'auto',
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
                    <DialogHeader
                        title="Add Class"
                        onClose={handleClassClose}
                    />
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
                            onChange={handleClassChange} />
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'end',
                    }}
                >
                    <Button
                        // type="submit"
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

    const resetTypeTemplate = (rowData: any) => {
        return (
            <select
                id="requesttype"
                // className={classes.selectField}
                value={rowData.resetType}
                onChange={(e: any) => {
                    setEventDetails((prevState: any) => {

                        return [{
                            ...prevState[0],
                            resetType: e.target.value
                        }]
                    })
                }}
                style={{
                    width: "130px"
                }}
                required
            >
                <option value="Rapid Response">
                    Rapid Response
                </option>
                <option value="Full Range Reset">
                    Full Range Reset
                </option>
                <option value="Planned Range Reset">
                    Planned Range Reset
                </option>
            </select>
        )
    }

    const rafDueDateTemplate = (rowData: any) => {
        return (
            <KeyboardDatePicker
                format="dd/MM/yy"
                value={rowData['appDueDate']}
                onChange={(date: any) => {
                    setEventDetails((prevState: any) => {

                        return [{
                            ...prevState[0],
                            appDueDate: date
                        }]
                    })
                }}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
                required
                style={{
                    fontSize: small ? "0.8rem" : "0.65rem",
                }}
            />
        )
    }

    const launchDateTemplate = (rowData: any) => {
        return (
            <KeyboardDatePicker
                format="dd/MM/yy"
                value={rowData['targetDate']}
                onChange={(date: any) => {
                    setEventDetails((prevState: any) => {

                        return [{
                            ...prevState[0],
                            targetDate: date
                        }]

                    })
                }}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
                required
                style={{
                    fontSize: small ? "0.8rem" : "0.65rem",
                }}
            />
        )
    }

    const groupTemplate = (rowData: any) => {
        return (
            <select
                name="group"
                id="group"
                value={rowData.group}
                onChange={e => {
                    setEventDetails((prevState: any) => {

                        return [{
                            ...prevState[0],
                            group: e.target.value
                        }]

                    })
                }}
                required
            >
                <option value="Frozen">
                    Frozen
                </option>
            </select>
        )
    }

    const categoryTemplate = (rowData: any) => {
        return (
            <select
                name="category"
                id="category"
                value={rowData.category}
                onChange={e => {
                    setEventDetails((prevState: any) => {

                        return [{
                            ...prevState[0],
                            category: e.target.value
                        }]

                    })
                }}
                required
            >
                <option value="Frozen Food">
                    Frozen Food
                </option>
            </select>
        )
    }

    const departmentTemplate = (rowData: any) => {
        return (
            <Typography variant="subtitle2">
                <select
                    name="department"
                    id="department"
                    value={rowData.department}
                    onChange={e => {
                        setEventDetails((prevState: any) => {

                            return [{
                                ...prevState[0],
                                department: e.target.value
                            }]

                        })
                    }}
                    required
                >
                    <option value="Frozen Chips">
                        Frozen Chips
                    </option>
                    <option value="Frozen Vegetables">
                        Frozen Vegetables
                    </option>
                    <option value="Frozen Fish">
                        Frozen Fish
                    </option>
                </select>
            </Typography>
        )
    }
    const eventNameTemplate = (rowData: any) => {
        return (
            <input type="text"
                value={rowData.eventName}
                onChange={e => {
                    if (e.target.value !== null) {
                        setEventDetails((prevState: any) => {

                            return [{
                                ...prevState[0],
                                eventName: e.target.value
                            }]

                        })
                    }
                }}
                style={{
                    width: "130px"
                }}
                required
            />
        )
    }

    const classTemplate = (rowData: any) => {
        if (rowData['planogramClass']) {
            let len = rowData['planogramClass']["className"] ? rowData['planogramClass']["className"].length : "0"
            return (
                <Typography
                >
                    <button
                        className={classes.backButton}
                        type="button"
                        onClick={() => setClassOpen(true)}
                        style={{
                            fontSize: small ? "0.8rem" : "0.65rem",
                        }}
                    >
                        Class({len})
                    </button>
                </Typography>
            )
        }
        else {
            return (
                <Typography variant="body2">
                    <button
                        className={classes.backButton}
                        type="button"
                        onClick={() => setClassOpen(true)}
                    >
                        Class(0)
                    </button>
                </Typography>
            )
        }
    }

    const storeWasteProcessTemplate = (rowData: any) => {
        return (
            <select
                value={rowData.wastageRange}
                onChange={(e: any) => {
                    setEventDetails((prevState: any) => {

                        return [{
                            ...prevState[0],
                            wastageRange: e.target.value
                        }]

                    })
                }}
            >
                <option value="Week +4\ +7">
                    Week +4\ +7
                </option>
                <option value="Week +5\ +8">
                    Week +5\ +8
                </option>
                <option value="Week +6\ +9">
                    Week +6\ +9
                </option>
                <option value="Week +7\ +10">
                    Week +6\ +10
                </option>
            </select>
        )
    }

    const clearancePriceTemplate = (rowData: any) => {
        return (
            <select
                value={rowData.clearencePriceCheck}
                onChange={(e: any) => {
                    setEventDetails((prevState: any) => {

                        return [{
                            ...prevState[0],
                            clearencePriceCheck: e.target.value
                        }]

                    })
                }}

            // style={{
            //     width:"130px"
            // }}
            >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
            </select>
        )
    }
    const GSCOPDateTemplate = (rowData: any) => {
        return (
            <select
                value={rowData.orderStopDateCheck}
                onChange={(e: any) => {
                    setEventDetails((prevState: any) => {

                        return [{
                            ...prevState[0],
                            orderStopDateCheck: e.target.value
                        }]

                    })
                }}
            // style={{
            //     width:"130px"
            // }}
            >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
            </select>
        )
    }

    const stopOrderTemplate = (rowData: any) => {
        return (
            <select
                value={rowData.stopOrder}
                onChange={(e: any) => {
                    setEventDetails((prevState: any) => {

                        return [{
                            ...prevState[0],
                            stopOrder: e.target.value
                        }]

                    })

                }}
            // style={{
            //     width:"130px"
            // }}
            >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
            </select>
        )
    }

    const buyerTemplate = (rowData: any) => {
        return (
            <Autocomplete
                value={rowData.buyer || rowData.buyer.value}
                options={Buyers.map((buyer => {
                    return buyer.value
                }))}
                // options={Buyers}
                onChange={(event, newValue) => {
                    console.log(newValue)
                    if (newValue !== null) {
                        setEventDetails((prevState: any) => {

                            return [{
                                ...prevState[0],
                                buyer: newValue
                            }]

                        })
                    }
                }}
                classes={{ input: classes.smallFontGrey, option: classes.smallFont, }}

                renderInput={(params) => <TextField
                    {...params}
                    variant="outlined"
                    size='small'
                />}
            />
        )
    }

    const buyingAssistantTemplate = (rowData: any) => {
        return (
            <Autocomplete
                value={rowData.buyerAssistant}
                options={BuyingAssistants.map((buyer => {
                    return buyer.value
                }))}
                onChange={(event, newValue) => {
                    if (newValue !== null) {
                        setEventDetails((prevState: any) => {

                            return [{
                                ...prevState[0],
                                buyerAssistant: newValue
                            }]

                        })
                    }
                }}
                classes={{ input: classes.smallFontGrey, option: classes.smallFont }}

                renderInput={(params) => <TextField
                    {...params}
                    variant="outlined"
                    size='small'
                />}
            />
        )
    }

    const ownBrandManagerTemplate = (rowData: any) => {
        return (
            <Autocomplete
                value={rowData.ownBrandManager}
                options={OwnBrandManagers.map((manager => {
                    return manager.value
                }))}
                onChange={(event, newValue) => {
                    if (newValue !== null) {
                        setEventDetails((prevState: any) => {

                            return [{
                                ...prevState[0],
                                ownBrandManager: newValue
                            }]

                        })
                    }
                }}
                classes={{ input: classes.smallFontGrey, option: classes.smallFont }}

                renderInput={(params) => <TextField
                    {...params}
                    variant="outlined"
                    size='small'
                />}
            />
        )
    }

    const seniorBuyingManagerTemplate = (rowData: any) => {
        return (
            <Autocomplete
                value={rowData.seniorBuyingManager}
                options={SeniorBuyingManagers.map((manager => {
                    return manager.value
                }))}
                onChange={(event, newValue) => {
                    if (newValue !== null) {
                        setEventDetails((prevState: any) => {

                            return [{
                                ...prevState[0],
                                seniorBuyingManager: newValue
                            }]

                        })
                    }
                }}
                classes={{ input: classes.smallFontGrey, option: classes.smallFont }}

                renderInput={(params) => <TextField
                    {...params}
                    variant="outlined"
                    size='small'
                />}
            />
        )
    }

    const merchandiserTemplate = (rowData: any) => {
        return (
            <Autocomplete
                value={rowData.merchandiser}
                options={Merchandisers.map((merch => {
                    return merch.value
                }))}
                onChange={(event, newValue) => {
                    if (newValue !== null) {
                        setEventDetails((prevState: any) => {

                            return [{
                                ...prevState[0],
                                merchandiser: newValue
                            }]

                        })
                    }
                }}
                classes={{ input: classes.smallFontGrey, option: classes.smallFont }}

                renderInput={(params) => <TextField
                    {...params}
                    variant="outlined"
                    size='small'
                />}
            />
        )
    }

    const rangeResetManagerTemplate = (rowData: any) => {
        return (
            <Autocomplete
                value={rowData.rangeResetManager}
                options={RangeResetManagers.map((manager => {
                    return manager.value
                }))}
                onChange={(event, newValue) => {
                    if (newValue !== null) {
                        setEventDetails((prevState: any) => {

                            return [{
                                ...prevState[0],
                                rangeResetManager: newValue
                            }]

                        })
                    }
                }}
                classes={{ input: classes.smallFontGrey, option: classes.smallFont }}

                renderInput={(params) => <TextField
                    {...params}
                    variant="outlined"
                    size='small'
                />}
            />
        )
    }

    const categoryDirectorTemplate = (rowData: any) => {
        return (
            <Autocomplete
                value={rowData.categoryDirector}
                options={CategoryDirectors.map((manager => {
                    return manager.value
                }))}
                onChange={(event, newValue) => {
                    if (newValue !== null) {
                        setEventDetails((prevState: any) => {

                            return [{
                                ...prevState[0],
                                categoryDirector: newValue
                            }]

                        })
                    }
                }}
                classes={{ input: classes.smallFontGrey, option: classes.smallFont }}

                renderInput={(params) => <TextField
                    {...params}
                    variant="outlined"
                    size='small'
                />}
            />
        )
    }

    const supplyChainSplstTemplate = (rowData: any) => {
        return (
            <Autocomplete
                value={rowData.supplyChainAnalyst}
                options={SupplyChainSpecialists.map((manager => {
                    return manager.value
                }))}
                onChange={(event, newValue) => {
                    if (newValue !== null) {
                        setEventDetails((prevState: any) => {

                            return [{
                                ...prevState[0],
                                supplyChainAnalyst: newValue
                            }]

                        })
                    }
                }}
                classes={{ input: classes.smallFontGrey, option: classes.smallFont }}

                renderInput={(params) => <TextField
                    {...params}
                    variant="outlined"
                    size='small'
                />}
            />
        )
    }

    const dueDateTemplate = (rowData: any) => {
        const dueDate = rowData['dueDate']
        return (
            <KeyboardDatePicker
                format="dd/MM/yy"
                value={dueDate}
                onChange={(date: any) => {
                    setTaskDetails((prevState: any) => {
                        return prevState.map((state: any) => {
                            if (state.dueDate === dueDate) {
                                return {
                                    ...state,
                                    dueDate: date
                                }
                            }
                            else {
                                return state
                            }
                        })
                    })
                }}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
                required
                style={{
                    fontSize: small ? "0.8rem" : "0.65rem",
                    width: "150px"
                }}
            />
        )
    }

    const notifiedDateTemplate = (rowData: any) => {
        const notifiedDate = rowData['notifiedDate']
        const testDate = (new Date(notifiedDate)).toString()
        return (
            <KeyboardDatePicker
                format="dd/MM/yy"
                disabled={testDate !== "Invalid Date" ? false : true}
                value={notifiedDate}
                onChange={(date: any) => {
                    setTaskDetails((prevState: any) => {
                        return prevState.map((state: any) => {
                            if (state.notifiedDate === notifiedDate) {
                                return {
                                    ...state,
                                    notifiedDate: date
                                }
                            }
                            else {
                                return state
                            }
                        })
                    })
                }}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
                required
                style={{
                    fontSize: small ? "0.8rem" : "0.65rem",
                    width: "150px"
                }}
            />
        )
    }

    const handleGroupValues = (e: any) => {
        setUserGroupValue(e.target.value)
    }

    const handleGroupsOpen = (rowData: any) => {
        setSingleTask(rowData)
        setUserGroup(rowData.assignedUserGroup)
        setGroupsOpen(true)
    }

    const handleGroupsClose = () => {
        setGroupsOpen(false)
    }

    const handleConfirmGroups = () => {
        setGroupsOpen(false)
        let a = taskDetails.filter((t: any) => t.taskId !== singleTask.taskId)
        let b = singleTask
        b.assignedUserGroup = userGroup
        b.manager = userGroupValue
        a.push(b)
        a.sort((x: any, y: any) => (x.taskId > y.taskId) ? 1 : ((y.taskId > x.taskId) ? -1 : 0))
        setTaskDetails(a)
    }

    const userGroupDialog = (
        <Dialog
            open={groupsOpen}
            onClose={handleGroupsClose}>
            <Box
                sx={{
                    height: 450,
                    // width: 'auto',
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
                    {/* <Box> */}
                    {/* <Box
                        sx={{
                            display: 'flex',
                            height: 30,
                            flexDirection: 'row',
                        }}
                        className={classes.viewLogTitle}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexGrow: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Typography variant="subtitle1">Manage User Group</Typography>
                        </Box>
                        <Box
                            sx={{
                                paddingRight: 2,
                            }}
                        >
                            <button
                                style={{
                                    border: 0,
                                    padding: 0,
                                    height: 22,
                                    width: 22,
                                }}
                                className={classes.closeViewLog}
                                onClick={handleGroupsClose}
                            >
                                <b>X</b>
                            </button>
                        </Box>
                    </Box> */}
                    <DialogHeader
                        title="Manage User Group"
                        onClose={handleGroupsClose}
                    />

                    <Box
                        sx={{
                            alignItems: 'flex-start',
                            marginTop: '30px',
                        }}>
                        <Box>
                            <select value={userGroup && userGroup}
                                onChange={
                                    (e: any) => {
                                        setUserGroup(e.target.value)
                                    }
                                }
                            >
                                <option value="buyer">
                                    Buyer
                                </option>

                                <option value="buyerAssistant">
                                    Buying Assistant
                                </option>

                                <option value="seniorBuyingManager">
                                    Senior Buying Manager
                                </option>
                                <option value="systemTask">
                                    System Task
                                </option>
                            </select>
                        </Box>
                        <Box>
                            <FormControl component="fieldset">
                                <RadioGroup onChange={handleGroupValues}>

                                    {
                                        userGroup && userGroup.toLowerCase() === "buyer" &&
                                        Buyers.map((b: any) => {
                                            return <FormControlLabel
                                                key={b.value}
                                                value={b.value}
                                                control={radio}
                                                label={b.label}
                                                classes={{ label: classes.dialogText }}
                                            />
                                        })
                                    }
                                    {
                                        userGroup && userGroup.toLowerCase() === "buyerassistant" &&
                                        BuyingAssistants.map((b: any) => {
                                            return <FormControlLabel
                                                key={b.value}
                                                value={b.value}
                                                control={radio}
                                                label={b.label}
                                                classes={{ label: classes.dialogText }}
                                            />
                                        })
                                    }

                                    {
                                        userGroup && userGroup.toLowerCase() === "seniorbuyingmanager" &&
                                        SeniorBuyingManagers.map((b: any) => {
                                            return <FormControlLabel
                                                key={b.value}
                                                value={b.value}
                                                control={radio}
                                                label={b.label}
                                                classes={{ label: classes.dialogText }}
                                            />
                                        })
                                    }

                                </RadioGroup>
                            </FormControl>
                        </Box>
                    </Box>

                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'end',
                    }}

                >
                    <Button
                        // type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.buttons}
                        onClick={handleConfirmGroups}
                    >
                        Save
                    </Button>
                </Box>
            </Box>
        </Dialog>
    )

    const userGroupTemplate = (rowData: any) => {
        return (
            <Typography variant="body2">
                <button
                    className={classes.backButton}
                    type="button"
                    onClick={() => handleGroupsOpen(rowData)}
                    style={{
                        fontSize: small ? "0.8rem" : "0.65rem",
                    }}
                >
                    {rowData.assignedUserGroup}
                </button>
            </Typography>
        )
    }

    const removeTasks = () => {
        let _tasks = taskDetails.filter((value: any) => !selectTasks.includes(value));
        console.log(_tasks)
        setTaskDetails(_tasks)
        setSelectTasks(null)
    }

    const handlePublishEvent = () => {
        history.push(`${DEFAULT}${RANGEAMEND_EVENTDASH}`)
    }

    return (
        <>
            <Grid container spacing={2} style={{ paddingTop: "20px" }}>
                <Grid
                    container
                    item
                    xl={12}
                    lg={12}
                    md={12}
                    sm={12}
                    xs={12}
                    style={{ paddingBottom: "20px" }}
                >
                    <Grid item
                        xl={11}
                        lg={11}
                        md={11}
                        sm={11}
                        xs={12}
                    >
                        <Typography variant="h5">Manage Event - {eventName && eventName}</Typography>
                    </Grid>


                    <Grid item
                        xl={1}
                        lg={1}
                        md={1}
                        sm={1}
                        xs={1}
                    >
                        <button className={classes.backButton} onClick={goBack}>
                            Back
                        </button>
                    </Grid>
                </Grid>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid item
                        xl={12}
                        lg={12}
                        md={12}
                        sm={12}
                        xs={12}
                    >
                        <DataTable value={eventDetails && eventDetails}
                            scrollable
                            showGridlines
                            style={{
                                height: "100%"
                            }}
                        >
                            {manageEventPublishCols.map((col: any, index: any) => {
                                return (
                                    <Column key={index} field={col.field} header={col.header}
                                        body={
                                            (col.field === 'targetDate' && launchDateTemplate)
                                            ||
                                            (col.field === 'resetType' && resetTypeTemplate)
                                            ||
                                            (col.field === 'appDueDate' && rafDueDateTemplate)
                                            ||
                                            (col.field === 'group' && groupTemplate)
                                            ||
                                            (col.field === 'category' && categoryTemplate)
                                            ||
                                            (col.field === 'department' && departmentTemplate)
                                            ||
                                            (col.field === 'eventName' && eventNameTemplate)
                                            ||
                                            (col.field === 'clearancePriceApplied' && clearancePriceTemplate)
                                            ||
                                            (col.field === 'GSCOPDateCheckRequired' && GSCOPDateTemplate)
                                            ||
                                            (col.field === 'stopOrder' && stopOrderTemplate)
                                            ||
                                            (col.field === 'buyer' && buyerTemplate)
                                            ||
                                            (col.field === 'planogramClass' && classTemplate)
                                            ||
                                            (col.field === 'storeWasteProcessTiming' && storeWasteProcessTemplate)
                                            ||
                                            (col.field === 'buyerAssistant' && buyingAssistantTemplate)
                                            ||
                                            (col.field === 'ownBrandManager' && ownBrandManagerTemplate)
                                            ||
                                            (col.field === 'seniorBuyingManager' && seniorBuyingManagerTemplate)
                                            ||
                                            (col.field === 'merchandiser' && merchandiserTemplate)
                                            ||
                                            (col.field === 'rangeResetManager' && rangeResetManagerTemplate)
                                            ||
                                            (col.field === 'categoryDirector' && categoryDirectorTemplate)
                                            ||
                                            (col.field === 'supplyChainSplst' && supplyChainSplstTemplate)

                                        }
                                        style={{
                                            width: col.width,
                                            fontSize: small ? "0.8rem" : "0.65rem",
                                            padding: "0.5rem",

                                        }}
                                        headerStyle={{
                                            backgroundColor: theme1.palette.primary.main,
                                            color: "white",
                                            width: col.width,
                                            fontSize: small ? "0.8rem" : "0.65rem",
                                        }} />
                                )
                            })}
                        </DataTable>
                    </Grid>
                    <Grid item
                        xl={12}
                        lg={12}
                        md={12}
                        sm={12}
                        xs={12}
                    >
                        <Typography variant="h5">Manage Task</Typography>
                    </Grid>

                    <Grid item
                        xl={12}
                        lg={12}
                        md={12}
                        sm={12}
                        xs={12}
                    >
                        <DataTable
                            value={taskDetails && taskDetails}
                            selectionMode="checkbox"
                            selection={selectTasks}
                            onSelectionChange={(e) => setSelectTasks(e.value)}
                            scrollable
                            showGridlines
                            sortField="taskId"
                        >
                            <Column
                                selectionMode="multiple"
                                headerStyle={{
                                    width: "50px",
                                    color: "white",
                                    backgroundColor: theme1.palette.primary.main,
                                }}
                            ></Column>
                            {manageTaskPublishCols.map((col: any, index: any) => {
                                return (
                                    <Column key={index} field={col.field} header={col.header}
                                        body={
                                            (col.field === 'dueDate' && dueDateTemplate)
                                            ||
                                            (col.field === 'notifiedDate' && notifiedDateTemplate)
                                            ||
                                            (col.field === 'assignedUserGroup' && userGroupTemplate)
                                        }
                                        style={{
                                            width: col.width,
                                            fontSize: small ? "0.8rem" : "0.65rem",
                                            padding: !small && "5px",
                                        }}
                                        sortable={col.field === "taskId"}
                                        headerStyle={{
                                            backgroundColor: theme1.palette.primary.main,
                                            color: "white",
                                            fontSize: small ? "0.8rem" : "0.65rem",
                                            padding: !small && "5px",
                                            width: col.width,
                                        }} />
                                )
                            })}
                        </DataTable>
                    </Grid>
                </MuiPickersUtilsProvider>
                <Grid item container
                    xl={12}
                    lg={12}
                    md={12}
                    sm={12}
                    xs={12}
                >
                    <Grid item
                        xl={5}
                        lg={5}
                        md={5}
                    />

                    <Grid item container
                        xl={7}
                        lg={7}
                        md={7}
                        sm={12}
                        xs={12}
                    >
                        <Grid item container
                            xl={12}
                            lg={12}
                            md={12}
                            sm={12}
                            xs={12}
                            spacing={3}
                            style={{
                                textAlign: "center"
                            }}
                        >
                            <Grid item
                                xl={5}
                                lg={5}
                                md={5}
                                sm={5}
                                xs={12}
                            >
                                <Button
                                    variant="contained"
                                    color="primary"
                                    // type="submit"
                                    onClick={removeTasks}
                                >
                                    Remove/Skip Task
                                </Button>
                            </Grid>
                            <Grid item
                                xl={3}
                                lg={3}
                                md={3}
                                sm={3}
                                xs={12}
                            >
                                <Button
                                    variant="contained"
                                    color="primary"
                                // type="submit"
                                >
                                    Save
                                </Button>
                            </Grid>
                            <Grid item
                                xl={4}
                                lg={4}
                                md={4}
                                sm={4}
                                xs={12}
                            >
                                <Button
                                    variant="contained"
                                    color="primary"
                                    // type="submit"
                                    onClick={handlePublishEvent}
                                >
                                    Publish Event
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>

                </Grid>
            </Grid>
            {classDialog}
            {userGroupDialog}
        </>
    )
}

export default ManageEventCreate
