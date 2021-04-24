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
    public class AdminController : ControllerBase
    {

        private readonly IConfiguration configuration;
        public AdminController(IConfiguration config)
        {
            this.configuration = config;
        }


        public class TotalCount
        {
            public int S { get; set; }
            public int C { get; set; }
            public int T { get; set; }
            
        }

        [HttpGet]
        [ActionName("tc")]
        public IEnumerable<TotalCount> tc() {
            string connectionstring = configuration.GetConnectionString("DefaultConnectionString");
            SqlConnection connection = new SqlConnection(connectionstring);
            connection.Open();
            SqlCommand comm = new SqlCommand("SELECT COUNT(*) FROM Teacher", connection);
            int t= Convert.ToInt32(comm.ExecuteScalar());
            connection.Close();

            
            connection.Open();
            comm = new SqlCommand("SELECT COUNT(*) FROM Student", connection);
            int s = (Int32)comm.ExecuteScalar();
            connection.Close();

            connection.Open();
            comm = new SqlCommand("SELECT COUNT(*) FROM Course", connection);
            int c = (Int32)comm.ExecuteScalar();
            connection.Close();

           

            return Enumerable.Range(1, 1).Select(index => new TotalCount
            {
                S = s,
                C = c,
                T = t
                
            }).ToArray();


        }


        [HttpPost]
        [ActionName("adminlogin")]
        public string adminlogin(Admin admin)
        {
            string connectionstring = configuration.GetConnectionString("DefaultConnectionString");
            SqlConnection connection = new SqlConnection(connectionstring);
            connection.Open();

            string query = @"select * from Admin where Email =@Email and Password =@Password ";
            SqlCommand cmd = new SqlCommand(query, connection);
            cmd.Parameters.Add(new SqlParameter("@Email", admin.Email));
            cmd.Parameters.Add(new SqlParameter("@Password", admin.Password));
            int rr = 0;

            SqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                rr = 1;
            }
            connection.Close();
            return rr > 0 ? RandomString(10) : "";


        }


        [HttpGet]
        [ActionName("cv")]
        public IEnumerable<Teacher> cv()
        {


            List<int> ids = new List<int>();
            List<string> names = new List<string>();
            List<string> emails = new List<string>();
            List<string> cvs = new List<string>();
            List<string> veris = new List<string>();




            string connectionstring = configuration.GetConnectionString("DefaultConnectionString");
            SqlConnection connection = new SqlConnection(connectionstring);
            connection.Open();

            string query = @"select * from Teacher where Verification=@Verification";
            SqlCommand cmd = new SqlCommand(query, connection);

            cmd.Parameters.Add(new SqlParameter("@Verification", "Unverified"));


            SqlDataReader reader = cmd.ExecuteReader();



            while (reader.Read())
            {

                ids.Add(Convert.ToInt32(reader["TeacherID"]));
                names.Add(reader["FirstName"].ToString());
                emails.Add(reader["Email"].ToString());
                cvs.Add(reader["CV"].ToString());
                veris.Add(reader["Verification"].ToString());
                

            }


            connection.Close();

            reader.Close();

            return Enumerable.Range(1, ids.Count).Select(index => new Teacher
            {
                Id = ids.ElementAt(index - 1),
                FirstName = names.ElementAt(index - 1),
                Email = emails.ElementAt(index - 1),
                Cv = cvs.ElementAt(index - 1),
                Verification = veris.ElementAt(index - 1),
                


            }).ToArray();

        }



        [HttpPost]
        [ActionName("handlecv")]
        public string handlecv([FromBody] int id)
        {
            string connectionstring = configuration.GetConnectionString("DefaultConnectionString");
            SqlConnection connection = new SqlConnection(connectionstring);
            connection.Open();

            string query = @"Update Teacher set Verification=@Verification where TeacherID=@TeacherID";
            SqlCommand cmd = new SqlCommand(query, connection);

            cmd.Parameters.Add(new SqlParameter("@TeacherID", id));
            cmd.Parameters.Add(new SqlParameter("@Verification", "Verified"));


            int noOfRowsAffected = cmd.ExecuteNonQuery();

            connection.Close();
            return noOfRowsAffected > 0 ? RandomString(10) : "";

        }



        [HttpGet]
        [ActionName("postrequest")]
        public IEnumerable<Course> postrequest()
        {


            List<int> ids = new List<int>();
            List<string> names = new List<string>();
            List<string> levels = new List<string>();
            List<string> classes = new List<string>();
            List<string> times = new List<string>();
            List<string> fees = new List<string>();
            List<string> descs = new List<string>();
            List<string> posts = new List<string>();
            List<string> ctid = new List<string>();
            List<string> ctname = new List<string>();
            List<string> cdate = new List<string>();
            List<string> cpub = new List<string>();
            


            string connectionstring = configuration.GetConnectionString("DefaultConnectionString");
            SqlConnection connection = new SqlConnection(connectionstring);
            connection.Open();

            string query = @"select * from Course where CoursePublished=@CoursePublished";
            SqlCommand cmd = new SqlCommand(query, connection);

            cmd.Parameters.Add(new SqlParameter("@CoursePublished", "Unpublished"));


            SqlDataReader reader = cmd.ExecuteReader();



            while (reader.Read())
            {

                ids.Add(Convert.ToInt32(reader["CourseID"]));
                names.Add(reader["CourseName"].ToString());
                levels.Add(reader["CourseLevel"].ToString());
                classes.Add(reader["CourseClass"].ToString());
                times.Add(reader["CourseTime"].ToString());
                fees.Add(reader["CourseID"].ToString());
                descs.Add(reader["CourseID"].ToString());
                posts.Add(reader["CoursePost"].ToString());
                ctid.Add(reader["TeacherID"].ToString());
                ctname.Add(reader["TeacherName"].ToString());
                cdate.Add(reader["CourseCreatedDate"].ToString());
                cpub.Add(reader["CoursePublished"].ToString());

            }


            connection.Close();

            reader.Close();

            return Enumerable.Range(1, ids.Count).Select(index => new Course
            {
                CourseId = ids.ElementAt(index - 1),
                CourseName = names.ElementAt(index - 1),
                CourseLevel = levels.ElementAt(index - 1),
                CourseClass = classes.ElementAt(index - 1),
                CourseTime = times.ElementAt(index - 1),
                CourseFee = fees.ElementAt(index - 1),
                CourseDescription = descs.ElementAt(index - 1),
                CoursePost = posts.ElementAt(index - 1),
                TeacherID = ctid.ElementAt(index - 1),
                TeacherName = ctname.ElementAt(index - 1),
                CourseCreatedDate = cdate.ElementAt(index - 1),
                CoursePublished = cpub.ElementAt(index - 1)


            }).ToArray();

        }

        [HttpPost]
        [ActionName("handlepostrequest")]
        public string handlepostrequest([FromBody] int id)
        {
            string connectionstring = configuration.GetConnectionString("DefaultConnectionString");
            SqlConnection connection = new SqlConnection(connectionstring);
            connection.Open();

            string query = @"Update Course set CoursePublished=@CoursePublished where CourseID=@CourseID";
            SqlCommand cmd = new SqlCommand(query, connection);

            cmd.Parameters.Add(new SqlParameter("@CourseID", id));
            cmd.Parameters.Add(new SqlParameter("@CoursePublished", "Published"));


            int noOfRowsAffected = cmd.ExecuteNonQuery();

            connection.Close();
            return noOfRowsAffected > 0 ? RandomString(10) : "";

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
