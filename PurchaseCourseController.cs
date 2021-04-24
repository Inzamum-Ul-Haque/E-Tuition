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
    [Route("api/[controller]")]
    [ApiController]

    public class PurchaseCourseController : ControllerBase
    {

        private readonly IConfiguration configuration;

        public PurchaseCourseController(IConfiguration config)
        {
            this.configuration = config;
        }


        [HttpGet]
        public string Get()
        {

            return "abc";
        }

        [HttpPost]

        public string Post(PurchaseCourse purchasecourse)
        {
            string connectionstring = configuration.GetConnectionString("DefaultConnectionString");
            SqlConnection connection = new SqlConnection(connectionstring);

                connection.Open();
                string query = "insert into PurchaseCourse (UserName,Email,Phone,CourseName,PaymentMethod,TransactionID)values(@UserName,@Email,@phone,@CourseName,@PaymentMethod,@TransactionID)";
                SqlCommand cmd = new SqlCommand(query, connection);

                cmd.Parameters.Add(new SqlParameter("@UserName", purchasecourse.UserName));
                cmd.Parameters.Add(new SqlParameter("@Email", purchasecourse.Email));
                cmd.Parameters.Add(new SqlParameter("@Phone", purchasecourse.Phone));
                cmd.Parameters.Add(new SqlParameter("@CourseName", purchasecourse.CourseName));
                cmd.Parameters.Add(new SqlParameter("@PaymentMethod", purchasecourse.PaymentMethod));
                cmd.Parameters.Add(new SqlParameter("@TransactionID", purchasecourse.TransactionID));

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
