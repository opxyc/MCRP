#!/bin/bash
echo 'Starting process'
now=$(date +"%R")
#Assuming that you have the folder surveillance-centre in your Documents folder
alpr -c in /home/user/Documents/surveillance-centre/Demo/car.mp4 > /home/user/Documents/surveillance-centre/temp/temp0.txt
#For using webcam
#alpr -c in webcam >> /home/user/Documents/surveillance-centre/temp/temp0.txt
grep "confidence" /home/user/Documents/surveillance-centre/temp/temp0.txt | sort -k4 > /home/user/Documents/surveillance-centre/temp/temp1.txt
awk '{print $2}' /home/user/Documents/surveillance-centre/temp/temp1.txt> /home/user/Documents/surveillance-centre/log/$now.txt
echo $now>>/home/user/Documents/surveillance-centre/log/$now.txt
