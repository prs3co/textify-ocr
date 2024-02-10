import { MdFileUpload, MdOutlineCalendarMonth, MdFilePresent } from "react-icons/md";
import Card from "@/components/card";
import Dropzone from '@/components/admin/outgoingMail/components/Dropzone';
import { useFormContext } from "react-hook-form"
import { cn } from "@/lib/utils"
import Link from 'next/link'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

const Upload = (props) => {
  const { file, onInput, onDelete, onScan } = props

  const {formState: { errors }, ...form} = useFormContext()

  async function uploadFileAndGetURL() {
    const fileUrl = 'http://example.com/new-sample-letter.pdf'
    return fileUrl
  }


  function objectToFormData(obj) {
    const formData = new FormData();

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        formData.append(key, obj[key]);
      }
    }

    return formData;
  }

  async function onSubmitForm(data) {
    try {
      const fileUrl = await uploadFileAndGetURL()
      data.file = fileUrl
      const formData = objectToFormData(data)
      console.log(formData)
      const res = await fetch('/api/outcoming-mail', {
        method: 'POST',
        body: formData
      })

      if (!res.ok) {
        if (res.status === 409) {
          form.setError("noRegistration", {
            type: "400",
            message: 'No Registrasi sudah digunakan'
          })
        }

        console.log('something went wrong, check your console')
        return
      }

      const resData = await res.json()
      console.log(resData)
    } catch (error) {
      console.log(error)
    }
  }

  function handleOnDrop(acceptedFiles) {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const allowedTypes = [
        {
          name: "pdf",
          types: [
            "application/pdf",
          ],
        },
      ];
      const fileType = allowedTypes.find((allowedType) =>
        allowedType.types.find((type) => type === acceptedFiles[0].type)
      );
      if (!fileType) {
        form.setValue("file", null);
        form.setError("file", {
          message: "File type is not valid",
          type: "typeError",
        });
      } else {
        form.setValue("file", acceptedFiles[0]);
        form.clearErrors("file");
      }
    } else {
      form.setValue("file", null);
      form.setError("file", {
        message: "File is required",
        type: "typeError",
      });
    }
  }

  function onOpenFile() {
    // const fileObj = form.watch("file")
    const url = URL.createObjectURL(file)
    window.open(url, '_blank')
    URL.revokeObjectURL(url)
  }

  return (
    <Card className="h-full w-full rounded-[20px] bg-white bg-clip-border p-3 font-dm shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none lg:grid-cols-11">
      {/* <div className="col-span-2 h-full w-full rounded-xl bg-white dark:!bg-navy-800 2xl:col-span-2">
      </div> */}

      <div className="col-span-9 flex h-full w-full flex-col justify-center overflow-hidden rounded-xl bg-white pl-3 pb-4 dark:!bg-navy-800">
        <h4 className="text-left text-xl font-bold leading-9 text-navy-700 dark:text-white">
          Surat Keluar
        </h4>
        <p className="leading-1 mt-2 text-base font-normal text-gray-600">
          Mohon periksa kembali formulir yang telah diisi untuk memastikan keakuratan informasi. Terima kasih atas kerjasama Anda!
        </p>
        <div className='mt-4'>
          <Form {...form}>
            {/* <form  className="space-y-8"> */}
            <form onSubmit={form.handleSubmit(onSubmitForm)} className=" dark:text-white flex flex-col-reverse lg:grid lg:grid-cols-11 gap-8">
              <div className='col-span-2 flex flex-col items-center justify-center'>
                <FormField
                  control={form.control}
                  name="file"
                  render={({ field }) => (
                    <FormItem className="h-full w-full">
                      <FormControl>
                        <Dropzone
                          onInput={(file) => onInput(file)}
                          {...field}
                          dropMessage={file}
                          handleOnDrop={handleOnDrop}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {file ? (
                  <div className="flex flex-col items-center justify-center gap-3 relative">
                    {/* <FileCheck2Icon className="h-4 w-4" /> */}
                    {/* <p className="text-sm font-medium">{form.watch("file")?.name}</p> */}
                    <div className='flex flex-col gap-5'>
                      <button type="button" onClick={onOpenFile} className="linear flex items-center justify-center rounded-xl bg-brand-500 px-2 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
                        Buka Berkas
                      </button>
                      <button type="button" onClick={onScan} className="linear flex items-center justify-center rounded-xl bg-brand-500 px-2 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
                        Scan Berkas
                      </button>
                      <button type="button" onClick={onDelete} className="linear flex items-center justify-center rounded-xl bg-red-600 px-2 py-2 text-base font-medium text-white transition duration-200 hover:bg-red-800 active:bg-brand-700 dark:bg-red-700 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
                        Hapus Berkas
                      </button>
                    </div>
                  </div>
                ) : null}
                <button className="w-full linear mt-4 items-center justify-center rounded-xl bg-brand-500 px-2 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200 flex lg:hidden" type='submit'>
                Simpan now
                </button>
              </div>
              <div className='col-span-9 space-y-8'>
                <div className='grid grid-cols-2 gap-8'>
                  <FormField
                    control={form.control}
                    name="noRegistration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium text-lg dark:text-white text-navy-700">Nomor Register</FormLabel>
                        <FormControl>
                          <Input type='number' {...field} onChange={e => {
                            if (e.target.value == "0") e.target.value = ""
                            if (e.target.value != "") e.target.value = parseInt(e.target.value)
                            field.onChange(e)
                          }} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="letterNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium text-lg dark:text-white text-navy-700">Nomor Surat</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='grid grid-cols-6 gap-8'>
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem className="col-span-4">
                        <FormLabel className="font-medium text-lg dark:text-white text-navy-700">Tujuan Surat</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="letterDate"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel className="font-medium text-lg dark:text-white text-navy-700">Tanggal Surat</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"datepicker"}
                                className={cn(
                                  "w-[240px] pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "dd MMMM yyyy", { locale: id})
                                ) : (
                                  <span>Pilih tanggal</span>
                                )}
                                <MdOutlineCalendarMonth className="ml-auto h-4 w-4 opacity-50 dark:text-white" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0 dark:!bg-navy-800" align="start">
                            <Calendar
                              mode="single"
                              captionLayout="dropdown-buttons"
                              fromYear={1900}
                              toYear={new Date().getFullYear()}
                              shouldCloseOnSelect
                              fixedWeeks
                              required
                              locale={id}
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() || date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium text-lg dark:text-white text-navy-700">Judul</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* {errors.root && errors.root.serverError && (
                  <p>{`Server error with status code ${errors.root.serverError.type}`}</p>
                )} */}
                <div className='flex gap-8'>
                  <Link href="/admin/surat-keluar" className='w-full'>
                    <button className="w-full linear mt-4 items-center justify-center rounded-xl bg-brand-500 px-2 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200 hidden lg:flex">
                      Kembali
                    </button>
                  </Link>
                  <button className="w-full linear mt-4 items-center justify-center rounded-xl bg-brand-500 px-2 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200 hidden lg:flex" type='submit'>
                  Simpan
                  </button>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Card>
  );
};

export default Upload;
