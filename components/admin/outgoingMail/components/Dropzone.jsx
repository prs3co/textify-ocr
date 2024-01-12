
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { MdArrowDownward } from "react-icons/md";
import React, { useRef } from "react";

const Dropzone = React.forwardRef(
  (
    { className, classNameWrapper, dropMessage, handleOnDrop, ...props },
    ref
  ) => {
    const inputRef = useRef(null);
    // Function to handle drag over event
    const handleDragOver = (e) => {
      e.preventDefault();
      e.stopPropagation();
      handleOnDrop(null);
    };

    // Function to handle drop event
    const handleDrop = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const { files } = e.dataTransfer;
      if (inputRef.current) {
        inputRef.current.files = files;
        handleOnDrop(files);
      }
    };

    // Function to simulate a click on the file input element
    const handleButtonClick = () => {
      if (inputRef.current) {
        inputRef.current.click();
      }
    };
    return (
      <Card
        ref={ref}
        className={cn(
          `h-[94%] border-2 border-dashed bg-muted hover:cursor-pointer hover:border-muted-foreground/50`,
          classNameWrapper
        )}
      >
        <CardContent
          className="flex flex-col items-center justify-center space-y-2 px-2 py-4 text-base text-center dark:text-white text-navy-700 font-medium h-full w-full bg-lightPrimary dark:!bg-navy-700"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={handleButtonClick}
        >
          <div className="flex items-center justify-center text-muted-foreground w-full">
            <div className='flex flex-col items-center w-full'>
              {dropMessage ? (
                <p className="font-medium break-words w-full whitespace-nowrap overflow-hidden text-ellipsis">{dropMessage.name}</p>
              ) : (
                <p className="font-medium break-words text-balance w-full">Letakkan file atau klik di sini</p>
              )}
              <span className="font-medium">
                <MdArrowDownward className="text-[80px] text-brand-500 dark:text-white" />
              </span>
            </div>
            <Input
              {...props}
              value={undefined}
              ref={inputRef}
              type="file"
              className={cn("hidden", className)}
              onChange={(e) =>
                handleOnDrop(e.target.files)
              }
            />
          </div>
        </CardContent>
      </Card>
    );
  }
);

Dropzone.displayName = 'Dropzone';


export default Dropzone;