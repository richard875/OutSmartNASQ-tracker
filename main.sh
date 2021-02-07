#!/bin/bash

ts-node "./src/api/run.ts"

# sleep for 5 seconds
sleep 5

ts-node "./main.ts"