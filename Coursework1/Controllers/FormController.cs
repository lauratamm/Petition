using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Coursework1.Controllers
{
    public class FormController : Controller
    {
        // GET: Form
        public ActionResult PetitionForm()
        {
            return View();
        }

    }
}