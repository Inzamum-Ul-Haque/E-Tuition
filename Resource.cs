using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace e_tuition
{
    public class Resource
    {
        public int ResourceId { get; set; }
        public string CourseId { get; set; }
        public string ResourceType { get; set; }
        public string ResourceDetails { get; set; }

        public string ResourceLink { get; set; }
        public string ResourceDate { get; set; }
    }
}
