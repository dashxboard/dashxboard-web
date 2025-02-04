"use client";

import ReactMarkdown from "react-markdown";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Sections } from "@/lib/faq";
import { useState } from "react";

export default function Faq() {
  const [open, setOpen] = useState<string | undefined>(undefined);

  return (
    <div className="container max-w-4xl mx-auto space-y-8">
      {Sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="space-y-4">
          <h2 className="text-2xl font-bold">{section.title}</h2>
          <Accordion
            type="single"
            value={open}
            onValueChange={setOpen}
            collapsible
            className="w-full"
          >
            {section.items.map((item, itemIndex) => (
              <AccordionItem
                key={itemIndex}
                value={`section-${sectionIndex}-item-${itemIndex}`}
              >
                <AccordionTrigger className="text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  <ReactMarkdown
                    components={{
                      a: ({ node, ...props }) => (
                        <a
                          {...props}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        />
                      ),
                    }}
                  >
                    {item.answer}
                  </ReactMarkdown>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ))}
    </div>
  );
}
