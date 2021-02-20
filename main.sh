#!/bin/bash

ts-node "./src/api/getLiveDataInit.ts"

# sleep for 1 second
sleep 1

ts-node "./main.ts"