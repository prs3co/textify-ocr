"use client"

import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row } from "@tanstack/react-table"
import Link from 'next/link'

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { labels } from "./data/data"
import { mailSchema } from "./data/schema"

export function DataTableRowActions({
  row,
}) {
  const mail = mailSchema.parse(row.original)
  console.log(mail)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem className='p-0'>
          <Button
            variant='ghost'
            className='flex h-8 w-full text-left px-2 py-1.5 data-[state=open]:bg-muted'
          >
            <Link href={`/admin/surat-keluar/${mail._id}`} className='font-normal w-full h-full'>Ubah</Link>
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem className='p-0'>
          <Button
            variant='ghost'
            className='flex h-8 w-full text-left px-2 py-1.5 data-[state=open]:bg-muted'
          >
            <Link href='/' className='font-normal w-full h-full'>Make a copy</Link>
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem className='p-0'>
          <Button
            variant='ghost'
            className='flex h-8 w-full text-left px-2 py-1.5 data-[state=open]:bg-muted'
          >
            <Link href='/' className='font-normal w-full h-full'>Hapus</Link>
          </Button>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value={mail.label}>
              {labels.map((label) => (
                <DropdownMenuRadioItem key={label.value} value={label.value}>
                  {label.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
