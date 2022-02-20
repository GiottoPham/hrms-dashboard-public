import { useFormikContext } from 'formik'
import type { Bonus, JobDetailInputParams } from '@frontend/types/employee'
import { BonusDetail } from '@components/PIMPage/AddEmployeePage/JobDetailsStep/BonusInfo/BonusDetail'
import { Button } from '@mui/material'
import { isEmpty } from 'lodash'
export const BonusInfo = () => {
  const {
    values: { bonus },
    setFieldValue,
  } = useFormikContext<JobDetailInputParams>()
  const deleteBonus = (id: number) => {
    bonus[id] = {} as Bonus
    setFieldValue('bonus', bonus)
  }
  return (
    <>
      {bonus.map((item, index) => {
        if (isEmpty(item)) return null
        return (
          <BonusDetail
            bonusId={index}
            key={index}
            onRemoveClick={() => deleteBonus(index)}
          />
        )
      })}
      <Button
        onClick={() =>
          setFieldValue('bonus', [...bonus, { bonusName: '', bonusAmount: '' }])
        }
        disableElevation
        variant="contained"
        classes={{
          root: 'text-white text-base font-nunito font-semibold normal-case h-10 rounded-full mt-2',
        }}
      >
        Add Bonus
      </Button>
    </>
  )
}
