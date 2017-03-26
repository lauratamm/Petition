using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Coursework1.Models
{
    public class Petition
    {
        public int Id { get; set; } //why are these public
        public string Title { get; set; }
        public string Description { get; set; }
        public int UserId { get; set; }
        public virtual List<User> Signatories { get; set; }
       // public DateTime DateCreated { get; set; }
    }
}