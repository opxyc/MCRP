# Surveillance Centre

This is the software that is built for surveillance centre. The sofware continuously(in fixed intervals) fetch the active cases from the server. Then it initiates a search through the logged numbers produced from ALPR by processing the CCTV visuals.

## Usage
Navigate to the **surveillance-centre** folder and use the command
```bash
python3 main.py
```
## Setting Up ALPR
The current version of this software is completely tested on Ubuntu 16.04 .

1. Install **openalpr** using the command
```bash
sudo apt install openalpr
```
2. Now navigate to the **openalpr** directory (usually /usr/share/openalpr)
3. Replace the contents **runtime_data** with the contents of **surveillance-centre/runtime_data**
4. Test the working using a sample image in the **surveillance-centre/Demo** folder 
```bash
alpr -c in car.jpg
```
