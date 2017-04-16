OLD_EMAIL=$(git config user.email)
OLD_NAME=$(git config user.name)
git config user.email "smokey@erwaysoftware.com"
git config user.name "SmokeDetector"
if [ -n $TRAVIS_COMMIT ]
then
  git commit --allow-empty -qm "Update site for $TRAVIS_COMMIT"
  git push -q
else
  git commit --allow-empty -qm "Update site for <unknown commit>"
  echo -e "Skipped upload."
fi
git config user.email $OLD_EMAIL
git config user.name $OLD_NAME
