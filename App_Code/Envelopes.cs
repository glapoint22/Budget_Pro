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
        List<Envelopez> envelopes = new List<Envelopez>();
        string cs = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
        using (SqlConnection con = new SqlConnection(cs))
        {
            SqlCommand cmd = new SqlCommand("select * from Envelopes", con);
            con.Open();
            SqlDataReader rdr = cmd.ExecuteReader();

            while (rdr.Read())
            {
                Envelopez envelope = new Envelopez();
                envelope.id = Convert.ToInt32(rdr["ID"]);
                envelope.name = rdr["Name"].ToString();
                envelopes.Add(envelope);
            }
            con.Close();
        }
        JavaScriptSerializer js = new JavaScriptSerializer();
        Context.Response.Write(js.Serialize(envelopes));

        Employer employer = new Employer();
        employer.name = "Gumpy's Ice Cream";
        employer.type = EmployerType.FixedIncome;
        employer.netPay = 250;
        employer.payPeriod = new Period();
        employer.payPeriod.frequency = Frequency.BiWeekly;
        employer.payPeriod.dayOfWeek = DayOfWeek.Friday;
        employer.payPeriod.periodStart = new DateTime(2017, 1, 13);

        //double weeks = (DateTime.Now.Date - employer.payPeriod.periodStart).TotalDays / 7;

        List<DateTime> dates = employer.payPeriod.GetDates(new DateTime(2017, 2, 8), new DateTime(2017, 3, 12));
    }
}
public struct Envelopez
{
    public int id { get; set; }
    public string name { get; set; }

}
