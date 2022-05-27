import { LogoIcon2 } from '@frontend/framework/icons/LogoIcon2'
import { useState } from 'react'
import QRCode from 'react-qr-code'
import { useInterval } from 'usehooks-ts'

export const QRPage = () => {
  const [time, setTime] = useState(new Date().getTime())
  useInterval(() => {
    setTime(new Date().getTime())
  }, 10000)

  return (
    <div className="min-h-screen flex flex-row justify-between relative">
      <div className="w-full h-full flex-grow flex flex-col items-center justify-center">
        <div className="pt-10">
          <LogoIcon2 className="w-52 h-auto" />
        </div>
        <p className="font-extrabold font-nunito text-4xl py-10 text-center">
          CHECKIN <span className="text-primary">QR CODE</span>
        </p>
        <QRCode value={time + ''} />
      </div>
    </div>
  )
}
