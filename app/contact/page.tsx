"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Loader2, CheckCircle, Clock, Building, Users } from 'lucide-react';
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
import { Card, CardContent } from '@/components/ui/card';

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
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Hero Section */}
        <div className="relative h-[300px] rounded-xl overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80"
            alt="Contact Us"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-center text-white p-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
              <p className="text-xl max-w-2xl">
                We&apos;d love to hear about your project. Get in touch with us to schedule a consultation.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <h2 className="text-2xl font-semibold">Get In Touch</h2>
            <p className="text-muted-foreground">
              Have questions about our services or want to discuss a potential project? Reach out to us using any of the methods below.
            </p>

            <div className="space-y-4">
              <Card>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-muted-foreground">info@michaelhartarchitects.co.za</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <p className="text-muted-foreground">+27 21 123 4567</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Address</h3>
                    <p className="text-muted-foreground">123 Main Road, Cape Town, 8001</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Office Hours</h3>
                    <p className="text-muted-foreground">Monday - Friday: 9:00 AM - 5:00 PM</p>
                    <p className="text-muted-foreground">Saturday - Sunday: Closed</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4 mt-8">
              <h3 className="text-xl font-semibold">Our Services</h3>
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-full mt-1">
                    <Building className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Architectural Design</h4>
                    <p className="text-sm text-muted-foreground">Comprehensive design services for residential and commercial projects.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-full mt-1">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Urban Planning</h4>
                    <p className="text-sm text-muted-foreground">Creating sustainable and vibrant urban environments.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Contact Form */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-semibold">Send Us a Message</h2>
            <p className="text-muted-foreground">
              Fill out the form below and we&apos;ll get back to you as soon as possible. We look forward to hearing about your project.
            </p>

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

        {/* Map Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Find Us</h2>
          <div className="rounded-lg overflow-hidden border h-[400px] relative">
            <Image
              src="/images/map-placeholder.svg"
              alt="Office Location Map"
              fill
              className="object-contain"
              unoptimized
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/10">
              <div className="bg-white p-4 rounded-lg shadow-lg max-w-md text-center">
                <h3 className="font-semibold text-lg">Michael Hart Architects</h3>
                <p className="text-muted-foreground">123 Main Road, Cape Town, 8001</p>
                <Button variant="outline" className="mt-2" size="sm">
                  Get Directions
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="space-y-6 bg-muted p-8 rounded-lg">
          <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">What services do you offer?</h3>
              <p className="text-muted-foreground">We offer a full range of architectural services including concept design, detailed design, planning applications, construction documentation, and project management.</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium">How much does an architectural project cost?</h3>
              <p className="text-muted-foreground">Project costs vary widely depending on scope, complexity, and site conditions. We provide detailed fee proposals after an initial consultation to understand your specific needs.</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium">How long does the design process take?</h3>
              <p className="text-muted-foreground">The timeline depends on project size and complexity. Typically, the design phase ranges from 2-6 months, followed by planning approval and construction documentation.</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Do you work on projects outside of Cape Town?</h3>
              <p className="text-muted-foreground">Yes, we work on projects throughout South Africa and have experience with international projects as well.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}