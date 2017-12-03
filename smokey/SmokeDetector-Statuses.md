SmokeDetector can restart into one of three different statuses:

* Standard mode
* Standby mode
* Reverted mode

## Standby mode

SmokeDetector can be run in standby mode as a backup copy, just in case the main Smokey breaks down.
While in Standby mode, SmokeDetector will not make reports in chat, send posts to Metasmoke or listen
to commands.

Standby mode can be deactivated by running the `!!/failover` command. This will restart a backup 
instance so that it begins to run like the standard SmokeDetector.

> SmokeDetector host note: you can run `python3 nocrash.py standby` to start Smokey directly into Standby mode.

## Reverted Mode

SmokeDetector switches to Reverted Mode when it detects that errors occur in the running version: it goes back to a previous version. When SmokeDetector is in reverted mode, any privileged user can switch back to the master branch using the `!!/master` command when that's necessary.
