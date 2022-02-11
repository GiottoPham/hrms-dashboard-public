import { useState } from 'react'
import { PimIcon } from '@frontend/framework/icons/PimIcon'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { Button } from '@mui/material'

export const UnitCard = ({
  name,
  label,
  handleClick,
}: {
  name: string
  label: string
  handleClick: () => void
}) => {
  const [toggle, setToggle] = useState(false)
  return (
    <Button
      fullWidth
      classes={{
        root: 'relatvie rounded-full font-nunito normal-case text-white flex justify-start bg-white text-black py-4 px-8',
      }}
      onClick={() => {
        setToggle(!toggle)
        handleClick()
      }}
    >
      <PimIcon className="w-6 h-6 mr-4" />
      <p className="mr-4">{name}</p>
      <p>{label}</p>
      <div className="absolute right-4 top-4">
        {toggle ? (
          <KeyboardArrowDownIcon className="w-6 h-6" />
        ) : (
          <KeyboardArrowUpIcon className="w-6 h-6" />
        )}
      </div>
    </Button>
  )
}
