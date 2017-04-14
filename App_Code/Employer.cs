using System;
using System.Collections.Generic;

public class Employer
{
    public string name { get; set; }
    public EmployerType type { get; set; }
    public float netPay { get; set; }
    public Transaction transactions { get; set; }
    private Period _payPeriod = new Period();

    public Period payPeriod
    {
        get
        {
            return _payPeriod;
        }

        set
        {
            _payPeriod = value;
        }
    }


    public void DepositIntoEnvelopes(DateTime currentDate, List<Envelope> envelopes)
    {
        //Deposit into each envelope
        foreach (Envelope envelope in envelopes)
        {
            bool foundDeductDate = false;
            int day = 0;

            //Loop until we find the deduct date for the current envelope
            while (!foundDeductDate)
            {
                DateTime deductDate = currentDate.AddDays(day).Date;
                if (envelope.deductPeriod.IsPeriodDate(deductDate))
                {
                    foundDeductDate = true;

                    //Get the number of paydays before this envelope is deducted
                    int numPaydays = 0;
                    for (int i = 0; i < (deductDate - currentDate).TotalDays + 1; i++)
                    {
                        if (payPeriod.IsPeriodDate(currentDate.AddDays(i).Date)) numPaydays++;
                    }

                    //Calculate how much we are depositing into this envelope
                    float remaining = envelope.total - envelope.balance;
                    float depositAmount = remaining / numPaydays;

                    //Deposit into the current envelope
                    envelope.balance += depositAmount;
                    envelope.transactions.Add(new Transaction(currentDate, depositAmount, 0, 0, "Auto deposit from " + name, envelope.balance));
                }

                //Increment the day
                day++;
            }
        }
    }
}