import { usePayrollParams } from '@frontend/state/payroll-params'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CardActionArea,
  IconButton,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useShowPayroll } from '@frontend/state/show-payroll'
import cx from 'classnames'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import { useState } from 'react'
import { currencyFormatter } from '@frontend/framework/utils/currency'
import { usePayroll } from '@frontend/state/payroll-queries'

export const EmployeePayroll = () => {
  const { payrollParams } = usePayrollParams()
  const { setShowPayroll } = useShowPayroll()
  const [show, setShow] = useState(false)
  const [showBonus, setShowBonus] = useState(false)
  const [showTax, setShowTax] = useState(false)
  const { payroll, isLoading } = usePayroll(payrollParams)
  if (isLoading) return null
  return (
    <div className="flex-grow relative h-full font-nunito text-sm font-semibold">
      <div className="absolute left-0 top-0 -mt-5 -mr-2">
        Payroll of employee {payrollParams?.employeeId}
      </div>
      <div className="absolute right-0 top-0 -mt-5 -mr-2">
        <IconButton className="bg-white" onClick={() => setShowPayroll(false)}>
          <CloseIcon className="w-5 h-5 text-primary" />
        </IconButton>
      </div>
      <div className="flex-grow rounded-lg h-full overflow-hidden border border-primary">
        <div className="w-full bg-primary h-12 flex">
          <div className="w-1/4 flex px-5 items-center h-full">
            <p>Basic Salary Info</p>
          </div>
          <div className="w-1/4 flex px-5 items-center h-full">
            <p>Number</p>
          </div>
          <div className="w-1/4 flex px-5 items-center h-full">
            <p>Explain</p>
          </div>
          <div className="w-1/4 flex px-5 items-center h-full">
            <p>Amount</p>
          </div>
        </div>
        <div className="w-full h-12 flex bg-white">
          <div className="w-1/4 flex items-center h-full px-5">
            <p>Basic Salary</p>
          </div>
          <div className="w-1/4 flex px-10 items-center h-full">
            <p>(1)</p>
          </div>
          <div className="w-1/4 flex px-5 items-center h-full"></div>
          <div className="w-1/4 flex px-5 items-center h-full">
            <p>{currencyFormatter(payroll?.basicSalary) || '--'}</p>
          </div>
        </div>
        <div className="w-full h-12 flex bg-primary-200">
          <div className="w-1/4 flex items-center h-full px-5">
            <p>Bonus (Optional)</p>
          </div>
          <div className="w-1/4 flex px-10 items-center h-full">
            <p>(2)</p>
          </div>
          <div className="w-1/4 flex px-5 items-center h-full"></div>
          <div className="w-1/4 flex px-5 items-center h-full">
            <p>{currencyFormatter('0') || '--'}</p>
          </div>
        </div>
        <Accordion
          classes={{ root: 'p-0 border-none shadow-none' }}
          expanded={show}
          disableGutters
        >
          <AccordionSummary classes={{ root: 'p-0 h-12' }}>
            <CardActionArea
              className="w-full h-12 flex bg-primary relative font-semibold"
              onClick={() => setShow(!show)}
            >
              {show && (
                <ExpandMoreIcon className="w-6 h-6 absolute right-2 top-3" />
              )}
              {!show && (
                <ExpandLessIcon className="w-6 h-6 absolute right-2 top-3" />
              )}
              <div className="w-1/4 flex items-center h-full px-5">
                <p>Monthly Info</p>
              </div>
              <div className="w-1/4 flex px-10 items-center h-full"></div>
              <div className="w-1/4 flex px-5 items-center h-full"></div>
              <div className="w-1/4 flex px-5 items-center h-full"></div>
            </CardActionArea>
          </AccordionSummary>
          <AccordionDetails classes={{ root: 'p-0' }}>
            <div className="w-full h-12 flex bg-white">
              <div className="w-1/4 flex items-center h-full px-5">
                <p>Standard Working Days</p>
              </div>
              <div className="w-1/4 flex px-10 items-center h-full">(4)</div>
              <div className="w-1/4 flex px-5 items-center h-full"></div>
              <div className="w-1/4 flex px-5 items-center h-full">
                {payroll?.monthlyInfo.standardDay || '--'}
              </div>
            </div>
            <div className="w-full h-12 flex bg-primary-200">
              <div className="w-1/4 flex items-center h-full px-5">
                <p>Actual Working Days</p>
              </div>
              <div className="w-1/4 flex px-10 items-center h-full">(5)</div>
              <div className="w-1/4 flex px-5 items-center h-full"></div>
              <div className="w-1/4 flex px-5 items-center h-full">
                {payroll?.monthlyInfo.actualDay || '--'}
              </div>
            </div>
            <div className="w-full h-12 flex bg-white">
              <div className="w-1/4 flex items-center h-full px-5">
                <p>Unpaid Leave</p>
              </div>
              <div className="w-1/4 flex px-10 items-center h-full">(6)</div>
              <div className="w-1/4 flex px-5 items-center h-full"></div>
              <div className="w-1/4 flex px-5 items-center h-full">
                {payroll?.monthlyInfo.unpaidLeave || '--'}
              </div>
            </div>
            <div className="w-full h-12 flex bg-primary-200">
              <div className="w-1/4 flex items-center h-full px-5">
                <p>Paid Leave</p>
              </div>
              <div className="w-1/4 flex px-10 items-center h-full">(7)</div>
              <div className="w-1/4 flex px-5 items-center h-full"></div>
              <div className="w-1/4 flex px-5 items-center h-full">
                {payroll?.monthlyInfo.paidLeave || '--'}
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
        <div className="w-full h-12 flex bg-total text-white">
          <div className="w-1/4 flex items-center h-full px-5">
            <p>I. Total Derived Income</p>
          </div>
          <div className="w-1/4 flex px-10 items-center h-full"></div>
          <div className="w-1/4 flex px-5 items-center h-full"></div>
          <div className="w-1/4 flex px-5 items-center h-full">
            {currencyFormatter(payroll?.totalDerivedSalary) || '--'}
          </div>
        </div>
        <div className="bg-white h-2"></div>
        <div className="w-full h-12 flex bg-primary">
          <div className="w-1/4 flex items-center h-full px-5">
            <p>A. Derived Salary</p>
          </div>
          <div className="w-1/4 flex px-10 items-center h-full"></div>
          <div className="w-1/4 flex px-5 items-center h-full"></div>
          <div className="w-1/4 flex px-5 items-center h-full">
            {currencyFormatter(payroll?.derivedSalary) || '--'}
          </div>
        </div>
        <div className="bg-white h-2"></div>
        <Accordion
          classes={{ root: 'p-0 border-none shadow-none' }}
          expanded={showBonus}
          disableGutters
        >
          <AccordionSummary classes={{ root: 'p-0 h-12' }}>
            <CardActionArea
              className="w-full h-12 flex bg-primary relative font-semibold"
              onClick={() => setShowBonus(!showBonus)}
            >
              <div className="w-full h-12 flex bg-primary relative">
                {showBonus && (
                  <ExpandMoreIcon className="w-6 h-6 absolute right-2 top-3" />
                )}
                {!showBonus && (
                  <ExpandLessIcon className="w-6 h-6 absolute right-2 top-3" />
                )}
                <div className="w-1/4 flex items-center h-full px-5">
                  <p>B. Another Income</p>
                </div>
                <div className="w-1/4 flex px-10 items-center h-full"></div>
                <div className="w-1/4 flex px-5 items-center h-full"></div>
                <div className="w-1/4 flex px-5 items-center h-full">
                  {currencyFormatter(payroll?.totalBonus) || '--'}
                </div>
              </div>
            </CardActionArea>
          </AccordionSummary>
          <AccordionDetails classes={{ root: 'p-0' }}>
            {payroll?.bonus.map((item, index) => (
              <div
                className={cx('w-full h-12 flex', {
                  'bg-white': index % 2 === 0,
                  'bg-primary-200': index % 2 !== 0,
                })}
                key={index}
              >
                <div className="w-1/4 flex items-center h-full px-5">
                  <p>{item.bonusName}</p>
                </div>
                <div className="w-1/4 flex px-10 items-center h-full"></div>
                <div className="w-1/4 flex px-5 items-center h-full"></div>
                <div className="w-1/4 flex px-5 items-center h-full">
                  {currencyFormatter(item.bonusAmount)}
                </div>
              </div>
            ))}
          </AccordionDetails>
        </Accordion>
        <div className="w-full h-12 flex bg-total text-white">
          <div className="w-1/4 flex items-center h-full px-5">
            <p>II. Total Deduction</p>
          </div>
          <div className="w-1/4 flex px-10 items-center h-full"></div>
          <div className="w-1/4 flex px-5 items-center h-full"></div>
          <div className="w-1/4 flex px-5 items-center h-full">
            {currencyFormatter(payroll?.totalDerivedSalary) || '--'}
          </div>
        </div>
        <div className="bg-white h-2"></div>
        <div className="w-full h-12 flex bg-primary">
          <div className="w-1/4 flex flex-col h-full px-5 justify-center">
            <p>A. Mandatory Insurance</p>
            <p className="w-80">8% Social, 1.5% Health, 2% Unemployed</p>
          </div>
          <div className="w-1/4 flex px-10 items-center h-full"></div>
          <div className="w-1/4 flex px-5 items-center h-full">
            (I)*10.5/100
          </div>
          <div className="w-1/4 flex px-5 items-center h-full">
            {currencyFormatter(payroll?.mandatoryInsurance) || '--'}
          </div>
        </div>
        <div className="bg-white h-2"></div>
        <Accordion
          classes={{ root: 'p-0 border-none shadow-none' }}
          expanded={showTax}
          disableGutters
        >
          <AccordionSummary classes={{ root: 'p-0 h-12' }}>
            <CardActionArea
              className="w-full h-12 flex bg-primary relative font-semibold"
              onClick={() => setShowTax(!showTax)}
            >
              <div className="w-full h-12 flex bg-primary relative">
                {showTax && (
                  <ExpandMoreIcon className="w-6 h-6 absolute right-2 top-3" />
                )}
                {!showTax && (
                  <ExpandLessIcon className="w-6 h-6 absolute right-2 top-3" />
                )}
                <div className="w-1/4 flex flex-col h-full px-5 justify-center">
                  <p>B. Personal Income Tax</p>
                </div>
                <div className="w-1/4 flex px-10 items-center h-full"></div>
                <div className="w-1/4 flex px-5 items-center h-full"></div>
                <div className="w-1/4 flex px-5 items-center h-full">
                  {currencyFormatter(payroll?.personalIncomeTax) || '--'}
                </div>
              </div>
            </CardActionArea>
          </AccordionSummary>
          <AccordionDetails classes={{ root: 'p-0' }}>
            <div className="w-full h-12 flex bg-white">
              <div className="w-1/4 flex flex-col h-full px-5 justify-center">
                <p>Allowance not subjected to tax</p>
              </div>
              <div className="w-1/4 flex px-10 items-center h-full">(8)</div>
              <div className="w-1/4 flex px-5 items-center h-full"></div>
              <div className="w-1/4 flex px-5 items-center h-full">
                {currencyFormatter('730000')}
              </div>
            </div>
            <div className="w-full h-12 flex bg-primary-200">
              <div className="w-1/4 flex flex-col h-full px-5 justify-center">
                <p>Personal Relief</p>
              </div>
              <div className="w-1/4 flex px-10 items-center h-full">(9)</div>
              <div className="w-1/4 flex px-5 items-center h-full"></div>
              <div className="w-1/4 flex px-5 items-center h-full">
                {currencyFormatter('11000000')}
              </div>
            </div>
            <div className="w-full h-12 flex bg-white">
              <div className="w-1/4 flex flex-col h-full px-5 justify-center">
                <p>Dependent Relief</p>
              </div>
              <div className="w-1/4 flex px-10 items-center h-full">(10)</div>
              <div className="w-1/4 flex px-5 items-center h-full"></div>
              <div className="w-1/4 flex px-5 items-center h-full">
                {currencyFormatter('0')}
              </div>
            </div>
            <div className="w-full h-12 flex bg-primary-200">
              <div className="w-1/4 flex flex-col h-full px-5 justify-center">
                <p>Taxable Income</p>
              </div>
              <div className="w-1/4 flex px-10 items-center h-full">(11)</div>
              <div className="w-1/4 flex px-5 items-center h-full">
                (I)-(II.A)-(8)-(9)-(10)
              </div>
              <div className="w-1/4 flex px-5 items-center h-full">
                {currencyFormatter(payroll?.taxableIncome) || '--'}
              </div>
            </div>
            <div className="w-full h-12 flex bg-white">
              <div className="w-1/4 flex flex-col h-full px-5 justify-center">
                <p>Personal Income Tax</p>
              </div>
              <div className="w-1/4 flex px-10 items-center h-full">(12)</div>
              <div className="w-1/4 flex px-5 items-center h-full"></div>
              <div className="w-1/4 flex px-5 items-center h-full">
                {currencyFormatter(payroll?.personalIncomeTax) || '--'}
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
        <div className="w-full h-12 flex bg-total text-white">
          <div className="w-1/4 flex items-center h-full px-5">
            <p>III. Net Income</p>
          </div>
          <div className="w-1/4 flex px-10 items-center h-full"></div>
          <div className="w-1/4 flex px-5 items-center h-full">(I)-(II)</div>
          <div className="w-1/4 flex px-5 items-center h-full">
            {currencyFormatter(payroll?.netIncome) || '--'}
          </div>
        </div>
      </div>
    </div>
  )
}
