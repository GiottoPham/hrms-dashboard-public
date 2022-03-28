import type { PersonalDetailInputParams } from '@frontend/types/employee'
import { Avatar, Button, Badge, Skeleton } from '@mui/material'
import { useFormikContext } from 'formik'
import EditIcon from '@mui/icons-material/Edit'
import { useEffect, useState } from 'react'

export const AvatarInput = ({
  disabled = false,
  avatarId,
}: {
  disabled?: boolean
  avatarId?: string
}) => {
  const { setFieldValue, values } =
    useFormikContext<PersonalDetailInputParams>()
  const [isLoading, setIsLoading] = useState(false)
  const url = `https://arcane-taiga-55468.herokuapp.com/https://drive.google.com/uc?id=${avatarId}`
  useEffect(() => {
    const convertURLtoFile = async () => {
      await fetch(url)
        .then((res) => res.blob()) // Gets the response and returns it as a blob
        .then((blob) => {
          setFieldValue(
            'avatar',
            new File([blob], `new-image-${avatarId}`, {
              lastModified: new Date().getTime(),
              type: blob.type,
            })
          )
          setIsLoading(false)
        })
    }
    if (avatarId) {
      setIsLoading(true)
      convertURLtoFile()
    }
  }, [avatarId, setFieldValue, url])
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
        {isLoading ? (
          <Skeleton variant="circular" width={160} height={160} />
        ) : (
          <Avatar
            classes={{ root: 'h-40 w-40 text-lg bg-primary' }}
            src={values.avatar ? URL.createObjectURL(values.avatar) : ''}
          />
        )}
      </Badge>
    </>
  )
}
