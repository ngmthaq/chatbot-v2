# Plan Creation Guidelines for AI

## Purpose

This document details the rules the AI must follow when users request to create a plan. Ensuring proper structuring and naming conventions helps maintain organization and usability.

## Plan Saving Procedure

When a user requests to create a plan, the AI must follow these steps to save the plan documentation correctly.

### 1. **Capture User Input**

Gather all necessary details regarding the plan:

- **Plan Name:** The title of the plan provided by the user.
- **Plan Details:** Objectives, target audience, timeframe, resources, constraints, and evaluation criteria.

### 2. **Determine File Name Format**

The plan must be saved in the following format:

```
<datetime>\_<name>.md
```

Where:

- `<datetime>`: The current date and time in the format `YYYYMMDD_HHMM` (e.g., `20240309_1530` for March 9, 2024, at 15:30).
- `<name>`: A sanitized version of the plan name, replacing spaces and special characters with underscores.

### 3. **Document Structure**

The content of the plan document must follow a structured format:

```
# <Plan Name>

## Objectives

- [List of objectives]

## Target Audience

- [Description of target audience]

## Timeframe

- [Details about the timeframe]

## Resources Available

- [List of available resources]

## Constraints

- [Mention any constraints]

## Evaluation Criteria

- [Criteria for measuring success]
```

### 4. **Save Location**

Ensure the document is saved in the directory:

```
.docs/plans/
```

### 5. **Example of a Saved Plan**

If a user requests a plan titled "Marketing Strategy for Q2 2026," it may be saved as follows:

- **File Name:** `20240309_1530_marketing_strategy_for_q2_2026.md`
- **File Content:**

### 5. **Example of a Saved Plan**

If a user requests a plan titled "Feature Development for User Authentication," it may be saved as follows:

- **File Name:** `20240309_1530_Feature_Development_for_User_Authentication.md`
- **File Content:**

```markdown
# Feature Development for User Authentication

## Objectives

- Implement a secure login system using JWT
- Integrate social media authentication options
- Create a password recovery feature

## Target Audience

- Internal development team

## Timeframe

- Development starting April 2026 and ending by June 2026

## Resources Available

- Development budget of $15,000
- Team of three developers

## Constraints

- Must comply with GDPR regulations
- Limited access to third-party authentication services

## Evaluation Criteria

- Successful user registration and login rates
- User feedback on authentication ease
```

## Conclusion

By following these rules, the AI will ensure that all plans are documented consistently, making it easier for users to retrieve and use them in the future.
