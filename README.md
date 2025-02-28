Prepare the project for commitlint:

pnpm husky init

# Add commit message linting to commit-msg hook
echo "pnpm dlx commitlint --edit \$1" > .husky/commit-msg
# Windows users should use ` to escape dollar signs
echo "pnpm dlx commitlint --edit `$1" > .husky/commit-msg