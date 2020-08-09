#!/bin/bash
now=$(date +"%R")
alpr -c in /home/user/Documents/car.mp4 >> /home/user/Documents/temp/temp0.txt
grep "confidence" /home/user/Documents/temp/temp0.txt | sort -k4 > /home/user/Documents/temp/temp1.txt
awk '{print $2}' /home/user/Documents/temp/temp1.txt> /home/user/Documents/log/$now.txt
echo $now>>/home/user/Documents/log/$now.txt
