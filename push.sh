#!/bin/bash

while [ $# -ne 0 ]; do
  case "$1" in
    "-m"|"--message")
      COMMIT_MSG="$2"
      shift 2;;
    *) break;;
  esac
done

EMAIL="smokey@erwaysoftware.com"
AUTHOR="SmokeDetector"

if [ -n "$TRAVIS_COMMIT" ]; then
  git commit --allow-empty -q --author "$AUTHOR <$EMAIL>"\
    -m "Auto deploy from Travis CI build ${TRAVIS_BUILD_NUMBER:-<unknown>}" \
    -m "${COMMIT_MSG:-$TRAVIS_COMMIT}"
  git push -q
else
  git commit --allow-empty -q --author "$AUTHOR <$EMAIL>"\
    -m "Auto deploy from Travis CI build ${TRAVIS_BUILD_NUMBER:-<unknown>}" \
    -m "${COMMIT_MSG:-$TRAVIS_COMMIT}"
  echo -e "Skipped upload."
fi
