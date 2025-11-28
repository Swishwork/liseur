# Conditional Documentation Guide

This prompt helps you determine what documentation you should read based on the specific changes you need to make in the codebase. Review the conditions below and read the relevant documentation before proceeding with your task.

## Instructions
- Review the task you've been asked to perform
- Check each documentation path in the Conditional Documentation section
- For each path, evaluate if any of the listed conditions apply to your task
  - IMPORTANT: Only read the documentation if any one of the conditions match your task
- IMPORTANT: You don't want to excessively read documentation. Only read the documentation if it's relevant to your task.

## Conditional Documentation

- README.md
  - Conditions:
    - When operating on anything under app/server
    - When operating on anything under app/client
    - When first understanding the project structure
    - When you want to learn the commands to start or stop the server or client

- app/client/src/style.css
  - Conditions:
    - When you need to make changes to the client's style

- .claude/commands/classify_adw.md
  - Conditions:
    - When adding or removing new `adws/adw_*.py` files

- adws/README.md
  - Conditions:
    - When you're operating in the `adws/` directory

- app_docs/feature-e6787204-one-click-table-export.md
  - Conditions:
    - When implementing CSV export functionality
    - When working with table or query result exports
    - When adding download buttons to the UI
    - When troubleshooting data export issues
    - When understanding the CSV export API endpoints

- app_docs/feature-27dba6d0-syllable-blender.md
  - Conditions:
    - When working with phonics or language learning features
    - When implementing audio generation or text-to-speech functionality
    - When creating interactive educational components with animations
    - When building React components for letter or syllable selection
    - When troubleshooting French pronunciation or audio caching issues

- app_docs/feature-ce63d882-learning-journey-progression.md
  - Conditions:
    - When implementing learning progression or level systems
    - When working with progress tracking and persistence
    - When creating warm, child-friendly UI themes
    - When building educational journey maps or navigation
    - When implementing mastery-based unlocking systems
    - When working with localStorage for progress storage
    - When creating celebration or encouragement systems