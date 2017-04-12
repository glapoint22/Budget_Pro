using System;
using System.Collections.Generic;

public class Period
{
    public Frequency frequency { get; set; }
    public DayOfWeek dayOfWeek { get; set; }
    public int dayOfMonth1 { get; set; }
    public int dayOfMonth2 { get; set; }
    public Month month1 { get; set; }
    public Month month2 { get; set; }
    public DateTime periodStart { get; set; }

    public List<DateTime> GetDates(DateTime startDate, DateTime endDate)
    {
        List<DateTime> dates = new List<DateTime>();
        double numDays = (endDate - startDate).TotalDays;

        switch (frequency)
        {
            case Frequency.Daily:
                for(int i = 0; i < numDays; i++)
                {
                    dates.Add(startDate.AddDays(i).Date);
                }
                break;
            case Frequency.Weekly:
                for (int i = 0; i < numDays; i++)
                {
                    DateTime currentDate = startDate.AddDays(i).Date;
                    if(currentDate.DayOfWeek == dayOfWeek)
                    {
                        dates.Add(currentDate.Date);
                    }
                }
                break;
            case Frequency.BiWeekly:
                for (int i = 0; i < numDays; i++)
                {
                    DateTime currentDate = startDate.AddDays(i).Date;
                    if (currentDate.DayOfWeek == dayOfWeek)
                    {
                        double weeks = (currentDate - periodStart).TotalDays / 7;
                        if((weeks % 2) == 0)
                        {
                            dates.Add(currentDate.Date);
                        }
                        
                    }
                }
                break;
            case Frequency.SemiMonthly:
                break;
            case Frequency.Monthly:
                break;
            case Frequency.Quarterly:
                break;
            case Frequency.SemiAnnually:
                break;
            case Frequency.Annually:
                break;
        }

        return dates;
    }
}