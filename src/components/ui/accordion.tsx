import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

type AccordionProps = React.ComponentProps<typeof AccordionPrimitive.Root>;

const Accordion: React.FC<AccordionProps> = ({ children, ...props }) => (
  <AccordionPrimitive.Root {...props}>{children}</AccordionPrimitive.Root>
);

const AccordionItem: React.FC<React.ComponentProps<typeof AccordionPrimitive.Item>> = React.forwardRef(
  ({ className, ...props }, ref) => (
    <AccordionPrimitive.Item
      ref={ref as React.Ref<HTMLDivElement>} // Adjusting the ref type
      className={cn("border-b", className)}
      {...props}
    />
  )
);
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger: React.FC<React.ComponentProps<typeof AccordionPrimitive.Trigger>> = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <motion.div>
      <AccordionPrimitive.Header className="flex">
        <AccordionPrimitive.Trigger
          ref={ref as React.Ref<HTMLButtonElement>} // Adjusting the ref type
          className={cn(
            "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
            className
          )}
          {...props}
        >
          {children}
          <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>
    </motion.div>
  )
);
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent: React.FC<React.ComponentProps<typeof AccordionPrimitive.Content>> = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Content
      ref={ref as React.Ref<HTMLDivElement>} // Adjusting the ref type
      className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn("pb-4 pt-0", className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
);
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
