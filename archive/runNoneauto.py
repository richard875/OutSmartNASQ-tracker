import requests
from bs4 import BeautifulSoup
import glob
import os
import json
from datetime import datetime
import subprocess
import time

rc = subprocess.call("./get-data-bash.sh")

for i in range(10):
    print(i + 1)
    time.sleep(1)

path = "./stockData"
os.chdir(path)
files = sorted(os.listdir(os.getcwd()), key=os.path.getmtime)

oldest = files[0]
newest = files[-1]

if newest == ".DS_Store":
    newest = files[-2]

# print(oldest)
# print(newest)
# print(files)

f = open(newest, "r")
lines = f.readlines()
f.close()

data_to_parse = ""

for line in lines:
    if line.startswith("var model = {"):
        data_to_parse = line
        break

if data_to_parse == "":
    exit()

data_to_parse = data_to_parse[data_to_parse.find("=") + 2 :]
data_to_parse = data_to_parse[:-2]

json_data = json.loads(data_to_parse)

print(json_data["AggregatedPositions"])

new_path = "../parsedStockData"
os.chdir(new_path)

current_data_and_time = datetime.now()
current_time_string = current_data_and_time.strftime("%m_%d_%Y_%H:%M:%S")
parsed_json_data_name = "parseData" + current_time_string + ".json"

with open(parsed_json_data_name, "w") as outfile:
    json.dump(json_data, outfile)
