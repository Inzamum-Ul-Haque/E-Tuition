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
    public class TeacherController : ControllerBase
    {

        private readonly IConfiguration configuration;

        public TeacherController(IConfiguration config)
        {
            this.configuration = config;
        }

        [HttpPost]
        [ActionName("teacherlogin")]
        public string teacherlogin(Teacher teacher)
        {
            string connectionstring = configuration.GetConnectionString("DefaultConnectionString");
            SqlConnection connection = new SqlConnection(connectionstring);
            connection.Open();

            string query = @"select * from Teacher where Email =@Email and Password =@Password ";
            SqlCommand cmd = new SqlCommand(query, connection);
            cmd.Parameters.Add(new SqlParameter("@Email", teacher.Email));
            cmd.Parameters.Add(new SqlParameter("@Password", teacher.Password));
            int rr = 0;

            SqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                rr = 1;

            }

            connection.Close();
            return rr > 0 ? RandomString(10) : "";
        }



        [HttpPost]
        [ActionName("teacherregister")]
        public string teacherregister(Teacher teacher)
        {
            string connectionstring = configuration.GetConnectionString("DefaultConnectionString");
            SqlConnection connection = new SqlConnection(connectionstring);
            connection.Open();

            string query1 = "select Email from Teacher where Email =@Email";
            SqlCommand cmd1 = new SqlCommand(query1, connection);
            cmd1.Parameters.Add(new SqlParameter("@Email", teacher.Email));

            SqlDataReader reader = cmd1.ExecuteReader();


            int rr = 1;
            while (reader.Read())
            {
                rr = 0;
            }
            if (rr == 0)
            {
                return "";
            }
            else
            {
                connection.Close();
                connection.Open();
                string query = "insert into Teacher (FirstName,LastName,Email,Phone,Password,TeachingExp,Cv,Facebook,Linkedin,AboutDetails)" +
                    "values(@FirstName,@LastName,@Email,@Phone,@Password,@TeachingExp,@Cv,@Facebook,@Linkedin,@AboutDetails)";
                SqlCommand cmd = new SqlCommand(query, connection);

                cmd.Parameters.Add(new SqlParameter("@FirstName", teacher.FirstName));
                cmd.Parameters.Add(new SqlParameter("@LastName", teacher.LastName));
                cmd.Parameters.Add(new SqlParameter("@Email", teacher.Email));
                cmd.Parameters.Add(new SqlParameter("@Phone", teacher.Phone));
                cmd.Parameters.Add(new SqlParameter("@Password", teacher.Password));
                cmd.Parameters.Add(new SqlParameter("@TeachingExp", teacher.TeachingExp));
                cmd.Parameters.Add(new SqlParameter("@Cv", teacher.Cv));
                cmd.Parameters.Add(new SqlParameter("@Facebook", teacher.Facebook));
                cmd.Parameters.Add(new SqlParameter("@Linkedin", teacher.Linkedin));
                cmd.Parameters.Add(new SqlParameter("@AboutDetails", teacher.AboutDetails));

                int noOfRowsAffected = cmd.ExecuteNonQuery();
                connection.Close();
                return noOfRowsAffected > 0 ? RandomString(10) : "";


            }

        }

        [HttpPost]
        [ActionName("tc")]
        public int tc([FromBody] int i)
        {
            string connectionstring = configuration.GetConnectionString("DefaultConnectionString");
            SqlConnection connection = new SqlConnection(connectionstring);
            connection.Open();
            SqlCommand comm = new SqlCommand("SELECT COUNT(*) FROM Course where TeacherID=@TeacherID", connection);
            comm.Parameters.Add(new SqlParameter("@TeacherID",i));
            int t = Convert.ToInt32(comm.ExecuteScalar());
            connection.Close();

            return t;


        }



        [HttpPost]
        [ActionName("teacherupdate")]
        public string teacherupdate(Teacher teacher)
        {
            string connectionstring = configuration.GetConnectionString("DefaultConnectionString");
            SqlConnection connection = new SqlConnection(connectionstring);
            connection.Open();

            string query = @"Update Teacher Set FirstName=@FirstName, LastName=@LastName, Phone=@Phone, Password=@Password,TeachingExp=@TeachingExp, Facebook=@Facebook, Linkedin=@Linkedin, AboutDetails=@AboutDetails, ImgName=@ImgName  where Email =@Email";
            SqlCommand cmd = new SqlCommand(query, connection);


            cmd.Parameters.Add(new SqlParameter("@FirstName", teacher.FirstName));
            cmd.Parameters.Add(new SqlParameter("@LastName", teacher.LastName));
            cmd.Parameters.Add(new SqlParameter("@Email", teacher.Email));
            cmd.Parameters.Add(new SqlParameter("@Phone", teacher.Phone));
            cmd.Parameters.Add(new SqlParameter("@Password", teacher.Password));
            cmd.Parameters.Add(new SqlParameter("@TeachingExp", teacher.TeachingExp));
            //cmd.Parameters.Add(new SqlParameter("@Cv", teacher.Cv));
            cmd.Parameters.Add(new SqlParameter("@Facebook", teacher.Facebook));
            cmd.Parameters.Add(new SqlParameter("@Linkedin", teacher.Linkedin));
            cmd.Parameters.Add(new SqlParameter("@AboutDetails", teacher.AboutDetails));
            cmd.Parameters.Add(new SqlParameter("@ImgName", teacher.ImgName));

            int noOfRowsAffected = cmd.ExecuteNonQuery();
            connection.Close();
            return noOfRowsAffected > 0 ? RandomString(10) : "";

        }


        [HttpPost]
        [ActionName("getteacher")]
        public IEnumerable<Teacher> getteacher(Teacher teacher2)
        {

            Teacher teacher1 = new Teacher();
            string connectionstring = configuration.GetConnectionString("DefaultConnectionString");
            SqlConnection connection = new SqlConnection(connectionstring);
            connection.Open();

            string query = @"select * from Teacher where Email =@Email";
            SqlCommand cmd = new SqlCommand(query, connection);
            cmd.Parameters.Add(new SqlParameter("@Email", teacher2.Email));

            SqlDataReader reader = cmd.ExecuteReader();



            while (reader.Read())
            {
                teacher1.Id = Convert.ToInt32(reader["TeacherID"]);
                teacher1.FirstName = reader["FirstName"].ToString();
                teacher1.LastName = reader["LastName"].ToString();
                teacher1.Email = reader["Email"].ToString();
                teacher1.Phone = reader["Phone"].ToString();
                teacher1.Password = reader["Password"].ToString();
                teacher1.TeachingExp = reader["TeachingExp"].ToString();
               // teacher1.Cv = reader["Cv"].ToString();
                teacher1.Facebook = reader["Facebook"].ToString();
                teacher1.Linkedin = reader["Linkedin"].ToString();
                teacher1.AboutDetails = reader["AboutDetails"].ToString();
                teacher1.ImgName = reader["ImgName"].ToString();
                teacher1.Verification = reader["Verification"].ToString();
            }


            connection.Close();

            reader.Close();

            return Enumerable.Range(1, 1).Select(index => new Teacher
            {
                Id = teacher1.Id,
                FirstName = teacher1.FirstName,
                LastName = teacher1.LastName,
                Email = teacher1.Email,
                Phone = teacher1.Phone,
                TeachingExp = teacher1.TeachingExp,
                Password = teacher1.Password,
                Facebook = teacher1.Facebook,
                Linkedin = teacher1.Linkedin,
                AboutDetails = teacher1.AboutDetails,
                Verification = teacher1.Verification,
                ImgName = teacher1.ImgName

            }).ToArray();

        }


        [HttpPost]
        [ActionName("getpayment")]
        public IEnumerable<StudentPayment> getpayment([FromBody] int id)
        {


            List<int> ids = new List<int>();
            List<string> tnames = new List<string>();
            List<string> cnames = new List<string>();
            List<string> phones = new List<string>();
            List<string> fees = new List<string>();
            List<string> pmss = new List<string>();

            StudentPayment sp = new StudentPayment();
            string connectionstring = configuration.GetConnectionString("DefaultConnectionString");
            SqlConnection connection = new SqlConnection(connectionstring);
            connection.Open();

            string query = @"select Teacher.FirstName,PurchaseCourse.CourseName,Teacher.Phone,PurchaseCourse.CourseFee,PurchaseCourse.PaymentMethod from Teacher inner join PurchaseCourse on Teacher.TeacherID= PurchaseCourse.TeacherId where PurchaseCourse.TeacherId=@TeacherId";
            SqlCommand cmd = new SqlCommand(query, connection);
            cmd.Parameters.Add(new SqlParameter("@TeacherId", id));

            SqlDataReader reader = cmd.ExecuteReader();

            int m = 0;
            //sudo
            while (reader.Read())
            {
                m++;
                ids.Add(m);
                tnames.Add(reader["FirstName"].ToString());
                cnames.Add(reader["CourseName"].ToString());
                phones.Add(reader["Phone"].ToString());
                fees.Add(reader["CourseFee"].ToString());
                pmss.Add(reader["PaymentMethod"].ToString());

            }


            connection.Close();

            reader.Close();

            return Enumerable.Range(1, m).Select(index => new StudentPayment
            {
                PaymentId = ids.ElementAt(index - 1),
                TeacherName = tnames.ElementAt(index - 1),
                CourseName = cnames.ElementAt(index - 1),
                Phone = phones.ElementAt(index - 1),
                CourseFee = fees.ElementAt(index - 1),
                PaymentMethod = pmss.ElementAt(index - 1)


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
