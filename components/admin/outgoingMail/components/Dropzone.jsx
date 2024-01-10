
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import React, { ChangeEvent, useRef } from "react";

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
          `h-full border-2 border-dashed bg-muted hover:cursor-pointer hover:border-muted-foreground/50`,
          classNameWrapper
        )}
      >
        <CardContent
          className="flex flex-col items-center justify-center space-y-2 px-2 py-4 text-base text-center dark:text-white text-navy-700 font-medium h-full bg-lightPrimary dark:!bg-navy-700"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={handleButtonClick}
        >
          <div className="flex items-center justify-center text-muted-foreground">
            <span className="font-medium">{dropMessage}</span>
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