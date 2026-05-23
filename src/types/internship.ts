export interface Location {
  string: string;
  link: string;
  country: string;
  region: string | null;
  locationName: string;
}

export interface Stipend {
  salary: string;
  tooltip: string | null;
  salaryValue1: number;
  salaryValue2: number | null;
  salaryType: string;
  currency: string;
  scale: string;
  large_stipend_text: boolean;
}

export interface Internship {
  id: number;
  title: string;
  employment_type: string;
  job_title: string | null;
  work_from_home: boolean;
  company_name: string;
  company_url: string;
  is_premium: boolean;
  is_premium_internship?: boolean;
  employer_name: string;
  company_logo: string;
  type: string;
  url: string;
  is_active: boolean;
  profile_name: string;
  part_time: boolean;
  start_date: string;
  duration: string;
  stipend: Stipend;
  posted_by_label: string;
  posted_by_label_type: string;
  posted_on?: string;
  postedOnDateTime?: number;
  application_deadline?: string;
  expiring_in?: string;
  location_names: string[];
  locations: Location[];
  is_ppo: boolean;
  ppo_label_value: string;
  ppo_salary?: string | null;
  labels_app: string;
  labels_app_in_card?: string[];
  segment?: string;
  is_external?: boolean;
  eligible_for_easy_apply?: boolean;
  is_international_job?: boolean;
}


export interface InternshipApiResponse {
  internships_meta: {
    [key: string]: Internship;
  };
  internship_ids: number[];
}
