using System;

public struct Transaction
{
    public DateTime date { get; set; }
    public float deposit { get; set; }
    public float withdraw { get; set; }
    public float transfer { get; set; }
    public string comment { get; set; }
    public float balance { get; set; }

    public Transaction(DateTime date, float deposit, float withdraw, float transfer, string comment, float balance): this()
    {
        this.date = date;
        this.deposit = deposit;
        this.withdraw = withdraw;
        this.transfer = transfer;
        this.comment = comment;
        this.balance = balance;
    }
}