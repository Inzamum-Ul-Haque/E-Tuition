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
    public class CourseController : ControllerBase
    {

        private readonly IConfiguration configuration;

        public CourseController(IConfiguration config)
        {
            this.configuration = config;
        }



        [HttpPost]
        [ActionName("createcourse")]
        public string createcourse(Course course)
        {
            string connectionstring = configuration.GetConnectionString("DefaultConnectionString");
            SqlConnection connection = new SqlConnection(connectionstring);

            connection.Open();
            string query = "insert into Course (CourseName,LiveStream,CourseLevel,CourseClass,CourseTime,CourseFee,CourseDescription,CoursePost,TeacherID,TeacherName)" +
                    "values(@CourseName,@LiveStream,@CourseLevel,@CourseClass,@CourseTime,@CourseFee,@CourseDescription,@CoursePost,@TeacherID,@TeacherName)";
            SqlCommand cmd = new SqlCommand(query, connection);

            cmd.Parameters.Add(new SqlParameter("@CourseName", course.CourseName));
            cmd.Parameters.Add(new SqlParameter("@LiveStream", course.LiveStream));
            cmd.Parameters.Add(new SqlParameter("@CourseLevel", course.CourseLevel));
            cmd.Parameters.Add(new SqlParameter("@CourseClass", course.CourseClass));
            cmd.Parameters.Add(new SqlParameter("@CourseTime", course.CourseTime));
            cmd.Parameters.Add(new SqlParameter("@CourseFee", course.CourseFee));
            cmd.Parameters.Add(new SqlParameter("@CourseDescription", course.CourseDescription));
            cmd.Parameters.Add(new SqlParameter("@CoursePost", course.CoursePost));
            cmd.Parameters.Add(new SqlParameter("@TeacherID", course.TeacherID));
            cmd.Parameters.Add(new SqlParameter("@TeacherName", course.TeacherName));


            int noOfRowsAffected = cmd.ExecuteNonQuery();
            connection.Close();
            return noOfRowsAffected > 0 ? RandomString(10) : "";


        }

        [HttpPost]
        [ActionName("enrollcourse")]
        public string enrollcourse(Enroll enroll)
        {

            string connectionstring = configuration.GetConnectionString("DefaultConnectionString");
            SqlConnection connection = new SqlConnection(connectionstring);

            string s1 = enroll.CourseId, s2 = enroll.StudentId;

            connection.Open();
            string query1 = @"select * from Enroll where CourseId =@CourseId and StudentId =@StudentId ";
            SqlCommand cmd1 = new SqlCommand(query1, connection);

            cmd1.Parameters.Add(new SqlParameter("@CourseId", s1));
            cmd1.Parameters.Add(new SqlParameter("@StudentId", s2));



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
                string query = @"insert into Enroll (CourseId, StudentId) values(@CourseId, @StudentId)";
                SqlCommand cmd = new SqlCommand(query, connection);

                cmd.Parameters.Add(new SqlParameter("@CourseId", s1));
                cmd.Parameters.Add(new SqlParameter("@StudentId", s2));

                int noOfRowsAffected = cmd.ExecuteNonQuery();
                connection.Close();
                return noOfRowsAffected > 0 ? RandomString(10) : "";


            }


        }


        [HttpPost]
        [ActionName("enrolledcourse")]
        public IEnumerable<Course> enrolledcourse(Enroll enroll)
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


            string connectionstring = configuration.GetConnectionString("DefaultConnectionString");
            SqlConnection connection = new SqlConnection(connectionstring);
            connection.Open();

            string query = @"select * from Course inner join Enroll on Course.CourseID =Enroll.CourseID where Enroll.StudentId =@StudentID and Enroll.EnrollStatus=@EnrollStatus";
            SqlCommand cmd = new SqlCommand(query, connection);
            cmd.Parameters.Add(new SqlParameter("@StudentId", enroll.StudentId));
            cmd.Parameters.Add(new SqlParameter("@EnrollStatus", "approve"));

            SqlDataReader reader = cmd.ExecuteReader();



            while (reader.Read())
            {
                ids.Add(Convert.ToInt32(reader["CourseID"]));
                names.Add(reader["CourseName"].ToString());
                levels.Add(reader["CourseLevel"].ToString());
                classes.Add(reader["CourseClass"].ToString());
                times.Add(reader["CourseTime"].ToString());
                fees.Add(reader["CourseFee"].ToString());
                descs.Add(reader["CourseDescription"].ToString());
                posts.Add(reader["CoursePost"].ToString());
                ctid.Add(reader["TeacherID"].ToString());
                ctname.Add(reader["TeacherName"].ToString());
                cdate.Add(reader["CourseCreatedDate"].ToString());
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
                CourseCreatedDate = cdate.ElementAt(index - 1)

            }).ToArray();

        }



        [HttpPost]
        [ActionName("purchasecourse")]
        public string purchasecourse(PurchaseCourse purchasecourse)
        {
            string connectionstring = configuration.GetConnectionString("DefaultConnectionString");
            SqlConnection connection = new SqlConnection(connectionstring);


            connection.Open();
            string query1 = @"select * from PurchaseCourse where CourseId=@CourseId and StudentId=@StudentId ";
            SqlCommand cmd1 = new SqlCommand(query1, connection);

            cmd1.Parameters.Add(new SqlParameter("@CourseId", purchasecourse.CourseId));
            cmd1.Parameters.Add(new SqlParameter("@StudentId", purchasecourse.StudentId));



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
                string query = "insert into PurchaseCourse (UserName,Email,Phone,CourseId,CourseName,CourseFee,TeacherId,StudentId,PaymentMethod,TransactionID)" +
                    "values(@UserName,@Email,@phone,@CourseId,@CourseName,@CourseFee,@TeacherId,@StudentId,@PaymentMethod,@TransactionID)";
                SqlCommand cmd = new SqlCommand(query, connection);

                cmd.Parameters.Add(new SqlParameter("@UserName", purchasecourse.UserName));
                cmd.Parameters.Add(new SqlParameter("@Email", purchasecourse.Email));
                cmd.Parameters.Add(new SqlParameter("@Phone", purchasecourse.Phone));
                cmd.Parameters.Add(new SqlParameter("@CourseId", purchasecourse.CourseId));
                cmd.Parameters.Add(new SqlParameter("@CourseName", purchasecourse.CourseName));
                cmd.Parameters.Add(new SqlParameter("@CourseFee", purchasecourse.CourseFee));
                cmd.Parameters.Add(new SqlParameter("@TeacherId", purchasecourse.TeacherId));
                cmd.Parameters.Add(new SqlParameter("@StudentId", purchasecourse.StudentId));
                cmd.Parameters.Add(new SqlParameter("@PaymentMethod", purchasecourse.PaymentMethod));
                cmd.Parameters.Add(new SqlParameter("@TransactionID", purchasecourse.TransactionID));

                int noOfRowsAffected = cmd.ExecuteNonQuery();
                connection.Close();
                return noOfRowsAffected > 0 ? RandomString(10) : "";
            }

        }


        [HttpPost]
        [ActionName("pendingstudent")]
        public IEnumerable<PurchaseCourse> pendingstudent([FromBody]int id)
        {

            List<int> ids = new List<int>();
            List<string> sids = new List<string>();
            List<string> names = new List<string>();
            List<string> emails = new List<string>();
            List<string> phones = new List<string>();
            List<string> traxs = new List<string>();



            string connectionstring = configuration.GetConnectionString("DefaultConnectionString");
            SqlConnection connection = new SqlConnection(connectionstring);


            
            
                connection.Open();
                string query = "select PurchaseCourse.UserName,PurchaseCourse.StudentId, PurchaseCourse.Email,PurchaseCourse.Phone,PurchaseCourse.TransactionID from PurchaseCourse inner join Enroll on Enroll.CourseId = PurchaseCourse.CourseId and Enroll.StudentId=PurchaseCourse.StudentId where PurchaseCourse.CourseId = @CourseId and Enroll.EnrollStatus = @EnrollStatus";
                SqlCommand cmd = new SqlCommand(query, connection);
                cmd.Parameters.Add(new SqlParameter("@CourseId", id));
                cmd.Parameters.Add(new SqlParameter("@EnrollStatus", "pending"));


            SqlDataReader reader = cmd.ExecuteReader();

            int i = 0;
            while (reader.Read())
            {
                i++;
                ids.Add(i);
                sids.Add(reader["StudentId"].ToString());
                names.Add(reader["UserName"].ToString());
                emails.Add(reader["Email"].ToString());
                phones.Add(reader["Phone"].ToString());
                traxs.Add(reader["TransactionID"].ToString());
                

            }


            connection.Close();

            reader.Close();

            return Enumerable.Range(1, ids.Count).Select(index => new PurchaseCourse
            {
                Id = ids.ElementAt(index - 1),
                StudentId=sids.ElementAt(index - 1),
                UserName = names.ElementAt(index - 1),
                Email = emails.ElementAt(index - 1),
                Phone = phones.ElementAt(index - 1),
                TransactionID = traxs.ElementAt(index - 1)


            }).ToArray();



        }


        [HttpPost]
        [ActionName("approvestudent")]
        public string approvestudent(Enroll enroll)
        {

            string connectionstring = configuration.GetConnectionString("DefaultConnectionString");
            SqlConnection connection = new SqlConnection(connectionstring);

            connection.Open();
            string query = "update Enroll set EnrollStatus = @EnrollStatus where StudentId = @StudentId and CourseId=@CourseId";
            
            SqlCommand cmd = new SqlCommand(query, connection);
            cmd.Parameters.Add(new SqlParameter("@EnrollStatus", "approve"));
            cmd.Parameters.Add(new SqlParameter("@StudentId",enroll.StudentId));
            cmd.Parameters.Add(new SqlParameter("@CourseId", enroll.CourseId));

            int noOfRowsAffected = cmd.ExecuteNonQuery();
            connection.Close();
            return noOfRowsAffected > 0 ? RandomString(10) : "";


        }



        [HttpPost]
        [ActionName("getacourse")]
        public IEnumerable<Course> getacourse([FromBody]int id)
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


            string connectionstring = configuration.GetConnectionString("DefaultConnectionString");
            SqlConnection connection = new SqlConnection(connectionstring);
            connection.Open();

            string query = @"select * from Course where CourseID=@CourseID";
            SqlCommand cmd = new SqlCommand(query, connection);
            cmd.Parameters.Add(new SqlParameter("@CourseId", id));


            SqlDataReader reader = cmd.ExecuteReader();



            while (reader.Read())
            {

                ids.Add(Convert.ToInt32(reader["CourseID"]));
                names.Add(reader["CourseName"].ToString());
                levels.Add(reader["CourseLevel"].ToString());
                classes.Add(reader["CourseClass"].ToString());
                times.Add(reader["CourseTime"].ToString());
                fees.Add(reader["CourseFee"].ToString());
                descs.Add(reader["CourseDescription"].ToString());
                posts.Add(reader["CoursePost"].ToString());
                ctid.Add(reader["TeacherID"].ToString());
                ctname.Add(reader["TeacherName"].ToString());
                cdate.Add(reader["CourseCreatedDate"].ToString());

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
                CourseCreatedDate = cdate.ElementAt(index - 1)


            }).ToArray();

        }



        [HttpGet]
        [ActionName("getcoursehome")]
        public IEnumerable<Course> getcoursehome()
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


            string connectionstring = configuration.GetConnectionString("DefaultConnectionString");
            SqlConnection connection = new SqlConnection(connectionstring);
            connection.Open();

            string query = @"select * from Course where CoursePublished=@CoursePublished";
            SqlCommand cmd = new SqlCommand(query, connection);

            cmd.Parameters.Add(new SqlParameter("@CoursePublished", "Published"));
            SqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                ids.Add(Convert.ToInt32(reader["CourseID"]));
                names.Add(reader["CourseName"].ToString());
                levels.Add(reader["CourseLevel"].ToString());
                classes.Add(reader["CourseClass"].ToString());
                times.Add(reader["CourseTime"].ToString());
                fees.Add(reader["CourseFee"].ToString());
                descs.Add(reader["CourseDescription"].ToString());
                posts.Add(reader["CoursePost"].ToString());
                ctid.Add(reader["TeacherID"].ToString());
                ctname.Add(reader["TeacherName"].ToString());
                cdate.Add(reader["CourseCreatedDate"].ToString());
            }
            connection.Close();
            reader.Close();
            return Enumerable.Range(1, ids.Count).Select(index => new Course
            {
                CourseId= ids.ElementAt(index-1),
                CourseName = names.ElementAt(index - 1),
                CourseLevel=levels.ElementAt(index - 1),
                CourseClass=classes.ElementAt(index - 1),
                CourseTime=times.ElementAt(index - 1),
                CourseFee=fees.ElementAt(index - 1),
                CourseDescription= descs.ElementAt(index - 1),
                CoursePost=posts.ElementAt(index - 1),
                TeacherID = ctid.ElementAt(index - 1),
                TeacherName = ctname.ElementAt(index - 1),
                CourseCreatedDate = cdate.ElementAt(index - 1)
            }).ToArray();

        }


        [HttpGet]
        [ActionName("getspecialcourse")]
        public IEnumerable<Course> getspecialcourse()
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


            string connectionstring = configuration.GetConnectionString("DefaultConnectionString");
            SqlConnection connection = new SqlConnection(connectionstring);
            connection.Open();

            string query = @"select * from Course where CoursePublished=@CoursePublished and CourseLevel=@CourseLevel";
            SqlCommand cmd = new SqlCommand(query, connection);

            cmd.Parameters.Add(new SqlParameter("@CoursePublished", "Published"));
            cmd.Parameters.Add(new SqlParameter("@CourseLevel", "Intermediate"));
            SqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                ids.Add(Convert.ToInt32(reader["CourseID"]));
                names.Add(reader["CourseName"].ToString());
                levels.Add(reader["CourseLevel"].ToString());
                classes.Add(reader["CourseClass"].ToString());
                times.Add(reader["CourseTime"].ToString());
                fees.Add(reader["CourseFee"].ToString());
                descs.Add(reader["CourseDescription"].ToString());
                posts.Add(reader["CoursePost"].ToString());
                ctid.Add(reader["TeacherID"].ToString());
                ctname.Add(reader["TeacherName"].ToString());
                cdate.Add(reader["CourseCreatedDate"].ToString());
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
                CourseCreatedDate = cdate.ElementAt(index - 1)
            }).ToArray();

        }


        [HttpPost]
        [ActionName("getteachercourse")]
        public IEnumerable<Course> getteachercourse([FromBody]int id)
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
            
            string query = @"select * from Course where TeacherID=@TeacherID";
            SqlCommand cmd = new SqlCommand(query, connection);

            cmd.Parameters.Add(new SqlParameter("@TeacherID",id));
            SqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                ids.Add(Convert.ToInt32(reader["CourseID"]));
                names.Add(reader["CourseName"].ToString());
                levels.Add(reader["CourseLevel"].ToString());
                classes.Add(reader["CourseClass"].ToString());
                times.Add(reader["CourseTime"].ToString());
                fees.Add(reader["CourseFee"].ToString());
                descs.Add(reader["CourseDescription"].ToString());
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





        private static Random random = new Random();
        public static string RandomString(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
              .Select(s => s[random.Next(s.Length)]).ToArray());
        }




    }
}
