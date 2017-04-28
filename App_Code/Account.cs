using System;
using System.Web.Services;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Web.Script.Serialization;

/// <summary>
/// Summary description for Account
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class Account : WebService
{
    [WebMethod]
    public void CreateAccount(string user, string[] employers, string[] envelopes)
    {
        JavaScriptSerializer js = new JavaScriptSerializer();
        DataTable employersTable = new DataTable();
        DataTable envelopesTable = new DataTable();
        DataColumn column;
        DataRow row;


        //-------------Employers----------------
        //employerID
        column = new DataColumn();
        column.DataType = Type.GetType("System.Guid");
        column.ColumnName = "employerID";
        column.Unique = false;
        employersTable.Columns.Add(column);

        //name
        column = new DataColumn();
        column.DataType = Type.GetType("System.String");
        column.ColumnName = "name";
        column.Unique = false;
        employersTable.Columns.Add(column);


        //incomeType
        column = new DataColumn();
        column.DataType = Type.GetType("System.Int32");
        column.ColumnName = "incomeType";
        column.Unique = false;
        employersTable.Columns.Add(column);


        //netPay
        column = new DataColumn();
        column.DataType = Type.GetType("System.Decimal");
        column.ColumnName = "netPay";
        column.Unique = false;
        employersTable.Columns.Add(column);


        //freq
        column = new DataColumn();
        column.DataType = Type.GetType("System.Int32");
        column.ColumnName = "freq";
        column.Unique = false;
        employersTable.Columns.Add(column);


        //dayOfWeek
        column = new DataColumn();
        column.DataType = Type.GetType("System.Int32");
        column.ColumnName = "dayOfWeek";
        column.Unique = false;
        employersTable.Columns.Add(column);


        //dayOfMonth1
        column = new DataColumn();
        column.DataType = Type.GetType("System.Int32");
        column.ColumnName = "dayOfMonth1";
        column.Unique = false;
        employersTable.Columns.Add(column);


        //dayOfMonth2
        column = new DataColumn();
        column.DataType = Type.GetType("System.Int32");
        column.ColumnName = "dayOfMonth2";
        column.Unique = false;
        employersTable.Columns.Add(column);


        //month1
        column = new DataColumn();
        column.DataType = Type.GetType("System.Int32");
        column.ColumnName = "month1";
        column.Unique = false;
        employersTable.Columns.Add(column);


        //month2
        column = new DataColumn();
        column.DataType = Type.GetType("System.Int32");
        column.ColumnName = "month2";
        column.Unique = false;
        employersTable.Columns.Add(column);


        //periodStart
        column = new DataColumn();
        column.DataType = Type.GetType("System.DateTime");
        column.ColumnName = "periodStart";
        column.Unique = false;
        employersTable.Columns.Add(column);









        //----------------Envelopes-------------------
        //name
        column = new DataColumn();
        column.DataType = Type.GetType("System.String");
        column.ColumnName = "name";
        column.Unique = false;
        envelopesTable.Columns.Add(column);


        //Envelope Type
        column = new DataColumn();
        column.DataType = Type.GetType("System.Int32");
        column.ColumnName = "envelopeType";
        column.Unique = false;
        envelopesTable.Columns.Add(column);


        //Amount
        column = new DataColumn();
        column.DataType = Type.GetType("System.Decimal");
        column.ColumnName = "amount";
        column.Unique = false;
        envelopesTable.Columns.Add(column);



        string cs = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
        using (SqlConnection con = new SqlConnection(cs))
        {
            con.Open();

            SqlCommand cmd = new SqlCommand("CreateAccount", con);
            cmd.CommandType = CommandType.StoredProcedure;

            User u = js.Deserialize<User>(user);

            //First Name
            cmd.Parameters.Add("@fname", SqlDbType.VarChar, 30).Value = u.firstName;

            //Last Name
            cmd.Parameters.Add("@lname", SqlDbType.VarChar, 30).Value = u.lastName;

            //Email
            cmd.Parameters.Add("@email", SqlDbType.VarChar, 30).Value = u.email;

            //Password
            cmd.Parameters.Add("@pword", SqlDbType.VarChar, 30).Value = u.password;
            

            //Add rows to the employers table
            for (int i = 0; i < employers.Length; i++)
            {
                Employer employer = js.Deserialize<Employer>(employers[i]);
                row = employersTable.NewRow();
                row["employerID"] = Guid.NewGuid();
                row["name"] = employer.name;
                row["incomeType"] = employer.incomeType;
                row["netPay"] = employer.netPay;
                row["freq"] = employer.payPeriod.frequency;
                row["dayOfWeek"] = employer.payPeriod.dayOfWeek;
                row["dayOfMonth1"] = employer.payPeriod.dayOfMonth1;
                row["dayOfMonth2"] = employer.payPeriod.dayOfMonth2;
                row["month1"] = employer.payPeriod.month1;
                row["month2"] = employer.payPeriod.month2;
                row["periodStart"] = employer.payPeriod.periodStart;
                employersTable.Rows.Add(row);
            }
            SqlParameter employerParams = cmd.Parameters.AddWithValue("@employerList", employersTable);
            employerParams.SqlDbType = SqlDbType.Structured;





            //Add rows to the envelopes table
            for (int i = 0; i < envelopes.Length; i++)
            {
                Envelope envelope = js.Deserialize<Envelope>(envelopes[i]);
                row = envelopesTable.NewRow();
                row["name"] = envelope.name;
                row["envelopeType"] = envelope.envelopeType;
                row["amount"] = envelope.amount;
                envelopesTable.Rows.Add(row);
            }
            SqlParameter envelopeParams = cmd.Parameters.AddWithValue("@envelopeList", envelopesTable);
            envelopeParams.SqlDbType = SqlDbType.Structured;



            cmd.ExecuteNonQuery();

            con.Close();
        }
    }
}
