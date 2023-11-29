"use client"

// Custom components
import Card from '@/components/card';
// import { Button } from "@/components/ui/button"


// Assets
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod'
import Dropzone from '@/components/admin/outgoingMail/components/Dropzone';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const formSchema = z.object({
  username: z.string().min(2).max(50),
})

function Upload(props) {
	const { used, total, ...rest } = props;
  const [ file, setFile ] = useState([]);

	// Chakra Color Mode
	const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
	const brandColor = useColorModeValue('brand.500', 'white');
	const textColorSecondary = 'gray.400';

  function onInputFileHandler(file) {
    setFile(file)
  }

  async function onSubmitHandler() {

    if (!file) {
      console.warn("no file was chosen");
      return;
    }

    // if (!fileInput.file || fileInput.files.length === 0) {
    //   console.warn("files list is empty");
    //   return;
    // }

    const formData = new FormData();
    formData.append("document", file[0]);

    try {
      const res = await fetch("/api/outcoming-mail", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        console.error("something went wrong, check your console.");
        return;
      }

      const data = await res.json();
      console.log(data)

      // setImageUrl(data.fileUrl);
    } catch (error) {
      console.error("something went wrong, check your console.");
    }
  }

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    }
  })

	return (
		<Card {...rest} mb='20px' alignItems='center' p='20px'>
      <div className="col-span-5 h-full w-full rounded-xl bg-lightPrimary dark:!bg-navy-700 2xl:col-span-6">
				<Dropzone
					w={{ base: '50%', '2xl': '268px' }}
					me='36px'
					maxH={{ base: '60%', lg: '50%', '2xl': '100%' }}
					minH={{ base: '60%', lg: '50%', '2xl': '100%' }}
					content={
						<div>
              <MdFileUpload className="text-[80px] text-brand-500 dark:text-white" />
							<div>
								<h4 fontSize='xl' fontWeight='700' color={brandColor}>
									Upload Files
								</h4>
							</div>
							<p>
								PDF files are allowed
							</p>
						</div>
					}
          onInput={onInputFileHandler}
				/>
				<div direction='column' pe='44px'>
					<h4
						color={textColorPrimary}
						fontWeight='bold'
						textAlign='start'
						fontSize='2xl'
						mt={{ base: '20px', '2xl': '50px' }}>
						Complete your profile
					</h4>
					<p
						color={textColorSecondary}
						fontSize='md'
						my={{ base: 'auto', '2xl': '10px' }}
						mx='auto'
						textAlign='start'>
						Stay on the pulse of distributed projects with an anline whiteboard to plan, coordinate and
						discuss
					</p>
					<p
						color={textColorSecondary}
						fontSize='md'
						my={{ base: 'auto', '2xl': '10px' }}
						mx='auto'
						textAlign='start'>
						Files
					</p>
          {file.map(item => (
            <li key={item.path}>
              {item.name} - {item.size}
            </li>
          ))}

					<div w='100%'>
						<button
							me='100%'
							mb='50px'
							w='140px'
							minW='140px'
							mt={{ base: '20px', '2xl': 'auto' }}
							variant='brand'
							fontWeight='500'
              onClick={onSubmitHandler}>
							Publish now
						</button>
					</div>
				</div>
        <Form {...form}>
          {/* <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8"> */}
          <form className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
			</div>
		</Card>
	);
}

export default Upload