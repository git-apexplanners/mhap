"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Loader2, CheckCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });
  // Form submission handler
  const onSubmit = async (_data: FormValues) => {
    setIsSubmitting(true);

    try {
      // In a real application, you would send this data to your backend or a service like Formspree
      // For this example, we'll simulate a successful submission after a delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Show success message
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });

      setIsSubmitted(true);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      toast({
        title: "Something went wrong.",
        description: "Your message couldn't be sent. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold">Contact Us</h1>
            <p className="text-lg text-muted-foreground">
              We&apos;d love to hear about your project. Get in touch with us to schedule a consultation or learn more about our services.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5" />
                <span>info@michaelhartarchitects.co.za</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5" />
                <span>+27 21 123 4567</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5" />
                <span>123 Main Road, Cape Town, 8001</span>
              </div>
            </div>
          </div>
          <div className="bg-card p-6 rounded-lg border">
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
                <CheckCircle className="h-16 w-16 text-green-500" />
                <h3 className="text-2xl font-semibold">Message Sent!</h3>
                <p className="text-muted-foreground">
                  Thank you for contacting us. We&apos;ll get back to you as soon as possible.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsSubmitted(false);
                    form.reset();
                  }}
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="your@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about your project"
                            className="min-h-[150px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </Button>
                </form>
              </Form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}