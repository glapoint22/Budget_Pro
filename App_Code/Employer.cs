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
}