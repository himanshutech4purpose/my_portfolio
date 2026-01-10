import { Code, Palette, Zap, Database, Globe, Smartphone } from 'lucide-react'

export interface Skill {
  name: string
  icon: typeof Code
  description: string
}

export interface Stat {
  number: string
  label: string
}

export const skills: Skill[] = [
  { name: 'Generative AI | Machine learning | Deeplearning', icon: Palette, description: 'DeepFake audio-video model finetuning, LLMs (Langgraph, Langchain, LLM finetuning, embedding finetuning, textgrad, hybrid RAG), deep learning models (BERT, BGE Reranker, Wav2Lip, VITS, Coqui-TTS), AI guardrails, ML algorithms, Computer vision (Yolo models, CNN)'},
  { name: 'Backend Development', icon: Database, description: 'FastAPI, Gin (Go), Express.js'},
  { name: 'Cloud & DevOps', icon: Zap, description: 'AWS, GCP,Docker, Kubernetes, CI/CD with Github Actions' },
  { name: 'Frontend Development', icon: Code, description: 'React, Next.js, TypeScript, JavaScript' },
  { name: 'Data Engineering', icon: Globe, description: 'Airflow, DBT, Kafka, ETL Pipelines' },
]

export const stats: Stat[] = [
  { number: '5', label: 'Years Experience' },
  { number: '7+', label: 'Client Project Worked On' },
  // { number: '15+', label: 'Technologies' },
  // { number: '100%', label: 'Client Satisfaction' },
]

export const aboutText = {
  title: 'About Me',
  subtitle: 'I\'m a passionate Software Developer with expertise in Full Stack Development and Generative AI and a love for creating innovative digital solutions.',
  heading: 'My Background',
  paragraphs: [
    'I am an IIT Ropar graduate with over 5 years of professional experience working across Generative AI, backend engineering, and data platforms. I specialize in building end-to-end, production-ready systems that combine strong software engineering principles with applied AI/ML research. My work spans GenAI agents, RAG-based applications, evaluation and benchmarking frameworks, large-scale data pipelines, and high-performance APIs.',

    'I have hands-on experience designing and deploying scalable backend systems using FastAPI, Flask, Docker, Kubernetes, and cloud platforms such as AWS and GCP. On the AI side, I have worked extensively with LLMs, prompt engineering, embeddings, NLP pipelines, deep learning models, and AI guardrails, delivering measurable improvements in accuracy, automation, and reliability.',

    'Across my roles, I have collaborated closely with cross-functional teams, owned features from design to deployment, and driven automation through CI/CD, monitoring, and observability stacks. I enjoy solving complex problems, learning new technologies quickly, and applying them to build impactful, real-world products at scale.',
    // 'I\'m a dedicated Full Stack Developer with over 4 years of experience in building scalable web applications and mobile solutions. My journey in technology started with a curiosity to understand how things work, which has evolved into a passion for creating meaningful digital experiences.',
    // 'I specialize in React, Node.js, and cloud technologies, with a strong foundation in both frontend and backend development. I believe in writing clean, maintainable code and staying up-to-date with the latest industry trends and best practices.',
    // 'When I\'m not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community. I\'m always excited to take on new challenges and learn from every project.'
  ]
}

