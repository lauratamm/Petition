using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Coursework1.Startup))]
namespace Coursework1
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
