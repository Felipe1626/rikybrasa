export interface WACloudRequest {
  messaging_product: string;
  to: string;
  type: string;
  template: Template;
}

export interface Template {
  name: string;
  language: Language;
  components: Component[];
}

export interface Component {
  type: string;
  parameters: Parameter[];
}

export interface Parameter {
  type: string;
  image?: Image;
  document?: Document;
  video?: Video;
  text?: string;
  data_time?: DataTime;
  currency?: Currency;
}

export interface DataTime {
  fallback_value: string;
  day_of_month: number;
  year: number;
  month: number;
  hour: number;
  minute: number;
}

export interface Currency {
  fallback_value: string;
  code: string;
  amount_1000: number;
}

export interface Image {
  link: string;
}

export interface Video {
  link: string;
}

export interface Document {
  link: string;
  filename: string;
}

export interface Language {
  code: string;
}