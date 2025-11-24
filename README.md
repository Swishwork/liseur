# Liseur (The Reader)

An AI-powered French phonics learning application for children, featuring agentic workflow automation for autonomous development.

## Project Overview

Liseur is a progressive French reading app designed following Montessori principles:

### Development Roadmap

1. **GOOD: "The Syllable Blender"** (MVP)
   - Digital Montessori "blending board"
   - Pure decoding practice without guessing
   - Select consonant + vowel → visualize blend → hear sound
   - Prevents picture-based guessing, focuses on M + A = MA

2. **BETTER: "The Phonics Arcade"** (Weekend Project)
   - Gamified drills with progression
   - Level-based unlocking (simple → complex sounds)
   - "Real vs. Alien" word game for careful reading
   - Streak counters for motivation

3. **BEST: "Liseur: The Adaptive Engine"** (The Dream)
   - Voice recognition with real-time pronunciation feedback
   - Adaptive story generation based on struggling phonemes
   - Parent heatmap dashboard showing learning progress

## AI Developer Workflow (ADW) System

This project uses an autonomous development system that automates the complete SDLC through AI agents.

### Quick Start

1. **Install Dependencies**
   ```bash
   # Install Claude Code CLI
   npm install -g @anthropics/claude-code

   # Install GitHub CLI
   brew install gh
   gh auth login

   # Install Python dependencies
   pip install uv
   ```

2. **Configure Environment**
   ```bash
   # Copy environment template
   cp .env.sample .env

   # Edit .env and add your keys:
   # - ANTHROPIC_API_KEY (required)
   # - GITHUB_PAT (optional, for different GitHub account)
   ```

3. **Set up MCP Server**
   ```bash
   # Copy MCP configuration
   cp .mcp.json.sample .mcp.json

   # Install Playwright MCP
   npx @playwright/mcp@latest --isolated --config ./playwright-mcp-config.json
   ```

### ADW Workflow Phases

The system supports 5 autonomous phases:

1. **Plan** - Analyzes issues and creates implementation specs
2. **Build** - Implements code changes based on plan
3. **Test** - Runs tests and auto-fixes failures
4. **Review** - Validates implementation against spec with screenshots
5. **Document** - Auto-generates documentation

### Available Workflows

#### Individual Phase Scripts
```bash
cd adws

# Run individual phases
uv run adw_plan.py <issue_number>
uv run adw_build.py <issue_number>
uv run adw_test.py <adw_id>
uv run adw_review.py <adw_id>
uv run adw_document.py <adw_id>
```

#### Composed Workflows
```bash
# Plan + Build (quick iteration)
uv run adw_plan_build.py <issue_number>

# Plan + Build + Test (standard development)
uv run adw_plan_build_test.py <issue_number>

# Plan + Build + Test + Review (quality assurance)
uv run adw_plan_build_test_review.py <issue_number>

# Plan + Build + Document (skip tests/review)
uv run adw_plan_build_document.py <issue_number>

# Complete SDLC (all 5 phases)
uv run adw_sdlc.py <issue_number>
```

### Automated Triggers

#### Cron-based Polling (Every 20 seconds)
```bash
cd adws/adw_triggers
uv run trigger_cron.py
```
- Monitors GitHub issues for new issues or "adw" comments
- Automatically triggers `adw_plan_build.py`

#### Webhook-based (Real-time)
```bash
cd adws/adw_triggers
uv run trigger_webhook.py  # Runs on port 8001
```
- FastAPI server listening for GitHub issue events
- Validates webhook signatures
- Launches workflows in background

To expose webhook publicly:
```bash
./scripts/expose_webhook.sh
```

### Claude Code Commands

Custom slash commands available in Claude Code CLI:

#### Planning & Classification
- `/classify_issue` - Classify GitHub issue type (/chore, /bug, /feature)
- `/classify_adw` - Extract ADW workflow information
- `/generate_branch_name` - Generate semantic branch names

#### Implementation
- `/feature` - Feature planning template
- `/bug` - Bug resolution planning template
- `/chore` - Chore/maintenance planning template
- `/patch` - Direct patch workflow
- `/implement` - Execute implementation from plan

#### Testing & Quality
- `/test` - Run comprehensive test suite
- `/test_e2e` - Run end-to-end browser tests
- `/resolve_failed_test` - Auto-fix failed tests
- `/resolve_failed_e2e_test` - Auto-fix E2E test failures

#### Review & Documentation
- `/review` - Implementation review against spec
- `/document` - Auto-generate documentation
- `/conditional_docs` - Conditional documentation generation

#### Git & PR
- `/commit` - Create semantic commits
- `/pull_request` - Create/update pull requests

### Utility Scripts

```bash
# Start development servers
./scripts/start.sh

# Stop running services
./scripts/stop_apps.sh

# Setup environment
./scripts/copy_dot_env.sh

# Delete PRs
./scripts/delete_pr.sh <pr_number>

# Clear issue comments
./scripts/clear_issue_comments.sh <issue_number>

# Stop webhook server
./scripts/kill_trigger_webhook.sh

# Reset database
./scripts/reset_db.sh
```

## ADW State Management

Each workflow creates an isolated workspace:

```
agents/
└── {adw_id}/
    ├── adw_state.json      # Persistent workflow state
    ├── agent_output.jsonl  # Agent execution logs
    └── screenshots/        # Review phase screenshots
```

State file contains:
- `adw_id` - Unique 8-character hex identifier
- `issue_number` - GitHub issue number
- `branch_name` - Git branch name
- `plan_file` - Path to implementation plan
- `issue_class` - Issue type (/feature, /bug, /chore)

## Directory Structure

```
liseur/
├── .claude/              # Claude Code CLI configuration
│   ├── commands/         # Custom slash commands
│   ├── hooks/            # Pre/post tool use hooks
│   └── settings.json     # Permissions & hooks config
├── adws/                 # AI Developer Workflow System
│   ├── adw_modules/      # Core workflow modules
│   ├── adw_triggers/     # Automation triggers
│   └── adw_tests/        # ADW system tests
├── agents/               # Agent execution workspaces
├── logs/                 # Structured session logs
├── specs/                # Feature specifications & plans
├── app_docs/             # Generated documentation
├── scripts/              # Utility scripts
├── .env.sample           # Environment template
├── .mcp.json.sample      # MCP server config template
└── playwright-mcp-config.json  # Playwright automation config
```

## Contributing

This project uses autonomous development workflows. To contribute:

1. Create a GitHub issue describing the feature/bug
2. Trigger ADW workflow manually or via automation
3. Review the generated PR and provide feedback
4. ADW can iterate based on review comments

## Resources

- [Claude Code CLI Documentation](https://github.com/anthropics/claude-code)
- [GitHub CLI](https://cli.github.com/)

## License

[Add your license here]
