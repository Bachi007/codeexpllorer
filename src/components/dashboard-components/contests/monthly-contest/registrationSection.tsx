'use client';

import React from 'react';
import { FormProvider, useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Form, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select';

type RegistrationFormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  country: string;
  terms: boolean;
};

const RegistrationSection = React.forwardRef<HTMLDivElement>((_, ref) => {
  const methods = useForm<RegistrationFormValues>();

  const onSubmit: SubmitHandler<RegistrationFormValues> = async (data) => {
    console.log(data);
    try {
      // Here you can perform any async actions, e.g., sending form data to a server
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div ref={ref} className="my-4">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <FormItem>
            <FormLabel htmlFor="name">Name</FormLabel>
            <FormControl>
              <Controller
                name="name"
                control={methods.control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input id="name" placeholder="Enter your name" {...field} />
                )}
              />
            </FormControl>
            <FormMessage />
          </FormItem>

          <FormItem>
            <FormLabel htmlFor="email">Email</FormLabel>
            <FormControl>
              <Controller
                name="email"
                control={methods.control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input id="email" placeholder="Enter your email" {...field} />
                )}
              />
            </FormControl>
            <FormMessage />
          </FormItem>

          <FormItem>
            <FormLabel htmlFor="password">Password</FormLabel>
            <FormControl>
              <Controller
                name="password"
                control={methods.control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input id="password" type="password" placeholder="Enter your password" {...field} />
                )}
              />
            </FormControl>
            <FormMessage />
          </FormItem>

          <FormItem>
            <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
            <FormControl>
              <Controller
                name="confirmPassword"
                control={methods.control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input id="confirmPassword" type="password" placeholder="Confirm your password" {...field} />
                )}
              />
            </FormControl>
            <FormMessage />
          </FormItem>

          <FormItem>
            <FormLabel htmlFor="country">Country</FormLabel>
            <FormControl>
              <Controller
                name="country"
                control={methods.control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="country" placeholder="Select your country" />
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="au">Australia</SelectItem>
                      {/* Add more countries as needed */}
                    </SelectContent>
                  </Select>
                )}
              />
            </FormControl>
            <FormMessage />
          </FormItem>

          <FormItem>
            <FormControl>
              <Controller
                name="terms"
                control={methods.control}
                rules={{ required: true }}
                render={({ field }) => (
                  <>
                    <Checkbox id="terms" checked={field.value} onCheckedChange={field.onChange} />
                    <FormLabel htmlFor="terms">I agree to the terms and conditions</FormLabel>
                  </>
                )}
              />
            </FormControl>
            <FormMessage />
          </FormItem>

          <Button type="submit">Register</Button>
        </form>
      </FormProvider>
    </div>
  );
});

RegistrationSection.displayName = 'RegistrationSection';

export default RegistrationSection;
