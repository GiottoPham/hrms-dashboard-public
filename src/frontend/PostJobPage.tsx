import { LocationIcon } from '@frontend/framework/icons/LocationIcon'
import { LogoIcon2 } from '@frontend/framework/icons/LogoIcon2'
import type { NewVacanciesInfo } from '@frontend/types/vacancies-info'
import { Button } from '@mui/material'
import Image from 'next/image'
import PictureJob from '../assets/images/picture_job.png'
export const PostJobPage = () => {
  const vacanciesList = [
    {
      id: 1,
      positionTitle: 'Frontend Engineer',
      departmentName: 'Dev Frontend Team',
      postContent: 'We need you guys',
    },
    {
      id: 1,
      positionTitle: 'Frontend Engineer',
      departmentName: 'Dev Frontend Team',
      postContent:
        'We need you guys We need you guys We need you guys We need you guys We need you guys We need you guys We need you guys',
    },
    {
      id: 1,
      positionTitle: 'Frontend Engineer',
      departmentName: 'Dev Frontend Team',
      postContent: 'We need you guys',
    },
    {
      id: 1,
      positionTitle: 'Frontend Engineer',
      departmentName: 'Dev Frontend Team',
      postContent: 'We need you guys',
    },
  ]
  return (
    <div className="min-h-screen flex flex-row justify-between relative">
      <div className="w-1/2 h-full flex-grow flex flex-col">
        <div className="pl-10 py-10">
          <LogoIcon2 className="w-52 h-auto" />
        </div>
        <div className="pl-20">
          <p className="font-extrabold font-nunito text-4xl">
            BUILD THE <span className="text-primary">TECHNOLOGIES</span> <br />
            USED AND LOVED BY <span className="text-primary">EVERYONE</span>
          </p>
        </div>
        <div className="font-semibold font-nunito self-end -mr-20 z-30 space-y-5 py-5 flex flex-col">
          <div className="flex">
            <p className="text-3xl font-nunito font-bold border-b-4 border-primary">
              LIST JOBS OPENING
            </p>
          </div>

          {vacanciesList.map((vacancies) => (
            <JobCard key={vacancies.id} vacancies={vacancies} />
          ))}
        </div>
      </div>
      <div className="w-7/12 relative flex-shrink-0 bg-black">
        <Image
          src={PictureJob}
          alt="picture-job"
          layout="fill"
          objectFit="cover"
          className="opacity-40 z-10"
        />
      </div>
    </div>
  )
}
export const JobCard = ({ vacancies }: { vacancies: NewVacanciesInfo }) => {
  return (
    <div className="shadow-search w-[500px] rounded-xl bg-white flex flex-col py-3 pl-5 font-nunito border border-gray-100">
      <div className="flex justify-between pr-2">
        <div className="flex items-center -ml-2">
          <LocationIcon className="w-6 h-6" />
          <p>Ho Chi Minh City</p>
        </div>
        <div>
          <Button className="rounded-full bg-black text-xs normal-case font-bold">
            Apply Here
          </Button>
        </div>
      </div>
      <div>
        <p className="text-xl font-bold mt-1">{vacancies.positionTitle}</p>
      </div>
      <div>
        <p className="line-clamp-2 text-sm mt-1">{vacancies.postContent}</p>
      </div>
    </div>
  )
}
