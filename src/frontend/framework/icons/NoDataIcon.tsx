import type { SvgIconProps } from '@frontend/types/svg-icon'

export const NoDataIcon = ({ className }: SvgIconProps) => {
  return (
    <svg
      width="256"
      height="256"
      viewBox="0 0 256 256"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className={className}
    >
      <rect width="256" height="256" fill="url(#pattern0)" />
      <defs>
        <pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_819_2944" transform="scale(0.00390625)" />
        </pattern>
        <image
          id="image0_819_2944"
          width="256"
          height="256"
          xlinkHref="data:image/png;base64,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k8uAwQ9QaNljHdiwehSzSy8QAaD2f0eldjrqHIEj7NgrVGzlsf/EeWP3wni2vOxSRe23nqcV1S0h/NdbAnyJbPUX+C/Y5pvHaP+ITgoAn176GUagybUIKw6K38L2LmdCcM+3uj7MXp5HAljq4/+p+YyYiY0C4ElDys7/VZhfm8d0/sU5qW3+BjHb42mYbYXwH1e7XcsCwA7q6t/rc8hHkpz6fxrMky3SbSpoH0/+I9dt6vdlzin8V0df3siYr9qCl3IdYf6ldnyGbMCmh6tiWOeL5Ttqv/UolaujPvOTQWBc70h7XYj+E+Wax9RdR6CyNx/XjOrD7LAW4Mo2r/GoQNMEgKD/sv1mA2AKzHP3cNU6jv0RBS3OYnr/djDyuf/mV7Nq0lxVaZOax6wvNI/B6tERNR87x/y1uq/Cgu1bXRRgxmzAxMM3/5s+OaUigWD4PWr5xU7iyZzj2MX/ef68W+bbQKWqq3832HDOc/t6Ls8Mcf9z9r84AM075YU/HVuG6eitAe9d9s2pMC/KoOr/Lmy/RKs7ox6F8HEZJBoXj22BcXroM1DqvOR2FYEvdf0Bp/kAQjiwxDwO0nwvotzwVkcvDZgbsk9Q5Qcw3CeRoYk48WnkzSgoLUeoOQEF/UMxN10DFWXAzgsA6/q2/3wkacBh6eY0IYC4dQJXpaPHB3aOwlg/jzDJJ1P9ETiGAE+5/beLHGj3n+4xAVz4ZigOsrfyNQABUEi2r6MHR8bcvi9EM1gg8hl/0tgEmH9znNif4VXfLpruRr1iAjhE22fC4JJgYvI5QYPp0BGmiWdNP0Dtl2zAHTDOkznmm5wqdY8J4Lbo4NkjHYGb+ReqQ8fM6FBhqa/MmQbuC+DHvfD/5c7rn+UMqADoIhMAQS23SFzW3CmhmgNeC8iBOejoeRMgDZuYEtDnBHc8Mg1cPKT5CVWLwjEnhsxfTtT2704tIA2xAe1+eok1dfbpOPygVuYbH5savm0XLhxPwPxZBUx+wTQnMzr+qsr83cf8a8dECHjk2Qtg1b+TEFu5ocXeSMNfOlwYELeJoS0sGLthfAv2/wXmy9tchx+x8/ujzMGsiD9dawJgTnetntMEvE8gNUtj8g1oAowOSQTCbWJoC8x/SlTN14MIrHl/VPUw533lVWrzd3skAHvUeSFQXrtJH4rS3BcRLOtN7ABGlBzKFDF+VRl/Eb3Eel8kudkO3sk1osgKQHT0fDEQzQkG8eAuRRmgx8p0rG+5ZvcpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpzZf+PwCK88J2AKjRAAAAAElFTkSuQmCC"
        />
      </defs>
    </svg>
  )
}
