export interface Experience {
  id: string;
  company: string;
  title: string;
  startDate: string;
  endDate: string | null;
  description: string[];
  technologies: string[];
  logo?: string;
}

export const experiences: Experience[] = [
  {
    id: "duke-swe",
    company: "Duke Energy Inc.",
    title: "IT Software Engineer",
    startDate: "June 2025",
    endDate: null,
    description: [
      "Build data pipelines extracting Oracle Maximo data and streaming it through Kafka connectors and KSQL for real-time consumption",
      "Design and maintain Kafka Connect configurations for hundreds of tables, enabling customers to consume enterprise data",
      "Deploy and manage data infrastructure on AWS, delivering processed data to PostgreSQL databases",
      "Author and maintain Terraform configurations for all AWS infrastructure provisioning and management",
      "Monitor consumer lag, throughput, and p99 latency; handle scaling and rolling upgrades",
    ],
    technologies: ["Kafka", "KSQL", "Kafka Connect", "Terraform", "Oracle", "PostgreSQL", "AWS"],
  },
  {
    id: "duke-analyst",
    company: "Duke Energy Inc.",
    title: "Senior IT Business Application Analyst",
    startDate: "Jan 2020",
    endDate: "June 2025",
    description: [
      "Supported CATSWeb compliance application, translating business requirements into data models and exports",
      "Engineered T-SQL stored procedures, views, and export jobs in SSMS with robust validation",
      "Built PowerShell + Selenium automation for user provisioning and admin tasks",
      "Developed Power BI dashboards surfacing compliance KPIs and anomaly flags",
      "Managed incident triage in Jira/ServiceNow, stabilizing nightly loads and reporting SLAs",
    ],
    technologies: ["T-SQL", "SSMS", "PowerShell", "Selenium", "Power BI", "Jira"],
  },
  {
    id: "lowes",
    company: "Lowe's Companies Inc.",
    title: "Business Analyst",
    startDate: "2018",
    endDate: "2020",
    description: [
      "Supervised incentivized promotions for GE Lighting products offered through government programs via Utility companies",
      "Arranged, formatted, and uploaded pricing data into the Lowe's database using MS Access",
      "Generated transactional reports to inform decisions on high-priority incentive discount programs across all locations",
      "Prepared reports for Accounting team to ensure accurate invoicing to GE Lighting",
      "Extracted reports using Access commands to analyze current and historical pricing data",
    ],
    technologies: ["MS Access", "Excel", "SQL", "Data Analysis"],
  },
  {
    id: "spectrum",
    company: "Spectrum Reach",
    title: "Business Analyst",
    startDate: "2017",
    endDate: "2018",
    description: [
      "Directed the rate card portfolio process, organizing, formatting, and publishing rate cards for the sales team",
      "Worked with field sales and Pricing & Planning Manager to update and adjust rates on regular and ad hoc basis",
      "Coordinated rate cards for multiple channels including local, national, and political",
      "Leveraged MySQL to extract past data for comprehensive pricing analysis and transferred data to Excel",
    ],
    technologies: ["MySQL", "Excel", "Data Analysis"],
  },
  {
    id: "real-estate",
    company: "Akshar Raj LLC",
    title: "Business Owner - Real Estate",
    startDate: "2017",
    endDate: null,
    description: [
      "Own and manage residential & Commercial real estate properties generating steady monthly rental income",
      "Handle property acquisition, tenant relations, and ongoing maintenance coordination",
      "Manage financial operations including budgeting, expense tracking, and tax planning",
    ],
    technologies: ["Property Management", "Financial Planning"],
  },
];
