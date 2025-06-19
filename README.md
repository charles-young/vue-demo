# Vue Demo Project

This project is a demo Vue 3 app that uses Feature-Sliced Design (FSD) architecture.

## Tech Stack

- Vue 3
- Vite
- Vitest
- Typescript

## Getting started

### Prerequisites

This project requires:

- NodeJS: Project has been tested with Node 20 and 22
- npm

### Installing Dependencies

 ```bash
 npm install
 ```

### Running the app

 ```bash
 npm run dev
 ```

### Running the test ui

 ```bash
 npm run test:ui
 ```

## Motivation of the project

This project aims to demonstrate a sample project structure that can be applied to a large scale/enterprise grade project.

Many projects tend to become bloated as features accumulate, often resulting in tangled dependencies. This makes it difficult for engineers to add new features or get up to speed, which can snowball into more poorly organized code and increased technical debt.

By using Feature Sliced Design principles this project can address these challenges by:

- Organizing code by feature instead of grouping by code type (e.g., grouping all components or utilities together).
- Enforcing boundaries and unidirectional dependency flow to reduce coupling and increase modularity.
- Encouraging encapsulation so multiple developers can work on different parts with a reduced chance of merge conflicts.
- Improving onboarding through a predictable folder structure and grouping logic by business needs.

This approach should allow for a flexible foundation that can be built upon as scope increases.
