import { makeStyles } from '@material-ui/core'
import { teal } from '@material-ui/core/colors'

export const useStyles = makeStyles((theme) => {
  return {
    mainContainer: {
      padding: '15px',
      width: '100%',
    },
    uploadTextfield: {
      [theme.breakpoints.up(670)]: {
        width: 250,
      },
      [theme.breakpoints.down(670)]: {
        width: 100,
      },

      height: '32px',
      cursor: 'pointer',
    },
    uploadButton: {
      width: 100,
      height: '32px',
      cursor: 'pointer',
      backgroundColor: theme.palette.primary.main,
      color: 'white',
    },
    searchTextField: {
      height: '25px',
      width: '100%',
    },
    searchBox: {
      padding: '10px',
    },
    submitButtons: {
      width: 'auto',
      backgroundColor: theme.palette.primary.main,
      color: 'white',
      height: 40,
      '&:hover': {
        backgroundColor: theme.palette.primary.main,
        color: 'white',
      },
    },
    greenButtons: {
      cursor: 'pointer',
      color: theme.palette.primary.main,
      border: 'none',
      backgroundColor: 'inherit',
    },
    // redButtons: {
    //     width: "auto",
    //     backgroundColor: theme.palette.error.main,
    //     color: "white",
    //     height: 40,
    //     "&:hover": {
    //         backgroundColor: theme.palette.error.main,
    //         color: "white",
    //     },
    // },
    whiteButton: {
      borderColor: theme.palette.primary.main,
      border: '1px solid',
      backgroundColor: 'white',
      color: theme.palette.primary.main,
      '&:hover': {
        color: 'white',
        backgroundColor: teal[900],
      },
      // marginBottom: '10px',
      // marginRight: '10px',
    },
    previewDialog: {
      'max-width': '80%',
    },
    searchDialog: {
      'max-width': '65%',
      padding: '8px',
    },
    globalSearch: {
      [theme.breakpoints.up('sm')]: {
        width: '100%',
      },
      [theme.breakpoints.down('sm')]: {
        width: '80%',
      },
    },
    errorDialog: {
      color: theme.palette.primary.error,
    },
    errorTooltip: {
      border: '1px solid red',
      backgroundColor: 'white',
      color: theme.palette.primary.error,
    },
  }
})
