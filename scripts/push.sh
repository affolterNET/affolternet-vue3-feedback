#!/bin/bash

# author: martin@affolter.net

set -e

# Get current branch - works in GitHub Actions
branch=$(git rev-parse --abbrev-ref HEAD)
echo "Current branch: $branch"

if [ "$branch" != "main" ]; then
  echo "not on main branch. $branch"
  exit 1
fi

# In GitHub Actions, we may have uncommitted changes from the workflow
# Skip the clean check if running in CI
if [ -z "$CI" ]; then
  if [ -z "$(git status --porcelain)" ]; then 
    echo "working directory clean"
  else 
    echo "working directory NOT clean"
    exit 1
  fi
else
  echo "Running in CI, skipping clean check"
fi

# Run version script from current directory
version=$(node ./version.js)

echo "new version: $version"

# Go to repository root
cd "$(git rev-parse --show-toplevel)"

# Commit the version change
git add package.json
git commit package.json -m "version updated: $version"
git tag "$version"

# Push changes and tags
git push
git push --tags