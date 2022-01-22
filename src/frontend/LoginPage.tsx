import { TextInput, TextInputDefaultProps } from './framework/TextInput'
import router from 'next/router'
import { Button, CircularProgress, IconButton } from '@mui/material'
import { object, string } from 'yup'
import { useFormik } from 'formik'
import { LogoIcon } from '@frontend/framework/icons/LogoIcon'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import { useState } from 'react'
export const LoginPage = () => {
  const {
    isSubmitting,
    touched,
    values,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
  } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginValidationSchema,
    onSubmit: () => {
      router.push('/')
    },
  })
  const [showPass, setShowPass] = useState(false)
  return (
    <div className="min-h-screen w-full min-w-[1366px] grid place-items-center bg-gray-500">
      <div className="flex flex-col items-center rounded-lg p-10 bg-white">
        <header className="flex flex-col items-center">
          <LogoIcon className="w-60 h-60" />
        </header>

        <form className="pt-10 w-96" onSubmit={handleSubmit} noValidate>
          <TextInput
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={values.email}
            error={!!errors.email && touched.email}
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

const emailSchema = string()
  .email('Invalid email')
  .max(255, 'Email is too long')
  .required('Email is required')

const loginValidationSchema = object().shape({
  email: emailSchema,
  password: string().required('Password is required'),
})
