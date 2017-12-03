SmokeDetector's build infrastructure is complex and involves quite a number of components. This is an attempt to document the process and reduce the bus factor.

## Principles
The idea of the build process is to enable those with SmokeDetector privileges to pull in code without having direct server access. However, doing that without any safeguards is obviously a bad idea, so there are a number of components that regulate what and when things can be pulled in.

 - CI (x2)
 - metasmoke
 - Smokey itself
 - GitHub
 - PullApprove

## Flow
### CI
CI — Continuous Integration — runs Smokey's test suite against every commit. This is the major phase in every build, as no changes can be remotely pulled until CI has passed the commit.

We use two CI services, Travis and Circle. Semaphore also watches the repo, but Smokey doesn't use Semaphore to check commit validity. When someone makes a commit, GitHub fires a webhook event to all registered CI services to alert them to start testing on the new commit. Each CI service runs its test process, and reports back to GitHub by creating a commit status.

### metasmoke
GitHub `POST`s the commit status to metasmoke ([handler code](https://github.com/Charcoal-SE/metasmoke/blob/master/app/controllers/github_controller.rb#L12)). The status gets saved into metasmoke's database, and forwarded to Smokey via the MS-Smokey websocket.

GitHub *also* `POST`s the commit event itself to metasmoke, and metasmoke uses Octokit to update the `deploy` branch to the same commit as `master`. This is why all commits should be made on master rather than deploy, and also why commits to deploy break things. The exception to this is for PR commits, which don't update deploy until they're merged.

### Smokey
Smokey [receives the websocket message for processing](https://github.com/Charcoal-SE/SmokeDetector/blob/master/metasmoke.py#L159). If the tests failed, then Smokey simply posts that in CHQ and takes no further action. If, however, it was successful, then Smokey further checks if the commit message contains "autopull", and automatically pulls in the changes if it does; if not, it posts a CI success message in CHQ.

## Pull Requests
Pull requests have a slightly different flow. CI still tests the commits and reports them back to GitHub, and GitHub forwards them to metasmoke. However, metasmoke rejects them because it doesn't do anything with them.

### PullApprove & Blacklist PRs
This is where PullApprove comes in. Pull requests on the Smokey repo are set up to require status checks to pass before allowing them to be merged. We also want to have a review on the code - a second pair of eyes. However, using GitHub's native reviews for this isn't possible, as those are restricted to only people with code access (i.e. git privileges). So instead, we have PullApprove.

PullApprove uses a [config file](https://github.com/Charcoal-SE/SmokeDetector/blob/master/.pullapprove.yml), which includes a list of people, to determine who has privileges to review a pull request. If the reviewers approve the pull request, PA sets its PR status to successful; if they don't, PA sets the PR status to failed. Because this works through a status, the existing requirement for status checks to pass is enough to enforce a PA review before merging. This still requires someone with git privileges to manually merge the PR; however, they don't have to review it before doing so.

Additionally, GitHub forwards these PR statuses to metasmoke. For the most part, metasmoke ignores them. However, if a pull request is authored by SmokeDetector, as is the case with blacklist commands from non-code privileged users, then metasmoke checks the status. If it's a successful status from PullApprove, then metasmoke automatically merges the pull request.

## Fixing Erroneous Commits
If someone has accidentally committed to the `deploy` branch instead of `master`, someone with git privileges will need to set this right before things return to normal. This isn't difficult:

```
aah@broken:~/Smokey$ git checkout master
aah@broken:~/Smokey$ git merge --rebase deploy
aah@broken:~/Smokey$ git push origin master
```

In other words: move the erroneous commits back to master via a rebase merge, and push that up to GitHub. From there, metasmoke should be able to update deploy to the correct reference.

If not... I hope you know where your towel is.