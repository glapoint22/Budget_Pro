using System;

public struct Transaction
{
    public DateTime date { get; set; }
    public float deposit { get; set; }
    public float withdraw { get; set; }
    public float transfer { get; set; }
    public string comment { get; set; }
    public float balance { get; set; }
}