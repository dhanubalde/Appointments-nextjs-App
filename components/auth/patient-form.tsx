"use client"

import { Form, FormField } from "../ui/form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import CustomFormField, { FormFieldType } from "@/lib/custom-form-field"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "../ui/use-toast"
import { PatientSchema } from "@/schema"
import SubmitButton from "./submitbutton"


const PatientForm = () => {
  const [isLoading, setIsloading] = useState(false)
  const router = useRouter()
  const form = useForm<z.infer<typeof PatientSchema>>({
    resolver: zodResolver(PatientSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  })

  const onSubmit = (values: z.infer<typeof PatientSchema>) => { 
    setIsloading(true)
    try {
      const user = {
        name: values.name,
        email: values.email,
        phone: values.phone,
      }
    
        if (user) {
          toast({
            title: "Successfully submitted",
            description: "Thank you for registering with us. You can now book appointments.",
            duration: 3000
          })
          form.reset()
          router.push(`/patients/register/`)
          // handle success or failure
        }
        
    
      console.log(user);

    } catch (error) { 
      console.log(error);
      
    }
    // make API request here
  
  }
  return (
 
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" flex-1 space-y-6">
      <section className="mb-12 space-y-4">
          <h1 className=" header">Hi there 👋</h1>
          <p className="text-dark-700">Get started with appointments.</p>
        </section>
     
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="FullName"
          placeholder="John Smith"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
          // className="shad-input border-0" 
          />
    
          <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="Email"
          placeholder="johnsmith@gmail.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
          // className="shad-input border-0"
        />

         <CustomFormField
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
          name="phone"
          label="Phone Number"
          placeholder="+63 9201193849"
          iconSrc="/assets/icons/Phone.svg"
          iconAlt="phone"
          // className="shad-input border-0"
        />
        
        <SubmitButton
          isLoading={isLoading}
        >
          Get Started
       </SubmitButton>
         </form>
      </Form>
  
  )
}

export default PatientForm