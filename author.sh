#!/bin/sh

git filter-branch --env-filter '
OLD_EMAIL=""
CORRECT_NAME="Esteban Ramos"
CORRECT_EMAIL="esteban.ramos.f@gmail.com"
if [ "$GIT_COMMITTER_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_COMMITTER_NAME="$CORRECT_NAME"
    export GIT_COMMITTER_EMAIL="$CORRECT_EMAIL"
fi
if [ "$GIT_AUTHOR_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_AUTHOR_NAME="$CORRECT_NAME"
    export GIT_AUTHOR_EMAIL="$CORRECT_EMAIL"
fi
' --tag-name-filter cat -- --branches --tags
view rawgit-author-rewrite.sh hosted with ❤ by GitHub
Press Enter to run the script.
Review the new Git history for errors.
Push the corrected history to GitHub:

git push --force --tags originhttps 'refs/heads/*'

