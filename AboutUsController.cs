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
    [ApiController]
    [Route("api/[controller]")]
    public class aboutUsController : ControllerBase
    {


        private readonly IConfiguration configuration;

        public aboutUsController(IConfiguration config)
        {
            this.configuration = config;
        }



        

        




        [HttpGet]


        public string Get()
        {
            return "abir";
        }

        [HttpGet]
        public string Get(string s)
        {
            return s;
        }



        



    }
}
