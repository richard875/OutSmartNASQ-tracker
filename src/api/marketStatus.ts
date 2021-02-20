const moment = require("moment-timezone");
const holidays: Array<any> = require("../../data/static/holidays2021.json");

class MarketStatus {
  public holidayStatus: HolidayType;
  private currentDate: any;
  public currentDateString: string;

  private checkHoliday = (): void => {
    // Check if is weekend
    if (
      this.currentDate.isoWeekday() == 6 ||
      this.currentDate.isoWeekday() == 7
    ) {
      this.holidayStatus.holidayWithFullDay = true;
      return;
    }

    // If not weekend, check if it's one of the holidays
    holidays.map((holiday) => {
      if (
        holiday.year == this.currentDate.year() &&
        holiday.monthNumber == this.currentDate.month() &&
        holiday.date == this.currentDate.date()
      ) {
        holiday.halfDay
          ? (this.holidayStatus.holidayWithHalfDay = true)
          : (this.holidayStatus.holidayWithFullDay = true);
      } else {
        this.holidayStatus.notHoliday = true;
      }
    });
  };

  public toFetch = (): boolean => {
    // check if it's in the holiday
    this.checkHoliday();

    // if it's not in the holiday, check if in market hours, return false if not
    if (this.holidayStatus.holidayWithFullDay) {
      this.holidayStatus.marketOpen = false;
      this.currentDate.minute() == 0 ? true : false;
    }

    if (this.holidayStatus.holidayWithHalfDay) {
      if (this.currentDate.minute() >= 30 && this.currentDate.hour() == 9) {
        return true;
      } else if (
        this.currentDate.hour() == 10 ||
        this.currentDate.hour() == 11
      ) {
        this.currentDate.minute() % 20 === 0 ? true : false;
      } else if (this.currentDate.hour() == 12) {
        if (this.currentDate.minute() < 30) {
          this.currentDate.minute() % 20 === 0 ? true : false;
        } else if (
          this.currentDate.minute() >= 30 &&
          this.currentDate.minute() <= 58
        ) {
          return true;
        }
      } else {
        this.holidayStatus.marketOpen = false;
        this.currentDate.minute() == 0 ? true : false;
      }
    }

    if (this.holidayStatus.notHoliday) {
      if (this.currentDate.minute() >= 30 && this.currentDate.hour() == 9) {
        return true;
      } else if (
        this.currentDate.hour() >= 10 &&
        this.currentDate.hour() <= 14
      ) {
        this.currentDate.minute() % 20 === 0 ? true : false;
      } else if (this.currentDate.hour() == 15) {
        if (this.currentDate.minute() < 30) {
          this.currentDate.minute() % 20 === 0 ? true : false;
        } else if (
          this.currentDate.minute() >= 30 &&
          this.currentDate.minute() <= 58
        ) {
          return true;
        }
      } else {
        this.holidayStatus.marketOpen = false;
        this.currentDate.minute() == 0 ? true : false;
      }
    }

    return false;
  };

  private currentDateAndTime = (current: any): string => {
    return `${("0" + (current.month() + 1)).slice(-2)}_${(
      "0" + current.date()
    ).slice(-2)}_${current.year()}_${("0" + current.hour()).slice(-2)}:${(
      "0" + current.minute()
    ).slice(-2)}:${("0" + current.second()).slice(-2)}`;
  };

  constructor() {
    this.currentDate = moment().tz("America/New_York");
    this.holidayStatus = new HolidayType();
    this.currentDateString = this.currentDateAndTime(this.currentDate);
  }
}

class HolidayType {
  public notHoliday: boolean;
  public holidayWithFullDay: boolean;
  public holidayWithHalfDay: boolean;
  public marketOpen: boolean;

  constructor() {
    this.notHoliday = false;
    this.holidayWithFullDay = false;
    this.holidayWithHalfDay = false;
    this.marketOpen = true;
  }
}

export default MarketStatus;
