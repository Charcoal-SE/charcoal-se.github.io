bash -c "cd $1 && git reset --hard HEAD && git fetch && git checkout origin/master & git checkout -B master" &
