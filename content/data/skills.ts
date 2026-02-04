export interface Skill {
  id: string;
  name: string;
  category: "languages" | "ml-ds" | "engineering" | "tools";
  proficiency: number; // 1-5
  related: string[]; // IDs of related skills
}

export const skills: Skill[] = [
  // Languages
  { id: "python", name: "Python", category: "languages", proficiency: 5, related: ["kafka", "etl", "pandas"] },
  { id: "sql", name: "SQL", category: "languages", proficiency: 5, related: ["postgresql", "mysql", "sqlserver"] },
  { id: "javascript", name: "JavaScript", category: "languages", proficiency: 4, related: ["rest"] },
  { id: "java", name: "Java", category: "languages", proficiency: 4, related: ["kafka", "microservices"] },
  { id: "ksql", name: "KSQL", category: "languages", proficiency: 4, related: ["kafka"] },
  { id: "powershell", name: "PowerShell", category: "languages", proficiency: 4, related: ["automation"] },

  // ML & Data Science
  { id: "etl", name: "ETL/ELT", category: "ml-ds", proficiency: 5, related: ["python", "sql"] },
  { id: "kafka", name: "Apache Kafka", category: "ml-ds", proficiency: 5, related: ["avro", "ksql", "streaming"] },
  { id: "streaming", name: "Stream Processing", category: "ml-ds", proficiency: 5, related: ["kafka"] },
  { id: "avro", name: "Avro/Schema Registry", category: "ml-ds", proficiency: 4, related: ["kafka"] },
  { id: "pandas", name: "Pandas", category: "ml-ds", proficiency: 4, related: ["python"] },
  { id: "powerbi", name: "Power BI", category: "ml-ds", proficiency: 4, related: ["sql"] },

  // Engineering
  { id: "microservices", name: "Microservices", category: "engineering", proficiency: 5, related: ["rest", "java"] },
  { id: "rest", name: "REST APIs", category: "engineering", proficiency: 5, related: ["microservices"] },
  { id: "aws", name: "AWS (RDS, S3)", category: "engineering", proficiency: 4, related: ["terraform"] },
  { id: "terraform", name: "Terraform", category: "engineering", proficiency: 4, related: ["aws"] },
  { id: "cicd", name: "CI/CD", category: "engineering", proficiency: 4, related: ["github-actions"] },
  { id: "github-actions", name: "GitHub Actions", category: "engineering", proficiency: 4, related: ["cicd"] },

  // Tools & Databases
  { id: "postgresql", name: "PostgreSQL", category: "tools", proficiency: 5, related: ["sql"] },
  { id: "mysql", name: "MySQL", category: "tools", proficiency: 4, related: ["sql"] },
  { id: "sqlserver", name: "SQL Server", category: "tools", proficiency: 5, related: ["sql"] },
  { id: "git", name: "Git", category: "tools", proficiency: 5, related: [] },
  { id: "jira", name: "Jira", category: "tools", proficiency: 4, related: [] },
  { id: "automation", name: "Selenium", category: "tools", proficiency: 4, related: ["powershell"] },
];
