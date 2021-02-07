#!/bin/bash
 
current_time=$(date "+%m_%d_%Y_%H:%M:%S")

uuid=`uuidgen`
# echo "$uuid"

cd StockData
curl -o data$current_time.txt  https://www.etoro.com/sapi/trade-data-real/live/public/portfolios?cid=7160826&client_request_id=$uuid