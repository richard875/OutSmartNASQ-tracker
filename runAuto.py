from selenium import webdriver
import pandas as pd

url = "https://www.etoro.com/sapi/trade-data-real/live/public/portfolios?cid=7160826&client_request_id=805296d4-c894-4fc5-b311-66ced393e044"

driver = webdriver.Chrome()
driver.get(url)