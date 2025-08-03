import React, { useState } from "react";
import { X, File, Folder } from "lucide-react";

interface ProjectViewerProps {
  project: string | null;
  onClose: () => void;
}

export const ProjectViewer: React.FC<ProjectViewerProps> = ({
  project,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState("README.md");

  const files = {
    "README.md": `# ${project || "Project"}
## Overview
This is a comprehensive DevOps project showcasing modern infrastructure practices.
## Features
- Kubernetes orchestration
- CI/CD pipeline automation
- Infrastructure as Code
- Monitoring and observability
## Tech Stack
- **Container**: Docker, Kubernetes
- **CI/CD**: GitHub Actions, ArgoCD
- **Infrastructure**: Terraform, Ansible
- **Monitoring**: Prometheus, Grafana
## Getting Started
\`\`\`bash
git clone https://github.com/user/${project}
cd ${project}
make deploy
\`\`\`
## Architecture
![Architecture Diagram](./docs/architecture.png)
## Contributing
Please read CONTRIBUTING.md for details on our code of conduct.`,

    "main.py": `#!/usr/bin/env python3
"""
Main application entry point
"""
import asyncio
import logging
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from prometheus_client import Counter, Histogram, generate_latest

# Metrics
REQUEST_COUNT = Counter('requests_total', 'Total requests')
REQUEST_DURATION = Histogram('request_duration_seconds', 'Request duration')

app = FastAPI(title="${project || "DevOps API"}", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    REQUEST_COUNT.inc()
    return {"status": "healthy", "service": "${project}"}

@app.get("/metrics")
async def metrics():
    """Prometheus metrics endpoint"""
    return generate_latest()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)`,

    "deploy.yaml": `apiVersion: apps/v1
kind: Deployment
metadata:
  name: ${project || "app"}-deployment
  labels:
    app: ${project || "app"}
spec:
  replicas: 3
  selector:
    matchLabels:
      app: ${project || "app"}
  template:
    metadata:
      labels:
        app: ${project || "app"}
    spec:
      containers:
      - name: ${project || "app"}
        image: ${project || "app"}:latest
        ports:
        - containerPort: 8000
        env:
        - name: ENV
          value: "production"
        resources:
          requests:
            memory: "128Mi"
            cpu: "100m"
          limits:
            memory: "256Mi"
            cpu: "200m"
        livenessProbe:
          httpGet:
            path: /health
            port: 8000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /health
            port: 8000
          initialDelaySeconds: 5
          periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: ${project || "app"}-service
spec:
  selector:
    app: ${project || "app"}
  ports:
  - protocol: TCP
    port: 80
    targetPort: 8000
  type: LoadBalancer`,

    Dockerfile: `FROM python:3.11-slim
WORKDIR /app
# Install system dependencies
RUN apt-get update && apt-get install -y \\
    gcc \\
    && rm -rf /var/lib/apt/lists/*
# Copy requirements first for better caching
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
# Copy application code
COPY . .
# Create non-root user
RUN useradd --create-home --shell /bin/bash app \\
    && chown -R app:app /app
USER app
# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\
    CMD curl -f http://localhost:8000/health || exit 1
EXPOSE 8000
CMD ["python", "main.py"]`,

    ".github/workflows/ci.yml": `name: CI/CD Pipeline
on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - name: Set up Python
      uses: actions/setup-python@v4
      with:
        python-version: '3.11'
    - name: Install dependencies
      run: |
        python -m pip install --upgrade pip
        pip install -r requirements.txt
        pip install pytest pytest-cov
    - name: Run tests
      run: |
        pytest --cov=. --cov-report=xml
    - name: Upload coverage
      uses: codecov/codecov-action@v3
      with:
        token: \${{ secrets.CODECOV_TOKEN }}
  build:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
    - uses: actions/checkout@v3
    - name: Build Docker image
      run: |
        docker build -t ${project || "app"}:\${{ github.sha }} .
        docker tag ${project || "app"}:\${{ github.sha }} ${project || "app"}:latest
    - name: Push to registry
      run: |
        echo "\${{ secrets.DOCKER_PASSWORD }}" | docker login -u \${{ secrets.DOCKER_USERNAME }} --password-stdin
        docker push ${project || "app"}:\${{ github.sha }}
        docker push ${project || "app"}:latest
  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
    - uses: actions/checkout@v3
    - name: Deploy to Kubernetes
      run: |
        echo "\${{ secrets.KUBECONFIG }}" | base64 -d > kubeconfig
        export KUBECONFIG=kubeconfig
        kubectl apply -f deploy.yaml
        kubectl rollout status deployment/${project || "app"}-deployment`,
  };

  const tabs = Object.keys(files);

  if (!project) return null;

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-green-400/30 rounded-lg w-full max-w-6xl h-5/6 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-green-400/30">
          <div className="flex items-center space-x-2">
            <Folder className="w-5 h-5 text-green-400" />
            <span className="text-green-300 font-mono">{project}</span>
          </div>
          <button
            onClick={onClose}
            className="text-green-400 hover:text-green-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex border-b border-green-400/30 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center space-x-2 px-4 py-2 text-sm font-mono whitespace-nowrap border-r border-green-400/30 transition-colors ${
                activeTab === tab
                  ? "bg-green-400/10 text-green-300"
                  : "text-green-400/70 hover:text-green-400 hover:bg-green-400/5"
              }`}
            >
              <File className="w-4 h-4" />
              <span>{tab}</span>
            </button>
          ))}
        </div>
        <div className="flex-1 overflow-auto p-4">
          <pre className="text-sm text-green-400 font-mono whitespace-pre-wrap leading-relaxed">
            {files[activeTab as keyof typeof files]}
          </pre>
        </div>
        <div className="p-4 border-t border-green-400/30 text-xs text-green-400/70 font-mono">
          <div className="flex justify-between">
            <span>
              Lines: {files[activeTab as keyof typeof files].split("\n").length}
            </span>
            <span>Language: {activeTab.split(".").pop()?.toUpperCase()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
