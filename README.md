# About Autotrader

## Start the program | Repeat every **1** second

- $ watch -n 1 bash main.sh

<br/>

# Steps

1. Get Data
2. Calculation
3. Connect to trading platform
4. Email / export

<br/>

# Notes

## Time tracking

- [Time in New York (Wikipedia)](https://en.wikipedia.org/wiki/Time_in_New_York)
- New York uses Eastern Standard Time (EST, UTC -5) and Eastern Daylight Time (EDT, UTC -4)
- The project uses `moment.js` to avoid errors
- All time within the project will be based on time zone of New York State

<br/>

## Holidays and market hours

- Both **NYSE** and **NASDAQ** shares the same holidays and trading hours (9:30 am - 4:00 pm | Mon - Fri)
- Pre / Post market is **ignored** (Data is still been calculated, but no trading will happen)
- This project will use [NASDAQ's data](https://www.nasdaqtrader.com/Trader.aspx?id=Calendar) for halfdays and holidays

  <br/>

## NYSE's data

| Holiday                       | 2021                                             | 2022                                             | 2023                                            |
| ----------------------------- | :----------------------------------------------- | :----------------------------------------------- | :---------------------------------------------- |
| `New Years Day`               | Friday, January 1                                | —                                                | Monday, January 2 (New Year's holiday observed) |
| `Martin Luther King, Jr. Day` | Monday, January 18                               | Monday, January 17                               | Monday, January 16                              |
| `Washington's Birthday`       | Monday, February 15                              | Monday, February 21                              | Monday, February 20                             |
| `Good Friday`                 | Friday, April 2                                  | Friday, April 15                                 | Friday, April 7                                 |
| `Memorial Day`                | Monday, May 31                                   | Monday, May 30                                   | Monday, May 29                                  |
| `Independence Day`            | Monday, July 5 (July 4 holiday observed)         | Monday, July 4                                   | Tuesday, July 4\*                               |
| `Labor Day`                   | Monday, September 6                              | Monday, September 5                              | Monday, September 4                             |
| `Thanksgiving Day`            | Thursday, November 25\*\*                        | Thursday, November 24\*\*                        | Thursday, November 23\*\*                       |
| `Christmas Day`               | Friday, December 24 (Christmas holiday observed) | Monday, December 26 (Christmas holiday observed) | Monday, December 25                             |

<br/>

\* Each market will close early at 1:00 p.m. (1:15 p.m. for eligible options) on Monday, July 3, 2023. Crossing Session orders will be accepted beginning at 1:00 p.m. for continuous executions until 1:30 p.m. on these dates, and NYSE American Equities, NYSE Arca Equities, NYSE Chicago, and NYSE National late trading sessions will close at 5:00 pm. All times are Eastern Time.

\*\* Each market will close early at 1:00 p.m. (1:15 p.m. for eligible options) on Friday, November 26, 2021, Friday, November 25, 2022, and Friday, November 24, 2023 (the day after Thanksgiving). Crossing Session orders will be accepted beginning at 1:00 p.m. for continuous executions until 1:30 p.m. on these dates, and NYSE American Equities, NYSE Arca Equities, NYSE Chicago, and NYSE National late trading sessions will close at 5:00 pm. All times are Eastern Time.

<br/>

# Data fetch / export duration

## Date fetch

<br/>

<div style="width: 100%; height: 22px; border: 1px solid #555; display: flex;">
    <div style="width: 20%; height: 100%; background-color: #333; text-align: center;">Every hour (Pre market)</div>
    <div style="width: 10%; height: 100%; background-color: green; text-align: center;">Every minute</div>
    <div style="width: 40%; height: 100%; background-color: blue; text-align: center;">Every 20 minutes</div>
    <div style="width: 10%; height: 100%; background-color: red; text-align: center;">Every minute</div>
    <div style="width: 20%; height: 100%; background-color: #333; text-align: center;">Every hour (After hours)</div>
</div>
<div style="width: 100%; display: flex; margin-left: 30px;">
    <div style="width: 20%; height: 100%; text-align: right;">(Market open) 9:30 am</div>
    <div style="width: 10%; height: 100%; text-align: right;">10 am</div>
    <div style="width: 40%; height: 100%; text-align: right;">3:30 pm</div>
    <div style="width: 7%; height: 100%; text-align: right;"></div>
    <div style="width: 20%; height: 100%; text-align: left;">4 pm* (Market close)</div>
</div>

<br/>

\* Algorithm finish on 3:58 pm (Running time and latency)

<br/>

## Data export

<br/>

- Data will export / emailed if there's a change of percentage at **anytime**
- Otherwise data will be exported / emailed on:
  - **9:35 am** (5 minutes after market open)
  - **4:05 pm** (5 minutes after market close)

<br/>

# Email and export

- Will only email and export if there's a data change **or** with duration
- Data fetched pre / post market will be stored in `data/json/marketClosed`
- Data fetched durind market will be stored in `data/json/marketOpen`
- Only `marketOpen` data will be calculated
