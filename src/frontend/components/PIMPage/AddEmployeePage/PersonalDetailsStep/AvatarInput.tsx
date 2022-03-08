import type { PersonalDetailInputParams } from '@frontend/types/employee'
import { Avatar, Button, Badge } from '@mui/material'
import { useFormikContext } from 'formik'
import EditIcon from '@mui/icons-material/Edit'

export const AvatarInput = ({ disabled = false }: { disabled?: boolean }) => {
  const { setFieldValue, values } =
    useFormikContext<PersonalDetailInputParams>()
  return (
    <>
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        badgeContent={
          <Button
            classes={{
              root: 'min-w-0 w-12 h-12 bg-white border-2 border-primary rounded-full self-end -mb-5 z-20 mr-5',
            }}
            color="inherit"
            variant="outlined"
            component="label"
            disabled={disabled}
          >
            <EditIcon className="w-6 h-6" />
            <input
              type="file"
              hidden
              onChange={(e) => {
                if (e.target.files) setFieldValue('avatar', e.target.files[0])
              }}
            />
          </Button>
        }
      >
        <Avatar
          classes={{ root: 'h-40 w-40 text-lg bg-primary' }}
          src={values.avatar ? URL.createObjectURL(values.avatar) : ''}
        />
      </Badge>
    </>
  )
}
