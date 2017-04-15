using System;
using System.Collections.Generic;
using System.Web.Services;
using System.Configuration;
using System.Data.SqlClient;
using System.Web.Script.Serialization;

/// <summary>
/// Summary description for Envelopes
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class Envelopes : WebService
{
    [WebMethod]
    public void GetEnvelopes()
    {
        List<Envelope> envelopes = new List<Envelope>();
        string cs = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
        using (SqlConnection con = new SqlConnection(cs))
        {
            SqlCommand cmd = new SqlCommand("select * from Envelopes", con);
            con.Open();
            SqlDataReader rdr = cmd.ExecuteReader();

            while (rdr.Read())
            {
                Envelope envelope = new Envelope();
                envelope.id = Convert.ToInt32(rdr["ID"]);
                envelope.name = rdr["Name"].ToString();
                envelope.withdrawPeriod.frequency = Frequency.Monthly;
                envelope.withdrawPeriod.dayOfMonth1 = Convert.ToInt32(rdr["Day"]);
                envelope.total = (float)rdr.GetDouble(3);
                envelope.balance = (float)rdr.GetDouble(2);
                envelopes.Add(envelope);
            }
            con.Close();
        }
        

        Employer employer = new Employer();
        employer.name = "Gumpy's Ice Cream";
        employer.type = EmployerType.FixedIncome;
        employer.netPay = 1400;
        employer.payPeriod.frequency = Frequency.BiWeekly;
        employer.payPeriod.dayOfWeek = DayOfWeek.Friday;
        employer.payPeriod.periodStart = new DateTime(2017, 1, 13);

        DateTime lastChecked = new DateTime(2017, 2, 2);
        DateTime startDate = lastChecked.AddDays(1);
        double numDays = (DateTime.Now.Date - startDate).TotalDays;
        
        //Loop through the days to deposit or deduct from envelopes
        //These days have not been checked by the program yet
        for(int i = 0; i < numDays; i++)
        {
            DateTime currentDate = startDate.AddDays(i).Date;

            //Check to see if this is a payday from this employer
            if (employer.payPeriod.IsPeriodDate(currentDate))
            {
                //Distribute the pay into each envelope
                //Deposit into each envelope

                float payAmount = employer.netPay;
                foreach (Envelope envelope in envelopes)
                {
                    DateTime withdrawDate = envelope.withdrawPeriod.GetNextPeriodDate(currentDate);

                    //Get the number of paydays before this envelope gets withdrawn
                    int numPaydays = employer.payPeriod.GetNumPeriodDates(currentDate, withdrawDate);

                    //Calculate how much we are depositing into this envelope
                    float remaining = envelope.total - envelope.balance;
                    float depositAmount = remaining / numPaydays;

                    payAmount -= depositAmount;

                    //Deposit into the current envelope
                    envelope.balance += depositAmount;
                    envelope.transactions.Add(new Transaction(currentDate, depositAmount, 0, 0, "", envelope.balance));
                    
                }
            }
        }

        

        JavaScriptSerializer js = new JavaScriptSerializer();
        Context.Response.Write(js.Serialize(envelopes));


    }
}