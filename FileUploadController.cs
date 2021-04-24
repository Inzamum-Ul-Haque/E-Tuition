using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace e_tuition.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class FileUploadController : ControllerBase
    {


        [HttpGet]
        [ActionName("Assign")]
        public string Assign() {
            return "sdsds";
        }


        // the HTTP post request. The Body size limit is disabled 
        [HttpPost, DisableRequestSizeLimit]
        [ActionName("UploadCv")]
        public IActionResult UploadCv()
        {
            try
            {
                // 1. get the file form the request
                var postedFile = Request.Form.Files[0];
                // 2. set the file uploaded folder
                var uploadFolder = Path.Combine(Directory.GetCurrentDirectory(), "UploadedFiles/cv");
                // 3. check for the file length, if it is more than 0 the save it
                if (postedFile.Length > 0)
                {
                    // 3a. read the file name of the received file
                    var fileName = ContentDispositionHeaderValue.Parse(postedFile.ContentDisposition)
                        .FileName.Trim('"');

                    //var fileName = RandomString(30) + ".pdf";
                    // 3b. save the file on Path
                    var finalPath = Path.Combine(uploadFolder, fileName);
                    using (var fileStream = new FileStream(finalPath, FileMode.Create))
                    {
                        
                        postedFile.CopyTo(fileStream);
                    }
                    return Ok($"File is uploaded Successfully");
                }
                else
                {
                    return BadRequest("The File is not received.");
                }


            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Some Error Occcured while uploading File {ex.Message}");
            }
        }


        [HttpPost, DisableRequestSizeLimit]
        [ActionName("downloadcv")]

        public async Task<IActionResult> downloadcv(Teacher teacher)
        {
            var filename = teacher.Cv;
            if (filename == null)
                return Content("filename not present");
            var uploadFolder = Path.Combine(Directory.GetCurrentDirectory(), "UploadedFiles/cv");
            var path = Path.Combine(uploadFolder, filename);

            var memory = new MemoryStream();
            using (var stream = new FileStream(path, FileMode.Open))
            {
                await stream.CopyToAsync(memory);
            }
            memory.Position = 0;
            return File(memory,"application/pdf", Path.GetFileName(path));
        }


        [HttpPost, DisableRequestSizeLimit]
        [ActionName("UploadPdf")]
        public IActionResult UploadPdf()
        {
            try
            {
                
                // 1. get the file form the request
                var postedFile = Request.Form.Files[0];
                // 2. set the file uploaded folder
                var uploadFolder = Path.Combine(Directory.GetCurrentDirectory(), "UploadedFiles/coursepdf");
                // 3. check for the file length, if it is more than 0 the save it
                if (postedFile.Length > 0)
                {
                    // 3a. read the file name of the received file
                    var fileName = ContentDispositionHeaderValue.Parse(postedFile.ContentDisposition)
                        .FileName.Trim('"');

                    //var fileName = RandomString(30) + ".pdf";
                    // 3b. save the file on Path
                    var finalPath = Path.Combine(uploadFolder, fileName);
                    using (var fileStream = new FileStream(finalPath, FileMode.Create))
                    {

                        postedFile.CopyTo(fileStream);
                    }
                    return Ok($"File is uploaded Successfully");
                }
                else
                {
                    return BadRequest("The File is not received.");
                }


            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Some Error Occcured while uploading File {ex.Message}");
            }
        }

        [HttpPost, DisableRequestSizeLimit]
        [ActionName("downloadpdf")]

        public async Task<IActionResult> downloadpdf(Teacher teacher)
        {
            var filename = teacher.Cv;
            if (filename == null)
                return Content("filename not present");
            var uploadFolder = Path.Combine(Directory.GetCurrentDirectory(), "UploadedFiles/coursepdf");
            var path = Path.Combine(uploadFolder, filename);

            var memory = new MemoryStream();
            using (var stream = new FileStream(path, FileMode.Open))
            {
                await stream.CopyToAsync(memory);
            }
            memory.Position = 0;
            return File(memory, "application/pdf", Path.GetFileName(path));
        }


        [HttpGet, DisableRequestSizeLimit]
        [ActionName("photo")]
        public async Task<IActionResult> photo()
        {
            var filename = "DefaultImg.jpg";
            if (filename == null)
                return Content("filename not present");
            var uploadFolder = Path.Combine(Directory.GetCurrentDirectory(), "UploadedFiles/profilepicture");
            var path = Path.Combine(uploadFolder, filename);

            var memory = new MemoryStream();
            using (var stream = new FileStream(path, FileMode.Open))
            {
                await stream.CopyToAsync(memory);
            }
            memory.Position = 0;
            return File(memory, "image/jpeg", Path.GetFileName(path));
        }

        [HttpPost, DisableRequestSizeLimit]
        [ActionName("UploadPhoto")]
        public IActionResult UploadPhoto()
        {
            try
            {

                
                var postedFile = Request.Form.Files[0];
                // 2. set the file uploaded folder
                var uploadFolder = Path.Combine(Directory.GetCurrentDirectory(), "UploadedFiles/profilepicture");
                // 3. check for the file length, if it is more than 0 the save it
                if (postedFile.Length > 0)
                {
                    // 3a. read the file name of the received file
                    var fileName = ContentDispositionHeaderValue.Parse(postedFile.ContentDisposition)
                        .FileName.Trim('"');

                    
                    var finalPath = Path.Combine(uploadFolder, fileName);
                    using (var fileStream = new FileStream(finalPath, FileMode.Create))
                    {

                        postedFile.CopyTo(fileStream);
                    }
                    return Ok($"File is uploaded Successfully");
                }
                else
                {
                    return BadRequest("The File is not received.");
                }


            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Some Error Occcured while uploading File {ex.Message}");
            }
        }

        [HttpPost, DisableRequestSizeLimit]
        [ActionName("getphoto")]
        public async Task<IActionResult> getphoto(Teacher teacher)
        {
            var filename = teacher.ImgName;
            if (filename == null)
                return Content("filename not present");
            var uploadFolder = Path.Combine(Directory.GetCurrentDirectory(), "UploadedFiles/profilepicture");
            var path = Path.Combine(uploadFolder, filename);

            var memory = new MemoryStream();
            using (var stream = new FileStream(path, FileMode.Open))
            {
                await stream.CopyToAsync(memory);
            }
            memory.Position = 0;
            return File(memory, "image/jpeg", Path.GetFileName(path));
        }

        /*
        [HttpGet, DisableRequestSizeLimit]
        [ActionName("getPhoto")]
        public IActionResult GetPhoto()
        {
            try
            {
                var folderName = Path.Combine("UploadedFiles", "profile");
                var pathToRead = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                var photos = Directory.EnumerateFiles(pathToRead)
                    .Where(IsAPhotoFile)
                    .Select(fullPath => Path.Combine(folderName, Path.GetFileName(fullPath)));
                
               
                

                return Ok(new { photos });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }

        private bool IsAPhotoFile(string fileName)
        {
            return fileName.EndsWith(".jpg", StringComparison.OrdinalIgnoreCase)
                || fileName.EndsWith(".jpeg", StringComparison.OrdinalIgnoreCase)
                || fileName.EndsWith(".png", StringComparison.OrdinalIgnoreCase)
                ;
        }


        */


        private static Random random = new Random();
        public static string RandomString(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
              .Select(s => s[random.Next(s.Length)]).ToArray());
        }
    }
}