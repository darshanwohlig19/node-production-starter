# Contributing to Node Production Starter

Thanks for your interest in contributing! Here's how to get started.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/node-production-starter.git`
3. Install dependencies: `npm install`
4. Copy env file: `cp .env.example .env`
5. Start development server: `npm run dev`

## Development Guidelines

- Follow the existing folder structure (controllers → services → models)
- Write tests for new features
- Keep PRs focused — one feature or fix per PR
- Update the README if adding new features or env variables

## Commit Message Format

```
feat: add password reset flow
fix: handle expired token edge case
docs: update Docker setup instructions
test: add integration tests for refresh endpoint
```

## Running Tests

```bash
npm test
```

## Reporting Bugs

Open an issue with:
- Node.js version
- Steps to reproduce
- Expected vs actual behavior
