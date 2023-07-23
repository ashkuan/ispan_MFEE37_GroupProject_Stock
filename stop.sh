IFS=$'\n' arr=($(ps aux | grep nodemon | grep "S " | awk '{print $2}'))
for i in {0..5}; do echo "killing pid ${arr[i]}"; kill ${arr[i]}; done;