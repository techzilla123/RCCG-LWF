interface AccordionItemProps {
  question: string;
  answer?: string;
  isOpen: boolean;
  onToggle: () => void;
}
