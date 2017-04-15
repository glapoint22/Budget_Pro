using System.Web.Script.Serialization;
using System.Collections.Generic;

public class Envelope
{
    public int id { get; set; }
    public string name { get; set; }
    public float balance { get; set; }
    public float total { get; set; }
    [ScriptIgnore]
    public EnvelopeType envelopeType { get; set; }
    private List<Transaction> _transactions = new List<Transaction>();
    private Period _withdrawPeriod = new Period();

    [ScriptIgnore]
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

    [ScriptIgnore]
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