using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Coursework1.Models
{
    public class User
    {
        public int UserId { get; set; }
        public string Firstname { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public List<Petition> SignedCauses { get; set; }
    }
}