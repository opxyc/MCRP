import requests
import json
import glob
import os
from datetime import date
response = requests.post('http://coderscafe.hackp.cyberdome.org.in:80/get-active-incidents', json={'authToken': 'heWasASimilarBlackPen'})
a = response.json()
cases=[]
for i in range(len(a['desc'])):
    cases.append(a['desc'][i]['vehicleNumber'])
    print(cases)

list_of_files = glob.glob('/home/user/Documents/surveillance-centre/log/*') # * means all if need specific format then *.csv
latest= max(list_of_files, key=os.path.getctime)

with open(latest, "r+") as file1:
    xlines = file1.readlines()
    ylines = [i.replace('\n', '') for i in xlines]
    zlines = list(set(ylines))
    for x in cases:     
        for line in zlines:
            if x == line:
                 print(a['desc'][cases.index(x)]['_id'])
                 incidentId= a['desc'][cases.index(x)]['_id']
                 response=requests.post('http://coderscafe.hackp.cyberdome.org.in:80/update-case-file', json={'authToken': 'heWasASimilarBlackPen',"incidentId" : incidentId,"newInfo" : {"date" : str(date.today()),"time" : ylines[-1],"location" : "Kannur"} })
                 print(response.json())

