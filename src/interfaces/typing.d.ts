import { IconType } from "react-icons/lib";

interface APIResponse<T> {
  data: T;
  total?: number;
  pageTotal?: number;
}

interface BreadcrumLink {
  name: string;
  link?: string;
}

interface FAQs {
  question: string;
  answer: string;
}

interface Stat {
  name: string;
  value: string | number;
  Icon: IconType
}
