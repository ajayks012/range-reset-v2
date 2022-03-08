import { makeStyles } from "@material-ui/core"

export const useStyles = makeStyles((theme) => {
    return {
        uploadTextfield: {
            [theme.breakpoints.up(650)]: {
                width: 200,
            },
            [theme.breakpoints.down(650)]: {
                width: 100
            },

            height: "32px",
            cursor: "pointer"
        },
        uploadButton: {
            width: 100,
            height: "32px",
            cursor: "pointer",
            backgroundColor:theme.palette.primary.main,
            color: "white"
        },
        searchTextField: {
            height:"25px",
            width:"100%"
        },
        searchBox: {
            padding: "10px"
        },
        submitButtons: {
            width: "auto",
            backgroundColor: theme.palette.primary.main,
            color: "white",
            height: 40,
            "&:hover": {
                backgroundColor: theme.palette.primary.main,
                color: "white",
            },
        },
        redButtons: {
            width: "auto",
            backgroundColor: theme.palette.error.main,
            color: "white",
            height: 40,
            "&:hover": {
                backgroundColor: theme.palette.error.main,
                color: "white",
            },
        },
        previewDialog: {
            'max-width': '80%'
        },
        searchDialog: {
            'max-width': '65%'
        },
        globalSearch:{
            [theme.breakpoints.up("sm")]: {
                width: "100%",
            },
            [theme.breakpoints.down("sm")]: {
                width: "80%"
            },
        }
    }
})