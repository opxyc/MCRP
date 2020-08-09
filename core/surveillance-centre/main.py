from crontab import CronTab
#Assuming that you have the folder 'surveillance-centre' in your Documents folder
my_cron = CronTab(user='user')
job1 = my_cron.new(command='cd /home/user/surveillance-centre/Documents/ && ./process.sh')
job1.minute.every(2)
job2 = my_cron.new(command='cd /home/user/surveillance-centre/Documents/ && python3 match.py')
job2.minute.every(2)
my_cron.write()

print('Succesfully Initiated')


