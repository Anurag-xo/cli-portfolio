export const projectFiles = {
  "README.md": (project: string | null) => `# ${project || "Project"}
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
```bash
git clone https://github.com/user/${project}
cd ${project}
make deploy
```
## Architecture
![Architecture Diagram](./docs/architecture.png)
## Contributing
Please read CONTRIBUTING.md for details on our code of conduct.`,

  "main.py": (project: string | null) => `#!/usr/bin/env python3
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

  "deploy.yaml": (project: string | null) => `apiVersion: apps/v1
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
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*
# Copy requirements first for better caching
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
# Copy application code
COPY . .
# Create non-root user
RUN useradd --create-home --shell /bin/bash app \
    && chown -R app:app /app
USER app
# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8000/health || exit 1
EXPOSE 8000
CMD ["python", "main.py"]`,

  ".github/workflows/ci.yml": (project: string | null) => `name: CI/CD Pipeline
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
        token: ${{ secrets.CODECOV_TOKEN }}
  build:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
    - uses: actions/checkout@v3
    - name: Build Docker image
      run: |
        docker build -t ${project || "app"}:${{ github.sha }} .
        docker tag ${project || "app"}:${{ github.sha }} ${project || "app"}:latest
    - name: Push to registry
      run: |
        echo "${{ secrets.DOCKER_PASSWORD }}" | docker login -u ${{ secrets.DOCKER_USERNAME }} --password-stdin
        docker push ${project || "app"}:${{ github.sha }}
        docker push ${project || "app"}:latest
  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
    - uses: actions/checkout@v3
    - name: Deploy to Kubernetes
      run: |
        echo "${{ secrets.KUBECONFIG }}" | base64 -d > kubeconfig
        export KUBECONFIG=kubeconfig
        kubectl apply -f deploy.yaml
        kubectl rollout status deployment/${project || "app"}-deployment`,
};