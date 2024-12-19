-- First, let's add categories to our resources table
ALTER TABLE resources ADD COLUMN category TEXT NOT NULL DEFAULT 'General';

-- Now let's insert some high-quality sample resources
INSERT INTO resources (type, url, title, description, category) VALUES
-- DevOps Resources
('blog', 'https://example.com/blog/kubernetes-production', 'Production-Grade Kubernetes Setup Guide', 'Learn how to set up and maintain a production-ready Kubernetes cluster with monitoring, logging, and security best practices.', 'DevOps'),
('blog', 'https://example.com/blog/ci-cd-patterns', 'Modern CI/CD Pipeline Patterns', 'Explore advanced CI/CD patterns including trunk-based development, feature flags, and automated rollbacks.', 'DevOps'),
('video', 'https://youtube.com/watch?v=example2', 'Docker Compose in Production', 'A comprehensive guide to using Docker Compose in production environments with real-world examples.', 'DevOps'),

-- ERPNext Resources
('blog', 'https://example.com/blog/erpnext-integration', 'ERPNext Integration Patterns', 'Best practices for integrating ERPNext with external systems including payment gateways and CRM platforms.', 'ERPNext'),
('video', 'https://youtube.com/watch?v=example3', 'Custom ERPNext App Development', 'Step-by-step tutorial on building custom applications on top of ERPNext framework.', 'ERPNext'),
('blog', 'https://example.com/blog/erpnext-automation', 'Automating Business Processes in ERPNext', 'Learn how to automate complex business workflows using ERPNext''s scripting and automation tools.', 'ERPNext'),

-- Cloud Architecture
('blog', 'https://example.com/blog/serverless-architecture', 'Serverless Architecture Patterns', 'Deep dive into serverless architecture patterns and when to use them in your applications.', 'Cloud Architecture'),
('video', 'https://youtube.com/watch?v=example4', 'AWS vs Azure vs GCP - 2024 Comparison', 'Detailed comparison of major cloud providers with focus on enterprise applications.', 'Cloud Architecture'),
('blog', 'https://example.com/blog/cloud-cost-optimization', 'Cloud Cost Optimization Strategies', 'Practical strategies for optimizing cloud costs without compromising performance or reliability.', 'Cloud Architecture');