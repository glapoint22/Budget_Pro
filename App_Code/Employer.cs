using System;

public struct Employer
{
    public string name { get; set; }
    public EmployerType type { get; set; }
    public float netPay { get; set; }
    public Transaction transactions { get; set; }
    public Period payPeriod { get; set; }
}