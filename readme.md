# Lumina

> **An event-driven image-sharing platform built on a fully asynchronous microservice architecture.**

Lumina is a high-performance web application engineered with a focus on service isolation, system-level communication patterns, and horizontal scalability. By leveraging a decoupled event-driven approach, the system ensures high availability and independent service evolution.

---

## Architecture Overview

The backend is composed of independent **Node.js microservices**, each responsible for a single business capability. To ensure strict isolation, each service owns its own data and communicates exclusively through **asynchronous events** rather than direct REST calls.

* **User Service:** Handles stateless authentication and profile management.
* **Post Service:** Manages image uploads and post metadata creation.
* **Search Service:** Provides optimized content discovery and indexing.
* **Timeline Service:** Aggregates personalized feeds for active users.

---

## Technical Stack

| Category | Technologies |
| :--- | :--- |
| **Programming Languages** | JavaScript, TypeScript |
| **Frameworks & Libraries** | Node.js, Express.js, React.js, Tailwind CSS |
| **Database & Caching** | MySQL, MongoDB |
| **Infrastructure & Tools** | Docker, Kubernetes, Nginx, Git, GitHub, Postman, RESTful APIs, Microservices, Event Driven Model, JWT |

---

## Key Features & Implementation

### **Shared Internal NPM Package**
To enforce consistency and **DRY** (Don't Repeat Yourself) principles, I developed a private library consumed by all microservices. This package encapsulates:
* **NATS Client Configuration:** Centralized connection logic for the event bus.
* **Typed Events:** Custom publishers and listeners to ensure schema-valid communication.
* **Class-based Abstractions:** Common base classes and error-handling middleware.

### **Security & Auth**
Authentication is handled via **JWT-based stateless tokens**. Security logic is implemented at the service level to maintain a distributed trust model while ensuring secure client-to-service communication.

### **Deployment & Orchestration**
* **Containerization:** Every service is fully dockerized for environment parity.
* **Orchestration:** Managed via **Kubernetes** for automated scaling and self-healing.
* **Ingress:** Traffic is routed through an **NGINX Ingress Controller**, acting as the primary load balancer and API gateway.

---

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone [https://github.com/your-username/lumina.git](https://github.com/your-username/lumina.git)
