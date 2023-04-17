import { useTheme } from '@mui/material/styles'

interface props {
  width?: number | undefined
  height?: number | undefined
}
export default function AppLogo({ width = 40, height = 40 }: props) {
  const theme = useTheme()

  return (
    <svg
      width={width}
      height={height}
      fill='none'
      viewBox='0 0 232.000000 210.000000'
      xmlns='http://www.w3.org/2000/svg'
      style={{ filter: 'drop-shadow(2px 2px 2px rgb(0 0 0 / 0.3))' }}
    >
      <g
        transform='translate(0.000000,210.000000) scale(0.100000,-0.100000)'
        fill={theme.palette.primary.main}
        stroke='none'
      >
        <path
          d='M1115 2078 c-47 -25 -1062 -684 -1087 -706 -11 -9 -18 -29 -18 -53 0
                        -31 6 -42 38 -67 20 -16 51 -37 69 -47 l32 -19 -57 -36 c-74 -47 -84 -61 -80
                        -107 3 -34 9 -42 65 -78 34 -22 63 -43 63 -46 0 -3 -29 -24 -65 -47 -64 -41
                        -65 -42 -65 -86 l0 -44 153 -99 c382 -250 896 -582 938 -606 25 -15 53 -27 63
                        -27 16 0 1000 630 1094 700 26 20 48 44 50 54 3 13 0 16 -10 11 -10 -6 -11 -5
                        0 6 25 27 13 49 -53 91 -36 23 -65 44 -65 48 0 3 14 14 31 24 48 28 99 76 99
                        93 0 13 -3 13 -17 2 -14 -11 -14 -8 2 9 25 30 15 45 -62 97 l-60 40 66 45 c62
                        42 66 48 69 87 l3 42 -88 59 c-198 132 -1053 682 -1060 682 -4 -1 -26 -10 -48
                        -22z m550 -440 c267 -172 485 -315 485 -318 0 -13 -91 -61 -102 -54 -7 4 -204
                        132 -438 284 -234 152 -430 279 -437 283 -15 9 -33 -2 -508 -311 -214 -139
                        -397 -254 -405 -255 -17 -1 -90 40 -90 51 0 4 94 68 208 142 570 370 777 500
                        789 496 7 -3 232 -146 498 -318z m-4 -264 c269 -175 489 -320 489 -323 0 -12
                        -88 -54 -101 -49 -8 3 -158 99 -334 213 -176 114 -368 239 -426 276 -58 38
                        -117 69 -130 69 -23 0 -126 -64 -550 -341 -74 -49 -141 -89 -147 -89 -20 0
                        -93 53 -85 61 24 22 770 499 781 499 8 0 234 -142 503 -316z m-209 -131 c158
                        -104 288 -190 288 -193 0 -3 -123 -84 -273 -180 -220 -141 -279 -175 -307
                        -175 -28 0 -87 33 -307 175 -150 96 -272 178 -273 182 0 6 570 378 579 378 2
                        0 134 -84 293 -187z m-1052 -223 c47 -31 220 -144 385 -250 165 -106 311 -201
                        324 -211 13 -11 34 -19 46 -19 12 0 171 97 354 215 182 118 339 215 348 215
                        19 0 83 -38 83 -50 0 -8 -746 -495 -774 -506 -7 -3 -217 127 -466 289 -250
                        161 -472 303 -492 316 -21 12 -38 27 -38 31 0 5 19 20 42 34 49 29 49 29 188
                        -64z m302 -462 c238 -154 440 -283 449 -285 18 -5 137 69 609 377 160 104 296
                        190 302 190 6 0 30 -12 53 -27 l42 -26 -86 -57 c-448 -294 -904 -581 -919
                        -578 -10 2 -237 145 -504 318 l-486 315 42 27 c22 16 47 28 53 28 7 0 208
                        -127 445 -282z'
        ></path>
      </g>
    </svg>
  )
}