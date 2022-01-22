import type { SvgIconProps } from '@frontend/types/svg-icon'

export const PimIcon = ({ className }: SvgIconProps) => {
  return (
    <svg
      width="19"
      height="21"
      viewBox="0 0 19 21"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M2 9V16H5V9H2ZM8 9V16H11V9H8ZM0 21H19V18H0V21ZM14 9V16H17V9H14ZM9.5 0L0 5V7H19V5L9.5 0Z" />
    </svg>
  )
}
