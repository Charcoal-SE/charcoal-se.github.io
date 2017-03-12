git config --global user.email "smokey@erwaysoftware.com"
git config --global user.name "SmokeDetector"
if [ -n $TRAVIS_COMMIT ]
then
  git commit --allow-empty -qm "Update site for $TRAVIS_COMMIT"
  git push -q
else
  git commit --allow-empty -qm "Update site for <unknown commit>"
  echo -e "Skipped upload."
fi
