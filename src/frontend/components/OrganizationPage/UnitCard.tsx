import { useState } from 'react'
import { PimIcon } from '@frontend/framework/icons/PimIcon'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { Button, IconButton } from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { RecruitmentIcon } from '@frontend/framework/icons/RecruitmentIcon'
import { ButtonWithPopover } from '@frontend/framework/ButtonWithPopover'
import { AddUnitButton } from '@components/OrganizationPage/AddUnitButton'
import { DeleteUnitButton } from '@components/OrganizationPage/DeleteUnitButton'
import { EditUnitButton } from '@components/OrganizationPage/EditUnitButton'
export const UnitCard = ({
  id,
  name,
  label,
  peopleNumber,
  handleClick,
  description,
  managerOfUnitId,
}: {
  id: number
  name: string
  label: string
  peopleNumber: number
  description: string
  handleClick: () => void
  managerOfUnitId: number
}) => {
  const [toggle, setToggle] = useState(false)
  return (
    <div className="relative rounded-full font-nunito normal-case bg-white flex items-center p-4 w-full">
      <PimIcon className="w-6 h-6 mr-4" />
      <p className="mr-4">{name}</p>
      <p>{label}</p>

      <div className="absolute right-4 flex items-center space-x-4">
        <div className="flex items-center space-x-4">
          <RecruitmentIcon className="w-5 h-5 text-primary" />
          <p className="font-nunito text-sm">{peopleNumber} people</p>
        </div>
        <ButtonWithPopover
          renderButton={({ openPopover }) => (
            <IconButton onClick={openPopover}>
              <MoreHorizIcon className="w-5 h-5" />
            </IconButton>
          )}
          renderPopover={({
            anchorEl,
            isPopoverOpen,
            Popover,
            closePopover,
          }) => (
            <Popover
              disableScrollLock
              PaperProps={{
                elevation: 0,
                classes: {
                  root: 'shadow rounded border border-blue-200',
                },
              }}
              id="menu"
              open={isPopoverOpen}
              anchorEl={anchorEl}
              onClose={closePopover}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <div className="w-28">
                <AddUnitButton
                  id={id}
                  closePopover={closePopover}
                  renderButton={({ openModal }) => (
                    <Button
                      fullWidth
                      color="inherit"
                      classes={{
                        root: 'h-10 text-sm normal-case font-nunito',
                      }}
                      onClick={(e) => {
                        e.stopPropagation()
                        openModal()
                      }}
                    >
                      <span className="text-sm font-inter">Add</span>
                    </Button>
                  )}
                />
                <DeleteUnitButton
                  closePopover={closePopover}
                  id={id}
                  renderButton={({ openModal }) => (
                    <Button
                      fullWidth
                      color="inherit"
                      classes={{
                        root: 'h-10 text-sm normal-case font-nunito',
                      }}
                      onClick={(e) => {
                        e.stopPropagation()
                        openModal()
                      }}
                    >
                      <span className="text-sm font-inter">Delete</span>
                    </Button>
                  )}
                />
                <EditUnitButton
                  id={id}
                  name={name}
                  description={description}
                  managerOfUnitId={managerOfUnitId}
                  closePopover={closePopover}
                  renderButton={({ openModal }) => (
                    <Button
                      fullWidth
                      color="inherit"
                      classes={{
                        root: 'h-10 text-sm normal-case font-nunito',
                      }}
                      onClick={(e) => {
                        e.stopPropagation()
                        openModal()
                      }}
                    >
                      <span className="text-sm font-inter">Edit</span>
                    </Button>
                  )}
                />
              </div>
            </Popover>
          )}
        />
        <IconButton
          onClick={() => {
            setToggle(!toggle)
            handleClick()
          }}
        >
          {toggle ? (
            <KeyboardArrowDownIcon className="w-6 h-6" />
          ) : (
            <KeyboardArrowUpIcon className="w-6 h-6" />
          )}
        </IconButton>
      </div>
    </div>
  )
}
