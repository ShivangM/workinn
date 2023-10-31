import { FileWithPath } from 'react-dropzone';
import { IconType } from 'react-icons/lib';

interface APIResponse<T> {
  data: T;
  total?: number;
  pageTotal?: number;
}

interface BreadcrumLink {
  name: string;
  link?: string;
}

interface FAQInput {
  question: string;
  answer: string;
}

interface FAQ extends FAQInput {
  id: string;
}

interface Stat {
  name: string;
  value: string | number;
  Icon: IconType;
}

interface ETHRates {
  USD: number;
  EUR: number;
  BTC: number;
  INR: number;
}

interface ProjectFile {
  id: string;
  name: string;
  url: string;
  fileType: string;
}
