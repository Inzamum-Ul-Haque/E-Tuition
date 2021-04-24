using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Data;

namespace e_tuition.Controllers
{

    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ResourceController : ControllerBase
    {

        private readonly IConfiguration configuration;

        public ResourceController(IConfiguration config)
        {
            this.configuration = config;
        }



        [HttpPost]
        [ActionName("createresource")]
        public string createresource(Resource resource)
        {
            string connectionstring = configuration.GetConnectionString("DefaultConnectionString");
            SqlConnection connection = new SqlConnection(connectionstring);

            connection.Open();
            string query = "insert into Resource (CourseID,ResourceType,ResourceDetails,ResourceLink)" +
                    "values(@CourseID,@ResourceType,@ResourceDetails,@ResourceLink)";
            SqlCommand cmd = new SqlCommand(query, connection);

            cmd.Parameters.Add(new SqlParameter("@CourseID", resource.CourseId));
            cmd.Parameters.Add(new SqlParameter("@ResourceType", resource.ResourceType));
            cmd.Parameters.Add(new SqlParameter("@ResourceLink", resource.ResourceLink));
            cmd.Parameters.Add(new SqlParameter("@ResourceDetails", resource.ResourceDetails));

            int noOfRowsAffected = cmd.ExecuteNonQuery();
            connection.Close();
            return noOfRowsAffected > 0 ? RandomString(10) : "";

        }

        

        [HttpPost]
        [ActionName("getresource")]
        public IEnumerable<Resource> getresource([FromBody] int id)
        {


            List<int> ids = new List<int>();
            List<string> cid = new List<string>();
            List<string> restype = new List<string>();
            List<string> resdetails = new List<string>();
            List<string> reslinks = new List<string>();
            List<string> resdate = new List<string>();
            


            string connectionstring = configuration.GetConnectionString("DefaultConnectionString");
            SqlConnection connection = new SqlConnection(connectionstring);
            connection.Open();

            string query = @"select * from Resource where CourseID=@CourseID";
            SqlCommand cmd = new SqlCommand(query, connection);
            cmd.Parameters.Add(new SqlParameter("@CourseId", id));


            SqlDataReader reader = cmd.ExecuteReader();



            while (reader.Read())
            {

                ids.Add(Convert.ToInt32(reader["ResourceID"]));
                cid.Add(reader["CourseID"].ToString());
                restype.Add(reader["ResourceType"].ToString());
                resdetails.Add(reader["ResourceDetails"].ToString());
                reslinks.Add(reader["ResourceLink"].ToString());
                resdate.Add(reader["ResourceDate"].ToString());

            }


            connection.Close();

            reader.Close();

            return Enumerable.Range(1, ids.Count).Select(index => new Resource
            {
                ResourceId = ids.ElementAt(index - 1),
                CourseId = cid.ElementAt(index - 1),
                ResourceType = restype.ElementAt(index - 1),
                ResourceDetails = resdetails.ElementAt(index - 1),
                ResourceLink = reslinks.ElementAt(index - 1),
                ResourceDate = resdate.ElementAt(index - 1)

            }).ToArray();

        }



        [HttpPost]
        [ActionName("createfileresource")]
        public string createfileresource(Resource resource)
        {
            string connectionstring = configuration.GetConnectionString("DefaultConnectionString");
            SqlConnection connection = new SqlConnection(connectionstring);

            connection.Open();
            string query = "insert into FileResource (CourseID,ResourceType,ResourceDetails)" +
                    "values(@CourseID,@ResourceType,@ResourceDetails)";
            SqlCommand cmd = new SqlCommand(query, connection);

            cmd.Parameters.Add(new SqlParameter("@CourseID", resource.CourseId));
            cmd.Parameters.Add(new SqlParameter("@ResourceType", resource.ResourceType));
            cmd.Parameters.Add(new SqlParameter("@ResourceDetails", resource.ResourceDetails));

            int noOfRowsAffected = cmd.ExecuteNonQuery();
            connection.Close();
            return noOfRowsAffected > 0 ? RandomString(10) : "";

        }

        [HttpPost]
        [ActionName("getfileresource")]
        public IEnumerable<Resource> getfileresource([FromBody] int id)
        {


            List<int> ids = new List<int>();
            List<string> cid = new List<string>();
            List<string> restype = new List<string>();
            List<string> resdetails = new List<string>();
            List<string> resdate = new List<string>();



            string connectionstring = configuration.GetConnectionString("DefaultConnectionString");
            SqlConnection connection = new SqlConnection(connectionstring);
            connection.Open();

            string query = @"select * from FileResource where CourseID=@CourseID";
            SqlCommand cmd = new SqlCommand(query, connection);
            cmd.Parameters.Add(new SqlParameter("@CourseId", id));


            SqlDataReader reader = cmd.ExecuteReader();



            while (reader.Read())
            {

                ids.Add(Convert.ToInt32(reader["ResourceID"]));
                cid.Add(reader["CourseID"].ToString());
                restype.Add(reader["ResourceType"].ToString());
                resdetails.Add(reader["ResourceDetails"].ToString());
                resdate.Add(reader["ResourceDate"].ToString());

            }


            connection.Close();

            reader.Close();

            return Enumerable.Range(1, ids.Count).Select(index => new Resource
            {
                ResourceId = ids.ElementAt(index - 1),
                CourseId = cid.ElementAt(index - 1),
                ResourceType = restype.ElementAt(index - 1),
                ResourceDetails = resdetails.ElementAt(index - 1),
                ResourceDate = resdate.ElementAt(index - 1)

            }).ToArray();

        }






        private static Random random = new Random();
        public static string RandomString(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
              .Select(s => s[random.Next(s.Length)]).ToArray());
        }




    }
}
