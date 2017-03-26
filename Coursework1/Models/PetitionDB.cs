using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;


namespace Coursework1.Models
{
    public class PetitionsDB : DbContext
    {
        public PetitionsDB() : base("DefaultConnection")
        {
            // Database.SetInitializer(new DropCreateDatabaseIfModelChanges<PetitionsDB>());
            Database.SetInitializer(new DropCreateDatabaseAlways<PetitionsDB>());
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Petition> Petitions { get; set; }

    }
}