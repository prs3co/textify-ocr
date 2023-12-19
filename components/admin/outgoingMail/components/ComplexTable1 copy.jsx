import React from 'react';
import CardMenu from '@/components/card/CardMenu';
import Card from '@/components/card';
import { promises as fs } from "fs"
import path from "path"

import { columns } from "./columns"
import { DataTable } from "./data-table"
import { UserNav } from "./user-nav"
import { taskSchema } from "./data/schema"

// Simulate a database read for tasks.
async function getTasks() {
  const data = await fs.readFile(
    path.join(process.cwd(), "components\admin\outgoingMail\components\data\tasks.json")
  )

  const tasks = JSON.parse(data.toString())

  return z.array(taskSchema).parse(tasks)
}

// const columns = columnsDataCheck;
export default async function ComplexTable(props) {
  const tasks = await getTasks()

  const { tableData } = props;
  const [sorting, setSorting] = React.useState([]);

  let defaultData = tableData;

  const [data, setData] = React.useState(() => [...defaultData]);

  return (
    <Card extra={'w-full h-full px-6 pb-6 sm:overflow-x-auto'}>
      <div className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          Complex Table
        </div>
        <CardMenu />
      </div>

      <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
        <DataTable data={tasks} columns={columns} />
      </div>
    </Card>
  );
}
