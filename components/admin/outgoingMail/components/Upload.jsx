import { MdFileUpload, MdOutlineCalendarMonth, MdFilePresent } from "react-icons/md";
import Card from "@/components/card";
import Dropzone from '@/components/admin/outgoingMail/components/Dropzone';
import { useFormContext } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod'
import { cn } from "@/lib/utils"

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

const formSchema = z.object({
  title: z.string({
    required_error: "Judul surat diperlukan"
  }).min(2).max(50),
  date: z.date({
    required_error: "Tanggal diperlukan",
  }),
})

const Upload = (props) => {
  const { file, onInput, onDelete, onSubmit } = props

  const form = useFormContext({
    resolver: zodResolver(formSchema),
    defaultValues: {
      noRegistration: "",
      letterNumber: "",
      address: "",
      letterDate: "",
      title: "",
    }
    // defaultValues: {
    //   noRegistration: noRegistration?.map(data => (data.content)).join(' '),
    //   letterNumber: letterNumber?.map(data => (data.content)).join(' '),
    //   address: address?.map(data => (data.content)).join(' '),
    //   // letterDate: letterDate,
    //   letterDate: letterDate?.map(data => (data.content)).join(' '),
    //   title: title?.map(data => (data.content)).join(' '),
    // }
  })

  return (
    <Card className="grid h-full w-full grid-cols-1 gap-3 rounded-[20px] bg-white bg-clip-border p-3 font-dm shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none 2xl:grid-cols-11">
      <div className="col-span-2 h-full w-full rounded-xl bg-white dark:!bg-navy-800 2xl:col-span-2">
        <Dropzone
        className="flex h-full w-full flex-col items-center justify-center rounded-xl border-[2px] border-dashed border-gray-200 bg-lightPrimary dark:bg-navy-700 dark:!border-navy-800 lg:pb-0"
        content={
          file && file.length > 0 ?
            <div className='flex flex-col items-center'>
              <MdFilePresent className="text-[80px] text-brand-500 dark:text-white" />
              <div>
                <h4 className='text-xl font-bold text-brand-500 dark:text-white'>
                  {file[0].name}
                </h4>
              </div>
              <p className='mt-2 text-sm font-medium text-gray-600'>
                File PDF diperbolehkan max 4 lembar
              </p>
            </div> :
            <div className='flex flex-col items-center'>
            <MdFileUpload className="text-[80px] text-brand-500 dark:text-white" />
            <div>
              <h4 className='text-xl font-bold text-brand-500 dark:text-white'>
                Upload Berkas
              </h4>
            </div>
            <p className='mt-2 text-sm font-medium text-gray-600'>
              File PDF diperbolehkan max 4 lembar
            </p>
          </div>
        }
        file={file}
        onInput={onInput}
        onDelete={onDelete}
        onSubmit={onSubmit}
        />
      </div>

      <div className="col-span-9 flex h-full w-full flex-col justify-center overflow-hidden rounded-xl bg-white pl-3 pb-4 dark:!bg-navy-800">
        <h4 className="text-left text-xl font-bold leading-9 text-navy-700 dark:text-white">
          Surat Keluar
        </h4>
        <p className="leading-1 mt-2 text-base font-normal text-gray-600">
          Mohon periksa kembali formulir yang telah diisi untuk memastikan keakuratan informasi. Terima kasih atas kerjasama Anda!
        </p>
        <div className='mt-4'>
          <Form {...form}>
            {/* <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8"> */}
            <form className="space-y-8 dark:text-white">
              <div className='grid grid-cols-2 gap-8'>
                <FormField
                  control={form.control}
                  name="noRegistration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium text-lg dark:text-white text-navy-700">Nomor Register</FormLabel>
                      <FormControl>
                        <Input {...field} />
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
                {/* <FormField
                  control={form.control}
                  name="lettdate"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel className="font-medium text-lg dark:text-white text-navy-700">Tanggal Surat</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
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
              <button className="w-full linear mt-4 flex items-center justify-center rounded-xl bg-brand-500 px-2 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
                Publish now
              </button>
            </form>
          </Form>
        </div>
      </div>
    </Card>
  );
};

export default Upload;
