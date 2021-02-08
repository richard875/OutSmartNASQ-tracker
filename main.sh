#!/bin/bash

ts-node "./src/api/getLiveData.ts"

# sleep for 1 second
sleep 1

ts-node "./main.ts"