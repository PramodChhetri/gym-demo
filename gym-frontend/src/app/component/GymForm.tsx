"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

// Define the schema for GYM input
const gymSchema = z.object({
  name: z.string().nonempty("GYM name is required"),
});

interface GymFormProps {
  name: string;
  id: number | null; // id can be null when adding a new gym
}



export default function GymForm({ id, name }: GymFormProps) {
  const form = useForm<z.infer<typeof gymSchema>>({
    resolver: zodResolver(gymSchema),
    defaultValues: {
      name: name || "",
    },
  });

  const onSubmit = (values: z.infer<typeof gymSchema>) => {
    try {
      console.log(values);
      toast.success("GYM saved successfully!");
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-lg mx-auto py-10"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>GYM Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter gym name" {...field} />
              </FormControl>
              <FormDescription>Provide the name of the gym.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">{id ? "Update Gym" : "Add Gym"}</Button>    
      </form>
    </Form>
  );
}
