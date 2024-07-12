

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React, { useState } from "react";
import { Control } from "react-hook-form"
// import PhoneInput from "react-phone-number-input";
// import { E164Number } from "libphonenumber-js/core";
// import { defaultOverrides } from "next/dist/server/require-hook";
import ReactDatePicker from "react-datepicker";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";



export enum FormFieldType { 
  INPUT = "input",
  TEXTAREA = "textarea",
  SELECT = "select",
  CHECKBOX = "checkbox",
  PHONE_INPUT = "phoneInput",
  RADIO = "radio",
  CUSTOM = "custom",
  DATE_PICKER = "date-picker",
  SKELETON = "skeleton",
} 

interface CustomFormFieldProps { 
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  className?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode
  renderSkeleton?: (field: any) => React.ReactNode
  fieldType?: FormFieldType
}

const RenderInput = ({field, props }: {field: any, props: CustomFormFieldProps}) => { 
  const {
    fieldType,
    iconAlt,
    iconSrc,
    placeholder,
    className,
    showTimeSelect,
    dateFormat,
    children,
    renderSkeleton,
  } = props;

  switch (fieldType) { 
    case FormFieldType.INPUT:
      return (
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
            className="border-none"
            />
          </FormControl>
       
      )
    
    
    case FormFieldType.PHONE_INPUT: 
      return (

        <FormControl>
          <Input
            placeholder={placeholder}
            {...field}
            className={className}
          />
        {/* <PhoneInput
            defaultCountry="PH"
            placeholder={placeholder}
            international
            withCountryCallingCode
            value={field.value as E164Number | undefined}
            onChange={field.onChange}
            className={className}
          /> */}
        </FormControl>
      )
    
    case FormFieldType.DATE_PICKER:
      return (
        <div className=" flex rounded-md border-dark-500 bg-dark-400 p-2">
            <Image
            src="/assets/icons/calendar.svg"
            height={24}
            width={24}
            alt="calendar"
            className="ml-4"
            />
        
          <FormControl>
        
            <DatePicker
              showTimeSelect={showTimeSelect ?? false}
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              timeInputLabel="Time:"
              dateFormat={dateFormat ?? "MM/dd/yyyy"}
              wrapperClassName="date-picker"
              className="h-11 rounded-md cursor-pointer"
            />

          </FormControl>
        </div>
      )
    
    case FormFieldType.SELECT:
      return (
          <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value} >
            <FormControl>
              <SelectTrigger className=" ">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="bg-slate-900">
              {children}
            </SelectContent>
          </Select>
          </FormControl>
      )
    
    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            placeholder={placeholder}
            {...field}
            className={className}
          />
        </FormControl>
      )
    case FormFieldType.SKELETON:
      return renderSkeleton ? renderSkeleton(field) : null;
    
    default:
      return null;
  }
}


const CustomFormField = (props: CustomFormFieldProps) => {
  const { name, control,label, fieldType} = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1 ">
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel className="">
              {label}
            </FormLabel>
          )}
          <RenderInput field={field} props={props}/>
          <FormMessage className=" bg-rose-500"/>
        </FormItem>
      )}
    
    />
  )
}

export default CustomFormField