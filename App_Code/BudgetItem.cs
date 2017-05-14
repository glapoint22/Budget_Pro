public class BudgetItem
{
    public string name { get; set; }
    public int type { get; set; }
    public float currency { get; set; }
    private Period _period = new Period();

    public Period period
    {
        get
        {
            return _period;
        }

        set
        {
            _period = value;
        }
    }
}