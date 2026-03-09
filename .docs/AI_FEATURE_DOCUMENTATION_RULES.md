# AI Feature Documentation Rules

## Purpose

This document defines the rules that AI models must follow when contributing code to this project.

Whenever an AI model implements, modifies, or completes a feature, it must automatically generate documentation describing that feature.

The objective is to ensure that the system remains well documented, maintainable, and understandable for both developers and AI systems.

## When Documentation Must Be Created

AI must create or update documentation in the following cases:

- A new feature is implemented
- An API endpoint is added or modified
- A database schema changes
- A UI component introduces new behavior
- A service or module is added
- A major logic change occurs

Documentation must be created immediately after the feature implementation is completed.

A feature is considered incomplete if documentation is missing.

## Documentation Location

All feature documentation must be stored inside the `.docs` directory.

### Example directory structure:

```
features/
```

Each feature must have its own file:

```

.docs/features/<feature-name>.md

```

### Example:

```

.docs/features/user-authentication.md
.docs/features/job-posting.md
.docs/features/voice-chatbot.md

```

## Required Documentation Structure

Each feature documentation file must follow this structure.

### Feature: <Feature Name>

#### Overview

Provide a short description of what the feature does.

#### Business Purpose

Explain why this feature exists and what problem it solves.

#### User Flow

Describe how users interact with the feature.

**Example flow:**

User → Page → Action → Backend Service → Response

#### Technical Implementation

**Backend**

Explain backend modules, services, controllers, and logic involved.

**Frontend**

Explain UI components, hooks, pages, or interactions.

**AI / External Services**

If the feature uses AI models or third-party APIs, explain them here.

#### API Endpoints

List all related endpoints.

**Example:**

```

POST /api/auth/login
GET /api/users

```

Include request parameters and response descriptions if necessary.

#### Database Changes

Describe any schema changes.

**Example table:**

| Table | Field | Type    | Description |
| ----- | ----- | ------- | ----------- |
| users | id    | uuid    | primary key |
|       | email | varchar | user email  |

#### Dependencies

List libraries or modules required for this feature.

**Example:**

- axios
- react-query
- langchain

#### Edge Cases

Describe possible failure scenarios.

**Examples:**

- Invalid input
- API timeout
- Empty results
- Permission errors

#### Testing

Describe how the feature is tested.

**Example:**

Unit tests:

```

auth.service.spec.ts

```

Include manual testing steps if required.

#### Future Improvements

List possible future optimizations or enhancements.

## Code Documentation Requirement

AI must also add inline documentation for functions and complex logic.

**Example (TypeScript):**

```typescript
/**
 * Authenticate user credentials and return a JWT token
 *
 * @param email user email
 * @param password user password
 * @returns authentication token
 */
async login(email: string, password: string)
```

## Pull Request Requirement

When a feature is created or modified, the pull request must include:

- The feature implementation
- The feature documentation file
- Updated API documentation if applicable

Pull requests must not be accepted without documentation.

## Documentation Quality Rules

Documentation must be:

- Clear
- Structured
- Concise
- Technically accurate
- Understandable by developers and AI systems

Avoid:

- vague explanations
- missing API descriptions
- undocumented database changes

## AI Behavior Rules

When implementing features, AI must follow this process:

1. Implement the feature
2. Verify the code compiles and runs correctly
3. Generate the feature documentation
4. Save the documentation in `.docs/features`
5. Follow the required documentation structure

If documentation is missing, the feature is considered incomplete.
