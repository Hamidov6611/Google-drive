import { IFolderAndFile } from '@/types'
import React from 'react'

interface ListProps {
    folders: IFolderAndFile
    files: IFolderAndFile
}

const Lists = ({}: ListProps) => {
  return (
    <div>Lists</div>
  )
}

export default Lists