#!/bin/bash
# This script is used by vercel to check which branch needs preview

current_branch=$(git rev-parse --abbrev-ref HEAD)

if [ "$current_branch" != "l10n_main" ]; then
    echo "current branch is not l10n_main (build needed)"
    exit 1
fi

# Get latest commit
files=$(git diff-tree --no-commit-id --name-only -r HEAD)

# Check if only i18n files are modified
for file in $files
do
    if [[ $file != i18n/* ]]
    then
        # build needed
        exit 1
    fi
done

# don't need build
exit 0
