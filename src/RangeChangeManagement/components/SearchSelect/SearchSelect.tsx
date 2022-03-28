import React from 'react'
import { OutlinedInput, IconButton, InputAdornment } from '@material-ui/core'
import { SearchOutlined } from '@material-ui/icons'
import { useStyles } from './styles'

function SearchSelect(props: any) {
  const classes = useStyles()
  const { value, onChange, placeholder, onClick, styles } = props
  return (
    <>
      <OutlinedInput
        value={value}
        onChange={onChange}
        className={classes.inputFields}
        // style={{ backgroundColor: 'white' }}
        style={styles}
        placeholder={placeholder}
        required={true}
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={onClick} edge="end">
              <SearchOutlined />
            </IconButton>
          </InputAdornment>
        }
      />
    </>
  )
}

export default SearchSelect
