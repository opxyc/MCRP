from crontab import CronTab

my_cron = CronTab(user='user')
job1 = my_cron.new(command='cd /home/user/Documents/ && ./process.sh')
job1.minute.every(2)
job2 = my_cron.new(command='cd /home/user/Documents/ && python3 match.py')
job2.minute.every(2)

my_cron.write()

