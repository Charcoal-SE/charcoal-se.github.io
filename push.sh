#!/bin/bash

while [ $# -ne 0 ]; do
  case "$1" in
    "-m"|"--message")
      COMMIT_MSG="$2"
      shift 2;;
    *) break;;
  esac
done

OLD_EMAIL=$(git config user.email)
OLD_NAME=$(git config user.name)
git config user.email "smokey@erwaysoftware.com"
git config user.name "SmokeDetector"
if [ -n "$TRAVIS_COMMIT" ]; then
  git commit --allow-empty -qm "Auto deploy from Travis CI build ${TRAVIS_BUILD_NUMBER:-<unknown>}" \
    -m "${COMMIT_MSG:-$TRAVIS_COMMIT}"
  git push -q
else
  git commit --allow-empty -qm "Auto deploy from Travis CI build ${TRAVIS_BUILD_NUMBER:-<unknown>}" \
    -m "${COMMIT_MSG:-$TRAVIS_COMMIT}"
  echo -e "Skipped upload."
fi
git config user.email $OLD_EMAIL
git config user.name $OLD_NAME
