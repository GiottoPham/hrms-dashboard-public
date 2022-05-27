import { isValid } from 'date-fns'
import { format } from 'date-fns-tz'

export const formatDate = (
  date: Date | string | number | null | undefined,
  dateFormat: DateFormat,
  timeZone = 'Vietnam'
) => {
  if (!date) {
    return ''
  }

  if (!isValid(new Date(date))) {
    return ''
  }

  return format(new Date(date), dateFormat, { timeZone })
}

/**
 * See https://date-fns.org/v2.23.0/docs/format
 * Extends this type as we go
 */
type DateFormat =
  | 'yyyy/MM/dd - HH:mm' // 1991/06/29 - 00:00
  | 'yyyy/MM/dd HH:mm' // 1991/06/29 00:00
  | 'yyyy/MM/dd' // 1991/06/29
  | 'MM/dd/yyyy' // '08/08/2021
  | 'yyyy-MM-dd' // 1991-06-29
  | 'MM-dd-yyyy' // 06-29-1991
  | 'MM/dd/yyyy' // 06/29/1991
  | 'MM/dd' // 06/29
  | 'yyyy' // 1991
  | 'MMMM' // June
  | 'MMM' // Jun
  | 'MMM dd' // Jun 29
  | 'MM/dd' // 6/29
  | 'MMM dd, yyyy' // Jun 29, 1991
  | 'EEE, MMM do, yyyy' // Jun 29, 1991
  | 'hh:mmaaa' // 12:00am
  | 'hh:mm aa' // 12:00 AM
  | 'HH:mm' // 00:00
  | 'EEE, MMM dd' // Mon, Jun 29
  | 'EEE, MMM dd, yyyy, hh:mmaaa' // Mon, Jun 29, 1991, 00:00am
  | 'EEE' // Mon
  | 'dd' // 29
  | 'MMM do yyyy' // Jun 12th 1991
  | 'MMM yyyy'
  | 'EEE, MMM dd'
  | 'EEEE' // Monday
  | 'hh:mm:ss'
