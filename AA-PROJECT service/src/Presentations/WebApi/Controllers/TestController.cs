using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace WebApi.Controllers
{
    public class TestController : Controller
    {
        public TestController()
        {

        }

        [HttpGet("get")]
        [Authorize]
        public async Task<IActionResult> Test(string text)
        {            
            return Ok(text);
        }
    }
}
