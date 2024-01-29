'use client';

// Custom components
import Upload from '@/components/admin/outgoingMail/components/Upload';

import dummyData from '@/utils/dummyData'
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod'

import { parseISO } from 'date-fns';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import HashLoader from "react-spinners/HashLoader";
import useSWR from 'swr'

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ["application/pdf"];


const formSchema = z.object({
  noRegistration: z.coerce.number({
    required_error: "No registrasi harus diisi",
  }).min(1, 'Angka harus lebih besar atau sama dengan 1'),
  letterNumber: z.string({
    required_error: "No registrasi harus diisi",
    // invalid_type_error: "No surat harus berupa angka",
  }).min(1, 'Harus berisi setidaknya 1 karakter'),
  address: z.string({
    required_error: "Tujuan surat harus diisi",
  }).min(1, 'Tujuan surat harus diisi'),
  letterDate: z.date({
    required_error: "Tanggal diperlukan",
  }),
  title: z.string({
    required_error: "Tujuan surat harus diisi"
  }).min(1, 'Tujuan surat harus diisi'),
  file: z
    .any()
    .refine((files) => files, "File harus diisi.")
    // .refine((files) => files?.size <= MAX_FILE_SIZE, `Ukuran file maksimal adalah 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.type),
      "File .pdf diterima."
    ),
})

const defaultValues = {
  noRegistration: "",
  letterNumber: "",
  address: "",
  letterDate: "",
  title: "",
  fileUrl: "",
  file: "",
}

const fetcher = (...args) => fetch(...args).then(res => res.json())

function CreateOutcomingMail({ params }) {
  const [ file, setFile ] = useState(null)
  const [ isLoad, setIsLoad ] = useState(false)
  // const [fetchData, setFetchData] = useState(null)

  
  const { data, isLoading } = useSWR(`/api/outcoming-mail/${params.id}`, fetcher)
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues
  })

  useEffect(()=> {
    if (!isLoading) {
      console.log(data)
      console.log(data.address)

      const noRegistration = data.registerNumber
      const letterNumber = data.letterNumber
      const address = data.address
      const letterDate = data.letterDate
      const title = data.title
      const fileUrl = data.pdfUrl

      form.setValue('noRegistration', noRegistration)
      form.setValue('letterNumber', letterNumber)
      form.setValue('address', address)
      form.setValue('letterDate', parseISO(letterDate))
      form.setValue('title', title)
      form.setValue('file', fileUrl)
    }
  }, [isLoading])


  async function onInputFileHandler(fileForm) {
    setFile(fileForm.target.files[0])
  }

  async function onScanHandler() {
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
    formData.append("document", file);

    try {
      setIsLoading(true)
      const res = await fetch("/api/predict", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        console.error("something went wrong, check your console.");
        return;
      }

      const data = await res.json();
      console.log(data)

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
    // console.log(fetchData)
    form.reset({ file: ""})
    setFile(null)
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
            <Upload file={file} onInput={onInputFileHandler} onDelete={onDeleteHandler} onScan={onScanHandler} />
          </FormProvider>
        </div>
      </div>
    </div>
  );
}

export default CreateOutcomingMail