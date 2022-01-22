import { TextInput, TextInputDefaultProps } from './framework/TextInput'
import router from 'next/router'
import { Button, CircularProgress, IconButton } from '@mui/material'
import { object, string } from 'yup'
import { useFormik } from 'formik'
import { LogoIcon } from '@frontend/framework/icons/LogoIcon'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import { useState } from 'react'
import { useLogin } from '@frontend/state/auth-mutation'
import { useToast } from '@frontend/framework/Toast'
export const LoginPage = () => {
  const { login } = useLogin()
  const { openToast } = useToast()
  const {
    isSubmitting,
    touched,
    values,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
    setSubmitting,
  } = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginValidationSchema,
    onSubmit: () => {
      login({ username: values.username, password: values.password })
        .then(() => {
          router.push('/')
        })
        .catch(() => openToast('Username or password is incorrect'))
        .finally(() => {
          setSubmitting(false)
        })
    },
  })
  const [showPass, setShowPass] = useState(false)
  return (
    <div className="min-h-screen w-full min-w-[1366px] grid place-items-center bg-primary-100">
      <div className="flex flex-col items-center rounded-lg p-10 bg-white border-2 border-primary">
        <header className="flex flex-col items-center">
          <LogoIcon className="w-60 h-60" />
        </header>

        <form className="pt-10 w-96" onSubmit={handleSubmit} noValidate>
          <TextInput
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            value={values.username}
            error={!!errors.username && touched.username}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <div className="pt-4">
            <TextInput
              required
              fullWidth
              name="password"
              label="Password"
              type={showPass ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={values.password}
              error={!!errors.password && touched.password}
              onChange={handleChange}
              onBlur={handleBlur}
              InputProps={{
                classes: TextInputDefaultProps.InputProps.classes,
                endAdornment: (
                  <IconButton onClick={() => setShowPass(!showPass)}>
                    <RemoveRedEyeIcon className="w-5 h-5" />
                  </IconButton>
                ),
              }}
            />
          </div>

          <div className="pt-10">
            <Button
              disableElevation
              type="submit"
              fullWidth
              variant="contained"
              classes={{
                root: 'text-white text-base font-nunito font-semibold normal-case h-12 rounded-lg',
              }}
              disabled={isSubmitting}
            >
              {isSubmitting && (
                <CircularProgress size={16} thickness={6} color="inherit" />
              )}
              <span className="pl-2">Login</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

const loginValidationSchema = object().shape({
  username: string().required('Username is required'),
  password: string().required('Password is required'),
})
