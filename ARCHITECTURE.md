# System Architecture

This project implements a real-time payment analytics system designed to process live payment events and visualize analytics data through a dashboard.

The system is composed of a frontend dashboard, a backend API server, and a MongoDB database.

---

# High-Level Architecture

Frontend (Next.js + Redux)
        │
        │ REST API + WebSocket
        ▼
Backend (NestJS)
        │
        │ MongoDB Aggregation
        ▼
MongoDB

---

# Backend Architecture

The backend is built using NestJS and follows a modular architecture.

Main modules include:

Payments Module  
Responsible for creating payment records and broadcasting WebSocket events.

Analytics Module  
Handles aggregation queries used to compute metrics and trends.

WebSocket Gateway  
Streams real-time payment events to connected clients.

---

# API Endpoints

Analytics Metrics

GET /api/analytics/metrics

Returns aggregated metrics including:

- total payment volume
- success rate
- average payment amount
- peak hour
- top payment method

Analytics Trends

GET /api/analytics/trends?period=day|week|month

Returns aggregated payment trends used for the dashboard chart.

---

# WebSocket Events

Namespace

/ws/payments

Event structure

PaymentEvent
type: payment_received | payment_failed | payment_refunded  
payment: Payment object  
timestamp: Date

The backend broadcasts these events whenever a new payment is created.

---

# Frontend Architecture

The frontend is built with Next.js using Redux Toolkit for state management.

Three types of state are used:

Server State  
Handled by RTK Query for fetching analytics data.

Real-Time State  
WebSocket events stored in Redux for live updates.

UI State  
Stores user interface selections such as the selected time period.

---

# Data Flow

Payment Created  
        │
        ▼
Stored in MongoDB  
        │
        ▼
WebSocket Event Broadcast  
        │
        ▼
Redux Store Updated  
        │
        ▼
Dashboard UI Re-renders

This design enables near real-time updates in the dashboard.

---

# MongoDB Schema

Collection: payments

Fields:

tenantId  
amount  
method  
status  
createdAt  
updatedAt  

Indexes are created on:

tenantId  
createdAt  
status  
method

These indexes allow efficient analytics queries.

---

# Scalability Considerations

The architecture supports future improvements including:

- Redis caching for analytics queries
- horizontal scaling of WebSocket gateways
- multi-tenant isolation using tenantId
- containerized deployment using Docker

---

# Summary

This architecture demonstrates a real-time analytics system using modern full-stack technologies including Next.js, NestJS, MongoDB, and WebSockets.