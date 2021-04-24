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
    public class StudentController : ControllerBase
    {

        private readonly IConfiguration configuration;

        public StudentController(IConfiguration config)
        {
            this.configuration = config;
        }

        [HttpPost]
        [ActionName("studentlogin")]
        public string studentlogin(Student student)
        {
            string connectionstring = configuration.GetConnectionString("DefaultConnectionString");
            SqlConnection connection = new SqlConnection(connectionstring);
            connection.Open();

            string query = @"select * from Student where Email =@Email and Password =@Password ";
            SqlCommand cmd = new SqlCommand(query, connection);
            cmd.Parameters.Add(new SqlParameter("@Email", student.Email));
            cmd.Parameters.Add(new SqlParameter("@Password", student.Password));
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
        [ActionName("studentregister")]
        public string studentregister(Student student)
        {
            string connectionstring = configuration.GetConnectionString("DefaultConnectionString");
            SqlConnection connection = new SqlConnection(connectionstring);
            connection.Open();

            string query1 = "select Email from Student where Email =@Email";
            SqlCommand cmd1 = new SqlCommand(query1, connection);
            cmd1.Parameters.Add(new SqlParameter("@Email", student.Email));

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
                string query = "insert into Student (Name,Email,Phone,Password,Address,Age,Institution)values(@Name,@Email,@phone,@Password,@Address,@Age,@Institution)";
                SqlCommand cmd = new SqlCommand(query, connection);

                cmd.Parameters.Add(new SqlParameter("@Name", student.Name));
                cmd.Parameters.Add(new SqlParameter("@Email", student.Email));
                cmd.Parameters.Add(new SqlParameter("@Phone", student.Phone));
                cmd.Parameters.Add(new SqlParameter("@Password", student.Password));
                cmd.Parameters.Add(new SqlParameter("@Address", student.Address));
                cmd.Parameters.Add(new SqlParameter("@Age", student.Age));
                cmd.Parameters.Add(new SqlParameter("@Institution", student.Institution));

                int noOfRowsAffected = cmd.ExecuteNonQuery();
                connection.Close();
                return noOfRowsAffected > 0 ? RandomString(10) : "";

            }

        }

        [HttpPost]
        [ActionName("studentupdate")]
        public string studentupdate(Student student)
        {
            string connectionstring = configuration.GetConnectionString("DefaultConnectionString");
            SqlConnection connection = new SqlConnection(connectionstring);
            connection.Open();

            string query = @"Update Student Set Name=@Name, Phone=@Phone, Password=@Password, Address=@Address, Age=@Age, Institution=@Institution, ImgName=@ImgName  where Email =@Email";
            SqlCommand cmd = new SqlCommand(query, connection);


            cmd.Parameters.Add(new SqlParameter("@Name", student.Name));
            cmd.Parameters.Add(new SqlParameter("@Email", student.Email));
            cmd.Parameters.Add(new SqlParameter("@Phone", student.Phone));
            cmd.Parameters.Add(new SqlParameter("@Password", student.Password));
            cmd.Parameters.Add(new SqlParameter("@Address", student.Address));
            cmd.Parameters.Add(new SqlParameter("@Age", student.Age));
            cmd.Parameters.Add(new SqlParameter("@Institution", student.Institution));
            cmd.Parameters.Add(new SqlParameter("@ImgName", student.ImgName));

            int noOfRowsAffected = cmd.ExecuteNonQuery();
            connection.Close();
            return noOfRowsAffected > 0 ? RandomString(10) : "";

        }

        [HttpPost]
        [ActionName("tc")]
        public int tc([FromBody] int i)
        {
            string connectionstring = configuration.GetConnectionString("DefaultConnectionString");
            SqlConnection connection = new SqlConnection(connectionstring);
            connection.Open();
            SqlCommand comm = new SqlCommand("SELECT COUNT(*) FROM Enroll where StudentId=@StudentId", connection);
            comm.Parameters.Add(new SqlParameter("@StudentId", i));
            int t = Convert.ToInt32(comm.ExecuteScalar());
            connection.Close();

            return t;


        }

        [HttpPost]
        [ActionName("getstudent")]
        public IEnumerable<Student> getstudent(Student student2)
        {

            Student student1 = new Student();
            string connectionstring = configuration.GetConnectionString("DefaultConnectionString");
            SqlConnection connection = new SqlConnection(connectionstring);
            connection.Open();

            string query = @"select * from Student where Email =@Email";
            SqlCommand cmd = new SqlCommand(query, connection);
            cmd.Parameters.Add(new SqlParameter("@Email", student2.Email));

            SqlDataReader reader = cmd.ExecuteReader();



            while (reader.Read())
            {
                student1.Id = Convert.ToInt32(reader["StudentID"]);
                student1.Name = reader["Name"].ToString();
                student1.Email = reader["Email"].ToString();
                student1.Phone = reader["Phone"].ToString();
                student1.Password = reader["Password"].ToString();
                student1.Address = reader["Address"].ToString();
                student1.Age = reader["Age"].ToString();
                student1.Institution = reader["Institution"].ToString();
                student1.ImgName= reader["ImgName"].ToString();
            }


            connection.Close();

            reader.Close();

            return Enumerable.Range(1, 1).Select(index => new Student
            {
                Id = student1.Id,
                Name = student1.Name,
                Email = student1.Email,
                Phone = student1.Phone,
                Password = student1.Password,
                Address = student1.Address,
                Age = student1.Age,
                Institution = student1.Institution,
                ImgName=student1.ImgName

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

            string query = @"select Teacher.FirstName,PurchaseCourse.CourseName,Teacher.Phone,PurchaseCourse.CourseFee,PurchaseCourse.PaymentMethod from Teacher inner join PurchaseCourse on Teacher.TeacherID= PurchaseCourse.TeacherId where PurchaseCourse.StudentId=@StudentId";
            SqlCommand cmd = new SqlCommand(query, connection);
            cmd.Parameters.Add(new SqlParameter("@StudentId", id));

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
