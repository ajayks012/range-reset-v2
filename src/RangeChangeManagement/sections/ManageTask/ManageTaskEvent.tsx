import {
  Box,
  Dialog,
  Grid,
  Typography,
  Button,
  Divider,
  useMediaQuery,
  useTheme,
  Checkbox,
  Tooltip,
  Radio,
} from "@material-ui/core";
import { red, teal } from "@material-ui/core/colors";
import { styled } from "@material-ui/styles";
import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primeicons/primeicons.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.css";
import { Link, useHistory } from "react-router-dom";
import {
  confirmedTableCols,
  eventUploadTableCols,
  Buyers,
  CategoryDirectors,
  Merchandisers,
  SupplyChainSpecialists,
} from "./DataConstants";

import ErrorIcon from "@material-ui/icons/Error";
import { deleteFile, uploadFile } from "../../../redux/Actions/FileUpload";
import { connect } from "react-redux";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { useStyles } from "./styles";
import DialogHeader from "../../components/DialogHeader/DialogHeader";
import { routes } from "../../../util/Constants";

// const useStyles = makeStyles((theme: any) => {
//     return {
//         dialogTitle: {
//             backgroundColor: theme.palette.primary.main,
//             color: "white",
//             alignItems: "baseline"
//         },
//         dialogCloseButton: {
//             color: "#ff5252",
//             backgroundColor: theme.palette.primary.main,
//             fontSize: "18px",
//             '&:hover': {
//                 color: "#d50000",
//                 backgroundColor: "#00e676",
//                 cursor: "pointer",
//                 borderRadius: 10
//             }
//         },
//         uploadTextfield: {
//             [theme.breakpoints.up("sm")]: {
//                 width: 200,
//             },
//             [theme.breakpoints.down("sm")]: {
//                 width: 100
//             },

//             height: "32px",
//             cursor: "pointer"
//         },
//         uploadButton: {
//             width: 100,
//             height: "32px",
//             cursor: "pointer",
//             backgroundColor:theme.palette.primary.main,
//             color: "white"
//         },
//         searchTextField: {
//             width: "200px"
//         },
//         searchBox: {
//             padding: "10px"
//         },
//         submitButtons: {
//             width: "auto",
//             backgroundColor: theme.palette.primary.main,
//             color: "white",
//             height: 40,
//             "&:hover": {
//                 backgroundColor: theme.palette.primary.main,
//                 color: "white",
//             },
//         },
//         redButtons: {
//             width: "auto",
//             backgroundColor: red[600],
//             color: "white",
//             height: 40,
//             "&:hover": {
//                 backgroundColor: red[400],
//                 color: "white",
//             },
//         },
//         previewDialog: {
//             'max-width': '80%'
//         },
//         searchDialog: {
//             'max-width': '50%'
//         },
//         globalSearch:{
//             [theme.breakpoints.up("sm")]: {
//                 width: "100%",
//             },
//             [theme.breakpoints.down("sm")]: {
//                 width: "80%"
//             },
//         }
//     }
// })
const Input = styled("input")({
  display: "none",
});

function ManageTaskEvent(props: any) {
  const { uploadFile, deleteFile, fileData } = props;

  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const small = useMediaQuery(theme.breakpoints.up("md"));
  const small1 = useMediaQuery(theme.breakpoints.up(650));
  const [openUploadDialog, setOpenUploadDialog] = useState(false);
  const [openAdvancedSearchDialog, setOpenAdvancedSearchDialog] =
    useState(false);
  const [uploadedFile, setUploadedFile] = useState<any>();
  const [importedData, setImportedData] = useState<any>();
  const [filteredImportedData, setFilteredImportedData] = useState<any>();
  const [selectedImportedData, setSelectedImportedData] = useState<any>();
  const [openPreviewDialog, setOpenPreviewDialog] = useState(false);
  const [importedCols, setImportedCols] = useState<any>();
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [confirmTable, setConfirmtable] = useState(false);
  const [fileError, setFileError] = useState("");

  const [resetType, setResetType] = useState<any>("");
  const [group, setGroup] = useState<any>("");
  const [category, setCategory] = useState<any>("");
  const [department, setDepartment] = useState<any>("");
  const [launchType, setLaunchType] = useState<any>("");
  const [launchDateFrom, setLaunchDateFrom] = useState<any>("");
  const [launchDateTo, setLaunchDateTo] = useState<any>("");
  const [launchWeekFrom, setLaunchWeekFrom] = useState<any>("");
  const [launchWeekTo, setLaunchWeekTo] = useState<any>("");
  const [categoryDirector, setCategoryDirector] = useState<any>();
  const [buyer, setBuyer] = useState<any>("");
  const [merchandiser, setMerchandiser] = useState<any>("");
  const [supplyChainSpecialist, setSupplyChainSpecialist] = useState<any>("");
  const [clearancePriceApplied, setClearancePriceApplied] = useState(true);
  const [orderStopDateCheck, setOrderStopDateCheck] = useState(true);
  const [stopOrder, setStopOrder] = useState(true);
  const [searchParams, setSearchParams] = useState<any>({
    resetType: "",
    launchDateFrom: "",
    launchDateTo: "",
    group: "",
    category: "",
    department: "",
    categoryDirector: "",
    buyer: "",
    merchandiser: "",
    supplyChainAnalyst: "",
    // clearancePriceCheck: "Y",
    // orderStopDateCheck: "Y",
    // stopOrder: "Y"
  });

  const {
    EVENT_CREATE,
    EVENT_MANAGE
  } = routes

  const goBack = () => {
    history.goBack();
  };

  const handleCreateEvent = () => {
    history.push(EVENT_CREATE);
  };

  const excelDatetoDate = (eDate: any) => {
    return new Date(Math.round((eDate - (25567 + 1)) * 86400 * 1000))
      .toISOString()
      .split("T")[0];
  };

  const handleUploadDialogOpen = () => {
    setOpenUploadDialog(true);
    setConfirmtable(false);
  };
  const handleUploadDialogClose = () => {
    setOpenUploadDialog(false);
    setUploadedFile(null);
  };

  const handleFileUpload = (event: any) => {
    setUploadedFile(event.target.files[0]);
  };
  const handlePreviewDialogOpen = () => {
    setOpenPreviewDialog(true);
  };
  const handlePreviewialogClose = () => {
    setImportedData([]);
    setConfirmtable(false);
    setOpenPreviewDialog(false);
  };
  const handlePreviewDialogSave = () => {
    setConfirmtable(true);
    setOpenPreviewDialog(false);
    uploadFile(importedData && importedData);
  };
  const handleSearchDialogOpen = () => {
    setOpenAdvancedSearchDialog(true);
    // setFilteredImportedData(fileData && fileData)
  };
  const handleSearchDialogClose = () => {
    setOpenAdvancedSearchDialog(false);
  };

  const handleSingleEvent = (data: any) => {
    // console.log(data)

    history.push({
      // pathname: '/commercial/singleeventmanage',
      pathname: EVENT_MANAGE,
      search: `?event=${data["eventName"]}`, // query string
      state: {
        // location state
        data: data,
      },
    });
  };

  const handlePublish = () => {
    history.push("/commercial/eventdashboard");
  };

  const eventNameTemplate = (rowData: any) => {
    return (
      <button
        // className={classes.exploreButton}
        value={rowData["eventName"]}
        // onClick={handleNameClick}
        style={{
          cursor: "pointer",
          color: "blue",
          border: "none",
          backgroundColor: "inherit",
        }}
        onClick={() => handleSingleEvent(rowData)}
      >
        {rowData["eventName"]}
      </button>
    );
  };

  const statusTemplate = (rowData: any) => {
    if (rowData["status"] === "Error") {
      return (
        <div style={{ color: "red" }}>
          Error
          <Tooltip
            title={
              <React.Fragment>
                <div
                  style={{
                    border: "1px solid red",
                    backgroundColor: "white",
                    color: "red",
                  }}
                >
                  <Typography color="inherit" variant="body2">
                    RAF/App Due Date Should not be greater than Launch Date
                  </Typography>
                </div>
              </React.Fragment>
            }
            arrow
            placement="right"
          >
            <ErrorIcon color="error" fontSize="small" />
          </Tooltip>
        </div>
      );
    } else {
      return rowData["status"];
    }
  };

  const rafDueDateTemplate = (rowData: any) => {
    if (rowData["status"] === "Error") {
      return <div style={{ color: "red" }}>{rowData["appDueDate"]}</div>;
    } else {
      return rowData["appDueDate"];
    }
  };

  const classTemplate = (rowData: any) => {
    var planogramClass = rowData["planogramClass"]["className"].toString();
    return planogramClass;
  };

  const handleUpload = (event: any) => {
    event.preventDefault();
    if (
      uploadedFile &&
      (uploadedFile.type === "text/csv" ||
        uploadedFile.type === "application/vnd.ms-excel" ||
        uploadedFile.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    ) {
      console.log(uploadedFile);
      import("xlsx").then(xlsx => {
        const reader = new FileReader();
        reader.onload = (event: any) => {
          const wb = xlsx.read(event.target.result, { type: "array" });
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          const data = xlsx.utils.sheet_to_json(ws);
          console.log(data);

          const data1 = xlsx.utils.sheet_to_json(ws, { header: 1 });

          // Prepare DataTable
          const cols: any = data1[0];
          console.log(cols);

          // let _importedCols = cols.map((col: any) => ({ field: col, header: toCapitalize(col) }));
          // let _importedData = data.map((d: any) => {
          //     return cols.reduce((obj: any, c: any, i: any) => {
          //         obj[c] = d[i];
          //         return obj;
          //     }, {});
          // });
          const newData = data.map((d: any) => {
            var converted_date1 = d["Launch Date"]
              ? excelDatetoDate(d["Launch Date"]).toString() + " 01:00:00.00"
              : "NA";
            var converted_date3 = d["RAF/App Due Date"]
              ? excelDatetoDate(d["RAF/App Due Date"]).toString() +
              " 01:00:00.00"
              : null;

            var eventName = () => {
              if (d["Department"] && converted_date1) {
                var lDate = new Date(converted_date1);
                console.log(lDate);
                var name =
                  d["Department"].replace(/ /g, "_") +
                  "_" +
                  lDate.getDate() +
                  lDate.toLocaleString("default", { month: "short" }) +
                  lDate.getFullYear();
                console.log(name);
                return name;
              }
            }

            var buyerName = () => {
              var index = Buyers.findIndex(item => item.email === d["Buyer"]);
              return Buyers[index].value;
            };

            var classArray = () => {
              let classes = d["Planogram Class"].split(",")
              let classValues=[]
              for(var i in classes){
                classValues.push(classes[i].trim())
              }
              return classValues;
            }

            return {
              buyer: buyerName(),
              category: d["Category"],
              categoryId: 1,
              categoryDirector: d["Category Director"],
              // "clearancePriceCheck": "Y",
              department: d["Department"],
              departmentId: 1,
              eventId: d["Event ID"],
              name: "string",
              eventName: d["Event Name"] ? d["Event Name"] : eventName(),
              // eventName: eventName(),
              // "orderStopDateCheck": "Y",
              resetGroup: d["Trading Group"],
              targetDate: converted_date1,
              merchandiser: d["Merchandiser"],
              resetType: d["Reset Type"],
              // "status": d["Status"] ? d["Status"] : "Draft",
              // "stopOrder": "Y",
              supplyChainAnalyst: d["Supply Chain Specialist"],
              // uniqueId: d["Unique ID"],
              buyerAssistant: d["Buying Assistant"],
              ownBrandManager: d["Own Brand Manager"],
              seniorBuyingManager: d["Senior Buying Manager"],
              rangeResetManager: d["Range Reset Manager"],
              planogramClass: {
                className: classArray(),
              },
              wastageRange: d["Store Waste Process Timing"],
              appDueDate: converted_date3,
            };
          });
          console.log(newData);
          let newData1 = {
            rangeResets: [...newData],
          };
          console.log(newData1);

          setImportedCols(eventUploadTableCols);
          setImportedData(newData);
        };

        reader.readAsArrayBuffer(uploadedFile);
      });
      handleUploadDialogClose();
      handlePreviewDialogOpen();
    } else {
      alert("Upload correct file");
      setUploadedFile(null);
    }
  };

  useEffect(() => {
    console.log(importedData);
  }, [importedData]);
  useEffect(() => {
    console.log(fileData);
  }, [fileData]);

  const removeTasks = () => {
    let _tasks = importedData.filter(
      (value: any) => !selectedImportedData.includes(value)
    );
    console.log(_tasks);
    setImportedData(_tasks);
    uploadFile(_tasks);
    setSelectedImportedData(null);
  };

  const sampleExcel = (
    <table id="sample" style={{ display: "none" }}>
      <thead>
        <tr>
          {/* <th>Unique ID</th> */}
          <th>Event ID</th>
          <th>Reset Type</th>
          <th>RAF/App Due Date</th>
          <th>Trading Group</th>
          <th>Category</th>
          <th>Department</th>
          <th>Event ID</th>
          <th>Event Name</th>
          <th>LaunchDate</th>
          <th>Planogram Class</th>
          <th>Store Waste Process Timing</th>
          <th>Buyer</th>
          <th>Buying Assistant</th>
          <th>Own Brand Manager</th>
          <th>Senior Buying Manager</th>
          <th>Merchandiser</th>
          <th>Range Reset Manager</th>
          <th>Category Director</th>
          <th>Supply Chain Specialist</th>
          <th>Clearance Pricing Action required</th>
          <th>GSCOP Date check Required</th>
          <th>Stop Order</th>
        </tr>
      </thead>
    </table>
  );

  const uploadDialog = (
    <Dialog onClose={handleUploadDialogClose} open={openUploadDialog}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: small1 ? "400px" : "230px",
          // height: "250px",
          border: "3px solid green",
          borderRadius: 5,
        }}
      >
        {/* <Box sx={{
                    display: "flex",
                    height: 30,
                    flexDirection: "row",
                    borderRadius: 10,
                }}
                    className={classes.dialogTitle}>
                    <Box sx={{
                        display: "flex",
                        flexGrow: 1,
                        justifyContent: "center",
                    }}>
                        <Typography variant="subtitle1">Upload Bulk Event</Typography>
                    </Box>
                    <Box sx={{
                        paddingRight: 2,
                    }}>

                        <button style={{
                            border: 0,
                            padding: 0,
                            height: 22,
                            width: 22
                        }}
                            className={classes.dialogCloseButton}
                            onClick={handleUploadDialogClose}
                        >
                            <b>
                                X
                            </b>
                        </button>
                    </Box>
                </Box> */}
        <DialogHeader
          title="Upload Bulk Event"
          onClose={handleUploadDialogClose}
        />

        <Box sx={{ p: 1 }}>
          <Typography variant="body2">Upload Bulk Event</Typography>
        </Box>
        <form>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box>
              <input
                type="text"
                value={uploadedFile ? uploadedFile.name : ""}
                onClick={() => document.getElementById("selectedFile")!.click()}
                className={classes.uploadTextfield}
                placeholder="No file selected"
                readOnly
              />
              <Input
                type="file"
                id="selectedFile"
                accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                onChange={handleFileUpload}
                required
              />
              <button
                type="button"
                onClick={() => document.getElementById("selectedFile")!.click()}
                className={classes.uploadButton}
              >
                Browse...
              </button>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              p: 2,
              justifyContent: "right",
            }}
          >
            <Box>
              <Typography variant="body2" style={{ display: "inline" }}>
                Supported file type in MS Excel
              </Typography>
              <i className="pi pi-file-excel" style={{'fontSize': '18px'}}></i>
            </Box>
            {/* <Box>
                            Check out the sample file
                            <ReactHTMLTableToExcel
                                id="test-table-xls-button"
                                className="download-table-xls-button"
                                table="sample"
                                filename="tablexls"
                                sheet="tablexls"
                                buttonText="Download as XLS" />
                        </Box> */}
          </Box>
          {fileError && (
            <Box
              sx={{
                display: "flex",
                p: 2,
                justifyContent: "right",
              }}
            >
              <Typography color="error">{fileError}</Typography>
            </Box>
          )}

          <Box
            sx={{
              display: "flex",
              p: 3,
              justifyContent: "right",
            }}
          >
            <Button
              className={classes.submitButtons}
              type="submit"
              onClick={handleUpload}
            >
              Upload
            </Button>
          </Box>
        </form>
      </Box>
    </Dialog>
  );

  const previewHeaderStyle = (width: any) => {
    return {
      color: "white",
      backgroundColor: theme.palette.primary.main,
      width: width,
      fontSize: "0.8rem",
      padding: "8px",
      height: "55px"
    }
  }

  const previewBodyStyle = (width: any) => {
    return {
      width: width,
      fontSize: "0.75rem",
      padding: "8px",
      height: "49px"
    }
  }

  const confirmedHeaderStyle = (width: any) => {
    return {
      color: "white",
      backgroundColor: theme.palette.primary.main,
      width: width,
      fontSize: "0.9rem",
      padding: "8px",
      height: "122px"
    }
  }

  const confirmedBodyStyle = (width: any) => {
    return {
      width: width,
      fontSize: "0.8rem",
      padding: "8px",
      height: "51px"
    }
  }

  const uploadedTable = () => {
    if (confirmTable) {
      return (
        <DataTable
          value={
            fileData && filteredImportedData ? filteredImportedData : fileData
          }
          selectionMode="checkbox"
          selection={selectedImportedData}
          onSelectionChange={e => setSelectedImportedData(e.value)}
          globalFilter={globalFilter}
          emptyMessage="No Events found."
          className="p-datatable-sm"
          showGridlines
          scrollable
          // frozenWidth="300px"
        >
          <Column
            selectionMode="multiple"
            headerStyle={{
              width: "50px",
              color: "white",
              backgroundColor: theme.palette.primary.main,
            }}
            // frozen

          ></Column>
          {confirmedTableCols.map((col: any, index: any) => {
            return (
              <Column
                key={index}
                field={col.field}
                header={col.header}
                body={
                  (col.field === "eventName" &&
                    confirmTable &&
                    eventNameTemplate) ||
                  (col.field === "status" && confirmTable && statusTemplate) ||
                  (col.field === "appDueDate" &&
                    confirmTable &&
                    rafDueDateTemplate) ||
                  (col.field === "planogramClass" &&
                    confirmTable &&
                    classTemplate)
                }
                style={confirmedBodyStyle(col.width)}
                // filter filterPlaceholder="Search by name"
                headerStyle={
                  confirmedHeaderStyle(col.width)
                }
                sortable
                // frozen={col.field === "eventName" ? true : false}
              />
            );
          })}
        </DataTable>
      );
    } else {
      return (
        <DataTable
          value={importedData}
          // paginator
          // rows={10}
          // alwaysShowPaginator={false}
          selectionMode="multiple"
          selection={selectedImportedData}
          onSelectionChange={e => setSelectedImportedData(e.value)}
          globalFilter={globalFilter}
          emptyMessage="No Events found."
          className="p-datatable-sm"
          showGridlines
          scrollable
          scrollHeight="400px"
          // frozenWidth="300px"
        >
          <Column
            selectionMode="multiple"
            headerStyle={{
              width: "50px",
              color: "white",
              backgroundColor: theme.palette.primary.main,
            }}
            // frozen
          ></Column>
          {eventUploadTableCols.map((col: any, index: any) => {
            return (
              <Column
                key={index}
                field={col.field}
                header={col.header}
                body={col.field === "planogramClass" && classTemplate}
                style={previewBodyStyle(col.width)}
                headerStyle={previewHeaderStyle(col.width)}
                sortable
                // frozen={col.field === "eventName" ? true : false}
              />
            );
          })}
        </DataTable>
      );
    }
  };

  const previewDialog = (
    <Dialog
      open={openPreviewDialog}
      onClose={handlePreviewialogClose}
      fullWidth
      classes={{ paperFullWidth: classes.previewDialog }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "20px",
        }}
      >
        {/* <Box sx={{
                    display: "flex",
                    height: 30,
                    flexDirection: "row",
                    borderRadius: 10,
                }}
                    className={classes.dialogTitle}>
                    <Box sx={{
                        display: "flex",
                        flexGrow: 1,
                        justifyContent: "center",
                    }}>
                        <Typography variant="subtitle1">Confirm Bulk Event</Typography>
                    </Box>
                    <Box sx={{
                        paddingRight: 2,
                    }}>

                        <button style={{
                            border: 0,
                            padding: 0,
                            height: 22,
                            width: 22
                        }}
                            className={classes.dialogCloseButton}
                            onClick={() => setOpenPreviewDialog(false)}
                        >
                            <b>
                                X
                            </b>
                        </button>
                    </Box>
                </Box> */}

        <DialogHeader
          title="Confirm Bulk Event"
          onClose={() => setOpenPreviewDialog(false)}
        />

        <Box>
          <Typography variant="subtitle2">Confirm Bulk Event</Typography>
        </Box>
        <Box>{uploadedTable()}</Box>
        <Grid
          container
          spacing={3}
          style={{
            justifyContent: small1 ? "right" : "center",
            paddingTop: "20px",
          }}
        >
          <Grid
            item
            xs={6}
            sm={3}
            lg={2}
            xl={1}
            style={{ textAlign: !small1 ? "center" : "right" }}
          >
            <Button onClick={removeTasks} className={classes.redButtons}>
              Delete Event(s)
            </Button>
          </Grid>
          <Grid
            item
            xs={6}
            sm={3}
            lg={1}
            xl={1}
            style={{ textAlign: !small1 ? "center" : "right" }}
          >
            <Button
              onClick={handlePreviewDialogSave}
              className={classes.submitButtons}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );

  const handleSearchParams = (e: any, key: any) => {
    // console.log(e.target.value, key)
    switch (key) {
      case "resetType": {
        setResetType(e.target.value);
        // if (e.target.value ) {
        setSearchParams((prevState: any) => {
          return {
            ...prevState,
            resetType: e.target.value,
          };
        });
        // }
        break;
      }
      case "launchDateFrom": {
        setLaunchDateFrom(e.target.value);
        if (e.target.value) {
          setSearchParams((prevState: any) => {
            return {
              ...prevState,
              launchDateFrom: e.target.value,
            };
          });
        } else {
          setSearchParams((prevState: any) => {
            return {
              ...prevState,
              launchDateFrom: "",
            };
          });
        }
        break;
      }
      case "launchDateTo": {
        setLaunchDateTo(e.target.value);
        if (e.target.value) {
          setSearchParams((prevState: any) => {
            return {
              ...prevState,
              launchDateTo: e.target.value,
            };
          });
        } else {
          setSearchParams((prevState: any) => {
            return {
              ...prevState,
              launchDateTo: "",
            };
          });
        }
        break;
      }
      case "launchWeekFrom": {
        setLaunchWeekFrom(e.target.value);
        if (e.target.value) {
          setSearchParams((prevState: any) => {
            return {
              ...prevState,
              launchWeekFrom: e.target.value,
            };
          });
        } else {
          setSearchParams((prevState: any) => {
            return {
              ...prevState,
              launchWeekFrom: "",
            };
          });
        }
        break;
      }
      case "launchWeekTo": {
        setLaunchWeekTo(e.target.value);
        if (e.target.value) {
          setSearchParams((prevState: any) => {
            return {
              ...prevState,
              launchWeekTo: e.target.value,
            };
          });
        } else {
          setSearchParams((prevState: any) => {
            return {
              ...prevState,
              launchWeekTo: "",
            };
          });
        }
        break;
      }
      case "group": {
        setGroup(e.target.value);
        // if (e.target.value) {
        setSearchParams((prevState: any) => {
          return {
            ...prevState,
            group: e.target.value,
          };
        });
        // }
        break;
      }
      case "category": {
        setCategory(e.target.value);
        // if (e.target.value ) {
        setSearchParams((prevState: any) => {
          return {
            ...prevState,
            category: e.target.value,
          };
        });
        // }
        break;
      }
      case "department": {
        setDepartment(e.target.value);
        // if (e.target.value) {
        setSearchParams((prevState: any) => {
          return {
            ...prevState,
            department: e.target.value,
          };
        });
        // }
        break;
      }
      case "categoryDirector": {
        setCategoryDirector(e.target.value);
        // if (e.target.value) {
        setSearchParams((prevState: any) => {
          return {
            ...prevState,
            categoryDirector: e.target.value,
          };
        });
        // }
        break;
      }
      case "buyer": {
        setBuyer(e.target.value);
        // if (e.target.value) {
        setSearchParams((prevState: any) => {
          return {
            ...prevState,
            buyer: e.target.value,
          };
        });
        // }
        break;
      }
      case "merchandiser": {
        setMerchandiser(e.target.value);
        // if (e.target.value) {
        setSearchParams((prevState: any) => {
          return {
            ...prevState,
            merchandiser: e.target.value,
          };
        });
        // }
        break;
      }
      case "supplyChainAnalyst": {
        setSupplyChainSpecialist(e.target.value);
        // if (e.target.value) {
        setSearchParams((prevState: any) => {
          return {
            ...prevState,
            supplyChainAnalyst: e.target.value,
          };
        });
        // }
        break;
      }
      case "clearancePriceCheck": {
        setClearancePriceApplied(e.target.checked);
        console.log(e.target.checked);
        if (e.target.checked) {
          setSearchParams((prevState: any) => {
            return {
              ...prevState,
              clearancePriceCheck: "Y",
            };
          });
        } else {
          setSearchParams((prevState: any) => {
            return {
              ...prevState,
              clearancePriceCheck: "N",
            };
          });
        }
        break;
      }
      case "orderStopDateCheck": {
        setOrderStopDateCheck(e.target.checked);
        if (e.target.checked) {
          setSearchParams((prevState: any) => {
            return {
              ...prevState,
              orderStopDateCheck: "Y",
            };
          });
        } else {
          setSearchParams((prevState: any) => {
            return {
              ...prevState,
              orderStopDateCheck: "N",
            };
          });
        }
        break;
      }
      case "stopOrder": {
        setStopOrder(e.target.checked);
        if (e.target.checked) {
          setSearchParams((prevState: any) => {
            return {
              ...prevState,
              stopOrder: "Y",
            };
          });
        } else {
          setSearchParams((prevState: any) => {
            return {
              ...prevState,
              stopOrder: "N",
            };
          });
        }
        break;
      }
      // case "launchDateFrom":{

      // }
    }
  };
  useEffect(() => {
    console.log(searchParams);
  }, [searchParams]);

  const handleLaunchType = (e: any) => {
    setLaunchType(e.target.value);
    if (e.target.value === "date") {
      delete searchParams["launchWeekFrom"];
      delete searchParams["launchWeekTo"];
    } else if (e.target.value === "week") {
      delete searchParams["launchDateFrom"];
      delete searchParams["launchDateTo"];
    }
  };

  const handleAdvancedSearch = () => {
    if (searchParams) {
      console.log(Object.keys(searchParams).length);
      let newData = fileData.filter((file: any) => {
        let resetTypeFilter =
          searchParams.resetType !== ""
            ? file.resetType === searchParams.resetType
            : true;
        let launchDateFromFilter =
          searchParams.launchDateFrom !== ""
            ? file.targetDate >= searchParams.launchDateFrom
            : true;
        let launchDateToFilter =
          searchParams.launchDateTo !== ""
            ? file.targetDate <= searchParams.launchDateTo
            : true;
        let groupFilter =
          searchParams.group !== "" ? file.group === searchParams.group : true;
        let categoryFilter =
          searchParams.category !== ""
            ? file.category === searchParams.category
            : true;
        let departmentFilter = searchParams.department
          ? file.department === searchParams.department
          : true;
        let categoryDirectorFilter = searchParams.categoryDirector
          ? file.categoryDirector === searchParams.categoryDirector
          : true;
        let buyerFilter = searchParams.buyer
          ? file.buyer === searchParams.buyer
          : true;
        let merchandiserFilter = searchParams.merchandiser
          ? file.merchandiser === searchParams.merchandiser
          : true;
        let supplyChainFilter = searchParams.supplyChainAnalyst
          ? file.supplyChainAnalyst === searchParams.supplyChainAnalyst
          : true;
        let clearancePriceFilter =
          file.clearancePriceCheck === searchParams.clearancePriceCheck;
        let orderStopDateFilter =
          file.orderStopDateCheck === searchParams.orderStopDateCheck;
        let stopOrderFilter = file.stopOrder === searchParams.stopOrder;
        return (
          resetTypeFilter &&
          launchDateFromFilter &&
          launchDateToFilter &&
          groupFilter &&
          categoryFilter &&
          departmentFilter &&
          categoryDirectorFilter &&
          buyerFilter &&
          merchandiserFilter &&
          supplyChainFilter &&
          clearancePriceFilter &&
          orderStopDateFilter &&
          stopOrderFilter
        );
      });
      setFilteredImportedData(newData);
      console.log(newData);
      handleSearchDialogClose();
    }
  };

  const advancedSearch = (
    <Dialog
      open={openAdvancedSearchDialog}
      onClose={handleSearchDialogClose}
      fullWidth
      classes={{ paperFullWidth: classes.searchDialog }}
    >
      <DialogHeader
        title="Advanced Search"
        onClose={() => setOpenAdvancedSearchDialog(false)}
      />

      <Box
        sx={{
          display: "flex",
          padding: "20px",
          // flexDirection: "row"
        }}
      >
        <Grid container spacing={1}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid item container xs={6} spacing={1}>
              <Grid item container spacing={2}>
                <Grid item xs={12}>
                  <label>Reset Type</label>
                </Grid>
                <Grid item xs={12}>
                  <select
                    name="requesttype"
                    id="requesttype"
                    className={classes.searchTextField}
                    // defaultValue=""
                    value={resetType}
                    // onChange={e => {
                    //     setResetType(e.target.value);
                    // }}
                    onChange={(e: any) => handleSearchParams(e, "resetType")}
                  >
                    <option value="">--- Select Reset Type ---</option>
                    <option value="Rapid Response">Rapid Response</option>
                    <option value="Seasonal Range Reset">
                      Seasonal Range Reset
                    </option>
                    <option value="Planned Range Reset">
                      Planned Range Reset
                    </option>
                    <option value="Seasonal Range Change">
                      Seasonal Range Change
                    </option>
                    <option value="Range Reset">Range Reset</option>
                  </select>
                </Grid>
                <Grid item container>
                  <Grid item xs={12}>
                    <label>Launch Date</label>
                  </Grid>
                  <Grid
                    item
                    container
                    xs={12}
                    style={{
                      justifyContent: "space-between",
                      // width: "290px"
                    }}
                  >
                    <Grid container spacing={1}>
                      <Grid item container xs={7}>
                        <Grid item>
                          <sup>From</sup>
                        </Grid>
                        <Grid item container xs={12}>
                          <Grid item xs={2}>
                            <input
                              type="radio"
                              checked={launchType === "date"}
                              onChange={handleLaunchType}
                              value="date"
                              name="radio-button-launch"
                            // inputProps={{ 'aria-label': 'Date' }}
                            />
                          </Grid>
                          <Grid item xs={10}>
                            <input
                              type="date"
                              value={launchDateFrom}
                              // onChange={(e: any) => setLaunchDateFrom(e.target.value)}
                              onChange={(e: any) =>
                                handleSearchParams(e, "launchDateFrom")
                              }
                              max={launchDateTo && launchDateTo}
                              className={classes.searchTextField}
                              disabled={launchType !== "date"}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item container xs={5}>
                        <Grid item>
                          <sup>To</sup>
                        </Grid>
                        <Grid item container>
                          <input
                            type="date"
                            value={launchDateTo}
                            // onChange={(e: any) => setLaunchDateTo(e.target.value)}
                            onChange={(e: any) =>
                              handleSearchParams(e, "launchDateTo")
                            }
                            min={launchDateFrom && launchDateFrom}
                            className={classes.searchTextField}
                            disabled={launchType !== "date"}
                          />
                        </Grid>
                      </Grid>
                      <Grid item container xs={7}>
                        <Grid item>
                          <sup>From</sup>
                        </Grid>
                        <Grid item container xs={12}>
                          <Grid item xs={2}>
                            <input
                              type="radio"
                              checked={launchType === "week"}
                              onChange={handleLaunchType}
                              value="week"
                              name="radio-button-launch"
                            // inputProps={{ 'aria-label': 'Week' }}
                            />
                          </Grid>
                          <Grid item xs={10}>
                            <select
                              value={launchWeekFrom}
                              // defaultValue="Week 1"
                              // onChange={(e: any) => setLaunchWeekFrom(e.target.value)}
                              onChange={(e: any) =>
                                handleSearchParams(e, "launchWeekFrom")
                              }
                              disabled={launchType !== "week"}
                              className={classes.searchTextField}
                            >
                              <option value="Week 1">Week 1</option>
                              <option value="Week 2">Week 2</option>
                              <option value="Week 3">Week 3</option>
                            </select>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item container xs={5}>
                        <Grid item>
                          <sup>To</sup>
                        </Grid>
                        <Grid item container>
                          <select
                            value={launchWeekTo}
                            // defaultValue="Week 2"
                            // onChange={(e: any) => setLaunchWeekTo(e.target.value)}
                            onChange={(e: any) =>
                              handleSearchParams(e, "launchWeekTo")
                            }
                            disabled={launchType !== "week"}
                            className={classes.searchTextField}
                          >
                            <option value="Week 1">Week 1</option>
                            <option value="Week 2">Week 2</option>
                            <option value="Week 3">Week 3</option>
                          </select>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item container>
                  <Grid item xs={12}>
                    <label>Group</label>
                  </Grid>
                  <Grid item xs={12}>
                    <select
                      name="group"
                      id="group"
                      className={classes.searchTextField}
                      // defaultValue=""
                      value={group}
                      // onChange={(e: any) => setGroup(e.target.value)}
                      onChange={(e: any) => handleSearchParams(e, "group")}
                    >
                      <option value="">--- Select Group ---</option>
                      <option value="Frozen">Frozen</option>
                    </select>
                  </Grid>
                </Grid>
                <Grid item container>
                  <Grid item xs={12}>
                    <label>Category</label>
                  </Grid>
                  <Grid item xs={12}>
                    <select
                      className={classes.searchTextField}
                      // defaultValue=""
                      value={category}
                      // onChange={(e: any) => setCategory(e.target.value)}
                      onChange={(e: any) => handleSearchParams(e, "category")}
                    >
                      <option value="">--- Select Category ---</option>

                      <option value="Frozen Food">Frozen Food</option>
                    </select>
                  </Grid>
                </Grid>
                <Grid item container>
                  <Grid item xs={12}>
                    <label>Department</label>
                  </Grid>
                  <Grid item xs={12}>
                    <select
                      className={classes.searchTextField}
                      // defaultValue=""
                      value={department}
                      // onChange={(e: any) => setDepartment(e.target.value)}
                      onChange={(e: any) => handleSearchParams(e, "department")}
                    >
                      <option value="">--- Select Department ---</option>

                      <option value="Frozen Chips">Frozen Chips</option>
                      <option value="Frozen Vegetables">
                        Frozen Vegetables
                      </option>
                      <option value="Frozen Fish">Frozen Fish</option>
                    </select>
                  </Grid>
                </Grid>
                <Grid item container>
                  <Grid>
                    <label>Category Director</label>
                  </Grid>
                  <Grid item xs={12}>
                    <select
                      className={classes.searchTextField}
                      // defaultValue=""
                      value={categoryDirector}
                      // onChange={(e: any) => setCategoryDirector(e.target.value)}
                      onChange={(e: any) =>
                        handleSearchParams(e, "categoryDirector")
                      }
                    >
                      <option value="">--- Select Category Director ---</option>

                      {CategoryDirectors.map((b: any) => {
                        return (
                          <option key={b.value} value={b.value}>
                            {b.label}
                          </option>
                        );
                      })}
                    </select>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={1} style={{height:"100%"}}>
              <Divider orientation="vertical" variant="middle" />
            </Grid>

            <Grid item container xs={5} spacing={2}>
              <Grid item container>
                <Grid item xs={12}>
                  <label>Buyer</label>
                </Grid>
                <Grid item xs={12}>
                  <select
                    className={classes.searchTextField}
                    // defaultValue=""
                    value={buyer}
                    // onChange={(e: any) => setBuyer(e.target.value)}
                    onChange={(e: any) => handleSearchParams(e, "buyer")}
                  >
                    <option value="">--- Select Buyer ---</option>

                    {Buyers.map((b: any) => {
                      return (
                        <option key={b.value} value={b.value}>
                          {b.label}
                        </option>
                      );
                    })}
                  </select>
                </Grid>
              </Grid>

              <Grid item container>
                <Grid item xs={12}>
                  <label>Merchandiser</label>
                </Grid>
                <Grid item xs={12}>
                  <select
                    className={classes.searchTextField}
                    // defaultValue=""
                    value={merchandiser}
                    // onChange={(e: any) => setMerchandiser(e.target.value)}
                    onChange={(e: any) => handleSearchParams(e, "merchandiser")}
                  >
                    <option value="">--- Select Merchandiser ---</option>

                    {Merchandisers.map((b: any) => {
                      return (
                        <option key={b.value} value={b.value}>
                          {b.label}
                        </option>
                      );
                    })}
                  </select>
                </Grid>
              </Grid>
              <Grid item container>
                <Grid item xs={12}>
                  <label>Supply Chain Specialist</label>
                </Grid>
                <Grid item xs={12}>
                  <select
                    className={classes.searchTextField}
                    // defaultValue=""
                    value={supplyChainSpecialist}
                    // onChange={(e: any) => setSupplyChainSpecialist(e.target.value)}
                    onChange={(e: any) =>
                      handleSearchParams(e, "supplyChainAnalyst")
                    }
                  >
                    <option value="">
                      --- Select Supply Chain Specialist ---
                    </option>

                    {SupplyChainSpecialists.map((b: any) => {
                      return (
                        <option key={b.value} value={b.value}>
                          {b.label}
                        </option>
                      );
                    })}
                  </select>
                </Grid>
              </Grid>
              <Grid item container>
                <Grid item xs={12}>
                  <label>Clearance Price Applied</label>
                </Grid>
                <Grid item xs={12}>
                  <Checkbox
                    checked={clearancePriceApplied}
                    color="primary"
                    onChange={(e: any) =>
                      handleSearchParams(e, "clearancePriceCheck")
                    }
                  />
                </Grid>
              </Grid>
              <Grid item container>
                <Grid item xs={12}>
                  <label>Order Stop Date Check Required</label>
                </Grid>
                <Grid item xs={12}>
                  <Checkbox
                    checked={orderStopDateCheck}
                    color="primary"
                    onChange={(e: any) =>
                      handleSearchParams(e, "orderStopDateCheck")
                    }
                  />
                </Grid>
              </Grid>
              <Grid item container>
                <Grid item xs={12}>
                  <label>Stop Order</label>
                </Grid>
                <Grid item xs={12}>
                  <Checkbox
                    checked={stopOrder}
                    color="primary"
                    onChange={(e: any) => handleSearchParams(e, "stopOrder")}
                  />
                </Grid>
              </Grid>
              <Grid item container>
                <Grid item xs={12}>
                  <Button
                    className={classes.submitButtons}
                    onClick={handleAdvancedSearch}
                  >
                    Search
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </MuiPickersUtilsProvider>
        </Grid>
      </Box>
    </Dialog>
  );

  return (
    <>
      <Grid container spacing={2} style={{ padding: "15px", width: "100%" }}>
        {!confirmTable ? (
          small1 ? (
            <>
              <Grid item sm={5} xs={12} md={7} lg={7} xl={7}>
                <Typography variant="h5">Manage Events</Typography>
              </Grid>
              <Grid item sm={3} xs={6} md={2} lg={2} xl={2}>
                <div
                  style={{ cursor: "pointer", color: "blue" }}
                  onClick={handleUploadDialogOpen}
                >
                  Upload Bulk Event
                </div>
              </Grid>
              <Grid item sm={3} xs={6} md={2} lg={2} xl={2}>
                <div
                  style={{ cursor: "pointer", color: "blue" }}
                  onClick={handleCreateEvent}
                >
                  Create Event
                </div>
              </Grid>
              <Grid item sm={1} xs={12} md={1} lg={1} xl={1}>
                <div
                  style={{ cursor: "pointer", color: "blue" }}
                  onClick={goBack}
                >
                  Back
                </div>
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={10}>
                <Typography variant="h5">Manage Events</Typography>
              </Grid>
              <Grid item xs={2} style={{ textAlign: "right" }}>
                <div
                  style={{ cursor: "pointer", color: "blue" }}
                  onClick={goBack}
                >
                  Back
                </div>
              </Grid>
              <Grid item sm={6} xs={6} md={2} lg={2} xl={2}>
                <div
                  style={{ cursor: "pointer", color: "blue" }}
                  onClick={handleUploadDialogOpen}
                >
                  Upload Bulk Event
                </div>
              </Grid>
              <Grid
                item
                sm={6}
                xs={6}
                md={2}
                lg={2}
                xl={2}
                style={{ textAlign: "right" }}
              >
                <div
                  style={{ cursor: "pointer", color: "blue" }}
                  onClick={handleCreateEvent}
                >
                  Create Event
                </div>
              </Grid>
            </>
          )
        ) : (
          <>
            <Grid item sm={6} xs={12} md={2} lg={2} xl={2}>
              <Typography variant="h5">Manage Events</Typography>
            </Grid>
            <Grid item sm={6} xs={12} md={2} lg={2} xl={2}>
              {/* <Typography variant="h5"> */}
              <input
                type="text"
                value={globalFilter}
                onChange={e => setGlobalFilter(e.target.value)}
                placeholder={" Search User details "}
                className={classes.globalSearch}
              />
              {/* </Typography> */}
            </Grid>
            <Grid item sm={6} xs={6} md={3} lg={3} xl={3}>
              <div
                style={{ cursor: "pointer", color: "blue" }}
                onClick={handleSearchDialogOpen}
              >
                Advanced Search
              </div>
            </Grid>
            <Grid item sm={6} xs={6} md={2} lg={2} xl={2}>
              <div
                style={{ cursor: "pointer", color: "blue" }}
                onClick={handleUploadDialogOpen}
              >
                Upload Bulk Event
              </div>
            </Grid>
            <Grid item sm={6} xs={6} md={2} lg={2} xl={2}>
              <div
                style={{ cursor: "pointer", color: "blue" }}
                onClick={handleCreateEvent}
              >
                Create Event
              </div>
            </Grid>
            <Grid item sm={6} xs={6} md={1} lg={1} xl={1}>
              <div
                style={{ cursor: "pointer", color: "blue" }}
                onClick={goBack}
              >
                Back
              </div>
            </Grid>
          </>
        )}
      </Grid>
      <Box
        sx={{
          height: small ? "80%" : "70%",
          marginLeft: "10px",
          marginRight: "10px",
          display: "flex",
          alignItems: importedData ? "end" : "center",
          justifyContent: !importedData && "center",
          paddingTop: "20px",
          flexDirection: "column",
        }}
        style={
          confirmTable
            ? {
              border: "none",
            }
            : {
              border: "3px dashed gray",
              justifyContent: "center",
            }
        }
      >
        <Box sx={{ width: "100%", textAlign: "center" }}>
          {!confirmTable ? (
            <Typography variant="h4" style={{ opacity: "0.5" }}>
              No "Event" to display
            </Typography>
          ) : (
            uploadedTable()
          )}
        </Box>
        {confirmTable && (
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Box sx={{ padding: "10px" }}>
              <Button onClick={removeTasks} className={classes.redButtons}>
                Delete Event
              </Button>
            </Box>
            <Box sx={{ padding: "10px" }}>
              <Button
                className={classes.submitButtons}
                onClick={() => {
                  selectedImportedData.length > 0 && handlePublish();
                }}
              >
                Publish
              </Button>
            </Box>
          </Box>
        )}
      </Box>
      {uploadDialog}
      {importedData && importedCols && previewDialog}
      {sampleExcel}
      {advancedSearch}
    </>
  );
}

const mapStateToProps = (state: any) => {
  return {
    fileData: state.fileReducer.fileData,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    uploadFile: (fileData: any) => dispatch(uploadFile(fileData)),
    deleteFile: () => dispatch(deleteFile),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageTaskEvent);
