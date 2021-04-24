using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace e_tuition
{
    public class PurchaseCourse
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string CourseId { get; set; }
        public string CourseName { get; set; }
        public string TeacherId { get; set; }
        public string StudentId { get; set; }
        public string CourseFee { get; set; }
        public string PaymentMethod { get; set; }
        public string TransactionID { get; set; }
    }
}
