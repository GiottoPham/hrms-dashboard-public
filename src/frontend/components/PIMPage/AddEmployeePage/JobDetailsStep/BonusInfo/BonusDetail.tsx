import { FormikErrors, useFormikContext } from 'formik'
import type { Bonus, JobDetailInputParams } from '@frontend/types/employee'
import { TextInput } from '@frontend/framework/TextInput'
import { IconButton, InputLabel } from '@mui/material'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import NumberFormat from 'react-number-format'
import type { ChangeEvent } from 'react'
import { TextInputNumber } from '@frontend/framework/TextInputNumber'
export type BonusDetailProps = {
  onRemoveClick: () => void
  bonusId: number
  disabled?: boolean
}

export const BonusDetail = ({
  onRemoveClick,
  bonusId,
  disabled,
}: BonusDetailProps) => {
  const {
    values: { bonus },
    errors: { bonus: bonusError },
    touched: { bonus: bonusTouched },
    setFieldValue,
    handleBlur,
  } = useFormikContext<JobDetailInputParams>()
  return (
    <div className="w-full flex">
      <div className="w-1/2 mr-2">
        <TextInput
          disabled={disabled}
          required
          fullWidth
          id={`bonus[${bonusId}].bonusName`}
          label={'Bonus Name'}
          name={`bonus[${bonusId}].bonusName`}
          onBlur={handleBlur}
          placeholder={'Bonus Name'}
          value={bonus[bonusId].bonusName}
          error={
            !!(bonusError as FormikErrors<Bonus>[] | undefined)?.[bonusId]
              ?.bonusName && bonusTouched?.[bonusId]?.bonusName
          }
          onChange={(e) =>
            setFieldValue(`bonus[${bonusId}].bonusName`, e.target.value)
          }
          InputProps={{
            classes: { root: 'h-10 rounded-lg font-nunito bg-white text-sm' },
          }}
        />
        {!!(bonusError as FormikErrors<Bonus>[] | undefined)?.[bonusId]
          ?.bonusName &&
          bonusTouched?.[bonusId]?.bonusName && (
            <p className="text-danger text-sm font-semibold">
              {
                (bonusError as FormikErrors<Bonus>[] | undefined)?.[bonusId]
                  ?.bonusName
              }
            </p>
          )}
      </div>
      <div className="w-1/2 mr-1">
        <InputLabel className="text-sm font-nunito font-bold text-black mb-1">
          Bonus Amount
        </InputLabel>
        <NumberFormat
          disabled={disabled}
          id={`bonus[${bonusId}].bonusAmount`}
          name={`bonus[${bonusId}].bonusAmount`}
          onBlur={handleBlur}
          placeholder={'Bonus Amount'}
          value={bonus[bonusId].bonusAmount}
          error={
            !!(bonusError as FormikErrors<Bonus>[] | undefined)?.[bonusId]
              ?.bonusAmount && bonusTouched?.[bonusId]?.bonusAmount
          }
          onChange={(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
            setFieldValue(
              `bonus[${bonusId}].bonusAmount`,
              e.target.value.replaceAll(',', '').replace(' VND', '')
            )
          }
          thousandSeparator
          isNumericString
          suffix=" VND"
          customInput={TextInputNumber}
        />
      </div>
      {bonusId !== 0 ? (
        <div className="self-end w-10">
          <IconButton onClick={onRemoveClick} disabled={disabled}>
            <RemoveCircleOutlineIcon className="w-6 h-6 text-danger" />
          </IconButton>
        </div>
      ) : (
        <div className="w-10"></div>
      )}
    </div>
  )
}
