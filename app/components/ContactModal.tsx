"use client"; // shadcn@canary

import { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupInput,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { animate } from "motion";
import { motionConfig } from "@/lib/motion";
import { contactFormSchema, type ContactFormData } from "@/lib/schemas/contact";
import { sendContactEmail } from "@/app/actions/send-email";
import { toast } from "sonner";

interface ContactModalProps {
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function ContactModal({
  trigger,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
}: ContactModalProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  
  // Reset form function
  const resetForm = () => {
    setFormData({ name: "", email: "", message: "" });
    setErrors({ name: "", email: "", message: "" });
    setTouched({ name: false, email: false, message: false });
    setIsSubmitting(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      resetForm();
    }
    if (isControlled && controlledOnOpenChange) {
      controlledOnOpenChange(newOpen);
    } else {
      setInternalOpen(newOpen);
    }
  };

  const setOpen = handleOpenChange;

  // Validation functions using Zod
  const validateField = (
    field: keyof ContactFormData,
    value: string
  ): string => {
    const result = contactFormSchema.shape[field].safeParse(value);
    if (!result.success) {
      return result.error.issues[0]?.message || "";
    }
    return "";
  };

  const validateForm = (): boolean => {
    const result = contactFormSchema.safeParse(formData);
    if (!result.success) {
      const newErrors: { name: string; email: string; message: string } = {
        name: "",
        email: "",
        message: "",
      };
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof ContactFormData;
        if (field && field in newErrors) {
          newErrors[field] = issue.message;
        }
      });
      setErrors(newErrors);
      return false;
    }
    setErrors({ name: "", email: "", message: "" });
    return true;
  };

  // Animate form fields when modal opens
  useEffect(() => {
    if (open && formRef.current) {
      const fields = Array.from(
        formRef.current.querySelectorAll("input, textarea, button")
      ) as HTMLElement[];
      
      fields.forEach((field, index) => {
        // Set initial state
        field.style.opacity = "0";
        field.style.transform = "translateY(10px)";
        
        // Animate to final state
        animate(
          field,
          {
            opacity: 1,
            y: 0,
          } as Record<string, unknown>,
          {
            duration: motionConfig.duration.normal,
            delay: index * 0.05,
          }
        );
      });
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({ name: true, email: true, message: true });
    
    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await sendContactEmail(formData);

      if (result.success) {
        toast.success("Message sent successfully!", {
          description: "We'll get back to you soon.",
        });
        resetForm();
        setOpen(false);
      } else {
        toast.error("Failed to send message", {
          description: result.error || "Please try again later.",
        });
      }
    } catch (error) {
      toast.error("An error occurred", {
        description: error instanceof Error ? error.message : "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    
    // Validate field on blur
    const error = validateField(name as keyof ContactFormData, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="sm:max-w-[500px] bg-brand-dark-blue border-border text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl md:text-3xl font-serif text-brand-gold">
            Contact Us
          </DialogTitle>
          <DialogDescription className="text-sm md:text-base text-white/70">
            Fill out the form below and we&apos;ll get back to you right away
          </DialogDescription>
        </DialogHeader>
        <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="text-sm md:text-base font-medium text-white/90"
            >
              Name
            </label>
            <InputGroup
              className={cn(
                "border-border dark:bg-input/30",
                touched.name && errors.name && "border-red-500"
              )}
            >
              <InputGroupInput
                id="name"
                name="name"
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className="text-white placeholder:text-white/50"
              />
            </InputGroup>
            {touched.name && errors.name && (
              <Alert variant="destructive" className="py-2">
                <AlertDescription className="text-sm">
                  {errors.name}
                </AlertDescription>
              </Alert>
            )}
          </div>
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm md:text-base font-medium text-white/90"
            >
              Email
            </label>
            <InputGroup
              className={cn(
                "border-border dark:bg-input/30",
                touched.email && errors.email && "border-red-500"
              )}
            >
              <InputGroupInput
                id="email"
                name="email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className="text-white placeholder:text-white/50"
              />
            </InputGroup>
            {touched.email && errors.email && (
              <Alert variant="destructive" className="py-2">
                <AlertDescription className="text-sm">
                  {errors.email}
                </AlertDescription>
              </Alert>
            )}
          </div>
          <div className="space-y-2">
            <label
              htmlFor="message"
              className="text-sm md:text-base font-medium text-white/90"
            >
              Message
            </label>
            <InputGroup
              className={cn(
                "border-border dark:bg-input/30",
                touched.message && errors.message && "border-red-500"
              )}
            >
              <InputGroupTextarea
                id="message"
                name="message"
                placeholder="Tell us about your project..."
                value={formData.message}
                onChange={handleInputChange}
                onBlur={handleBlur}
                rows={5}
                className="text-white placeholder:text-white/50"
              />
            </InputGroup>
            {touched.message && errors.message && (
              <Alert variant="destructive" className="py-2">
                <AlertDescription className="text-sm">
                  {errors.message}
                </AlertDescription>
              </Alert>
            )}
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="border-border text-white hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                "bg-brand-gold text-black hover:bg-(--brand-gold)/90",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

