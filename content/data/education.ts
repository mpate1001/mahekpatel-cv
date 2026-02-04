export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string | null;
  inProgress: boolean;
  highlights: string[];
  logo?: string;
}

export const education: Education[] = [
  {
    id: "unc-chapel-hill",
    institution: "UNC Chapel Hill",
    degree: "Master of Science",
    field: "Data Science",
    startDate: "2024",
    endDate: "May 2026",
    inProgress: true,
    highlights: ["Machine Learning", "Statistical Analysis", "Data Engineering"],
  },
  {
    id: "uncc-masters",
    institution: "UNC Charlotte",
    degree: "Master of Science",
    field: "Data Science and Business Analytics",
    startDate: "2019",
    endDate: "2021",
    inProgress: false,
    highlights: ["GPA: 3.9", "Business Analytics", "Data Mining"],
  },
  {
    id: "uncc-bachelors",
    institution: "UNC Charlotte",
    degree: "Bachelor of Science",
    field: "Business Administration & MIS",
    startDate: "2013",
    endDate: "2017",
    inProgress: false,
    highlights: ["Management Information Systems", "Business Administration"],
  },
];
