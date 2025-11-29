// Portfolio projects data extracted from project.md and kumbh_sahayak_work.md
import { Globe, Database, Brain } from 'lucide-react'

export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  technologies: string[]
  category: 'web' | 'mobile' | 'backend' | 'devops' | 'ai' | 'data'
  icon: typeof Globe
  iconName: 'Brain' | 'Globe' | 'Database'
  liveUrl?: string
  githubUrl?: string
  responsibilities: string[]
  keyFeatures?: string[]
  hasDetailedPage?: boolean
  systemDesign?: {
    architecture?: string
    components?: string[]
    dataFlow?: string
    technologies?: string[]
  }
  architectureReferences?: {
    title: string
    description: string
    link?: string
  }[]
}

export const projects: Project[] = [
  {
    id: 'gidr-ai',
    title: 'GIDR.AI - Data Scientist',
    description: 'Improved chatbot accuracy, enhanced text-to-SQL performance, and developed document intelligence capabilities.',
    longDescription: 'A comprehensive AI platform that improved chatbot accuracy, enhanced text-to-SQL (txt2sql) performance, and developed advanced document intelligence capabilities. The system includes evaluation metrics, dynamic few-shot example selection, and AI voice agent capabilities.',
    technologies: ['Python', 'FastAPI', 'React', 'GCP Cloud Run', 'GenAI', 'LangChain', 'OpenAI'],
    category: 'ai',
    icon: Brain,
    iconName: 'Brain',
    responsibilities: [
      'Designed and implemented evaluation metrics for chatbot content retrieval and response generation',
      'Developed txt2sql evaluation metrics and improved accuracy by dynamically selecting few-shot examples from SQL query logs',
      'Extracted text from PDFs and images based on user-defined scenarios, highlighting text with bounding boxes',
      'Reviewed multiple research papers to benchmark existing methods and improve solutions',
      'Built an AI voice agent chatbot capable of updating website DOM elements, allowing users to fill out forms or modify UI components using voice commands',
      'Improved document chunk extraction by formatting tables in HTML and aligning images with their corresponding text chunks',
      'Designed and implemented a deterministic state machine workflow, contrasting with the dynamic behaviour of REACT agents'
    ],
    keyFeatures: [
      'Text-to-SQL conversion with dynamic few-shot learning',
      'Document intelligence with PDF and image text extraction',
      'AI voice agent for DOM manipulation',
      'Advanced document chunking with table formatting',
      'Deterministic state machine workflow'
    ]
  },
  {
    id: 'kumbh-sahaiyak',
    title: 'Kumbh SahAIyak',
    description: 'RAG chat application with guardrails and deepfake audio/video generation for personalized CM messages.',
    longDescription: 'A sophisticated RAG (Retrieval-Augmented Generation) chat application with AI governance and deepfake technology. The system combines BM25, fuzzy search, and vector search with BGE Reranker for optimal retrieval. Features include custom guardrails, prompt optimization using Textgrad, and deepfake video generation with lip-syncing.',
    technologies: ['Python', 'PyTorch', 'Docker', 'BGE Embeddings', 'BM25', 'Wav2Lip', 'VITS', 'Coqui-TTS', 'ElevenLabs'],
    category: 'ai',
    icon: Brain,
    iconName: 'Brain',
    hasDetailedPage: true,
    systemDesign: {
      architecture: 'The system follows a microservices architecture with separate components for RAG pipeline, guardrails, and deepfake generation. The RAG pipeline uses a hybrid retrieval approach combining BM25 (lexical) and BGE embeddings (semantic) for initial retrieval, followed by BGE Reranker for relevance optimization. The deepfake pipeline integrates multiple TTS models and lip-sync services.',
      components: [
        'RAG Pipeline: BM25 + Vector Search + BGE Reranker',
        'Custom Guardrails: Content safety and compliance checks',
        'Prompt Optimization: Textgrad-based prompt engineering',
        'Deepfake Audio: VITS, Coqui-TTS, ElevenLabs integration',
        'Deepfake Video: Wav2Lip for lip-syncing',
        'Caching Layer: Fuzzy search with Levenshtein distance',
        'Chunk Merging: Jensen-Shannon divergence for similar chunks'
      ],
      dataFlow: 'User query → Guardrails check → Hybrid retrieval (BM25 + Vector) → BGE Reranker → LLM generation → Response guardrails → User. For deepfake: Text input → TTS models → Audio generation → Wav2Lip → Video output.',
      technologies: ['Python', 'PyTorch', 'Docker', 'BGE Embeddings', 'BM25', 'Wav2Lip', 'VITS', 'Coqui-TTS', 'ElevenLabs', 'NaturalSpeech2']
    },
    architectureReferences: [
      {
        title: 'BGE Embedding Fine-tuning',
        description: 'Fine-tuned BGE embeddings for enhanced retrieval and reasoning capabilities using FlagOpen/FlagEmbedding framework.',
        link: 'https://github.com/FlagOpen/FlagEmbedding'
      },
      {
        title: 'Wav2Lip - Lip Sync',
        description: 'Open-source lip-sync model by IIIT Hyderabad for synchronizing audio with video.',
        link: 'https://github.com/Rudrabha/Wav2Lip'
      },
      {
        title: 'VITS - Voice Cloning',
        description: 'Conditional Variational Autoencoder with Adversarial Learning for End-to-End Text-to-Speech.',
        link: 'https://github.com/jaywalnut310/vits'
      },
      {
        title: 'Textgrad - Prompt Optimization',
        description: 'Similar to DSPY but better approach for prompt optimization in RAG applications.'
      }
    ],
    responsibilities: [
      'Built robust question-answering pipeline combining BM25 with fuzzy search and vector search',
      'Applied BGE Reranker to optimize relevance and ranking accuracy',
      'Performed prompt finetuning with Textgrad for RAG application',
      'Fine-tuned BGE embeddings to enhance model retrieval and reasoning capabilities',
      'Designed and enforced AI governance by mimicking AWS Guardrails',
      'Developed AI-driven deepfake system for CM video generation',
      'Integrated advanced audio cloning technologies including Eleven Labs, Coqui-TTS, VITs and NaturalSpeech2',
      'Implemented precise lip-syncing using Wav2Lip',
      'Fine-tuned VITs and Coqui-TTS models with audio cleaning using Nemo NVidia'
    ],
    keyFeatures: [
      'Hybrid retrieval system (BM25 + Vector Search + BGE Reranker)',
      'Custom AI guardrails for content safety and compliance',
      'Deepfake video generation with lip-sync',
      'Voice cloning with multiple TTS models',
      'Prompt optimization with Textgrad',
      'Similar chunk merging using Jensen-Shannon divergence',
      'Fuzzy search caching with Levenshtein distance'
    ]
  },
  {
    id: 'eb1a-experts',
    title: 'AI Agents – EB1A Experts',
    description: 'AI agent application to automate content writing and verification for EB1A applications.',
    longDescription: 'An AI agent application designed to automate operations for the EB1A Experts team. The system includes content generation, verification using custom lexical rules and NER, and a public-facing AI client application for end users.',
    technologies: ['GenAI', 'Python', 'FastAPI', 'AWS Services', 'Grafana', 'Jaeger', 'Kong API Gateway', 'EKS', 'NLTK', 'SpaCy', 'BERT'],
    category: 'ai',
    icon: Brain,
    iconName: 'Brain',
    hasDetailedPage: true,
    systemDesign: {
      architecture: 'The system follows a microservices architecture deployed on AWS EKS. It uses Kong API Gateway for authentication and rate limiting. The backend services include AI content generation, content verification using NLP models, and CRUD APIs. Monitoring and logging are handled through Grafana stack (Grafana, Jaeger, Loki).',
      components: [
        'Kong API Gateway: Authentication, rate limiting, and routing',
        'AI Content Generation Service: OpenAI and LLM providers integration',
        'Content Verification Service: Custom lexical rules (NLTK) and NER (SpaCy, BERT)',
        'Backend CRUD APIs: FastAPI-based RESTful services',
        'Monitoring Stack: Grafana, Jaeger (tracing), Loki (logging)',
        'Container Orchestration: AWS EKS (Kubernetes)',
        'Security: Trivy scanning, SonarQube code quality'
      ],
      dataFlow: 'User request → Kong API Gateway (auth/rate limit) → EKS cluster → AI Content Service / Verification Service → LLM providers / NLP models → Response → Monitoring stack → User.',
      technologies: ['AWS EKS', 'Kong API Gateway', 'FastAPI', 'Grafana', 'Jaeger', 'Loki', 'NLTK', 'SpaCy', 'BERT', 'OpenAI', 'Docker', 'Kubernetes']
    },
    architectureReferences: [
      {
        title: 'Kong API Gateway',
        description: 'Cloud-native API gateway for authentication, rate limiting, and API management.',
        link: 'https://konghq.com/kong'
      },
      {
        title: 'AWS EKS',
        description: 'Amazon Elastic Kubernetes Service for container orchestration and deployment.',
        link: 'https://aws.amazon.com/eks/'
      },
      {
        title: 'Grafana Observability Stack',
        description: 'Grafana for visualization, Jaeger for distributed tracing, and Loki for log aggregation.',
        link: 'https://grafana.com/'
      },
      {
        title: 'SpaCy & BERT for NER',
        description: 'Named Entity Recognition using SpaCy and BERT models for content verification.'
      }
    ],
    responsibilities: [
      'Built AI agent application to automate content writing for various teams using OpenAI and other LLM providers',
      'Developed AI agents to generate and verify content required for EB1A applications',
      'Implemented content verification using custom lexical rules with NLTK and named entity recognition with SpaCy and BERT models',
      'Automated CI/CD pipeline and deployed application on AWS EC2',
      'Integrated logging and monitoring using Grafana, Jaeger, Loki, and related services',
      'Developed backend CRUD APIs and implemented AI-driven content generation and verification',
      'Setup Kong API Gateway with authentication and rate limiting',
      'Handled security tasks including Trivy scan and SonarQube setup',
      'Worked on setting up EKS'
    ],
    keyFeatures: [
      'AI-powered content generation and verification',
      'Custom lexical rules and NER for content validation',
      'Automated CI/CD with comprehensive monitoring',
      'Kong API Gateway with security features',
      'EKS deployment and management'
    ]
  },
  {
    id: 'easyknock',
    title: 'EasyKnock',
    description: 'Real estate technology platform providing innovative home equity solutions without new debt.',
    longDescription: 'EasyKnock is a real estate technology company that provides homeowners with innovative solutions to access home equity. The platform includes data pipelines for ML workflows, integrating data from multiple third-party sources and internal microservices.',
    technologies: ['Python', 'Airflow', 'GitHub Actions', 'Docker', 'Kubernetes', 'AWS (VPS, EKS, CloudWatch, Lambda, API Gateway, S3, Redshift, DocumentDB, Postgres, SageMaker, MWAA)', 'GCP (Cloud Function, BigQuery, Cloud Storage, Cloud Composer)'],
    category: 'data',
    icon: Database,
    iconName: 'Database',
    responsibilities: [
      'Built data pipeline fetching data from third-party businesses like HouseCanary, Clear Capital, ClearEdge',
      'Integrated data from Salesforce and AirTable used by sales teams',
      'Connected data from online advertising platforms like Google AdWords and Facebook',
      'Synced data from different internal micro-services for Machine Learning workflow',
      'Migration and deployment of Machine Learning and Airflow codebase from GCP to AWS',
      'Deployment and testing of Airflow Code and DBT code using GitHub Actions',
      'Addressed reported bugs from customers or QA and resolved database entry issues'
    ],
    keyFeatures: [
      'Multi-source data pipeline integration',
      'ML workflow data synchronization',
      'Cloud migration (GCP to AWS)',
      'Automated deployment with GitHub Actions',
      'Comprehensive data infrastructure'
    ]
  },
  {
    id: 'ai-evaluator',
    title: 'AI-Evaluator',
    description: 'In-house trainee assistance system that quizzes trainees and evaluates responses using LLMs.',
    longDescription: 'An in-house trainee assistance system that quizzes trainees on completed topics, evaluates their responses, and assigns scores using large language models. The system includes authentication, question generation, and automated grading.',
    technologies: ['Python', 'FastAPI', 'Docker Compose', 'PostgreSQL', 'LLMs'],
    category: 'ai',
    icon: Brain,
    iconName: 'Brain',
    responsibilities: [
      'Created Backend APIs using FastAPI supporting Authentication',
      'Implemented question generation and grading using LLMs',
      'Integrated PostgreSQL database',
      'Deployed code as docker-compose file with Postgres, backend and Frontend as services'
    ],
    keyFeatures: [
      'Automated question generation',
      'LLM-based response evaluation',
      'Docker-based deployment',
      'User authentication system'
    ]
  },
  {
    id: 'fiu-ind',
    title: 'FIU-IND - Financial Intelligence Unit',
    description: 'Data Quality Report application for processing financial transaction data from 17 different institution types.',
    longDescription: 'The Financial Intelligence Unit of India (FIU-IND) application processes batch data from 17 different types of financial institutions. It checks data quality based on 32 rules including duplicate reports, unique ID validation, external validation, and ML-based rules.',
    technologies: ['Python', 'Pandas', 'Scikit-learn', 'Neo4j', 'MS SQL Server'],
    category: 'data',
    icon: Database,
    iconName: 'Database',
    responsibilities: [
      'Built Data Quality Report application in Python framework',
      'Processed batch data from 17 different types of financial institutions in different formats',
      'Implemented 32 quality check rules including duplicate reports, unique ID validation, external validation via API, and ML rules',
      'Hands-on Data Modelling and View creation involving multiple tables',
      'Network visualization using Neo4j tool',
      'Implementation of Risk score, Data preprocessing and EDA using Python libraries and SQL queries',
      'Continuously updated and maintained automation suite to align with evolving data source technologies'
    ],
    keyFeatures: [
      'Multi-institution data processing',
      '32 quality validation rules',
      'Network visualization with Neo4j',
      'Risk scoring and EDA',
      'Automated data quality checks'
    ]
  },
  {
    id: 'armour-design',
    title: 'Armour Design with Deep Learning',
    description: 'Deep learning model to find optimum composite layers and reduce simulation time for armor design.',
    longDescription: 'A research project to find optimum composite layers for armor design and reduce simulation time using deep learning. The system uses LSTM and neural networks on LS-DYNA simulation datasets, utilizing time-series intermediate simulation data.',
    technologies: ['Python', 'Pandas', 'Scikit-learn', 'TensorFlow', 'LSTM'],
    category: 'ai',
    icon: Brain,
    iconName: 'Brain',
    responsibilities: [
      'Applied LSTM and neural network models on simulation datasets of Armor bullet impact',
      'Conducted literature survey finding researchers used only simple neural networks',
      'Created approach using lesser number of simulations but utilizing time-series intermediate simulation data on LSTM',
      'Achieved time-saving and computationally inexpensive solution'
    ],
    keyFeatures: [
      'LSTM-based time-series prediction',
      'Reduced simulation requirements',
      'Optimized composite layer design',
      'Computationally efficient solution'
    ]
  },
  {
    id: 'ecommerce-backend',
    title: 'E-commerce Backend',
    description: 'E-commerce backend system built with Go and Gin framework supporting core shopping features.',
    longDescription: 'A complete e-commerce backend system designed and developed using Go and the Gin framework. The system supports user authentication, shopping cart management, and RESTful API integration.',
    technologies: ['Go', 'Gin', 'MongoDB', 'REST APIs'],
    category: 'backend',
    icon: Database,
    iconName: 'Database',
    responsibilities: [
      'Implemented user authentication and login functionality with secure session handling',
      'Developed shopping cart features including adding, updating, and removing products',
      'Designed RESTful APIs to enable integration with frontend applications'
    ],
    keyFeatures: [
      'Secure user authentication',
      'Shopping cart management',
      'RESTful API design',
      'MongoDB integration'
    ]
  },
  {
    id: 'satyagraha',
    title: 'Satyagraha – Tech Contributor',
    description: 'Volunteer contribution to Satyagraha digital platform including landing page and deployment pipelines.',
    longDescription: 'Volunteer contribution to the development of core web pages and deployment pipelines for Satyagraha\'s digital platform. Designed and developed landing page and authentication page with responsive UI.',
    technologies: ['React', 'CSS', 'HTML', 'GCP', 'GitHub Actions'],
    category: 'web',
    icon: Globe,
    iconName: 'Globe',
    responsibilities: [
      'Designed and developed the landing page and authentication page for the Satyagraha website',
      'Implemented responsive UI using React, CSS, and HTML',
      'Configured cloud deployment workflows using Google Cloud Platform (GCP)',
      'Automated CI/CD pipelines with GitHub Actions'
    ],
    keyFeatures: [
      'Responsive landing page',
      'Authentication system',
      'GCP deployment',
      'CI/CD automation'
    ]
  }
]

