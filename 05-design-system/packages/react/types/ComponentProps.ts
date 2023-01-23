/* eslint-disable prettier/prettier */
import { ComponentProps } from '@stitches/react'
import { ElementType } from 'react'

export type ComponentProps<T> = CP<T> & {
  as: ElementType
}