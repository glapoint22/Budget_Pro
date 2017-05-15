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
        DataTable listTable = new DataTable();
        DataColumn column;
        DataRow row;


        //-------------Employers----------------
        //employerID
        column = new DataColumn();
        column.DataType = Type.GetType("System.Guid");
        column.ColumnName = "ID";
        column.Unique = false;
        listTable.Columns.Add(column);

        //name
        column = new DataColumn();
        column.DataType = Type.GetType("System.String");
        column.ColumnName = "name";
        column.Unique = false;
        listTable.Columns.Add(column);


        //incomeType
        column = new DataColumn();
        column.DataType = Type.GetType("System.Int32");
        column.ColumnName = "type";
        column.Unique = false;
        listTable.Columns.Add(column);


        //netPay
        column = new DataColumn();
        column.DataType = Type.GetType("System.Decimal");
        column.ColumnName = "currency";
        column.Unique = false;
        listTable.Columns.Add(column);


        //freq
        column = new DataColumn();
        column.DataType = Type.GetType("System.Int32");
        column.ColumnName = "freq";
        column.Unique = false;
        listTable.Columns.Add(column);


        //dayOfWeek
        column = new DataColumn();
        column.DataType = Type.GetType("System.Int32");
        column.ColumnName = "dayOfWeek";
        column.Unique = false;
        listTable.Columns.Add(column);


        //dayOfMonth1
        column = new DataColumn();
        column.DataType = Type.GetType("System.Int32");
        column.ColumnName = "dayOfMonth1";
        column.Unique = false;
        listTable.Columns.Add(column);


        //dayOfMonth2
        column = new DataColumn();
        column.DataType = Type.GetType("System.Int32");
        column.ColumnName = "dayOfMonth2";
        column.Unique = false;
        listTable.Columns.Add(column);


        //month1
        column = new DataColumn();
        column.DataType = Type.GetType("System.Int32");
        column.ColumnName = "month1";
        column.Unique = false;
        listTable.Columns.Add(column);


        //month2
        column = new DataColumn();
        column.DataType = Type.GetType("System.Int32");
        column.ColumnName = "month2";
        column.Unique = false;
        listTable.Columns.Add(column);


        //periodStart
        column = new DataColumn();
        column.DataType = Type.GetType("System.DateTime");
        column.ColumnName = "periodStart";
        column.Unique = false;
        listTable.Columns.Add(column);



        //list Type
        column = new DataColumn();
        column.DataType = Type.GetType("System.Int32");
        column.ColumnName = "listType";
        column.Unique = false;
        listTable.Columns.Add(column);













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
            

            //Employers
            for (int i = 0; i < employers.Length; i++)
            {
                BudgetItem employer = js.Deserialize<BudgetItem>(employers[i]);
                row = listTable.NewRow();
                row["ID"] = Guid.NewGuid();
                row["name"] = employer.name;
                row["type"] = employer.type;
                row["currency"] = employer.currency;
                row["freq"] = employer.period.frequency;
                row["dayOfWeek"] = employer.period.dayOfWeek;
                row["dayOfMonth1"] = employer.period.dayOfMonth1;
                row["dayOfMonth2"] = employer.period.dayOfMonth2;
                row["month1"] = employer.period.month1;
                row["month2"] = employer.period.month2;
                row["periodStart"] = employer.period.periodStart;
                row["listType"] = 0;
                listTable.Rows.Add(row);
            }
            





            //Envelopes
            for (int i = 0; i < envelopes.Length; i++)
            {
                BudgetItem envelope = js.Deserialize<BudgetItem>(envelopes[i]);
                row = listTable.NewRow();
                row["ID"] = Guid.NewGuid();
                row["name"] = envelope.name;
                row["type"] = envelope.type;
                row["currency"] = envelope.currency;
                row["freq"] = envelope.period.frequency;
                row["dayOfWeek"] = envelope.period.dayOfWeek;
                row["dayOfMonth1"] = envelope.period.dayOfMonth1;
                row["dayOfMonth2"] = envelope.period.dayOfMonth2;
                row["month1"] = envelope.period.month1;
                row["month2"] = envelope.period.month2;
                row["periodStart"] = envelope.period.periodStart;
                row["listType"] = 1;
                listTable.Rows.Add(row);
            }
            SqlParameter listParams = cmd.Parameters.AddWithValue("@list", listTable);
            listParams.SqlDbType = SqlDbType.Structured;


            try
            {
                cmd.ExecuteNonQuery();
            }
            catch (SqlException ex)
            {
                Context.Response.StatusCode = 500;
                if (ex.Number == 2627)
                {
                    Context.Response.StatusDescription = "The email address you entered is already regestered.";
                }
                else
                {
                    Context.Response.StatusDescription = ex.Message;
                }
                
            }
            finally
            {
                con.Close();
            }

            
        }
    }
}
