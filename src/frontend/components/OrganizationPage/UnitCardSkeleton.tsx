import { Skeleton } from '@mui/lab'

export const UnitCardSkeleton = () => {
  return (
    <>
      <div className="relative rounded-full font-nunito normal-case bg-white flex items-center p-4 w-full h-14">
        <Skeleton variant="text" classes={{ root: 'w-full bg-primary-100' }} />
      </div>
      <div className="relative rounded-full font-nunito normal-case bg-white flex items-center p-4 w-full mt-4 h-14">
        <Skeleton variant="text" classes={{ root: 'w-full bg-primary-100' }} />
      </div>
      <div className="relative rounded-full font-nunito normal-case bg-white flex items-center p-4 w-full mt-4 h-14">
        <Skeleton variant="text" classes={{ root: 'w-full bg-primary-100' }} />
      </div>
    </>
  )
}
