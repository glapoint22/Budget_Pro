using System;


public class Employer
{
    public string name { get; set; }
    public IncomeType incomeType { get; set; }
    public float netPay { get; set; }
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
}