# Branch Protection Rules

## Main Branch Protection

### Requirements for merging into `main`:

1. **Pull Request Required**
   - No direct pushes to `main`
   - All changes must come through Pull Requests

2. **Required Reviews**
   - At least 1 approving review required
   - Stale approvals dismissed when new commits are pushed
   - Code owners must review changes in their areas

3. **Status Checks**
   - All CI checks must pass:
     - `backend-tests`
     - `frontend-tests`
     - `build-and-push`

4. **Branch Up-to-Date**
   - Branch must be up to date with `main` before merging

5. **Conversation Resolution**
   - All conversations must be resolved before merging

### Additional Settings

- **Force Push Protection**: Enabled
- **Branch Deletion Protection**: Enabled
- **Linear History**: Required (no merge commits)

## Development Workflow

1. Create feature branch from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make changes and commit following conventional commits:
   ```bash
   git commit -m "feat: description"
   git commit -m "fix: description"
   ```

3. Push branch and create Pull Request:
   ```bash
   git push origin feature/your-feature-name
   ```

4. Address review comments and update PR

5. Squash and merge when approved
