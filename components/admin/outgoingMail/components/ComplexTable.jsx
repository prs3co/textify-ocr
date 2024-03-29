import { promises as fs } from "fs"
import path from "path"
import Image from "next/image"
import { z } from "zod"

import { columns } from "@/components/admin/outgoingMail/components/columns"
import { DataTable } from "@/components/admin/outgoingMail/components/data-table"
import { UserNav } from "@/components/admin/outgoingMail/components/user-nav"
import { mailSchema } from "@/components/admin/outgoingMail/components/data/schema"
import CardMenu from '@/components/card/CardMenu'
import Card from '@/components/card'

// Simulate a database read for tasks.
async function getMails() {
  // const data = await fs.readFile(
  //   path.join(process.cwd(), "components\\admin\\outgoingMail\\components\\data\\tasks.json")
  // )

  const data = await fetch('http://localhost:3000/api/outcoming-mail', { cache: 'no-store'})
  const dataApi = await data.json()
  console.log(dataApi)

  // const tasks = JSON.parse(dataApi.toString())

  return z.array(mailSchema).parse(dataApi)
}

export default async function TaskPage() {
  const mails = await getMails()

  return (
    <Card extra={'w-full h-full px-6 pb-6 sm:overflow-x-auto'}>
      <div className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          Complex Table
        </div>
        <CardMenu />
      </div>

      <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
        <DataTable data={mails} columns={columns} />
      </div>
    </Card>
  )
}