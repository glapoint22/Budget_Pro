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
                envelopes.Add(envelope);
            }
            con.Close();
        }
        JavaScriptSerializer js = new JavaScriptSerializer();
        Context.Response.Write(js.Serialize(envelopes));
    }
}
public struct Envelope
{
    public int id { get; set; }
    public string name { get; set; }

}
