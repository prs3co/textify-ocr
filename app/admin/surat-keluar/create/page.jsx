'use client';

// Custom components
import Upload from '@/components/admin/outgoingMail/components/Upload';

import dummyData from '@/utils/dummyData'
import { parseISO } from 'date-fns';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import HashLoader from "react-spinners/HashLoader";

function CreateOutcomingMail() {
  const [ file, setFile ] = useState([])
  const [ isLoading, setIsLoading ] = useState(false)
  // const [fetchData, setFetchData] = useState(null)
  const form = useForm()

  function onInputFileHandler(file) {
    setFile(file)
  }

  async function onSubmitHandler() {
    // testing dummy
    // let tes = fetchData.map(data => (
    //   data.content
    // ))
    // console.log(tes.join(' '))

    if (!file) {
      console.warn("no file was chosen");
      return;
    }

    const formData = new FormData();
    formData.append("document", file[0]);

    try {
      setIsLoading(true)
      const res = await fetch("/api/outcoming-mail", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        console.error("something went wrong, check your console.");
        return;
      }

      const data = await res.json();

      const fetchDataDoc = await data?.document?.inference?.prediction
      const noRegistration = fetchDataDoc?.registration_number?.values
      const letterNumber = fetchDataDoc?.letter_number?.values
      const address = fetchDataDoc?.address?.values
      const letterDate = fetchDataDoc?.letter_date?.values
      const title = fetchDataDoc?.title?.values

      form.setValue('noRegistration', noRegistration?.map(obj => (obj.content)).join(' '))
      form.setValue('letterNumber', letterNumber?.map(obj => (obj.content)).join(' '))
      form.setValue('address', address?.map(obj => (obj.content)).join(' '))
      form.setValue('letterDate', parseISO(letterDate?.map(obj => (obj.content)).join('')))
      form.setValue('title', title?.map(obj => (obj.content)).join(' '))

      setIsLoading(false)
    } catch (error) {
      console.error("something went wrong, check your console.");
    }
  }

  function onDeleteHandler() {
    console.log(fetchData)
    setFile([])
  }

  return (
    <div className="flex w-full flex-col gap-5 lg:gap-5">
      {
        isLoading ? (
          <div className='w-full h-screen fixed inset-x-0 inset-y-0 flex justify-center	items-center z-10 bg-black opacity-50'>
            <HashLoader
              color="#4318FF"
              size={90}
            />
          </div>
        ) : (
          null
        )
      }
      <div className="w-ful mt-3 flex h-fit flex-col gap-5 lg:grid lg:grid-cols-12">
        <div className="z-0 col-span-12 lg:!mb-0">
          <FormProvider {...form}>
            <Upload file={file} onInput={onInputFileHandler} onDelete={onDeleteHandler} onSubmit={onSubmitHandler} />
          </FormProvider>
        </div>
      </div>
    </div>
  );
}

export default CreateOutcomingMail