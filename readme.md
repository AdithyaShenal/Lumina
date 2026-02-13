# Lumina

## An event-driven image-sharing platform built on a fully asynchronous microservice architecture using Node.js, NATS, Docker, and Kubernetes.

I architected and developed Lumina as a fully asynchronous, event-driven image-sharing web application, with a strong focus on microservice architecture, service isolation, and system-level communication patterns.

---
The backend is composed of independent Node.js microservices, each responsible for a single business capability:

- User Service – authentication and user management
- Post Service – image and post creation
- Search Service – content searching
- Timeline Service – personalized feed aggregation
Each service owns its own data and responsibilities, communicating exclusively through events rather than direct service-to-service calls.
---

To avoid duplicated logic and enforce consistency, I created a shared internal npm package that encapsulates reusable components such as:
-> NATS client configuration
-> Typed event publishers and listeners
-> Common base classes using a class-based abstraction
This shared package is consumed by all services, enabling standardized event handling while keeping services independently deployable
---

Authentication across the system is handled using JWT-based stateless authentication, implemented consistently at the service level to ensure secure and trusted communication between clients and services.
---

The entire platform is containerized with Docker and deployed on Kubernetes, allowing individual services to be deployed, restarted, and managed independently. Traffic routing is handled via an NGINX Ingress Controller, which acts as a load balancer and gateway for both API and frontend traffic.
