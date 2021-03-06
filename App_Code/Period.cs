using System;

public class Period
{
    public Frequency frequency { get; set; }
    public DayOfWeek dayOfWeek { get; set; }
    public int dayOfMonth1 { get; set; }
    public int dayOfMonth2 { get; set; }
    public Month month1 { get; set; }
    public Month month2 { get; set; }
    public DateTime periodStart { get; set; }

    public bool IsPeriodDate(DateTime currentDate)
    {
        switch (frequency)
        {
            case Frequency.Daily:
                return true;
            case Frequency.Weekly:
                if (currentDate.DayOfWeek == dayOfWeek)
                {
                    return true;
                }
                break;
            case Frequency.BiWeekly:
                if (currentDate.DayOfWeek == dayOfWeek)
                {
                    double weeks = (currentDate - periodStart).TotalDays / 7;
                    if((weeks % 2) == 0) return true;
                }
                break;
            case Frequency.SemiMonthly:
                break;
            case Frequency.Monthly:
                if (currentDate.Day == dayOfMonth1) return true;
                break;
            case Frequency.Quarterly:
                break;
            case Frequency.SemiAnnually:
                break;
            case Frequency.Annually:
                break;
        }

        return false;
    }

    public DateTime GetNextPeriodDate(DateTime startDate)
    {
        int day = 0;

        while (true)
        {
            DateTime currentDate = startDate.AddDays(day).Date;
            if (IsPeriodDate(currentDate)) return currentDate;
            
            day++;
        }
    }

    public int GetNumPeriodDates(DateTime startDate, DateTime endDate)
    {
        int numDates = 0;
        for (int i = 0; i < (endDate - startDate).TotalDays + 1; i++)
        {
            if (IsPeriodDate(startDate.AddDays(i).Date)) numDates++;
        }

        return numDates;
    }
}