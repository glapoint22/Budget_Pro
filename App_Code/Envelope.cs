using System.Web.Script.Serialization;
using System.Collections.Generic;

public class Envelope
{
    public string name { get; set; }
    public float amount { get; set; }
    public EnvelopeType envelopeType { get; set; }
    private List<Transaction> _transactions = new List<Transaction>();
    private Period _withdrawPeriod = new Period();

    public Period withdrawPeriod
    {
        get
        {
            return _withdrawPeriod;
        }

        set
        {
            _withdrawPeriod = value;
        }
    }

    public List<Transaction> transactions
    {
        get
        {
            return _transactions;
        }

        set
        {
            _transactions = value;
        }
    }
}