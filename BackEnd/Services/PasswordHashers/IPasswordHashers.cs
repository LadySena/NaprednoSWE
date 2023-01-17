using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackEnd.Models;
namespace BackEnd.Services.PasswordHashers
{
    public interface IPasswordHashers
    {
       
       string HashPassword(string password);
    }
}