
using Coursework1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Coursework1.Controllers
{
    public class AllPetitionsController : Controller
    {
        PetitionsDB db = new PetitionsDB();
        // GET: AllPetitions
        public ActionResult AllPetitions()
        {
            
            Petition petition = new Petition { Title = "wat" };
            db.Petitions.Add(petition);
            db.SaveChanges();
            ViewBag.Message = db.Petitions.First().Title;
            return View(db.Petitions.ToList());
        }

        public ActionResult ViewPetition()
        {
            return View();
        }

        [HttpGet]
        public ActionResult Edit(int id)
        {
            List<Petition> AllPetitions = db.Petitions.ToList();
            Petition getPetitionById = AllPetitions.First(r => r.Id.Equals(id));

            // TODO: complete the code:
            //        get the country object associated 
            //        with the passed id you will need 
            //        to use the Linq method that returns 
            //        null if nothing is found.
            //Petition petition = // COMPLETE HERE
            Console.WriteLine(id);
            Console.WriteLine(getPetitionById.Title);
            if (getPetitionById == null) return View("Error");
            return View(getPetitionById);
        }
    }
}
