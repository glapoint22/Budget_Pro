public struct Envelope
{
    public int id { get; set; }
    public string name { get; set; }
    public float balance { get; set; }
    public float total { get; set; }
    public EnvelopeType envelopeType { get; set; }
    public Period deductPeriod { get; set; }
    public Transaction transactions { get; set; }
}